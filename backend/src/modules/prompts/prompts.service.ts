import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Prompt, PromptDocument } from './schemas/prompt.schema';
import { CreatePromptDto } from './dtos/create-prompt.dto';
import { OpenAI } from 'openai';
import { Category, CategoryDocument } from '../categories/schemas/category.schema';
import { SubCategory, SubCategoryDocument } from '../categories/schemas/sub-category.schema';
import { createAiProvider } from '../../ai/ai.factory';
@Injectable()
export class PromptsService {
  constructor(
    @InjectModel(Prompt.name) private promptModel: Model<PromptDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategoryDocument>,
  ) {}

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createPrompt(userId: string, dto: CreatePromptDto) {
    if (dto.prompt.length > 10000) {
      throw new BadRequestException('Prompt too long, max 10000 chars');
    }

    const category = await this.categoryModel.findById(dto.categoryId);
    const subCategory = await this.subCategoryModel.findById(dto.subCategoryId);

    if (!category || !subCategory) {
      throw new BadRequestException('Category or sub-category not found');
    }

    if (subCategory.category_id.toString() !== category._id.toString()) {
        throw new BadRequestException('Sub-category does not belong to the selected category');
    }

    const aiPrompt = `
    You are an expert teacher. 
    Only generate a lesson about the topic specified.
    Category: ${category.name}
    SubCategory: ${subCategory.name}
    User Prompt: ${dto.prompt}
    If the prompt is unrelated to the chosen category and sub-category, politely respond with exactly: out of scope. Do NOT include anything else if it is out of scope.
    Please generate a detailed lesson ONLY if it matches the category and sub-category.
    `;


    let aiProvider = createAiProvider();

    const aiResponse = await aiProvider.generateLesson(aiPrompt);

    if (!aiResponse) {
      throw new BadRequestException('No response received from AI.');
    }

    if (aiResponse.trim().toLowerCase() === 'out of scope') {
      throw new BadRequestException(
        'The user prompt is out of scope for the selected category/sub-category.'
      );
    }

    const created = await this.promptModel.create({
      userId,
      categoryId: dto.categoryId,
      subCategoryId: dto.subCategoryId,
      prompt: dto.prompt,
      response: aiResponse,
    });

    return created;
  }

  async getUserPrompts(userId: string) {
    return this.promptModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}

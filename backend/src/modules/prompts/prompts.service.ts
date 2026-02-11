import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Prompt, PromptDocument } from './schemas/prompt.schema';
import { CreatePromptDto } from './dtos/create-prompt.dto';
import { OpenAI } from 'openai';
import { Category, CategoryDocument } from '../categories/schemas/category.schema';
import { SubCategory, SubCategoryDocument } from '../categories/schemas/sub-category.schema';
import { createAiProvider } from '../../ai/ai.factory';

/**
 * Service for managing prompts.
 * Handles creation of new prompts, AI lesson generation, 
 * and retrieval of prompts for users.
 */
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


  /**
   * Creates a new prompt for a user and generates an AI lesson.
   *
   * Steps:
   * 1. Validates prompt length (max 10000 characters).
   * 2. Checks that both the category and sub-category exist.
   * 3. Ensures that the selected sub-category belongs to the chosen category.
   * 4. Constructs a detailed AI instruction string based on category, sub-category, and user prompt:
   *    - Category = "Other" → AI ignores category/sub-category, generates lesson strictly based on user prompt.
   *    - SubCategory = "Other" → AI generates lesson based on category only, ignoring sub-category.
   *    - Otherwise → AI generates lesson strictly related to both category and sub-category.
   *    - All prompts enforce that the response must be an educational lesson only.
   *    - If the prompt is not a lesson or out of scope → AI returns exactly "out of scope".
   * 5. Calls AI provider to generate lesson.
   * 6. Checks that AI response is not empty and not "out of scope".
   * 7. Saves the prompt and AI response to the database.
   *
   * Throws:
   * - BadRequestException for invalid input, non-existing category/sub-category, or out-of-scope prompts.
   * - InternalServerErrorException if AI service fails or returns empty response.
   *
   * @param userId - ID of the authenticated user creating the prompt
   * @param dto - Data transfer object containing categoryId, subCategoryId, and prompt text
   * @returns The created Prompt document including AI response
   */

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

    let aiPrompt: string;

    if (category.name === 'Other') {
      aiPrompt = `
      You are an expert teacher.
      Only generate a detailed educational lesson strictly based on the user's input.
      User Prompt: ${dto.prompt}
      If the prompt is unrelated to educational lesson content, respond exactly with: out of scope.
      Do NOT answer questions, provide opinions, or unrelated content.
      Only create content suitable for a lesson.
      `;
    } else if (subCategory.name === 'Other') {
      aiPrompt = `
      You are an expert teacher.
      Only generate a detailed educational lesson strictly related to the category: ${category.name}.
      User Prompt: ${dto.prompt}
      If the prompt is unrelated to the chosen category or not a lesson, respond exactly with: out of scope.
      Do NOT include anything else if it is out of scope.
      `;
    } else {
      aiPrompt = `
      You are an expert teacher.
      Only generate a detailed educational lesson strictly related to the category: ${category.name}
      and sub-category: ${subCategory.name}.
      User Prompt: ${dto.prompt}
      If the prompt is unrelated to the chosen category/sub-category or not a lesson, respond exactly with: out of scope.
      Do NOT include anything else if it is out of scope.
      Please generate a detailed lesson ONLY if it matches the category and sub-category.
      `;
    }

    let aiProvider = createAiProvider();

    let aiResponse;
    try {
      aiResponse = await aiProvider.generateLesson(aiPrompt);
    } catch (err) {
      throw new InternalServerErrorException('AI service failed');
    }
  
    if (!aiResponse) {
      throw new InternalServerErrorException('AI returned empty response');
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

    /**
   * Retrieves all prompts for a given user.
   * Populates category and sub-category names.
   */
  async getUserPrompts(userId: string) {
    return this.promptModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate('categoryId', 'name')      
      .populate('subCategoryId', 'name')    
      .exec();
  }

    /**
   * Retrieves a specific prompt by ID for a given user.
   * Populates category and sub-category details.
   */
  async getUserPromptById(userId: string, promptId: string) {
    return this.promptModel
      .findOne({ userId, _id: promptId })
      .populate('categoryId')
      .populate('subCategoryId')
      .exec();
  }

}

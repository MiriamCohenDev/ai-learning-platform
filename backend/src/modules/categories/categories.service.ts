import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from './schemas/category.schema';
import { SubCategory } from './schemas/sub-category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,

    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategory>,
  ) {}

    /**
   * Returns all main categories.
   */
  async getAllCategories() {
    return this.categoryModel.find().lean();
  }

    /**
   * Returns all sub-categories for a specific category.
   * Converts string categoryId to ObjectId before querying.
   */
  async getSubCategoriesByCategoryId(categoryId: string) {
    return this.subCategoryModel.find({
      category_id: new Types.ObjectId(categoryId),
    }).lean();
  }
}

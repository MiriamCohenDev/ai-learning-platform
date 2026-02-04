import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../../modules/categories/schemas/category.schema';
import { SubCategory } from '../../modules/categories/schemas/sub-category.schema';

@Injectable()
export class CategoriesSeedService implements OnModuleInit {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,

    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategory>,
  ) {}

  async onModuleInit() {
    const categoriesCount = await this.categoryModel.countDocuments();

    if (categoriesCount > 0) {
      return;
    }

    const programming = await this.categoryModel.create({ name: 'Programming' });
    const databases = await this.categoryModel.create({ name: 'Databases' });

    await this.subCategoryModel.insertMany([
      { name: 'JavaScript', category_id: programming._id },
      { name: 'Python', category_id: programming._id },
      { name: 'MongoDB', category_id: databases._id },
      { name: 'PostgreSQL', category_id: databases._id },
    ]);
  }
}

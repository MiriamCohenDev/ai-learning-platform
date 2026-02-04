import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // GET /categories
  @Get()
  async getCategories() {
    return this.categoriesService.getAllCategories();
  }

  // GET /categories/:id/sub-categories
  @Get(':id/sub-categories')
  async getSubCategories(@Param('id') id: string) {
    return this.categoriesService.getSubCategoriesByCategoryId(id);
  }
}

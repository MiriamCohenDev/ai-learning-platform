import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

/**
 * Controller for category-related endpoints.
 * Provides endpoints for categories and their sub-categories.
 * 
 * Note:
 * - These endpoints are intentionally public (no JWT required)
 *   because fetching categories and sub-categories is not sensitive data.
 *   Anyone can view the list without authentication, so we don't need to verify the user.
 */
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

   /**
   * GET /categories
   * Returns all main categories.
   */
  @Get()
  async getCategories() {
    return this.categoriesService.getAllCategories();
  }

  /**
   * GET /categories/:id/sub-categories
   * Returns all sub-categories for a given category ID.
   */
  @Get(':id/sub-categories')
  async getSubCategories(@Param('id') id: string) {
    return this.categoriesService.getSubCategoriesByCategoryId(id);
  }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PromptsService } from '../prompts/prompts.service';

/**
 * Controller for admin-specific endpoints.
 * Protected by JWT and role-based guards.
 */
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly usersService: UsersService,
    private readonly promptsService: PromptsService
  ) {}

    /**
   * GET /admin/users/:id/history
   * Returns the history of prompts for a specific user.
   * Access restricted to admin role.
   */
  @Roles('admin')
  @Get('users/:id/history')
  async getUserHistory(@Param('id') userId: string) {
    return await this.promptsService.getUserPrompts(userId); 
  }

    /**
   * GET /admin/users/:id/prompt/:promptId
   * Returns a specific prompt of a user by prompt ID.
   * Access restricted to admin role.
   */
  @Roles('admin')
  @Get('users/:id/prompt/:promptId')
  async getUserPrompt(@Param('id') userId: string, @Param('promptId') promptId: string) {
    return await this.promptsService.getUserPromptById(userId, promptId); 
  }
  
    /**
   * GET /admin/users
   * Returns all users.
   * Access restricted to admin role.
   */
  @Roles('admin')
  @Get('users')
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users;
  }
}

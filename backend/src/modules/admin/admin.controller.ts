import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PromptsService } from '../prompts/prompts.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly usersService: UsersService,
    private readonly promptsService: PromptsService
  ) {}

  @Roles('admin')
  @Get('users/:id/history')
  async getUserHistory(@Param('id') userId: string) {
    return await this.promptsService.getUserPrompts(userId); 
  }
  
  @Roles('admin')
  @Get('users')
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users;
  }
}

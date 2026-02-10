import { Controller, Post, Body, UseGuards, Req, Get, UnauthorizedException, Param,} from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { CreatePromptDto } from './dtos/create-prompt.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('prompts')
export class PromptsController {
  constructor(private promptsService: PromptsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPrompt(@Req() req: Request, @Body() dto: CreatePromptDto) {
    const userId = req.user?.userId;
    if (!userId) {
        throw new UnauthorizedException('User not found');
    }
    const prompt = await this.promptsService.createPrompt(userId, dto);
    return { lesson: prompt.response, id: prompt._id };
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getUserPrompts(@Req() req: Request) {
    const userId = req.user?.userId;
    if (!userId) {
        throw new UnauthorizedException('User not found');
    }
    const prompts = await this.promptsService.getUserPrompts(userId);
    return prompts;
  }

  @UseGuards(JwtAuthGuard)
  @Get('history/:id')
  async getUserPromptById(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }
    return this.promptsService.getUserPromptById(userId, id);
  }
}

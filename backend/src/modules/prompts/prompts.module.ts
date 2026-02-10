import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromptsService } from './prompts.service';
import { PromptsController } from './prompts.controller';
import { Prompt, PromptSchema } from './schemas/prompt.schema';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Prompt.name, schema: PromptSchema }]),
  CategoriesModule],
  providers: [PromptsService],
  controllers: [PromptsController],
  exports: [PromptsService],
})
export class PromptsModule {}

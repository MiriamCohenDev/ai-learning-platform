import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PromptDocument = Prompt & Document;

@Schema({ timestamps: true })
export class Prompt {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId!: string;

  @Prop({ type: Types.ObjectId, ref: 'SubCategory', required: true })
  subCategoryId!: string;

  @Prop({ type: String, required: true })
  prompt!: string;

  @Prop({ type: String, required: true })
  response!: string;
}

export const PromptSchema = SchemaFactory.createForClass(Prompt);

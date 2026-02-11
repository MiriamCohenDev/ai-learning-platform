import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;
/**
 * Mongoose schema for Category collection.
 * Represents main categories with unique name.
 */
@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name!: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);



import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubCategoryDocument = SubCategory & Document;
/**
 * Mongoose schema for SubCategory collection.
 * Each sub-category references a parent Category.
 */
@Schema({ timestamps: true })
export class SubCategory extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category_id!: Types.ObjectId;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

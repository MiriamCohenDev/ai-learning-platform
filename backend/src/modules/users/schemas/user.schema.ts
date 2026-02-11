import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

/**
 * Mongoose schema for User collection.
 */
@Schema({ timestamps: true })
export class User {

  @Prop({ required: true })
  name!: string;

  @Prop({ unique: true, sparse: true })
  phone?: string;

  @Prop({ required: true, unique: true })
  idNumber!: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role!: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

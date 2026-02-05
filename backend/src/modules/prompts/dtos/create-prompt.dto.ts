import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';

export class CreatePromptDto {
  @IsMongoId()
  categoryId!: string;

  @IsMongoId()
  subCategoryId!: string;

  @IsString()
  @IsNotEmpty()
  prompt!: string;
}

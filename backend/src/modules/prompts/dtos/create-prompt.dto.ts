import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';

/**
 * DTO for creating a new prompt.
 * Validates categoryId, subCategoryId and prompt text.
 */
export class CreatePromptDto {
  @IsMongoId()
  categoryId!: string;

  @IsMongoId()
  subCategoryId!: string;

  @IsString()
  @IsNotEmpty()
  prompt!: string;
}

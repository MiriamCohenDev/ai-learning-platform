import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';
import { IsUniversalId } from '../../../common/validators/universal-id.validator';

/**
 * DTO for creating a new user.
 * Validates required fields and optional phone number format.
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'Phone must be 10 digits' })
  phone?: string;

  @IsNotEmpty()
  @IsUniversalId({ message: 'ID Number must be a valid universal ID' })
  idNumber!: string;
}









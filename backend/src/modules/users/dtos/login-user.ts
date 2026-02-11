import { IsNotEmpty, IsString } from 'class-validator';
import { IsUniversalId } from '../../../common/validators/universal-id.validator';

/**
 * DTO for login request.
 * Requires name and valid Israeli ID number.
 */
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsUniversalId({ message: 'ID Number must be a valid universal ID' })
  idNumber!: string;
}
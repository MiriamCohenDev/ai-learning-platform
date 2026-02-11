import { IsNotEmpty, IsString } from 'class-validator';
import { IsIsraeliId } from '../../../common/validators/israeli-id.validator';

/**
 * DTO for login request.
 * Requires name and valid Israeli ID number.
 */
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsIsraeliId({ message: 'ID Number must be a valid Israeli ID' })
  idNumber!: string;
}
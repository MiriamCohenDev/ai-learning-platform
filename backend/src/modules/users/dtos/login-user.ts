import { IsNotEmpty, IsString } from 'class-validator';
import { IsIsraeliId } from '../../../common/validators/israeli-id.validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsIsraeliId({ message: 'ID Number must be a valid Israeli ID' })
  idNumber!: string;
}
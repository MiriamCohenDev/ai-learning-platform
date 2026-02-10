import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';
import { IsIsraeliId } from '../../../common/validators/israeli-id.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'Phone must be 10 digits' })
  phone?: string;

  @IsNotEmpty()
  @IsIsraeliId({ message: 'ID Number must be a valid Israeli ID' })
  idNumber!: string;
}









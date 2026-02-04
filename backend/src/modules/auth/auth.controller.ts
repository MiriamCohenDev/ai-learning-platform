import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dtos/login-user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    // validation of dto handled by ValidationPipe
    const user = await this.authService.validateCredentials(dto.name, dto.idNumber);
    return this.authService.login(user);
  }
}

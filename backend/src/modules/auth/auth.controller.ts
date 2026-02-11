import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dtos/login-user';

/**
 * Controller for authentication endpoints.
 * Handles login requests.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  /**
   * POST /auth/login
   * Validates user credentials and returns JWT token.
   */
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    // validation of dto handled by ValidationPipe
    const user = await this.authService.validateCredentials(dto.name, dto.idNumber);
    return this.authService.login(user);
  }
}

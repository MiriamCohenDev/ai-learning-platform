import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from '../auth/auth.service';

/**
 * Controller for user-related endpoints.
 * Currently handles user registration.
 */
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

    /**
   * POST /users/register
   * Creates a new user and returns JWT token along with the user.
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const token = await this.authService.login(user as any);
    return { message: 'User registered successfully', user, ...token };
  }


}

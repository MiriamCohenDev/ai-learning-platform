import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

    /**
   * Validates user by name and idNumber.
   */
  async validateUser(name: string, idNumber: string) {
    return this.usersService.validateUser(name, idNumber);
  }

    /**
   * Checks credentials and throws UnauthorizedException if invalid.
   */
  async validateCredentials(name: string, idNumber: string) {
    const user = await this.usersService.findByIdNumber(idNumber);
    if (!user || user.name !== name) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

    /**
   * Generates JWT token for authenticated user.
   */
  async login(user: any) {
    const payload = { sub: user._id || user.id, name: user.name, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }



}

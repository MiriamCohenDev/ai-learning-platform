import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, idNumber: string) {
    return this.usersService.validateUser(name, idNumber);
  }

  async validateCredentials(name: string, idNumber: string) {
    const user = await this.usersService.findByIdNumber(idNumber);
    if (!user || user.name !== name) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id || user.id, name: user.name, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }



}

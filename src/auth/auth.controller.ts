import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString } from 'class-validator';

class RegisterUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: { username: string; password: string }) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }
}

// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

class LoginDto {
  email: string;
  password: string;
}
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const admin = await this.authService.validateAdmin(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(admin);
  }
}

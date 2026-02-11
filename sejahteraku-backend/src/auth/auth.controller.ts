import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    
    // Validasi input manual sebelum ke service
    if (!email || !password) {
      throw new UnauthorizedException('Email dan Password wajib diisi');
    }

    return this.authService.login(email, password);
  }
}
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 1. REGISTER
   * Endpoint: POST http://localhost:3000/auth/register
   * Fungsi: Membuat akun baru dan mengirimkan kode OTP ke email
   */
  @Post('register')
  async register(@Body() dto: any) {
    return this.authService.register(dto);
  }

  /**
   * 2. VERIFY OTP
   * Endpoint: POST http://localhost:3000/auth/verify-otp
   * Fungsi: Memvalidasi kode OTP yang dimasukkan user dari email
   */
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOTP(@Body() dto: { email: string; code: string }) {
    return this.authService.verifyOTP(dto.email, dto.code);
  }

  /**
   * 3. LOGIN
   * Endpoint: POST http://localhost:3000/auth/login
   * Fungsi: Masuk ke aplikasi (hanya jika isVerified: true)
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: any) {
    return this.authService.login(dto);
  }
}
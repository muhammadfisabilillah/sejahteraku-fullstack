import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// Pakai ../ (mundur satu tingkat) untuk mencari file di folder src
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    if (!email) return null;

    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    // Validasi password mentah sesuai data ID 1 (Muhammad)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    
    console.log(`Gagal Validasi: Password tidak cocok untuk '${email}'`);
    return null;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException('Email tidak terdaftar atau password salah!');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
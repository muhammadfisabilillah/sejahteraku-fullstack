import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../mailer/mailer.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private jwt: JwtService,
  ) {}

  // 1. LOGIKA REGISTRASI & KIRIM OTP
  async register(dto: any) {
    // Cek apakah email sudah terdaftar
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new BadRequestException('Email sudah terdaftar di sistem kami.');
    }

    // Generate 6 Digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set Waktu Expired (5 Menit dari sekarang)
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);

    // Hash Password sebelum simpan
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Simpan User Baru (isVerified masih false)
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        otpCode: otp,
        otpExpires: expires,
        isVerified: false,
      },
    });

    // Kirim Email OTP menggunakan MailerService
    try {
      await this.mailerService.sendOTP(newUser.email, otp);
    } catch (error) {
      console.error("Gagal kirim email, tapi user tersimpan:", error);
    }

    return {
      message: 'Registrasi berhasil! Silakan cek email kamu untuk kode verifikasi.',
      email: newUser.email,
    };
  }

  // 2. LOGIKA VERIFIKASI OTP
  async verifyOTP(email: string, code: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User tidak ditemukan.');
    }

    // Cek apakah kode cocok
    if (user.otpCode !== code) {
      throw new BadRequestException('Kode OTP yang kamu masukkan salah.');
    }

    // Cek apakah sudah expired
    const now = new Date();
    if (user.otpExpires && now > user.otpExpires) {
      throw new BadRequestException('Kode OTP sudah kadaluwarsa. Silakan minta kode baru.');
    }

    // Update status user jadi Verified
    await this.prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otpCode: null, // Hapus kode agar tidak bisa dipakai lagi
        otpExpires: null,
      },
    });

    return {
      message: 'Akun berhasil diverifikasi! Sekarang kamu bisa login ke SejahteraKu.',
    };
  }

  // 3. LOGIKA LOGIN (Tambahan: Cek status Verifikasi)
  async login(dto: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Email atau password salah.');

    const pwMatches = await bcrypt.compare(dto.password, user.password);
    if (!pwMatches) throw new UnauthorizedException('Email atau password salah.');

    // CEK: Jika belum verifikasi email, jangan kasih login!
    if (!user.isVerified) {
      throw new UnauthorizedException('Akun kamu belum diverifikasi. Silakan cek email.');
    }

    // Generate JWT Token
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwt.signAsync(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    };
  }
}
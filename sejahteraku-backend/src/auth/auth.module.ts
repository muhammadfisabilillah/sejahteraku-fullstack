import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MailerService } from '../mailer/mailer.service'; // Tambahkan ini

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'RAHASIA_NEGARA', // Pastikan konsisten
      signOptions: { expiresIn: '1d' }, // Saya ubah jadi 1d (1 hari) biar kamu gak sering relogin pas coding
    }),
  ],
  controllers: [AuthController],
  // Masukkan MailerService ke providers agar AuthService bisa memanggilnya
  providers: [AuthService, JwtStrategy, MailerService], 
})
export class AuthModule {}
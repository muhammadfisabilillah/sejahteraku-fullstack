import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendOTP(email: string, otp: string) {
    const mailOptions = {
      from: '"SejahteraKu" <noreply@sejahteraku.com>',
      to: email,
      subject: `Verify Your Account - ${otp}`,
      html: `<h1>Kode OTP kamu adalah: ${otp}</h1>`,
    };
    return this.transporter.sendMail(mailOptions);
  }
}
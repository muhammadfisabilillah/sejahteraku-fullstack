import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AiConsultantService } from './ai-consultant.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Pastikan guard kamu sudah benar lokasinya

@Controller('ai-consultant')
export class AiConsultantController {
  constructor(private readonly aiConsultantService: AiConsultantService) {}

  @UseGuards(JwtAuthGuard) // Satpam: Cek token JWT
  @Post('ask')
  async ask(@Body('question') question: string) {
    if (!question) {
      return { response: 'Tanya apa dulu nih? Masak pesannya kosong hehe.' };
    }
    return this.aiConsultantService.askAI(question);
  }
}
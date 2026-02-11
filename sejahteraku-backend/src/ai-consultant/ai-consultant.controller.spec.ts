import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AiConsultantService } from './ai-consultant.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai-consultant')
export class AiConsultantController {
  constructor(private readonly aiConsultantService: AiConsultantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('ask')
  async ask(@Request() req, @Body('question') question: string) {
    // Kita coba ambil sub ATAU userId untuk jaga-jaga
    const userId = req.user.sub || req.user.userId;
    
    console.log('User yang login:', req.user); // Ini buat debug di terminal
    
    return this.aiConsultantService.askAi(userId, question);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async history(@Request() req) {
    const userId = req.user.sub || req.user.userId;
    return this.aiConsultantService.getHistory(userId);
  }
}
import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('ai') // <--- Sekarang alamatnya jadi localhost:3000/ai
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('consult')
  async getConsultation(@Body() jobData: { title: string; description: string }) {
    // Memanggil logic AI dari service
    const advice = await this.appService.getAiAdvice(jobData.title, jobData.description);
    return { advice }; // Mengirim object { advice: "teks dari AI" }
  }
}
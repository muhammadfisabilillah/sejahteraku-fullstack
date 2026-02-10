import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service'; // Sesuaikan namanya jika AiService

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('consult')
  async getConsultation(@Body() jobData: { title: string; description: string }) {
    const advice = await this.aiService.getAiAdvice(jobData.title, jobData.description);
    return { advice };
  }
}
import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('consult')
  async getConsultation(@Body() body: { title: string; description: string }) {
    return this.aiService.generateCareerAdvice(body.title, body.description);
  }
}
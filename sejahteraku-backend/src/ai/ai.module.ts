import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  controllers: [AiController], // WAJIB ADA INI
  providers: [AiService],
})
export class AiModule {}
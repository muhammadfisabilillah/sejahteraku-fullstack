import { Controller, Post, Body, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('jobs')
export class JobsController {
  constructor(private prisma: PrismaService) {}

  @Post('publish')
  async publishJob(@Body() data: { position: string, requirements: string }) {
    return this.prisma.jobPosting.create({
      data: {
        position: data.position,
        requirements: data.requirements,
        companyId: "PASTI_ADA_ID_COMPANY_DI_DATABASE", // Kita perlu buat 1 data Company dulu di Prisma Studio
      },
    });
  }

  @Get()
  async getAllJobs() {
    return this.prisma.jobPosting.findMany({
      include: { company: true }
    });
  }
}
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  UseGuards, 
  BadRequestException 
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Pastikan path guard-mu benar

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  /**
   * 1. PUBLISH JOB
   * Endpoint: POST http://localhost:3000/jobs/publish
   * Fungsi: Membuat lowongan kerja baru di database
   */
  @UseGuards(JwtAuthGuard) // Satpam: Harus login untuk posting loker
  @Post('publish')
  async publishJob(@Body() data: any) {
    // Validasi sederhana sebelum dikirim ke service
    if (!data.position || !data.companyId) {
      throw new BadRequestException('Posisi dan Company ID wajib diisi!');
    }
    
    return this.jobsService.create(data);
  }

  /**
   * 2. GET ALL JOBS
   * Endpoint: GET http://localhost:3000/jobs
   * Fungsi: Mengambil semua lowongan untuk ditampilkan di Frontend Job Board
   */
  @Get()
  async getAllJobs() {
    try {
      return await this.jobsService.findAll();
    } catch (error) {
      throw new BadRequestException('Gagal mengambil data lowongan.');
    }
  }
}
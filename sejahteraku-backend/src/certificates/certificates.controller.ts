import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('certificates')
export class CertificatesController {
  constructor(private prisma: PrismaService) {}

  // Ambil sertifikat milik user tertentu
  @Get('user/:id')
  async getUserCertificates(@Param('id') id: string) {
    return this.prisma.certificate.findMany({
      where: { userId: Number(id) },
      include: { course: true } // Supaya tau sertifikat ini buat kursus apa
    });
  }
}
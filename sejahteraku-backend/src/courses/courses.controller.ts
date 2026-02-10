import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('courses')
export class CoursesController {
  constructor(private prisma: PrismaService) {}

  // Menampilkan semua pelatihan di Skill Academy
  @Get()
  async getAllCourses() {
    return this.prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  // Menambah pelatihan baru lewat API (Opsional)
  @Post()
  async createCourse(@Body() data: any) {
    return this.prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        mentor: data.mentor,
        duration: data.duration,
        level: data.level,
      }
    });
  }
}
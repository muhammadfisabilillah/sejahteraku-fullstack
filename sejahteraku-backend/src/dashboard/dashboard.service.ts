import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getOverviewData(userId: number) {
    // 1. Ambil data User & Gunakan _count untuk menghitung relasi
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            certificates: true,
            applications: true,
          },
        },
      },
    });

    // 2. Ambil 2 Kursus terbaru
    const recentCourses = await this.prisma.course.findMany({
      take: 2,
      orderBy: { createdAt: 'desc' }
    });

    // 3. Ambil 3 Lowongan Kerja terbaru
    const upcomingJobs = await this.prisma.jobPosting.findMany({
      take: 3,
      include: { company: true },
      orderBy: { postedAt: 'desc' }
    });

    // Ambil hasil count dari objek _count
    const certificateCount = user?._count?.certificates ?? 0;
    
    return {
      user: {
        name: user?.name || 'User',
        rank: certificateCount > 5 ? "Platinum Tier" : "Gold Tier"
      },
      stats: {
        progress: certificateCount * 20 > 100 ? 100 : certificateCount * 20,
        hours: 32.5,
        growth: 12,
      },
      recentCourses: recentCourses.map(c => ({
        id: c.id,
        title: c.title,
        instructor: c.mentor,
        thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop"
      })),
      upcomingJobs: upcomingJobs.map(j => ({
        id: j.id,
        title: j.position,
        company: j.company.name
      }))
    };
  }
}
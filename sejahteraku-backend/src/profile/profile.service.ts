import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async updateProfile(userId: number, data: { bio?: string; skills?: string; education?: string }) {
    return this.prisma.userProfile.upsert({
      where: { userId: userId },
      update: data,
      create: {
        ...data,
        userId: userId,
      },
    });
  }

  async getProfile(userId: number) {
    return this.prisma.userProfile.findUnique({
      where: { userId: userId },
      include: {
        user: {
          select: {
            email: true,
            name: true,
            phone: true,
          },
        },
      },
    });
  }
}
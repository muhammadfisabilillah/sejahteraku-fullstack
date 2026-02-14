import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyProfile(userId: any) {
    const id = Number(userId);
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true }, // WAJIB biar avatar ID 7 ketarik
    });
  }

  async updateProfile(userId: any, data: any) {
    const id = Number(userId);
    const pData = {
      skills: data.skills || "",
      bio: data.bio || "",
      avatar: data.avatar, // Simpan nama file (misal: avatar-177...jpeg)
      cv: data.cv,
    };

    return this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        profile: {
          upsert: { create: pData, update: pData },
        },
      },
      include: { profile: true },
    });
  }
}
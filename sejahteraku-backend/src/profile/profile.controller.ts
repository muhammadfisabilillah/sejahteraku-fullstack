import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async handleUpdateProfile(
    @Request() req, 
    @Body() body: { bio?: string; skills?: string; education?: string }
  ) {
    // Ambil ID dari token JWT
    const userId = req.user.userId || req.user.sub;
    return this.profileService.updateProfile(Number(userId), body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async handleGetProfile(@Request() req) {
    const userId = req.user.userId || req.user.sub;
    return this.profileService.getProfile(Number(userId));
  }
}
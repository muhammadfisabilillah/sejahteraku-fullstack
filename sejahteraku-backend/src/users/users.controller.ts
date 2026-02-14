import { Controller, Get, Post, Body, UseGuards, Request, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // --- INI PINTU BUAT NARIK DATA (GET) ---
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.getMyProfile(req.user.userId);
  }

  // --- INI PINTU BUAT SIMPAN DATA (POST) ---
  @UseGuards(AuthGuard('jwt'))
  @Post('update-profile')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async updateProfile(@Request() req, @Body() body: any, @UploadedFiles() files: any) {
    const avatar = files?.avatar ? files.avatar[0].filename : undefined;
    const cv = files?.cv ? files.cv[0].filename : undefined;

    return this.usersService.updateProfile(req.user.userId, { ...body, avatar, cv });
  }
}
import { 
  Controller, 
  Post, 
  Get, 
  UseInterceptors, 
  UploadedFile, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('history')
  async getHistory(@Request() req) {
    return this.chatService.getChatHistory(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload-review-cv')
  @UseInterceptors(FileInterceptor('cv', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `chat-review-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadAndReview(@Request() req, @UploadedFile() file: Express.Multer.File) {
    if (!file) return { response: "Mana filenya Bos?" };
    return this.chatService.processAndReviewCV(req.user.userId, file.path);
  }
}
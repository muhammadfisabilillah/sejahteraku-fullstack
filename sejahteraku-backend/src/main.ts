import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // --- KUNCI JAWABAN: BUKA AKSES FOLDER UPLOADS ---
  // Kita arahin ke folder uploads di root project lo
  const uploadPath = join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadPath));
  
  console.log(`📂 Folder uploads resmi dibuka di: ${uploadPath}`);

  await app.listen(3000);
  console.log(`🚀 Backend SejahteraKu jalan di: http://localhost:3000`);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Mengaktifkan izin akses agar Frontend bisa chat ke AI
  app.enableCors({
    origin: '*', // Izinkan semua koneksi
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
  console.log(`🚀 Backend SejahteraKu jalan di: http://localhost:3000`);
}
bootstrap();

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
// Pastikan lo sudah install: npm install pdf-parse-fork
const pdf = require('pdf-parse-fork');

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async processAndReviewCV(userId: number, filePath: string) {
    try {
      // 1. Ambil data User dari database
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true }
      });
      if (!user) throw new NotFoundException('User identity not found');

      // 2. Ekstrak FULL TEXT dari PDF
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(dataBuffer);
      // Bersihkan teks dari baris baru yang berantakan
      const fullText = pdfData.text.replace(/\s+/g, ' ').trim(); 

      // 3. LOGIC ANALISIS REAL (Deteksi Tech Stack Asli)
      const techStack: string[] = []; // FIX: Explicit type string[]
      
      const keywords = [
        { key: 'react', label: 'React.js' },
        { key: 'nest', label: 'NestJS' },
        { key: 'postgres', label: 'PostgreSQL' },
        { key: 'typescript', label: 'TypeScript' },
        { key: 'tailwind', label: 'Tailwind CSS' },
        { key: 'prisma', label: 'Prisma ORM' },
        { key: 'next', label: 'Next.js' },
        { key: 'node', label: 'Node.js' },
      ];

      keywords.forEach(item => {
        if (fullText.toLowerCase().includes(item.key)) {
          techStack.push(item.label);
        }
      });

      // 4. KONSTRUKSI JAWABAN BERDASARKAN ISI CV
      let analysisResult = `Halo ${user.name}! Oracle AI sudah selesai membedah CV lo.\n\n`;
      
      if (techStack.length > 0) {
        analysisResult += `🚀 **Tech Stack Terdeteksi:** Gue nemu lo punya pengalaman di **${techStack.join(', ')}**. Ini stack yang solid buat Fullstack Engineer!\n\n`;
      } else {
        analysisResult += `⚠️ **Peringatan:** Gue nggak nemu tech stack spesifik di dokumen lo. Saran gue, list framework yang lo kuasai dengan jelas, jangan cuma "Web Development".\n\n`;
      }

      // Kasih preview isi CV biar user tau kita beneran baca
      analysisResult += `📝 **Cuplikan Dokumen:** "${fullText.substring(0, 200)}..."\n\n`;
      
      analysisResult += `💡 **Rekomendasi:** Berdasarkan role lo sebagai ${user.profile?.skills || 'Developer'}, pastikan portofolio lo sinkron dengan stack yang gue temukan di atas.`;

      // 5. SIMPAN KE DATABASE (BIAR NEMPEL PAS REFRESH)
      await this.prisma.chatHistory.create({
        data: {
          userId: userId,
          message: `[Review CV PDF: ${user.profile?.cv || 'Latest_Upload'}]`,
          response: analysisResult
        }
      });

      return { response: analysisResult };
    } catch (error) {
      console.error("Critical Error:", error);
      return { response: "Oracle AI: Gagal total membedah PDF. Pastikan filenya bukan hasil scan foto!" };
    }
  }

  // Fungsi untuk ambil history chat
  async getChatHistory(userId: number) {
    return this.prisma.chatHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AppService {
  // Kita tambahkan "as string" agar TypeScript tidak protes soal undefined
  private genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY as string);

  async getAiAdvice(title: string, description: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Berikan saran singkat dan sangat profesional untuk pelamar kerja posisi ${title} dengan deskripsi: ${description}. Maksimal 2 kalimat saja.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error(error);
      return "Gagal terhubung ke Google AI. Cek apakah API Key di .env sudah benar!";
    }
  }
}
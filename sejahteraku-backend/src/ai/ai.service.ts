import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

constructor() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Waduh Bos, GEMINI_API_KEY lupa dipasang di .env!');
  }
  this.genAI = new GoogleGenerativeAI(apiKey);
}
  async generateCareerAdvice(jobTitle: string, jobDescription: string) {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Kamu adalah Mentor Karir AI dari aplikasi "SejahteraKu".
        Tugasmu memberikan saran singkat dan motivasi untuk pelamar kerja.
        
        Lowongan: ${jobTitle}
        Deskripsi: ${jobDescription}
        
        Berikan respon dalam format:
        1. Analisis singkat kecocokan (1 kalimat).
        2. Tips utama agar lolos (2 poin saja).
        3. Kalimat penyemangat.
        
        Gunakan Bahasa Indonesia yang profesional tapi tetap akrab.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return {
        status: 'success',
        advice: response.text(),
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Aduh, otak AI-nya lagi loading, coba lagi nanti ya!',
      };
    }
  }
}
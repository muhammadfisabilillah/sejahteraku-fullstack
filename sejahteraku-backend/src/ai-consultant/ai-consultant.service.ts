import { Injectable } from '@nestjs/common';
import { Groq } from 'groq-sdk'; // Pastikan sudah install: npm install groq-sdk

@Injectable()
export class AiConsultantService {
  private groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // Ambil API Key dari .env
  });

  async askAI(question: string) {
    try {
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `
              Nama kamu adalah SejahteraKu AI. 
              Kamu adalah konsultan karir profesional yang asik, cerdas, dan suportif.
              
              ATURAN BICARA:
              1. Gunakan Bahasa Indonesia yang santai tapi sopan (panggil "kamu" atau "bro/sis").
              2. JANGAN KAKU. Gunakan emoji sesekali agar lebih ramah (😊, 🚀, 💡).
              3. FORMAT JAWABAN: Selalu gunakan poin-poin atau list jika memberikan langkah-langkah agar rapi.
              4. Gunakan bold (**) untuk kata-kata penting.
              5. Berikan jawaban yang solutif, tajam, dan memotivasi.
            `,
          },
          {
            role: 'user',
            content: question,
          },
        ],
        model: 'llama3-8b-8192', // Model yang cepat dan pinter
        temperature: 0.7, // Biar lebih kreatif dan gak kaku
      });

      return {
        response: chatCompletion.choices[0]?.message?.content || 'Aduh, otak aku lagi nge-blank nih. Coba tanya lagi ya!',
      };
    } catch (error) {
      console.error('Error Groq:', error);
      return { response: 'Maaf Muhammad, aku lagi gangguan koneksi ke server pusat.' };
    }
  }
}
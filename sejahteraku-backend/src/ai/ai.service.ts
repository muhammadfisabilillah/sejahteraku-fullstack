import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async getAiAdvice(title: string, description: string): Promise<string> {
    // Simulasi Mentor Profesional (Tanpa Error Google!)
    const advices: Record<string, string> = {
      "Backend Developer": "Kuasai arsitektur Microservices dan optimasi database PostgreSQL untuk skala besar. Jangan lupa pelajari Redis untuk caching!",
      "Frontend Engineer": "Fokus pada performa Core Web Vitals dan perdalam penggunaan Framer Motion untuk animasi yang lebih 'smooth' dan premium.",
      "DevOps Engineer": "Pelajari Kubernetes dan Terraform untuk otomasi infrastruktur. Sertifikasi AWS atau Google Cloud akan sangat meningkatkan nilai jualmu."
    };

    // Delay sedikit agar terasa seperti AI asli yang sedang berpikir
    await new Promise(resolve => setTimeout(resolve, 800));

    return advices[title] || `Untuk posisi ${title}, bangun portofolio GitHub yang kuat dan fokus pada fundamental bahasa pemrograman yang digunakan.`;
  }
}
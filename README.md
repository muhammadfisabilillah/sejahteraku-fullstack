# <p align="center">🌾 SEJAHTERAKU: FULLSTACK AI CAREER PLATFORM 🌾</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq_AI-f3ac00?style=for-the-badge&logo=google-gemini&logoColor=white" />
</p>

---

## 🇮🇩 Deskripsi Proyek
**SejahteraKu** adalah mahakarya *Fullstack* yang menggabungkan ketenangan visual alam Indonesia (Persawahan) dengan kecanggihan kecerdasan buatan. Platform ini dirancang untuk membantu talenta lokal menemukan jalan kariernya dengan cara yang lebih manusiawi, transparan, dan tidak kaku.

---

## 🎯 Struktur Utama Landing Page (500+ Lines Logic)
Proyek ini mengimplementasikan struktur landing page profesional dalam satu halaman tunggal (`page.tsx`) yang meliputi:
1.  **Hero Section:** Visual persawahan (`/hero-image.jpg`) dengan headline yang "meledak".
2.  **Unique Selling Proposition (USP):** Alasan kenapa AI kami lebih "encer" dibanding yang lain.
3.  **Benefits & Features:** Penjelasan fitur Roadmap Karier dan Skill Academy.
4.  **Social Proof:** Testimoni nyata dari pengguna yang sudah sukses.
5.  **Lead Capture:** Formulir pendaftaran untuk mendapatkan E-book gratis.
6.  **FAQ:** Jawaban santai untuk pertanyaan yang sering muncul.
7.  **Footer:** Navigasi minimalis dan informasi kontak.

---

## 💻 Tech Stack Detail

### 🎨 Frontend (Client Side)
* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS dengan kustomisasi **Glassmorphism**.
* **Icons:** Lucide React.
* **Fitur Unggulan:** Chatbot transparan yang tembus pandang ke background sawah menggunakan `backdrop-filter: blur`.

### 🧠 Backend (Server Side)
* **Framework:** NestJS (TypeScript).
* **Database:** SQLite dengan **Prisma ORM**.
* **AI Engine:** Groq Cloud SDK (Llama 3 8B) untuk respon konsultasi kilat.
* **Authentication:** Passport JWT dengan sistem *Silent Login*.

---

## ⚙️ Cara Menjalankan (Local Setup)

### 1. Persiapan Database & Backend
```bash
cd sejahteraku-backend
npm install
# Buat file .env dan isi API Key Groq kamu
npx prisma migrate dev --name init
npm run start:dev

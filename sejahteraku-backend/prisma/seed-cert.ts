import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("🚀 Memulai proses seeding...");

  // 1. Pastikan User ID 1 ada
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: "muhammad@sejahteraku.com",
      password: "password123", // Hanya untuk testing
      name: "Muhammad",
      role: "USER"
    },
  });
  console.log("✅ User siap:", user.email);

  // 2. Pastikan Course ID 1 ada
  const course = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "MASTERING_NEXTJS_V1",
      description: "Slicing premium design with Framer Motion.",
      mentor: "Sabil Muhammad",
      duration: "12_HOURS",
      level: "ADVANCED",
    },
  });
  console.log("✅ Course siap:", course.title);

  // 3. Sekarang buat sertifikatnya
  const newCert = await prisma.certificate.create({
    data: {
      userId: 1, 
      courseId: 1,
    },
  });

  console.log("✨ SERTIFIKAT BERHASIL DIBUAT:", newCert.id);
}

main()
  .catch((e) => {
    console.error("❌ Gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
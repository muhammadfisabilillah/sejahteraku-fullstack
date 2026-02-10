import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.course.create({
    data: {
      title: "MASTERING_NEXTJS_V1",
      description: "Slicing premium design with Framer Motion.",
      mentor: "Sabil Muhammad",
      duration: "12_HOURS",
      level: "ADVANCED",
    },
  })
  console.log("Data Berhasil Masuk, Bos!")
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
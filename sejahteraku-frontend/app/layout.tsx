import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

// Font untuk heading - elegant & sophisticated
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '700', '900']
});

// Font untuk body - clean & modern
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700']
});

export const metadata: Metadata = {
  title: "SejahteraKu - Wujudkan Karier Impianmu",
  description: "Ekosistem karier digital yang inklusif dan humanis. Platform terpercaya untuk mengembangkan karier dan skill profesional Anda.",
  keywords: ["karier", "lowongan kerja", "pelatihan", "sertifikasi", "konsultasi karier"],
  authors: [{ name: "SejahteraKu Team" }],
  openGraph: {
    title: "SejahteraKu - Wujudkan Karier Impianmu",
    description: "Ekosistem karier digital yang inklusif dan humanis.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
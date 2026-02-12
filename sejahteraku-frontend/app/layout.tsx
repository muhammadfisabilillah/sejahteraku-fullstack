import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

// Font untuk heading - elegant & timeless
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  display: 'swap',
});

// Font untuk body - clean & readable
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SejahteraKu - Wujudkan Masa Depan yang Sejahtera",
  description: "Platform pelatihan skill dan lowongan kerja untuk seluruh Indonesia. Dapatkan sertifikat terverifikasi dan akses langsung ke peluang karier impianmu. Gratis untuk semua!",
  keywords: [
    "lowongan kerja",
    "pelatihan skill",
    "sertifikat online",
    "karier Indonesia",
    "program magang",
    "fresh graduate",
    "upskilling",
    "reskilling",
    "peluang kerja",
    "sejahteraku"
  ],
  authors: [{ name: "SejahteraKu Team" }],
  creator: "SejahteraKu",
  publisher: "SejahteraKu",
  
  // Open Graph (untuk social media sharing)
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sejahteraku.id",
    siteName: "SejahteraKu",
    title: "SejahteraKu - Wujudkan Masa Depan yang Sejahtera",
    description: "Platform pelatihan skill dan lowongan kerja untuk seluruh Indonesia. Gratis untuk semua!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SejahteraKu - Platform Karier Indonesia",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "SejahteraKu - Wujudkan Masa Depan yang Sejahtera",
    description: "Platform pelatihan skill dan lowongan kerja untuk seluruh Indonesia. Gratis untuk semua!",
    images: ["/og-image.jpg"],
    creator: "@sejahteraku",
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // other: "your-other-verification-code",
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },

  // Manifest
  manifest: '/manifest.json',

  // App-specific metadata
  applicationName: "SejahteraKu",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SejahteraKu",
  },

  // Format detection
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // Category
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Additional meta tags */}
        <meta name="theme-color" content="#f59e0b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
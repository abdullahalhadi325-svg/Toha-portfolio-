import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';
import { ReactNode } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { PortfolioProvider } from '../hooks/usePortfolioData';
import Navbar from '../components/Navbar';
import ScrollProgressBar from '../components/ScrollProgressBar';
import LoginModal from '../components/LoginModal';
import AdminPanel from '../components/AdminPanel';
import '../src/index.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-bengali',
});

export const viewport: Viewport = {
  themeColor: '#0A0A0C',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Toha Al-Mahmudu | Creative Technologist • Researcher • Writer",
  description:
    "Official portfolio of Toha Al-Mahmudu from Moulvibazar. Intersecting intelligent systems, computational engineering, media production, and philosophical essays.",
  keywords: [
    'Toha Al-Mahmudu',
    'Creative Technologist',
    'Researcher',
    'Writer',
    'Moulvibazar',
    'VYROX',
    'Artificial Intelligence',
    'Digital Systems',
    'Media Production',
    'Cybersecurity',
    'Bengali Technologist',
  ],
  authors: [{ name: 'Toha Al-Mahmudu', url: 'https://youtube.com/@tohaalmahmudi001?si=aaFI0H53C64bezQI' }],
  creator: 'Toha Al-Mahmudu',
  publisher: 'Toha Al-Mahmudu',
  metadataBase: new URL('https://ais-dev-23cniv44py3imltz6xd3qa-549688366842.asia-southeast1.run.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    url: '/',
    title: 'Toha Al-Mahmudu | Creative Technologist • Researcher • Writer',
    description:
      "Think Deeper. Create Fearlessly. Shape What's Next. Cinematic bilingual portfolio bridging computational exploration, critical inquiry, and narrative craft.",
    siteName: 'Toha Al-Mahmudu Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toha Al-Mahmudu | Creative Technologist',
    description: "Think Deeper. Create Fearlessly. Shape What's Next.",
    creator: '@tohaalmahmudi001',
  },
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
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${notoSansBengali.variable}`}
    >
      <body className="bg-[#0A0A0C] bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] text-[#EAEAEA] antialiased selection:bg-[#C5A880]/20 selection:text-[#C5A880] min-h-screen">
        <ScrollProgressBar />
        <LanguageProvider>
          <PortfolioProvider>
            <div className="relative flex min-h-screen flex-col bg-[#0A0A0C]">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
            <LoginModal />
            <AdminPanel />
          </PortfolioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

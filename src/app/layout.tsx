import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

export const metadata: Metadata = {
  title: 'História Intelectual',
  description: 'Pesquisa e Extensão',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${isMaintenance ? '' : 'pt-20'} bg-background text-text`}
      >
        {!isMaintenance && <Header />}
        <main className="min-h-screen">{children}</main>
        {!isMaintenance && <Footer />}
      </body>
    </html>
  );
}

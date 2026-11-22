// src/app/layout.tsx

import type { Metadata } from 'next';
import { Merriweather, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainWrapper from '@/components/MainWrapper';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'História Intelectual | Pesquisa e Extensão',
    template: '%s | História Intelectual',
  },
  description:
    'Pesquisa e Extensão — Catálogo editorial de acesso aberto em História Intelectual (UFMG / Selo Cronópios).',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'História Intelectual',
    title: 'História Intelectual | Pesquisa e Extensão',
    description:
      'Pesquisa e Extensão — Catálogo editorial de acesso aberto em História Intelectual (UFMG / Selo Cronópios).',
    images: [
      {
        url: '/logo-600.png',
        width: 600,
        height: 200,
        alt: 'Logo História Intelectual: Pesquisa e Extensão (UFMG)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo-600.png'],
    title: 'História Intelectual | Pesquisa e Extensão',
    description:
      'Pesquisa e Extensão — Catálogo editorial de acesso aberto em História Intelectual (UFMG / Selo Cronópios).',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${merriweather.variable} ${roboto.variable}`}
    >
      <body className="bg-background text-text">
        <Header />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </body>
    </html>
  );
}

// src/app/busca/page.tsx
import { Suspense } from 'react';
import BuscaClient from '@/app/busca/BuscaClient';
import { getEbooks } from '@/lib/acervo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Busca',
  robots: 'noindex, nofollow',
};

export default function PageBusca() {
  const ebooks = getEbooks();

  return (
    <main>
      <Suspense
        fallback={
          <div className="p-8 text-center">Carregando resultados...</div>
        }
      >
        <BuscaClient ebooks={ebooks} />
      </Suspense>
    </main>
  );
}

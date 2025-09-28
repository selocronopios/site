import { Suspense } from 'react';
import BuscaClient from '@/app/busca/BuscaClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Busca',
  robots: 'noindex, nofollow',
};

export default function PageBusca() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="p-8 text-center">Carregando resultados...</div>
        }
      >
        <BuscaClient />
      </Suspense>
    </main>
  );
}

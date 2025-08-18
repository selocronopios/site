import { Suspense } from 'react';
import BuscaClient from '@/app/busca/BuscaClient';

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

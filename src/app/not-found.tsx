// src/app/not-found.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getColecoes, getEbooks } from '@/lib/acervo';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  description:
    'O endereço acessado não foi encontrado. Explore o acervo do portal História Intelectual (UFMG).',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const todasColecoes = getColecoes();
  const livros = getEbooks();

  const colecoesAtivas = todasColecoes
    .filter((col) => !col.parentCollection)
    .filter((col) => {
      const idsSubcolecoes = todasColecoes
        .filter((sub) => sub.parentCollection === col.id)
        .map((sub) => sub.id);

      return livros.some(
        (livro) =>
          livro.collection === col.id ||
          idsSubcolecoes.includes(livro.collection)
      );
    });

  return (
    <main>
      <div className="bg-background p-8 max-w-4xl mx-auto px-4 py-16 space-y-10 text-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Erro 404
          </p>
          <h1 className="heading-h1 text-text">Página não encontrada</h1>
          <p className="body text-gray-700 max-w-xl mx-auto">
            O conteúdo que você procura pode ter sido movido, renomeado ou o
            endereço digitado está incorreto.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/selo-cronopios/acervo" className="btn">
            Ir para o acervo
          </Link>
          <Link
            href="/selo-cronopios/publique-conosco"
            className="font-roboto font-semibold text-button border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/10 transition-colors"
          >
            Publique conosco
          </Link>
        </div>

        {colecoesAtivas.length > 0 && (
          <section className="pt-8 border-t border-gray-200 space-y-4">
            <h2 className="heading-h3 text-text">
              Explorar coleções disponíveis
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {colecoesAtivas.map((col) => (
                <Link
                  key={col.id}
                  href={`/selo-cronopios/acervo/${col.id}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-text shadow-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {col.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

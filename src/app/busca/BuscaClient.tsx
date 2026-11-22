// src/app/busca/BuscaClient.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Ebook } from '@/lib/acervo';

const porPagina = 12;

function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

interface BuscaClientProps {
  ebooks: Ebook[];
}

export default function BuscaClient({ ebooks }: BuscaClientProps) {
  const searchParams = useSearchParams();
  const queryBruta = searchParams.get('query')?.trim() || '';
  const queryNormalizada = normalizarTexto(queryBruta);

  const [ordem, setOrdem] = useState<'alfabetica' | 'created_at'>('alfabetica');
  const [paginaAtual, setPaginaAtual] = useState(1);

  const resultados = useMemo(() => {
    if (!queryNormalizada) return [];

    return ebooks.filter((ebook) => {
      const campos = [
        ebook.title,
        ebook.subtitle ?? '',
        ebook.collectionName,
        ...ebook.authors,
        ...ebook.keywords,
      ];
      return campos.some((campo) =>
        normalizarTexto(campo).includes(queryNormalizada)
      );
    });
  }, [ebooks, queryNormalizada]);

  const livrosOrdenados = useMemo(() => {
    return [...resultados].sort((a, b) => {
      if (ordem === 'alfabetica') {
        return a.title.localeCompare(b.title, 'pt-BR');
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }, [resultados, ordem]);

  const totalPaginas = Math.ceil(livrosOrdenados.length / porPagina);
  const paginaSegura = Math.min(paginaAtual, Math.max(1, totalPaginas));
  const inicio = (paginaSegura - 1) * porPagina;
  const livrosPagina = livrosOrdenados.slice(inicio, inicio + porPagina);

  return (
    <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
      <h1 className="text-2xl font-bold mb-6">
        Resultados para &ldquo;{queryBruta}&rdquo;
      </h1>

      {resultados.length === 0 && (
        <p className="text-center text-gray-600">
          Nenhum resultado encontrado.
        </p>
      )}

      {resultados.length > 0 && (
        <>
          <div className="flex justify-end">
            <select
              value={ordem}
              onChange={(e) => {
                setOrdem(e.target.value as 'alfabetica' | 'created_at');
                setPaginaAtual(1);
              }}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="alfabetica">Ordenar por título (A-Z)</option>
              <option value="created_at">Ordenar por data de adição</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 py-8">
            {livrosPagina.map((livro) => (
              <Link
                key={livro.id}
                href={`/selo-cronopios/acervo/ebooks/${livro.id}`}
              >
                <div className="p-4 flex flex-col items-center">
                  <img
                    src={livro.cover}
                    alt={livro.title}
                    className="w-48 h-full object-cover rounded mb-2"
                  />
                  <span className="text-sm text-center font-medium text-text">
                    {livro.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPaginas }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPaginaAtual(i + 1)}
                  className={`px-4 py-2 border rounded ${
                    paginaSegura === i + 1
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

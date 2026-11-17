'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Ebook } from '@/lib/acervo';

const porPagina = 12;

interface CatalogoGridProps {
  livros: Ebook[];
  mensagemVazio?: string;
}

export default function CatalogoGrid({
  livros,
  mensagemVazio = 'Em breve novos títulos serão publicados no catálogo.',
}: CatalogoGridProps) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordem, setOrdem] = useState<'alfabetica' | 'created_at'>('alfabetica');

  if (livros.length === 0) {
    return <p className="text-center text-gray-600 py-12">{mensagemVazio}</p>;
  }

  const livrosOrdenados = [...livros].sort((a, b) => {
    if (ordem === 'alfabetica') {
      return a.title.localeCompare(b.title, 'pt-BR');
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const totalPaginas = Math.ceil(livrosOrdenados.length / porPagina);
  const inicio = (paginaAtual - 1) * porPagina;
  const livrosPagina = livrosOrdenados.slice(inicio, inicio + porPagina);

  return (
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
          <Link key={livro.id} href={`/ebooks/${livro.id}`}>
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
                paginaAtual === i + 1
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
  );
}

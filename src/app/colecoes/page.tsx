'use client';

import ColecoesCarousel from '@/components/ColecoesCarousel';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Livro {
  id: string;
  title: string;
  link: string;
  created_at: string;
}

const porPagina = 12;

export default function Page() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordem, setOrdem] = useState<'alfabetica' | 'created_at'>('alfabetica');
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        setCarregando(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/ebooks`
        );
        if (!res.ok) throw new Error('Erro ao buscar livros.');
        const data = await res.json();
        setLivros(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setCarregando(false);
      }
    };

    fetchLivros();
  }, []);

  const ordenarLivros = (livrosParam: Livro[]) => {
    if (ordem === 'alfabetica') {
      return [...livrosParam].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return [...livrosParam].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  };
  const livrosOrdenados = ordenarLivros(livros);
  const totalPaginas = Math.ceil(livrosOrdenados.length / porPagina);
  const inicio = (paginaAtual - 1) * porPagina;
  const livrosPagina = livrosOrdenados.slice(inicio, inicio + porPagina);

  if (carregando) {
    return (
      <main className="p-8 flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const urlImagem = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publico/`;

  return (
    <main>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded">
            {error}
          </div>
        )}
        <ColecoesCarousel />
        <div className="flex justify-end">
          <select
            value={ordem}
            onChange={(e) => {
              setOrdem(e.target.value as 'alfabetica' | 'created_at');
              setPaginaAtual(1); // reseta pra página 1
            }}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="alfabetica">Ordenar por título (A-Z)</option>
            <option value="created_at">Ordenar por data de adição</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-6 px-4 py-8">
          {livrosPagina.map((livro, i) => (
            <Link key={i} href={`/ebooks/${livro.id}`}>
              <div className="p-4 flex flex-col items-center">
                <img
                  src={`${urlImagem}${livro.link}`}
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
        {/* Paginação */}
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
      </div>
    </main>
  );
}

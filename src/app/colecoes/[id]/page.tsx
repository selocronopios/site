'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Body } from '@/components/Typography';

interface Colecao {
  id: string;
  name: string;
  description: string;
}

interface Ebook {
  id: string;
  title: string;
  link: string;
  created_at: string;
}

const porPagina = 12;

export default function ColecaoPage() {
  const params = useParams();
  const id = params?.id as string;

  const [colecao, setColecao] = useState<Colecao | null>(null);
  const [ebooks, setEbook] = useState<Ebook[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordem, setOrdem] = useState<'alfabetica' | 'created_at'>('alfabetica');
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchColecao = async () => {
      try {
        const res = await fetch(`/api/collections/${id}`);
        if (!res.ok) throw new Error('Erro ao busca Coleção');
        const data = await res.json();
        setColecao(data);

        const resEbooks = await fetch(`/api/collections/${id}/usage`);
        if (!resEbooks.ok) throw new Error('Erro ao consultar ebooks');
        const dataEbooks = await resEbooks.json();
        setEbook(dataEbooks.ebooks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };
    fetchColecao();
  }, [id]);

  const ordenarEbooks = (ebooksParam: Ebook[]) => {
    if (ordem === 'alfabetica') {
      return [...ebooksParam].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return [...ebooksParam].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  };

  const ebooksOrdenados = ordenarEbooks(ebooks);
  const totalPaginas = Math.ceil(ebooksOrdenados.length / porPagina);
  const inicio = (paginaAtual - 1) * porPagina;
  const ebooksPagina = ebooksOrdenados.slice(inicio, inicio + porPagina);

  if (loading) return <p>Carregando...</p>;
  if (error) return <div>Erro: {error}</div>;
  if (!colecao) return <div>Coleção não encontrada!</div>;

  const urlImagem = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publico/`;

  return (
    <main>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded">
            {error}
          </div>
        )}
        <h1 className="heading-h1 text-primary text-center">{colecao.name}</h1>
        {/* <Body className="mt-4">{colecao.description}</Body> */}
        <div className="flex justify-end">
          <select
            value={ordem}
            onChange={(e) => {
              setOrdem(e.target.value as 'alfabetica' | 'created_at');
              setPaginaAtual(1);
            }}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="alfabetica">Ordem por título (A-Z)</option>
            <option value="created_at">Ordenar por data de adição</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-6 px-4 py-8">
          {ebooksPagina.map((ebooks, id) => (
            <Link key={id} href={`/ebooks/${ebooks.id}`}>
              <div className="p-4 flex flex-col items-center">
                <img
                  src={`${urlImagem}${ebooks.link}`}
                  alt={ebooks.title}
                  className="w-48 h-full object-cover rounded mb-2"
                />
                <span className="text-sm text-center font-medium text-text">
                  {ebooks.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
        {/* Paginação */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPaginas }, (_, id) => (
            <button
              key={id}
              onClick={() => setPaginaAtual(id + 1)}
              className={`px-4 py-2 border rounded ${
                paginaAtual === id + 1
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {id + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

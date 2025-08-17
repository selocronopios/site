'use client';

import { useEffect, useState } from 'react';

interface Ebook {
  id: string;
  title: string;
  // coloque os campos reais que você tiver no ebook
}

interface Colecao {
  id: string;
  name: string;
  ebooks: Ebook[];
  // coloque os outros campos da coleção que a sua API retorna
}

export function useColecoes() {
  const [colecoes, setColecoes] = useState<Colecao[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchColecoes = async () => {
      try {
        const res = await fetch(`/api/collections`);
        if (!res.ok) throw new Error('Erro ao buscar coleções.');

        const data: Colecao[] = await res.json();

        const colecoesComLivros = data.filter(
          (colecao) =>
            Array.isArray(colecao.ebooks) && colecao.ebooks.length > 0
        );

        setColecoes(colecoesComLivros);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setCarregando(false);
      }
    };
    fetchColecoes();
  }, []);

  return { colecoes, carregando, error };
}

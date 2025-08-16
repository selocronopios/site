'use client';

import { useEffect, useState } from 'react';

export function useColecoes() {
  const [colecoes, setColecoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchColecoes = async () => {
      try {
        const res = await fetch(`/api/collections`);
        if (!res.ok) throw new Error('Erro ao buscar coleções.');
        const data = await res.json();
        const colecoesComLivros = data.filter(
          (colecoes: any) =>
            Array.isArray(colecoes.ebooks) && colecoes.ebooks.length > 0
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

  return { colecoes, carregando };
}

'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Colecoes {
  id: string;
  name: string;
  temEbooks: boolean;
}

interface ApiColecao {
  id: string;
  name: string;
  ebooks?: unknown[];
}

export default function ColecoesCarousel() {
  const [colecoes, setColecoes] = useState<Colecoes[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 'auto', spacing: 16 },
  });

  useEffect(() => {
    const fetchColecoes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/collections`
        );
        if (!res.ok) throw new Error('Erro ao buscar coleções.');

        const data: ApiColecao[] = await res.json();

        const colecoesComLivros: Colecoes[] = data.map((colecao) => ({
          id: colecao.id,
          name: colecao.name,
          temEbooks: Array.isArray(colecao.ebooks) && colecao.ebooks.length > 0,
        }));

        setColecoes(colecoesComLivros);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setCarregando(false);
      }
    };
    fetchColecoes();
  }, []);

  const prev = () => instanceRef.current?.prev();
  const next = () => instanceRef.current?.next();

  if (carregando) {
    return (
      <main className="p-8 flex justify-center items-center min-h-[200px]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }
  if (error) return <p className="px-4 text-red-600">Erro: {error}</p>;

  return (
    <div className="w-full flex items-center gap-4 px-4 py-2">
      {/* Botão anterior */}
      <button
        onClick={prev}
        className="bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Carrossel */}
      <div ref={sliderRef} className="keen-slider flex-1">
        {colecoes.map(({ id, name, temEbooks }, index) =>
          temEbooks ? (
            <Link
              key={id ?? index}
              href={`/colecoes/${id}`}
              className="keen-slider__slide min-w-[150px] bg-primary text-white font-medium rounded p-4 shadow text-left flex items-center hover:bg-primary/80 transition"
            >
              {name}
            </Link>
          ) : (
            <div
              key={id ?? index}
              className="keen-slider__slide min-w-[150px] bg-gray-300 text-gray-600 font-medium rounded p-4 shadow text-left flex items-center cursor-not-allowed"
            >
              {name}
            </div>
          )
        )}
      </div>

      {/* Botão próximo */}
      <button
        onClick={next}
        className="bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

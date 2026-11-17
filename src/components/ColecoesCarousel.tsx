'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface ColecaoCarouselItem {
  id: string;
  name: string;
  temEbooks: boolean;
  subcolecoesCount?: number;
}

interface ColecoesCarouselProps {
  colecoes: ColecaoCarouselItem[];
}

export default function ColecoesCarousel({ colecoes }: ColecoesCarouselProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 'auto', spacing: 16 },
  });

  const prev = () => instanceRef.current?.prev();
  const next = () => instanceRef.current?.next();

  if (colecoes.length === 0) return null;

  return (
    <div className="w-full flex items-center gap-4 px-4 py-2">
      <button
        onClick={prev}
        aria-label="Coleção anterior"
        className="bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      <div ref={sliderRef} className="keen-slider flex-1">
        {colecoes.map(({ id, name, temEbooks, subcolecoesCount = 0 }) => {
          const clicavel = temEbooks || subcolecoesCount > 0;

          const badge =
            subcolecoesCount > 0 ? (
              <span
                className={`mt-2 inline-block self-start rounded px-2 py-0.5 text-[11px] font-normal ${
                  temEbooks
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-400/30 text-gray-700'
                }`}
              >
                ↳ {subcolecoesCount}{' '}
                {subcolecoesCount === 1 ? 'subcoleção' : 'subcoleções'}
              </span>
            ) : null;

          return clicavel ? (
            <Link
              key={id}
              href={`/colecoes/${id}`}
              className={`keen-slider__slide min-w-[160px] max-w-[210px] font-medium rounded p-4 shadow text-left flex flex-col justify-between transition-colors ${
                temEbooks
                  ? 'bg-primary text-white hover:bg-primary/80'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400/70'
              }`}
            >
              <span>{name}</span>
              {badge}
            </Link>
          ) : (
            <div
              key={id}
              className="keen-slider__slide min-w-[160px] max-w-[210px] bg-gray-300 text-gray-600 font-medium rounded p-4 shadow text-left flex flex-col justify-between cursor-not-allowed"
            >
              <span>{name}</span>
            </div>
          );
        })}
      </div>

      <button
        onClick={next}
        aria-label="Próxima coleção"
        className="bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

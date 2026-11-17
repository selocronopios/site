'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface ColecaoCarouselItem {
  id: string;
  name: string;
  temEbooks: boolean;
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
        className="bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>

      <div ref={sliderRef} className="keen-slider flex-1">
        {colecoes.map(({ id, name, temEbooks }) =>
          temEbooks ? (
            <Link
              key={id}
              href={`/colecoes/${id}`}
              className="keen-slider__slide min-w-[150px] bg-primary text-white font-medium rounded p-4 shadow text-left flex items-center hover:bg-primary/80 transition"
            >
              {name}
            </Link>
          ) : (
            <div
              key={id}
              className="keen-slider__slide min-w-[150px] bg-gray-300 text-gray-600 font-medium rounded p-4 shadow text-left flex items-center cursor-not-allowed"
            >
              {name}
            </div>
          )
        )}
      </div>

      <button
        onClick={next}
        aria-label="Próxima coleção"
        className="bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const colecoes = [
  'Itinerários da História Intelectual',
  'História Intelectual em perspectiva (trans)nacional',
  'História Intelectual, esfera pública e cultura impressa',
  'História intelectual e gênero',
  'Dicionário Biográfico de Mulheres Brasileiras',
  'História Intelectual e decolonialidade',
  'História Intelectual e culturas políticas',
];

export default function ColecoesCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 'auto', spacing: 16 },
  });

  const prev = () => instanceRef.current?.prev();
  const next = () => instanceRef.current?.next();

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
        {colecoes.map((titulo, i) => (
          <div
            key={i}
            className="keen-slider__slide min-w-[150px] bg-selectionLight text-secondary font-medium rounded p-4 shadow text-left flex items-center"
          >
            {titulo}
          </div>
        ))}
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

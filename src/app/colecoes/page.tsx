'use client';

import ColecoesCarousel from '@/components/ColecoesCarousel';
import { useState } from 'react';

interface Livro {
  titulo: string;
  imagem: string;
  data: string;
}

const livros: Livro[] = [
  { titulo: 'Livro A', imagem: '/livro1.png', data: '2024-01-01' },
  { titulo: 'Livro B', imagem: '/livro1.png', data: '2024-03-01' },
  { titulo: 'Livro C', imagem: '/livro1.png', data: '2024-12-01' },
  { titulo: 'Livro D', imagem: '/livro1.png', data: '2024-11-01' },
  { titulo: 'Livro E', imagem: '/livro1.png', data: '2024-10-01' },
  { titulo: 'Livro F', imagem: '/livro1.png', data: '2024-09-01' },
  { titulo: 'Livro G', imagem: '/livro1.png', data: '2024-08-01' },
  { titulo: 'Livro H', imagem: '/livro1.png', data: '2024-07-01' },
  { titulo: 'Livro I', imagem: '/livro1.png', data: '2024-06-01' },
  { titulo: 'Livro J', imagem: '/livro1.png', data: '2024-05-01' },
  { titulo: 'Livro K', imagem: '/livro1.png', data: '2024-04-01' },
  { titulo: 'Livro L', imagem: '/livro1.png', data: '2024-03-01' },
  { titulo: 'Livro M', imagem: '/livro1.png', data: '2024-02-01' },
  { titulo: 'Livro N', imagem: '/livro1.png', data: '2024-01-01' },
];

const porPagina = 12;

export default function Page() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordem, setOrdem] = useState<'alfabetica' | 'data'>('alfabetica');

  const ordenarLivros = (livrosParam: Livro[]) => {
    if (ordem === 'alfabetica') {
      return [...livrosParam].sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else {
      return [...livrosParam].sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
      );
    }
  };
  const livrosOrdenados = ordenarLivros(livros);
  const totalPaginas = Math.ceil(livrosOrdenados.length / porPagina);
  const inicio = (paginaAtual - 1) * porPagina;
  const livrosPagina = livrosOrdenados.slice(inicio, inicio + porPagina);

  return (
    <main>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        <ColecoesCarousel />
        <div className="flex justify-end">
          <select
            value={ordem}
            onChange={(e) => {
              setOrdem(e.target.value as 'alfabetica' | 'data');
              setPaginaAtual(1); // reseta pra página 1
            }}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="alfabetica">Ordenar por título (A-Z)</option>
            <option value="data">Ordenar por data de adição</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-6 px-4 py-8">
          {livrosPagina.map((livro, i) => (
            <div key={i} className="p-4 flex flex-col items-center">
              <img
                src={livro.imagem}
                alt={livro.titulo}
                className="w-48 h-full object-cover rounded mb-2"
              />
              <span className="text-sm text-center font-medium text-text">
                {livro.titulo}
              </span>
            </div>
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
                  ? 'bg-secondary text-white'
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

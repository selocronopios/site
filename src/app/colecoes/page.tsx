import ColecoesCarousel from '@/components/ColecoesCarousel';
import CatalogoGrid from '@/components/CatalogoGrid';
import { getColecoes, getEbooks } from '@/lib/acervo';

export default function Page() {
  const colecoes = getColecoes();
  const livros = getEbooks();

  const colecoesCarousel = colecoes.map((col) => ({
    id: col.id,
    name: col.name,
    temEbooks: livros.some((livro) => livro.collection === col.id),
  }));

  return (
    <main>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        <ColecoesCarousel colecoes={colecoesCarousel} />
        <CatalogoGrid livros={livros} />
      </div>
    </main>
  );
}

import ColecoesCarousel from '@/components/ColecoesCarousel';
import CatalogoGrid from '@/components/CatalogoGrid';
import { getColecoes, getEbooks } from '@/lib/acervo';

export default function Page() {
  const todasColecoes = getColecoes();
  const livros = getEbooks();

  const colecoesPrincipais = todasColecoes.filter(
    (col) => !col.parentCollection
  );

  const colecoesCarousel = colecoesPrincipais.map((col) => {
    const idsSubcolecoes = todasColecoes
      .filter((sub) => sub.parentCollection === col.id)
      .map((sub) => sub.id);

    const temEbooks = livros.some(
      (livro) =>
        livro.collection === col.id || idsSubcolecoes.includes(livro.collection)
    );

    return {
      id: col.id,
      name: col.name,
      temEbooks,
      subcolecoesCount: idsSubcolecoes.length,
    };
  });

  return (
    <main>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        <ColecoesCarousel colecoes={colecoesCarousel} />
        <CatalogoGrid livros={livros} />
      </div>
    </main>
  );
}

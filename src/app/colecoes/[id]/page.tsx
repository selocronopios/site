import { notFound } from 'next/navigation';
import CatalogoGrid from '@/components/CatalogoGrid';
import {
  getColecaoPorId,
  getColecoes,
  getEbooksPorColecao,
} from '@/lib/acervo';

export function generateStaticParams() {
  return getColecoes().map((col) => ({ id: col.id }));
}

export default async function ColecaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const colecao = getColecaoPorId(id);

  if (!colecao) {
    notFound();
  }

  const ebooks = getEbooksPorColecao(id);

  return (
    <main>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        <h1 className="heading-h1 text-primary text-center">{colecao.name}</h1>
        <CatalogoGrid
          livros={ebooks}
          mensagemVazio="Em breve novos títulos serão publicados nesta coleção."
        />
      </div>
    </main>
  );
}

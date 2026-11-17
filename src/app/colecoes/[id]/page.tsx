import Link from 'next/link';
import { notFound } from 'next/navigation';
import CatalogoGrid from '@/components/CatalogoGrid';
import {
  getColecaoPorId,
  getColecoes,
  getEbooks,
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

  const todasColecoes = getColecoes();
  const todosEbooks = getEbooks();
  const ebooks = getEbooksPorColecao(id);

  const colecaoPai = colecao.parentCollection
    ? todasColecoes.find((col) => col.id === colecao.parentCollection)
    : undefined;

  const subcolecoes = todasColecoes.filter(
    (col) => col.parentCollection === id
  );

  return (
    <main>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8">
        {/* Trilha de navegação quando for uma subcoleção */}
        {colecaoPai && (
          <nav
            aria-label="Navegação estrutural"
            className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link
              href={`/colecoes/${colecaoPai.id}`}
              className="hover:text-primary transition-colors font-medium"
            >
              {colecaoPai.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{colecao.name}</span>
          </nav>
        )}

        {/* Cabeçalho da coleção */}
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <h1 className="heading-h1 text-primary">{colecao.name}</h1>
          {colecao.description && (
            <p className="text-gray-700 leading-relaxed text-justify sm:text-center">
              {colecao.description}
            </p>
          )}
        </div>

        {/* Bloco de subcoleções (exibido apenas na coleção-mãe) */}
        {subcolecoes.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Subcoleções
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subcolecoes.map((sub) => {
                const qtdLivros = todosEbooks.filter(
                  (livro) => livro.collection === sub.id
                ).length;

                if (qtdLivros === 0) {
                  return (
                    <div
                      key={sub.id}
                      className="flex flex-col justify-between rounded-xl border border-gray-200 bg-gray-100 p-5 text-gray-500 cursor-not-allowed opacity-80"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-gray-600">
                            {sub.name}
                          </h3>
                          <span className="shrink-0 rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                            Em breve
                          </span>
                        </div>
                        {sub.description && (
                          <p className="text-sm text-gray-500 text-justify line-clamp-3">
                            {sub.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={sub.id}
                    href={`/colecoes/${sub.id}`}
                    className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-primary/50 hover:shadow transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-primary group-hover:underline">
                          {sub.name}
                        </h3>
                        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          {qtdLivros} {qtdLivros === 1 ? 'volume' : 'volumes'}
                        </span>
                      </div>
                      {sub.description && (
                        <p className="text-sm text-gray-600 text-justify line-clamp-3">
                          {sub.description}
                        </p>
                      )}
                    </div>

                    <span className="mt-4 text-xs font-medium text-primary">
                      Acessar subcoleção →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Vitrine de e-books */}
        {(ebooks.length > 0 || subcolecoes.length === 0) && (
          <section className="space-y-4 text-justify">
            {subcolecoes.length > 0 && (
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Volumes da coleção
              </h2>
            )}
            <CatalogoGrid
              livros={ebooks}
              mensagemVazio="Em breve novos títulos serão publicados nesta coleção."
            />
          </section>
        )}
      </div>
    </main>
  );
}

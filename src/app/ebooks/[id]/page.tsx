// src/app/ebooks/[id]/page.tsx
import { notFound } from 'next/navigation';
import EbookDownloadBox from '@/components/EbookDownloadBox';
import { getEbookPorId, getEbooks } from '@/lib/acervo';

export function generateStaticParams() {
  return getEbooks().map((ebook) => ({ id: ebook.id }));
}

export default async function EbookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ebook = getEbookPorId(id);

  if (!ebook) {
    notFound();
  }

  return (
    <main>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        <div
          className="grid grid-cols-1 md:grid-cols-[15rem_auto] gap-x-6 gap-y-4"
          style={{ alignItems: 'stretch' }}
        >
          <div style={{ height: '100%' }}>
            {ebook.cover && (
              <img
                src={ebook.cover}
                alt={ebook.title}
                className="h-full w-auto object-contain mx-auto"
              />
            )}
          </div>

          <div className="h-full text-left">
            <h3 className="heading-h3 text-text mb-2">
              {ebook.collectionName}
            </h3>
            <h1 className="heading-h1 text-text mb-2">{ebook.title}</h1>
            {ebook.subtitle && (
              <h2 className="heading-h2 text-text mb-2">{ebook.subtitle}</h2>
            )}
            <h3 className="heading-h3 text-text mb-2">
              {ebook.authors.join(', ')}
            </h3>

            {ebook.keywords.length > 0 && (
              <h3 className="heading-h3 text-text mb-2">
                Palavras-chave: {ebook.keywords.join(', ')}
              </h3>
            )}

            <p className="heading-text text-text text-justify mb-2">
              {ebook.description}
            </p>

            <EbookDownloadBox pdfUrl={ebook.pdf} titulo={ebook.title} />
          </div>
        </div>

        <div className="space-y-4">
          {ebook.authorship && (
            <div>
              <h2 className="heading-h2 text-text">Autoria</h2>
              <p className="whitespace-pre-line">{ebook.authorship}</p>
            </div>
          )}

          {ebook.summary && (
            <div>
              <h2 className="heading-h2 text-text">Sumário</h2>
              <p className="whitespace-pre-line">{ebook.summary}</p>
            </div>
          )}

          <div>
            <h2 className="heading-h2 text-text">Ficha Técnica</h2>
            <p>
              <span className="font-bold">Título:</span> {ebook.title}
            </p>
            {ebook.subtitle && (
              <p>
                <span className="font-bold">Subtítulo:</span> {ebook.subtitle}
              </p>
            )}
            <p>
              <span className="font-bold">Editora:</span> {ebook.publisher}
            </p>
            <p>
              <span className="font-bold">Ano de publicação:</span> {ebook.year}
            </p>
            {ebook.edition && (
              <p>
                <span className="font-bold">Edição:</span> {ebook.edition}
              </p>
            )}
            {ebook.pages && (
              <p>
                <span className="font-bold">Páginas:</span> {ebook.pages}
              </p>
            )}
            <p>
              <span className="font-bold">Formato:</span> {ebook.format}
            </p>
            {ebook.isbn && (
              <p>
                <span className="font-bold">ISBN:</span> {ebook.isbn}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// src/app/ebooks/[id]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EbookDownloadBox from '@/components/EbookDownloadBox';
import {
  getColecaoPorId,
  getEbookPorId,
  getEbooks,
  getEbooksPorColecao,
  resumirParaSeo,
} from '@/lib/acervo';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

function absolutizarUrl(caminho: string): string {
  if (caminho.startsWith('http://') || caminho.startsWith('https://')) {
    return caminho;
  }
  return `${siteUrl}${caminho.startsWith('/') ? '' : '/'}${caminho}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ebook = getEbookPorId(id);

  if (!ebook) return {};

  const autoresTexto = ebook.authors.join(', ');
  const fallback = `Baixe gratuitamente "${ebook.title}"${
    autoresTexto ? `, de ${autoresTexto}` : ''
  }. Publicação em acesso aberto do Selo Cronópios e História Intelectual (UFMG).`;

  const descricaoSeo = resumirParaSeo(ebook.description, fallback);
  const urlEbook = `${siteUrl}/ebooks/${ebook.id}`;

  const scholarTags: Record<string, string | string[]> = {
    citation_title: ebook.subtitle
      ? `${ebook.title}: ${ebook.subtitle}`
      : ebook.title,
    citation_publication_date: String(ebook.year),
    citation_publisher: ebook.publisher,
    citation_language: 'pt-BR',
    citation_abstract_html_url: urlEbook,
  };

  if (ebook.authors.length > 0) {
    scholarTags.citation_author = ebook.authors;
  }
  if (ebook.isbn) {
    scholarTags.citation_isbn = ebook.isbn;
  }
  if (ebook.pdf) {
    scholarTags.citation_pdf_url = absolutizarUrl(ebook.pdf);
  }

  return {
    title: autoresTexto ? `${ebook.title} — ${autoresTexto}` : ebook.title,
    description: descricaoSeo,
    keywords: ebook.keywords.length > 0 ? ebook.keywords : undefined,
    alternates: {
      canonical: `/ebooks/${ebook.id}`,
    },
    openGraph: {
      type: 'book',
      url: urlEbook,
      title: ebook.title,
      description: descricaoSeo,
      images: ebook.cover ? [absolutizarUrl(ebook.cover)] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: ebook.title,
      description: descricaoSeo,
      images: ebook.cover ? [absolutizarUrl(ebook.cover)] : undefined,
    },
    other: scholarTags,
  };
}

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

  const colecao = ebook.collection
    ? getColecaoPorId(ebook.collection)
    : undefined;

  const colecaoPai = colecao?.parentCollection
    ? getColecaoPorId(colecao.parentCollection)
    : undefined;

  const outrosVolumes = ebook.collection
    ? getEbooksPorColecao(ebook.collection)
        .filter((item) => item.id !== ebook.id)
        .slice(0, 4)
    : [];

  const urlEbook = `${siteUrl}/ebooks/${ebook.id}`;

  const bookJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: ebook.subtitle ? `${ebook.title}: ${ebook.subtitle}` : ebook.title,
    author: ebook.authors.map((nome) => ({
      '@type': 'Person',
      name: nome,
    })),
    publisher: {
      '@type': 'Organization',
      name: ebook.publisher,
      url: siteUrl,
    },
    datePublished: String(ebook.year),
    bookEdition: ebook.edition || undefined,
    numberOfPages: ebook.pages || undefined,
    isbn: ebook.isbn || undefined,
    keywords: ebook.keywords.length > 0 ? ebook.keywords.join(', ') : undefined,
    description: ebook.description || undefined,
    image: ebook.cover ? absolutizarUrl(ebook.cover) : undefined,
    url: urlEbook,
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    bookFormat: 'https://schema.org/EBook',
    encoding: ebook.pdf
      ? {
          '@type': 'MediaObject',
          contentUrl: absolutizarUrl(ebook.pdf),
          encodingFormat: 'application/pdf',
        }
      : undefined,
  };

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Início',
      item: siteUrl,
    },
    ...(colecaoPai
      ? [
          {
            '@type': 'ListItem',
            position: 2,
            name: colecaoPai.name,
            item: `${siteUrl}/colecoes/${colecaoPai.id}`,
          },
        ]
      : []),
    ...(colecao
      ? [
          {
            '@type': 'ListItem',
            position: colecaoPai ? 3 : 2,
            name: colecao.name,
            item: `${siteUrl}/colecoes/${colecao.id}`,
          },
        ]
      : []),
    {
      '@type': 'ListItem',
      position: (colecaoPai ? 1 : 0) + (colecao ? 1 : 0) + 2,
      name: ebook.title,
      item: urlEbook,
    },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        {/* Trilha de navegação clicável */}
        <nav
          aria-label="Navegação estrutural"
          className="flex flex-wrap items-center gap-2 text-sm text-gray-600 text-left"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Início
          </Link>

          {colecaoPai && (
            <>
              <span>/</span>
              <Link
                href={`/colecoes/${colecaoPai.id}`}
                className="hover:text-primary transition-colors"
              >
                {colecaoPai.name}
              </Link>
            </>
          )}

          {colecao && (
            <>
              <span>/</span>
              <Link
                href={`/colecoes/${colecao.id}`}
                className="hover:text-primary transition-colors font-medium"
              >
                {colecao.name}
              </Link>
            </>
          )}

          <span>/</span>
          <span className="text-gray-900 font-semibold">{ebook.title}</span>
        </nav>

        <div
          className="grid grid-cols-1 md:grid-cols-[15rem_auto] gap-x-6 gap-y-4"
          style={{ alignItems: 'stretch' }}
        >
          <div className="relative aspect-[2/3] w-60 mx-auto">
            {ebook.cover && (
              <Image
                src={ebook.cover}
                alt={`Capa do livro ${ebook.title}`}
                fill
                priority
                sizes="240px"
                className="object-contain"
              />
            )}
          </div>

          <div className="h-full text-left">
            <p className="heading-h3 text-text mb-2">
              {colecao ? (
                <Link
                  href={`/colecoes/${colecao.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {ebook.collectionName}
                </Link>
              ) : (
                ebook.collectionName
              )}
            </p>
            <h1 className="heading-h1 text-text mb-2">{ebook.title}</h1>
            {ebook.subtitle && (
              <h2 className="heading-h2 text-text mb-2">{ebook.subtitle}</h2>
            )}
            <p className="heading-h3 text-text mb-2">
              {ebook.authors.join(', ')}
            </p>

            {ebook.keywords.length > 0 && (
              <p className="heading-h3 text-text mb-2">
                Palavras-chave: {ebook.keywords.join(', ')}
              </p>
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

        {/* Outros volumes da mesma coleção */}
        {outrosVolumes.length > 0 && (
          <section className="pt-6 border-t border-gray-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="heading-h2 text-text">
                Outros volumes desta coleção
              </h2>
              {colecao && (
                <Link
                  href={`/colecoes/${colecao.id}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Ver todos os volumes →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {outrosVolumes.map((volume) => (
                <Link
                  key={volume.id}
                  href={`/ebooks/${volume.id}`}
                  className="group flex flex-col items-center p-3 rounded-lg hover:bg-white/60 transition-colors"
                >
                  <div className="relative w-40 aspect-[2/3] overflow-hidden rounded mb-3 bg-gray-100 shadow-sm">
                    {volume.cover ? (
                      <Image
                        src={volume.cover}
                        alt={`Capa do livro ${volume.title}`}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-3 text-center text-xs text-gray-500">
                        {volume.title}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-center font-medium text-text group-hover:underline line-clamp-2">
                    {volume.title}
                  </span>
                  {volume.authors.length > 0 && (
                    <span className="text-xs text-center text-gray-600 mt-1 line-clamp-1">
                      {volume.authors.join(', ')}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

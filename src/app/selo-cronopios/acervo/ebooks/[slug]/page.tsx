import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EbookDownloadBox from '@/components/EbookDownloadBox';
import {
  getColecaoPorId,
  getEbookPorSlug,
  getEbooks,
  getEbooksPorColecao,
  resumirParaSeo,
} from '@/lib/acervo';
import Breadcrumbs from '@/components/Breadcrumbs';

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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ebook = getEbookPorSlug(slug);

  if (!ebook) return {};

  const autoresTexto = ebook.authors.join(', ');
  const fallback = `Baixe gratuitamente "${ebook.title}"${
    autoresTexto ? `, de ${autoresTexto}` : ''
  }. Publicação em acesso aberto do Selo Editorial Cronópios e História Intelectual (UFMG).`;

  const descricaoSeo = resumirParaSeo(ebook.description, fallback);
  const urlEbook = `${siteUrl}/selo-cronopios/acervo/ebooks/${ebook.slug}`;

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
      canonical: `/selo-cronopios/acervo/ebooks/${ebook.slug}`,
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
  return getEbooks().map((ebook) => ({ slug: ebook.slug }));
}

export default async function EbookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ebook = getEbookPorSlug(slug);

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
        .filter((item) => item.slug !== ebook.slug)
        .slice(0, 4)
    : [];

  const temConteudoComplementar = Boolean(ebook.authorship || ebook.summary);
  const urlEbook = `${siteUrl}/selo-cronopios/acervo/ebooks/${ebook.slug}`;

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
    ...(colecaoPai
      ? [
          {
            label: colecaoPai.name,
            href: `/selo-cronopios/acervo/${colecaoPai.id}`,
          },
        ]
      : []),
    ...(colecao
      ? [
          {
            label: colecao.name,
            href: `/selo-cronopios/acervo/${colecao.id}`,
          },
        ]
      : []),
    {
      label: ebook.title,
      href: `/selo-cronopios/acervo/ebooks/${ebook.slug}`,
    },
  ];

  const itensFichaTecnica = [
    { label: 'Título', valor: ebook.title },
    ...(ebook.subtitle ? [{ label: 'Subtítulo', valor: ebook.subtitle }] : []),
    ...(ebook.authors.length > 0
      ? [{ label: 'Autoria / Org.', valor: ebook.authors.join(', ') }]
      : []),
    { label: 'Editora', valor: ebook.publisher },
    { label: 'Ano de publicação', valor: String(ebook.year) },
    ...(ebook.edition ? [{ label: 'Edição', valor: ebook.edition }] : []),
    ...(ebook.pages ? [{ label: 'Páginas', valor: `${ebook.pages} p.` }] : []),
    { label: 'Formato', valor: ebook.format },
    ...(ebook.isbn ? [{ label: 'ISBN', valor: ebook.isbn }] : []),
    { label: 'Idioma', valor: 'Português (Brasil)' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="bg-background min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Cartão principal da obra */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr] gap-8 lg:gap-10 items-start">
              {/* Coluna da Capa */}
              <div className="flex flex-col items-center space-y-3 mx-auto md:mx-0 w-full max-w-[260px]">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-md">
                  {ebook.cover ? (
                    <Image
                      src={ebook.cover}
                      alt={`Capa do livro ${ebook.title}`}
                      fill
                      priority
                      sizes="(max-width: 768px) 240px, 260px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-gray-50 to-gray-100">
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                        {ebook.publisher}
                      </span>
                      <span className="font-serif text-base font-semibold text-gray-700">
                        {ebook.title}
                      </span>
                    </div>
                  )}
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 px-3 py-1 text-xs font-medium text-emerald-800">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-600"
                    aria-hidden="true"
                  />
                  Acesso Aberto · Download Gratuito
                </div>
              </div>

              {/* Coluna de Informações e Download */}
              <div className="flex flex-col justify-between space-y-5 text-left">
                <div className="space-y-3">
                  {/* Badge da Coleção */}
                  <div>
                    {colecao ? (
                      <Link
                        href={`/selo-cronopios/acervo/${colecao.id}`}
                        className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary hover:bg-primary/15 transition-colors"
                      >
                        {ebook.collectionName}
                      </Link>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1 text-xs font-semibold tracking-wide text-gray-700">
                        {ebook.collectionName}
                      </span>
                    )}
                  </div>

                  {/* Título e Subtítulo */}
                  <div className="space-y-1.5">
                    <h1 className="heading-h1 text-text leading-tight">
                      {ebook.title}
                    </h1>
                    {ebook.subtitle && (
                      <p className="text-lg sm:text-xl text-gray-600 font-normal leading-snug">
                        {ebook.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Autores */}
                  {ebook.authors.length > 0 && (
                    <p className="text-base font-medium text-gray-800 pt-1">
                      {ebook.authors.join(', ')}
                    </p>
                  )}

                  {/* Metadados rápidos */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500">
                    <span>{ebook.publisher}</span>
                    <span aria-hidden="true">•</span>
                    <span>{ebook.year}</span>
                    {ebook.pages && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>{ebook.pages} páginas</span>
                      </>
                    )}
                    {ebook.isbn && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>ISBN {ebook.isbn}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Sinopse */}
                {ebook.description && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="heading-text text-gray-700 leading-relaxed text-justify">
                      {ebook.description}
                    </p>
                  </div>
                )}

                {/* Palavras-chave em tags */}
                {ebook.keywords.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-1">
                      Palavras-chave:
                    </span>
                    {ebook.keywords.map((palavra) => (
                      <span
                        key={palavra}
                        className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
                      >
                        {palavra}
                      </span>
                    ))}
                  </div>
                )}

                {/* Área de Download */}
                <div className="border-t border-gray-100 pt-5">
                  <EbookDownloadBox pdfUrl={ebook.pdf} titulo={ebook.title} />
                </div>
              </div>
            </div>
          </section>

          {/* Detalhes editoriais e Ficha Técnica */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {temConteudoComplementar && (
              <div className="lg:col-span-8 space-y-6">
                {ebook.authorship && (
                  <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-3">
                    <h2 className="heading-h2 text-text border-b border-gray-100 pb-3">
                      Sobre a Autoria
                    </h2>
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed text-justify">
                      {ebook.authorship}
                    </p>
                  </section>
                )}

                {ebook.summary && (
                  <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-3">
                    <h2 className="heading-h2 text-text border-b border-gray-100 pb-3">
                      Sumário
                    </h2>
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed text-left">
                      {ebook.summary}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Cartão da Ficha Técnica */}
            <aside
              className={`${
                temConteudoComplementar
                  ? 'lg:col-span-4 lg:sticky lg:top-8'
                  : 'lg:col-span-12'
              } rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm`}
            >
              <h2 className="heading-h2 text-text border-b border-gray-100 pb-3 mb-4">
                Ficha Técnica
              </h2>

              <dl
                className={
                  temConteudoComplementar
                    ? 'divide-y divide-gray-100'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4'
                }
              >
                {itensFichaTecnica.map((item) => (
                  <div
                    key={item.label}
                    className={
                      temConteudoComplementar
                        ? 'py-2.5 first:pt-0 last:pb-0 flex flex-col gap-0.5'
                        : 'flex flex-col gap-0.5 border-b border-gray-100 pb-2.5'
                    }
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {item.label}
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {item.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          {/* Outros volumes da mesma coleção */}
          {outrosVolumes.length > 0 && (
            <section className="pt-4 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
                <h2 className="heading-h2 text-text">
                  Outros volumes desta coleção
                </h2>
                {colecao && (
                  <Link
                    href={`/selo-cronopios/acervo/${colecao.id}`}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Ver todos os volumes →
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {outrosVolumes.map((volume) => (
                  <Link
                    key={volume.slug}
                    href={`/selo-cronopios/acervo/ebooks/${volume.slug}`}
                    className="group flex flex-col items-center rounded-xl border border-gray-200/70 bg-white p-4 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="relative w-36 aspect-[2/3] overflow-hidden rounded-md mb-3 bg-gray-100 border border-gray-200/60 shadow-sm">
                      {volume.cover ? (
                        <Image
                          src={volume.cover}
                          alt={`Capa do livro ${volume.title}`}
                          fill
                          sizes="144px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center p-3 text-center text-xs text-gray-500">
                          {volume.title}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-center font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
                      {volume.title}
                    </span>
                    {volume.authors.length > 0 && (
                      <span className="text-xs text-center text-gray-500 mt-1 line-clamp-1">
                        {volume.authors.join(', ')}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

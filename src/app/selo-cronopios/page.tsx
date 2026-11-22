import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  FaArrowRight,
  FaBookOpen,
  FaFeatherAlt,
  FaFileAlt,
  FaGraduationCap,
  FaLayerGroup,
  FaUsers,
} from 'react-icons/fa';
import { getColecoesPrincipais, getEbooks } from '@/lib/acervo';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

export const metadata: Metadata = {
  title: 'Selo Editorial Cronópios',
  description:
    'Conheça o Selo Editorial Cronópios, iniciativa de divulgação científica dedicada à publicação de e-books gratuitos em acesso aberto na área de História Intelectual.',
  alternates: {
    canonical: '/selo-cronopios',
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/selo-cronopios`,
    title: 'Selo Editorial Cronópios | História Intelectual UFMG',
    description:
      'Publicação de e-books científicos gratuitos em acesso aberto organizados em seis coleções de História Intelectual.',
    images: [`${siteUrl}/logo-selo.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selo Editorial Cronópios | História Intelectual UFMG',
    description:
      'E-books gratuitos em acesso aberto organizados em seis coleções de História Intelectual.',
    images: [`${siteUrl}/logo-selo.png`],
  },
};

const colecoesFallback = [
  {
    id: 'itinerarios-da-historia-intelectual',
    name: 'Itinerários da História Intelectual',
    description:
      'Aportes teórico-metodológicos, debates conceituais e balanços historiográficos no campo da História Intelectual.',
  },
  {
    id: 'historia-intelectual-em-perspectiva-transnacional',
    name: 'História Intelectual em Perspectiva (Trans)nacional',
    description:
      'Redes de sociabilidades, conexões intelectuais, mediações culturais e trânsitos de ideias além das fronteiras nacionais.',
  },
  {
    id: 'historia-intelectual-esfera-publica-e-cultura-impressa',
    name: 'História Intelectual, Esfera Pública e Cultura Impressa',
    description:
      'Imprensa, edição, circulação de livros, periódicos, instituições culturais e debates no espaço público.',
  },
  {
    id: 'historia-intelectual-e-genero',
    name: 'História Intelectual e Gênero',
    description:
      'Trajetórias intelectuais, feminismos, sexualidades, interseccionalidades e produção de saberes sob a perspectiva de gênero.',
  },
  {
    id: 'historia-intelectual-e-decolonialidade',
    name: 'História Intelectual e Decolonialidade',
    description:
      'Críticas à modernidade, epistemologias do Sul, autodeterminação, identidades e pensamento anticolonial.',
  },
  {
    id: 'historia-intelectual-e-culturas-politicas',
    name: 'História Intelectual e Culturas Políticas',
    description:
      'Tradições políticas, representações, linguagens, manifestos e imaginários sociais na história contemporânea.',
  },
];

const pilaresEditoriais = [
  {
    titulo: 'Acesso Aberto e Gratuito',
    descricao:
      'Todos os e-books são disponibilizados gratuitamente para leitura e download, ampliando o alcance das pesquisas para dentro e fora do meio acadêmico.',
    icon: FaBookOpen,
  },
  {
    titulo: 'Dissertações e Teses',
    descricao:
      'Valorização da produção científica nacional por meio da publicação de obras derivadas de pesquisas de mestrado e doutorado.',
    icon: FaGraduationCap,
  },
  {
    titulo: 'Seleção por Editais',
    descricao:
      'Obras avaliadas segundo critérios acadêmicos e editoriais definidos em chamadas públicas divulgadas no portal.',
    icon: FaFileAlt,
  },
];

export default function SeloCronopiosPage() {
  const colecoesCadastradas = getColecoesPrincipais();
  const todosEbooks = getEbooks();

  const colecoesExibicao =
    colecoesCadastradas.length > 0
      ? colecoesCadastradas.map((col) => ({
          id: col.id,
          name: col.name,
          description: col.description || '',
          volumesCount: todosEbooks.filter(
            (livro) => livro.collection === col.id
          ).length,
          subcolecoesCount: col.subcolecoesCount ?? 0,
          vinculadaAoAcervo: true,
        }))
      : colecoesFallback.map((col) => ({
          ...col,
          volumesCount: 0,
          subcolecoesCount: 0,
          vinculadaAoAcervo: false,
        }));

  const colecaoGenero = colecoesCadastradas.find((col) =>
    col.id.includes('genero')
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Selo Editorial Cronópios',
        item: `${siteUrl}/selo-cronopios`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="bg-background text-text min-h-screen py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Hero Institucional do Selo */}
          <section className="rounded-2xl border border-primary/20 bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-background/60 p-6 flex items-center justify-center">
                  <Image
                    src="/logo-selo.png"
                    alt="Logo do Selo Editorial Cronópios"
                    width={600}
                    height={300}
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Divulgação Científica · Acesso Aberto
                </span>

                <h1 className="heading-h1 text-primary leading-tight">
                  Selo Editorial Cronópios
                </h1>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify lg:text-left">
                  A criação do selo editorial representa um passo fundamental
                  para democratizar o acesso ao conhecimento acadêmico e
                  valorizar a produção científica nacional. A disponibilização
                  gratuita dos e-books amplia o alcance das pesquisas,
                  promovendo a divulgação científica e contribuindo para a
                  formação crítica e cidadã de leitores dentro e fora da
                  universidade.
                </p>

                <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Link
                    href="/selo-cronopios/acervo"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    <FaBookOpen aria-hidden="true" />
                    <span>Explorar Acervo</span>
                  </Link>

                  <Link
                    href="/selo-cronopios/publique-conosco"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FaFeatherAlt aria-hidden="true" />
                    <span>Publique Conosco</span>
                  </Link>

                  <Link
                    href="/selo-cronopios/equipe"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    <FaUsers aria-hidden="true" />
                    <span>Equipe Editorial</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Pilares Editoriais */}
          <section
            aria-label="Pilares do Selo Editorial Cronópios"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {pilaresEditoriais.map((pilar) => {
              const Icone = pilar.icon;

              return (
                <div
                  key={pilar.titulo}
                  className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm space-y-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg">
                    <Icone aria-hidden="true" />
                  </div>
                  <h2 className="font-bold text-base sm:text-lg text-gray-900">
                    {pilar.titulo}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify">
                    {pilar.descricao}
                  </p>
                </div>
              );
            })}
          </section>

          {/* As Seis Coleções */}
          <section
            aria-labelledby="heading-colecoes-selo"
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <FaLayerGroup aria-hidden="true" />
                <span>Estrutura Editorial</span>
              </div>
              <h2
                id="heading-colecoes-selo"
                className="heading-h2 text-primary"
              >
                Coleções do Selo Editorial Cronópios
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-4xl text-justify">
                Destinado à divulgação de pesquisas científicas oriundas de
                dissertações e teses, o catálogo do Selo organiza-se em seis
                coleções temáticas articuladas às linhas de investigação em
                História Intelectual:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colecoesExibicao.map((colecao, index) => {
                const numero = String(index + 1).padStart(2, '0');

                const conteudoCard = (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                          Coleção {numero}
                        </span>

                        {colecao.vinculadaAoAcervo && (
                          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                            {colecao.subcolecoesCount > 0
                              ? `${colecao.subcolecoesCount} ${
                                  colecao.subcolecoesCount === 1
                                    ? 'subcoleção'
                                    : 'subcoleções'
                                }`
                              : colecao.volumesCount > 0
                                ? `${colecao.volumesCount} ${
                                    colecao.volumesCount === 1
                                      ? 'volume'
                                      : 'volumes'
                                  }`
                                : 'Em breve'}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-primary transition-colors leading-snug">
                        {colecao.name}
                      </h3>

                      {colecao.description && (
                        <p className="text-sm text-gray-600 leading-relaxed text-justify line-clamp-3">
                          {colecao.description}
                        </p>
                      )}
                    </div>

                    {colecao.vinculadaAoAcervo && (
                      <span className="mt-5 pt-3 border-t border-gray-100 inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline">
                        <span>Explorar coleção</span>
                        <FaArrowRight
                          className="text-[10px]"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </>
                );

                if (colecao.vinculadaAoAcervo) {
                  return (
                    <Link
                      key={colecao.id}
                      href={`/selo-cronopios/acervo/${colecao.id}`}
                      className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between h-full"
                    >
                      {conteudoCard}
                    </Link>
                  );
                }

                return (
                  <article
                    key={colecao.id}
                    className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm flex flex-col justify-between h-full"
                  >
                    {conteudoCard}
                  </article>
                );
              })}
            </div>
          </section>

          {/* Destaque Subcoleção e Chamada para Publicação */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <article className="lg:col-span-7 rounded-2xl border border-primary/20 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  Subcoleção Especial · História Intelectual e Gênero
                </span>

                <h2 className="heading-h2 text-gray-900">
                  Dicionário Biográfico de Mulheres Brasileiras
                </h2>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                  Integrante da coleção{' '}
                  <strong className="font-semibold text-gray-900">
                    História Intelectual e Gênero
                  </strong>
                  , esta subcoleção reúne obras dedicadas a apresentar
                  trajetórias de mulheres na universidade, na ciência, na
                  política, nos movimentos sociais e em diversos outros campos
                  de atuação intelectual e pública.
                </p>
              </div>

              {colecaoGenero && (
                <div>
                  <Link
                    href={`/selo-cronopios/acervo/${colecaoGenero.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    <span>Acessar História Intelectual e Gênero</span>
                    <FaArrowRight className="text-xs" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </article>

            <aside className="lg:col-span-5 rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-xs font-semibold text-gray-700">
                  Chamadas e Submissões
                </span>

                <h2 className="heading-h2 text-gray-900">
                  Como publicar no Selo
                </h2>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                  Os trabalhos publicados pelo Selo Editorial Cronópios são
                  selecionados por meio de editais previamente divulgados no
                  portal, de acordo com as normas editoriais e o calendário de
                  submissões estabelecido.
                </p>
              </div>

              <div className="pt-1">
                <Link
                  href="/selo-cronopios/publique-conosco"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity w-full sm:w-auto"
                >
                  <span>Consultar diretrizes e submeter</span>
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </>
  );
}

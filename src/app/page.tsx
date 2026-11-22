import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  FaArrowRight,
  FaBookOpen,
  FaChalkboardTeacher,
  FaPodcast,
  FaUniversity,
  FaUsers,
} from 'react-icons/fa';
import Maintenance from '@/components/Maintenance';
import { getEbooks } from '@/lib/acervo';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

export const metadata: Metadata = {
  title: {
    absolute:
      'História Intelectual: Pesquisa e Extensão | UFMG e Selo Cronópios',
  },
  description:
    'Plataforma colaborativa dos grupos de pesquisa e extensão em História Intelectual da UFMG e do Selo Editorial Cronópios, com e-books científicos gratuitos em acesso aberto.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'História Intelectual: Pesquisa e Extensão',
    description:
      'Plataforma colaborativa dos grupos de pesquisa e extensão em História Intelectual da UFMG e do Selo Editorial Cronópios.',
    images: [
      {
        url: `${siteUrl}/logo-600.png`,
        width: 600,
        height: 200,
        alt: 'Logo História Intelectual: Pesquisa e Extensão (UFMG)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'História Intelectual: Pesquisa e Extensão',
    description:
      'E-books gratuitos em acesso aberto, pesquisa e extensão em História Intelectual (UFMG / Selo Cronópios).',
    images: [`${siteUrl}/logo-selo.png`],
  },
};

const linhasPesquisa = [
  {
    numero: '01',
    titulo: 'Itinerários da História Intelectual',
    descricao: 'Aportes teórico-metodológicos e historiografia.',
  },
  {
    numero: '02',
    titulo: 'História Intelectual em perspectiva (trans)nacional',
    descricao: 'Redes de sociabilidades, conexões e trânsitos.',
  },
  {
    numero: '03',
    titulo: 'História Intelectual e esfera pública',
    descricao: 'Educação, cidadania e instituições.',
  },
  {
    numero: '04',
    titulo: 'História Intelectual e gênero',
    descricao: 'Feminismos, sexualidades e interseccionalidades.',
  },
  {
    numero: '05',
    titulo: 'História Intelectual e decolonialidade',
    descricao: 'Modernidade, autodeterminação e identidades.',
  },
  {
    numero: '06',
    titulo: 'História Intelectual e culturas políticas',
    descricao: 'Tradições, representações e imaginários.',
  },
];

const fontesPesquisadas = [
  'Impressos',
  'Obras literárias',
  'Biografias',
  'Petições e manifestos',
  'Correspondências',
  'Ensaios',
  'Produções cinematográficas',
  'Produções musicológicas',
];

export default function Home() {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isMaintenance) {
    return <Maintenance />;
  }

  const ebooksRecentes = [...getEbooks()]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 4);

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'História Intelectual: Pesquisa e Extensão',
    alternateName: 'Selo Editorial Cronópios',
    url: siteUrl,
    logo: `${siteUrl}/logo-600.png`,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidade Federal de Minas Gerais (UFMG)',
      url: 'https://ufmg.br',
    },
    sameAs: [
      'https://www.instagram.com/historiaintelectual/',
      'https://www.youtube.com/@historiaintelectualufmg8540',
      'https://www.facebook.com/historiaintelectualufmg?rdid=reo35nZ8kAy1OypG',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'História Intelectual: Pesquisa e Extensão',
    url: siteUrl,
    inLanguage: 'pt-BR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/busca?query={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="bg-background text-text min-h-screen py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-14">
          {/* Hero Institucional */}
          <section className="rounded-2xl border border-primary/20 bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="max-w-4xl mx-auto text-center space-y-5">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <span>Departamento de História · PPGH / UFMG</span>
                <span aria-hidden="true">•</span>
                <span>CNPq &amp; CENEX</span>
              </div>

              <h1 className="heading-h1 text-primary leading-tight">
                História Intelectual: Pesquisa, Extensão e Divulgação Científica
              </h1>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify sm:text-center">
                Plataforma colaborativa interdisciplinar que reúne
                pesquisadores, estudantes e profissionais de diversas áreas para
                fortalecer vínculos acadêmicos nacionais e internacionais,
                incentivar a produção científica e promover a ampla disseminação
                do conhecimento histórico junto à sociedade.
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-justify sm:text-center">
                A iniciativa integra e articula dois grupos vinculados ao
                Departamento de História e ao Programa de Pós-Graduação em
                História da Universidade Federal de Minas Gerais: o{' '}
                <strong className="font-semibold text-gray-800">
                  Grupo de Pesquisa “História Intelectual: práticas, narrativas
                  e circulação de ideias” (CNPq)
                </strong>{' '}
                e o{' '}
                <strong className="font-semibold text-gray-800">
                  Grupo “História Intelectual: pesquisa, extensão e divulgação
                  científica” (CENEX/UFMG – Registro 405042)
                </strong>
                .
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/quem-somos-nos"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors"
                >
                  <FaUsers aria-hidden="true" />
                  <span>Conheça os Pesquisadores</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Grupo de Pesquisa (UFMG/CNPq) */}
          <section
            aria-labelledby="heading-grupo-pesquisa"
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <FaUniversity aria-hidden="true" />
                <span>Criado em 2020 · Diretório CNPq</span>
              </div>
              <h2
                id="heading-grupo-pesquisa"
                className="heading-h2 text-primary leading-snug"
              >
                Grupo de Pesquisa “História Intelectual: práticas, narrativas e
                circulação de ideias” (UFMG/CNPq)
              </h2>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
                <p>
                  Criado em 2020, o grupo tem contribuído de forma sistemática
                  para o fortalecimento e a disseminação das investigações na
                  área, bem como para a construção de caminhos que ampliem os
                  debates sobre o tema por meio do diálogo com pesquisadores em
                  âmbitos nacional e internacional.
                </p>

                <p>
                  A equipe congrega profissionais, docentes e discentes
                  interessados em refletir, sob uma perspectiva
                  interdisciplinar, acerca da História Intelectual em suas
                  múltiplas abordagens, renovando as interpretações no campo da
                  história das ideias políticas. Além das pesquisas, o grupo
                  organiza seminários nacionais e internacionais, editais para
                  apresentação de trabalhos, conferências e exposições,
                  consolidando-se como espaço de suporte tanto às investigações
                  na área quanto à formação de novos pesquisadores.
                </p>
              </div>

              {/* Fontes trabalhadas */}
              <div className="border-t border-gray-100 pt-5 space-y-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Dimensões e fontes exploradas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {fontesPesquisadas.map((fonte) => (
                    <span
                      key={fonte}
                      className="rounded-full border border-gray-200 bg-background px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {fonte}
                    </span>
                  ))}
                </div>
              </div>

              {/* Seis Linhas Norteadoras */}
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Seis linhas norteadoras de atuação
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {linhasPesquisa.map((linha) => (
                    <div
                      key={linha.numero}
                      className="rounded-xl border border-gray-200/80 bg-background/60 p-4 sm:p-5 space-y-2"
                    >
                      <span className="inline-block rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        Linha {linha.numero}
                      </span>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 leading-snug">
                        {linha.titulo}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {linha.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Grupo CENEX/UFMG */}
          <section aria-labelledby="heading-grupo-cenex" className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <FaChalkboardTeacher aria-hidden="true" />
                <span>Criado em 2024 · CENEX/UFMG – Registro 405042</span>
              </div>
              <h2
                id="heading-grupo-cenex"
                className="heading-h2 text-primary leading-snug"
              >
                Grupo de História Intelectual: pesquisa, extensão e divulgação
                científica
              </h2>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
                <p>
                  Com a ampliação das atividades iniciadas em 2020, foi criado
                  em 2024 o{' '}
                  <strong className="font-semibold text-gray-800">
                    Grupo de História Intelectual: pesquisa, extensão e
                    divulgação científica
                  </strong>
                  . Atuando na interface entre universidade e sociedade, o grupo
                  reúne pesquisadores, estudantes de graduação e pós-graduação
                  (inclusive egressos) da UFMG e participantes externos para
                  dialogar com escolas, associações culturais e movimentos
                  sociais.
                </p>
              </div>

              {/* 3 Frentes de Ação */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <article className="rounded-xl border border-primary/20 bg-primary/[0.03] p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg">
                      <FaBookOpen aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-base text-gray-900">
                      Selo Editorial Cronópios
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Publicação de e-books acadêmicos gratuitos em acesso
                      aberto, funcionando como instrumento ágil de difusão da
                      produção científica da área.
                    </p>
                  </div>

                  <Link
                    href="/selo-cronopios"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Conhecer o Selo Editorial</span>
                    <FaArrowRight className="text-[10px]" aria-hidden="true" />
                  </Link>
                </article>

                <article className="rounded-xl border border-gray-200/80 bg-background/50 p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg">
                      <FaChalkboardTeacher aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-base text-gray-900">
                      Formação Docente e Escolas Públicas
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Cursos de extensão, minicursos de renovação
                      historiográfica e oficinas em escolas públicas de Belo
                      Horizonte articulando literatura, cinema, imprensa e
                      ideias políticas.
                    </p>
                  </div>

                  <Link
                    href="/contato"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Entrar em contato</span>
                    <FaArrowRight className="text-[10px]" aria-hidden="true" />
                  </Link>
                </article>

                <article className="rounded-xl border border-gray-200/80 bg-background/50 p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg">
                      <FaPodcast aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-base text-gray-900">
                      Podcast Intelecções e Contextus
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Produção e divulgação de episódios dedicados ao debate
                      público sobre história intelectual, cultura e circulação
                      de ideias.
                    </p>
                  </div>

                  <a
                    href="https://open.spotify.com/show/59uuouhQ7wFk0nww4JwuGf?si=GJov0w0JScG1GuPHe9L8Hw&utm_source=whatsapp&sci=spotify%3Acard-config%3A1hRRz1MOuKQGXUzwJcSJyD&nd=1&dlsi=42e8624a8ed642f6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Acompanhar no Spotify</span>
                    <FaArrowRight className="text-[10px]" aria-hidden="true" />
                  </a>
                </article>
              </div>
            </div>
          </section>

          {/* Destaques do Acervo */}
          {ebooksRecentes.length > 0 && (
            <section
              aria-labelledby="heading-acervo-home"
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
                <div>
                  <h2
                    id="heading-acervo-home"
                    className="heading-h2 text-primary"
                  >
                    Publicações Recentes do Selo Cronópios
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Obras acadêmicas em acesso aberto disponíveis para download
                    gratuito.
                  </p>
                </div>

                <Link
                  href="/selo-cronopios/acervo"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  <span>Ver catálogo completo</span>
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ebooksRecentes.map((livro) => (
                  <Link
                    key={livro.slug}
                    href={`/selo-cronopios/acervo/ebooks/${livro.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm hover:border-primary/40 hover:shadow-md transition-all h-full"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-36 aspect-[2/3] overflow-hidden rounded-md mb-4 bg-gray-100 border border-gray-200/60 shadow-sm">
                        {livro.cover ? (
                          <Image
                            src={livro.cover}
                            alt={`Capa do livro ${livro.title}`}
                            fill
                            sizes="144px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center p-3 text-center text-xs text-gray-500">
                            {livro.title}
                          </div>
                        )}
                      </div>

                      <span className="text-[11px] font-semibold uppercase tracking-wide text-primary/80 mb-1 line-clamp-1">
                        {livro.collectionName}
                      </span>

                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {livro.title}
                      </h3>

                      {livro.authors.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">
                          {livro.authors.join(', ')}
                        </p>
                      )}
                    </div>

                    <span className="mt-4 pt-3 border-t border-gray-100 text-center text-xs font-semibold text-primary group-hover:underline">
                      Acessar obra →
                    </span>
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

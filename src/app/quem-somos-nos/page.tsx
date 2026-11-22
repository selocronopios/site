import Image from 'next/image';
import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

interface Membro {
  nome: string;
  funcao: string;
  titulacao: string;
  lattes: string;
  foto: string;
  cargoCoordenacao?: string;
}

export const metadata: Metadata = {
  title: 'Quem Somos — Grupo de Pesquisa História Intelectual (UFMG)',
  description:
    'Conheça a coordenação e os pesquisadores do Grupo de Pesquisa “História Intelectual: práticas, narrativas e circulação de ideias” (UFMG/CNPq).',
  alternates: {
    canonical: '/quem-somos-nos',
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/quem-somos-nos`,
    title: 'Quem Somos | História Intelectual (UFMG)',
    description:
      'Grupo de Pesquisa “História Intelectual: práticas, narrativas e circulação de ideias” (UFMG/CNPq).',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quem Somos | História Intelectual (UFMG)',
    description:
      'Grupo de Pesquisa “História Intelectual: práticas, narrativas e circulação de ideias” (UFMG/CNPq).',
  },
};

const membros: Membro[] = [
  {
    nome: 'Adriane Vidal Costa',
    funcao: 'Professora do Departamento de História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/9890139156631559',
    foto: '/membros/AdrianeCosta.webp',
    cargoCoordenacao: 'Coordenação do Grupo',
  },
  {
    nome: 'Stella Ferreira Gontijo',
    funcao: 'Doutora em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/4794994866272483',
    foto: '/membros/StellaGontijo.webp',
    cargoCoordenacao: 'Vice-Coordenação do Grupo',
  },
  {
    nome: 'André Luis Martins Amaral',
    funcao: 'Mestrando em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/9510133332400585',
    foto: '/membros/AndreAmaral.webp',
  },
  {
    nome: 'Carolina Costa',
    funcao: 'Graduanda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/2624304363116889',
    foto: '/membros/CarolinaCosta.webp',
  },
  {
    nome: 'Carolina Pedro Soares',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/2809676140430556',
    foto: '/membros/CarolinaSoares.webp',
  },
  {
    nome: 'Caroline Maria Ferreira Drummond',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/3499805105196501',
    foto: '/membros/CarolineDrummond.webp',
  },
  {
    nome: 'Elvis de Almeida Diana',
    funcao: 'Doutor em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/8440932980939738',
    foto: '/membros/ElvisDiana.webp',
  },
  {
    nome: 'Estela Gontijo da Cruz',
    funcao: 'Mestranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/0612647970268215',
    foto: '/membros/EstelaCruz.webp',
  },
  {
    nome: 'Ewerton Wirlley Silva Barros',
    funcao: 'Doutorando em História',
    titulacao: 'Universidade Federal do Rio Grande do Sul (UFRGS)',
    lattes: 'https://lattes.cnpq.br/4662705277578215',
    foto: '/membros/EwertonBarros.webp',
  },
  {
    nome: 'Guilherme Cardoso Caldeira',
    funcao: 'Graduando em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/9280775080557023',
    foto: '/membros/GuilhermeCaldeira.webp',
  },
  {
    nome: 'Ingrid Pereira de Brito Figueira Santana',
    funcao: 'Graduanda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/5597519524176703',
    foto: '/membros/IngridSantana.webp',
  },
  {
    nome: 'Isadora Bolina Monteiro Vivacqua',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/1878913894178376',
    foto: '/membros/IsadoraVivacqua.webp',
  },
  {
    nome: 'Izabelle Seoldo Marques',
    funcao: 'Mestranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/5346573533355564',
    foto: '/membros/IzabelleMarques.webp',
  },
  {
    nome: 'Jessica Gonçalves Santomauro',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/2564946047846591',
    foto: '/membros/JessicaSantomauro.webp',
  },
  {
    nome: 'José Antônio de Souza Queiroz',
    funcao: 'Doutorando em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/0936708852934400',
    foto: '/membros/JoseQueiroz.webp',
  },
  {
    nome: 'Laize Costa Barbosa Lacerda',
    funcao: 'Licenciada em História · Graduanda Bacharel em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/0452292391314586',
    foto: '/membros/LaizeLacerda.webp',
  },
  {
    nome: 'Mariana Oliveira Cruz',
    funcao: 'Graduada em História',
    titulacao: 'Fundação João Pinheiro / FAPEMIG',
    lattes: 'https://lattes.cnpq.br/2315905575280846',
    foto: '/membros/MarianaCruz.webp',
  },
  {
    nome: 'Nathalia Guimarães e Sousa',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/8623174887174879',
    foto: '/membros/NathaliaSousa.webp',
  },
  {
    nome: 'Nayara Ferreira Vilela',
    funcao: 'Mestranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/9993555561523351',
    foto: '/membros/NayaraVilela.webp',
  },
  {
    nome: 'Pauliane de Carvalho Braga',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/7390920523751212',
    foto: '/membros/PaulianeBraga.webp',
  },
  {
    nome: 'Taciana Almeida Garrido de Resende',
    funcao: 'Doutora em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/9042114986463823',
    foto: '/membros/TacianaResende.webp',
  },
  {
    nome: 'Vítor Nazaré Pereira',
    funcao: 'Mestre em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/1537876901491256',
    foto: '/membros/VitorPereira.webp',
  },
];

function IconeLattes() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function QuemSomos() {
  const coordenacao = membros.filter((m) => Boolean(m.cargoCoordenacao));
  const pesquisadores = membros
    .filter((m) => !m.cargoCoordenacao)
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: 'Grupo de Pesquisa História Intelectual: práticas, narrativas e circulação de ideias',
    url: `${siteUrl}/quem-somos-nos`,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidade Federal de Minas Gerais (UFMG)',
    },
    member: membros.map((membro) => ({
      '@type': 'Person',
      name: membro.nome,
      jobTitle: membro.cargoCoordenacao
        ? `${membro.cargoCoordenacao} · ${membro.funcao}`
        : membro.funcao,
      affiliation: {
        '@type': 'Organization',
        name: membro.titulacao,
      },
      sameAs: membro.lattes,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="bg-background text-text min-h-screen py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Cabeçalho Institucional */}
          <header className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              UFMG · CNPq
            </span>

            <h1 className="heading-h1 text-primary">Quem Somos</h1>

            <p className="text-lg sm:text-xl font-medium text-gray-800 leading-snug">
              Grupo de Pesquisa “História Intelectual: práticas, narrativas e
              circulação de ideias”
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Sediado no Departamento de História da Universidade Federal de
              Minas Gerais (UFMG) e certificado pelo CNPq, o grupo reúne
              docentes, doutores, pós-graduandos e graduandos dedicados à
              pesquisa e à extensão universitária no campo da História
              Intelectual.
            </p>
          </header>

          {/* Coordenação e Vice-Coordenação */}
          {coordenacao.length > 0 && (
            <section
              aria-labelledby="heading-coordenacao"
              className="space-y-5"
            >
              <div className="flex items-center gap-3">
                <h2
                  id="heading-coordenacao"
                  className="heading-h2 text-text shrink-0"
                >
                  Coordenação
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {coordenacao.map((membro) => (
                  <article
                    key={membro.nome}
                    className="rounded-2xl border border-primary/20 bg-white p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left h-full"
                  >
                    <Image
                      src={membro.foto}
                      alt={membro.nome}
                      width={150}
                      height={150}
                      priority
                      className="rounded-full object-cover w-32 h-32 shrink-0 ring-2 ring-primary/20"
                    />

                    <div className="flex-1 flex flex-col justify-between h-full space-y-3">
                      <div className="space-y-1.5">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                          {membro.cargoCoordenacao}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                          {membro.nome}
                        </h3>
                        <p className="text-sm font-medium text-gray-700">
                          {membro.funcao}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {membro.titulacao}
                        </p>
                      </div>

                      {membro.lattes && (
                        <div className="pt-1">
                          <a
                            href={membro.lattes}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Currículo Lattes de ${membro.nome}`}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                          >
                            <span>Currículo Lattes</span>
                            <IconeLattes />
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Pesquisadores e Pesquisadoras */}
          <section
            aria-labelledby="heading-pesquisadores"
            className="space-y-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <h2
                  id="heading-pesquisadores"
                  className="heading-h2 text-text shrink-0"
                >
                  Pesquisadores e Pesquisadoras
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <span className="text-xs font-medium text-gray-500 shrink-0">
                {pesquisadores.length} integrantes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pesquisadores.map((membro, index) => (
                <article
                  key={membro.nome}
                  className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:border-primary/35 hover:shadow-md transition-all flex flex-col justify-between items-center text-center h-full"
                >
                  <div className="flex flex-col items-center w-full">
                    {membro.foto && (
                      <Image
                        src={membro.foto}
                        alt={membro.nome}
                        width={150}
                        height={150}
                        priority={index < 8}
                        className="rounded-full object-cover w-32 h-32 mb-4 ring-2 ring-gray-100 group-hover:ring-primary/25 transition-all"
                      />
                    )}

                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 leading-snug">
                      {membro.nome}
                    </h3>

                    <p className="text-sm font-medium text-gray-700 mt-1.5 leading-snug">
                      {membro.funcao}
                    </p>

                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {membro.titulacao}
                    </p>
                  </div>

                  {membro.lattes && (
                    <div className="pt-5 mt-auto">
                      <a
                        href={membro.lattes}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Currículo Lattes de ${membro.nome}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        <span>Currículo Lattes</span>
                        <IconeLattes />
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

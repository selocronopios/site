import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

//'Conheça a coordenação, a equipe editorial e o conselho científico do Selo Editorial Cronópios (História Intelectual / UFMG).',

export const metadata: Metadata = {
  title: 'Equipe e Conselho Editorial | Selo Editorial Cronópios',
  description:
    'Conheça a coordenação e o conselho editorial do Selo Editorial Cronópios (História Intelectual / UFMG).',
  alternates: {
    canonical: '/selo-cronopios/equipe',
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/selo-cronopios/equipe`,
    title: 'Equipe e Conselho Editorial | Selo Editorial Cronópios',
    description:
      'Coordenação, equipe editorial e conselho científico do Selo Editorial Cronópios.',
    images: [`${siteUrl}/logo-selo.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equipe e Conselho Editorial | Selo Editorial Cronópios',
    description:
      'Coordenação, equipe editorial e conselho científico do Selo Editorial Cronópios.',
    images: [`${siteUrl}/logo-selo.png`],
  },
};

interface Colaborador {
  nome: string;
  funcao: string;
  instituicao?: string;
}

interface Conselheiro {
  nome: string;
  instituicao: string;
}

// Adicione aqui os colaboradores técnicos/editoriais quando houver
const equipeTecnica: Colaborador[] = [
  // { nome: 'Nome Sobrenome', funcao: 'Revisão e Normalização', instituicao: 'UFMG' },
  // {
  //   nome: 'Beatriz Rosa',
  //   funcao: 'Faz o que a Carol mandar eu fazer',
  //   instituicao: 'CAC',
  // },
];

const equipeComissao: Colaborador[] = [
  // { nome: 'Nome Sobrenome', funcao: 'Revisão e Normalização', instituicao: 'UFMG' },
  // {
  //   nome: 'Beatriz Rosa',
  //   funcao: 'Faz o que a Carol mandar eu fazer',
  //   instituicao: 'CAC',
  // },
];

const conselhoEditorial: Conselheiro[] = [
  {
    nome: 'Alexandra Pita González',
    instituicao: 'Universidad de Colima, México',
  },
  { nome: 'Ana Amélia de Melo', instituicao: 'UEC, Brasil' },
  { nome: 'Carine Dalmás', instituicao: 'UEMA, Brasil' },
  { nome: 'Carlos Armani', instituicao: 'UFSM, Brasil' },
  { nome: 'Claudio Maíz', instituicao: 'UNCuyo, Argentina' },
  { nome: 'Eduardo Devés Valdés', instituicao: 'Usach, Chile' },
  { nome: 'Eliana R. de Freitas Dutra', instituicao: 'UFMG, Brasil' },
  { nome: 'Elisa Campos Borges', instituicao: 'UFF, Brasil' },
  { nome: 'Giselle Venâncio', instituicao: 'UFF, Brasil' },
  { nome: 'Heloisa Maria Murgel Starling', instituicao: 'UFMG, Brasil' },
  { nome: 'Inés de Torres', instituicao: 'UDELAR, Uruguai' },
  { nome: 'José Alves de Freitas Neto', instituicao: 'UNICAMP, Brasil' },
  { nome: 'Liliana Weinberg', instituicao: 'UNAM, México' },
  { nome: 'Maria Elisa Noronha de Sá', instituicao: 'PUC-Rio, Brasil' },
  { nome: 'Maria da Gloria de Oliveira', instituicao: 'UFRRJ, Brasil' },
  { nome: 'Petrônio Domingues', instituicao: 'UFS, Brasil' },
  { nome: 'Rafael Araújo', instituicao: 'UERJ, Brasil' },
];

export default function EquipeSeloPage() {
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
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Equipe Editorial',
        item: `${siteUrl}/selo-cronopios/equipe`,
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

      <div className="bg-background text-text min-h-screen">
        {/* Cabeçalho da página */}
        <div className="border-b border-primary/10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center space-y-2">
            <h1 className="heading-h1 text-primary">
              Selo Editorial Cronópios
            </h1>
            <p className="text-base sm:text-lg text-textSuave">
              Coordenação e Conselho Editorial
            </p>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Coluna lateral com identidade do selo */}
            <aside className="lg:sticky lg:top-28 bg-white rounded-xl shadow-sm border border-primary/10 p-6 flex flex-col items-center text-center space-y-5">
              <Image
                src="/selo.png"
                alt="Selo Editorial Cronópios"
                width={360}
                height={240}
                className="h-auto w-full max-w-[260px] object-contain"
                priority
              />

              <p className="text-sm text-textSuave leading-relaxed">
                Iniciativa editorial vinculada aos grupos de pesquisa e extensão
                em História Intelectual da UFMG, dedicada à publicação
                científica em acesso aberto.
              </p>

              <div className="w-full pt-3 border-t border-gray-100 flex flex-col sm:flex-row lg:flex-col gap-2 text-sm">
                <Link
                  href="/selo-cronopios"
                  className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition font-medium"
                >
                  Sobre o Selo Editorial
                </Link>
                <Link
                  href="/selo-cronopios/publique-conosco"
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition font-medium"
                >
                  Publique conosco
                </Link>
              </div>
            </aside>

            {/* Colunas de Expediente */}
            <div className="lg:col-span-2 space-y-6">
              {/* Coordenação Geral */}
              <section className="bg-white rounded-xl shadow-sm border border-primary/10 p-6 sm:p-8">
                <h2 className="heading-h2 text-secondary border-b border-gray-100 pb-3 mb-5">
                  Coordenação Geral
                </h2>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-semibold text-base sm:text-lg text-text">
                    Adriane Vidal Costa
                  </p>
                  <p className="text-sm text-textSuave">UFMG, Brasil</p>
                </div>
              </section>

              {/* Conselho Editorial */}
              <section className="bg-white rounded-xl shadow-sm border border-primary/10 p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-100 pb-3 mb-6">
                  <h2 className="heading-h2 text-secondary">
                    Conselho Editorial
                  </h2>
                  <span className="text-xs text-textSuave">
                    {conselhoEditorial.length} membros
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {conselhoEditorial.map((membro) => (
                    <div
                      key={membro.nome}
                      className="border-l-2 border-secondary/40 pl-3.5 py-0.5"
                    >
                      <p className="font-medium text-sm sm:text-base text-text">
                        {membro.nome}
                      </p>
                      <p className="text-xs sm:text-sm text-textSuave">
                        {membro.instituicao}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {equipeComissao.length > 0 && (
                <section className="bg-white rounded-xl shadow-sm border border-primary/10 p-6 sm:p-8">
                  <h2 className="heading-h2 text-secondary border-b border-gray-100 pb-3 mb-5">
                    Comissão Editorial
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {equipeComissao.map((colaborador) => (
                      <div
                        key={`${colaborador.nome}-${colaborador.funcao}`}
                        className="border-l-2 border-primary/60 pl-3.5"
                      >
                        <p className="font-medium text-text">
                          {colaborador.nome}
                        </p>
                        <p className="text-xs sm:text-sm text-textSuave">
                          {colaborador.funcao}
                          {colaborador.instituicao
                            ? ` · ${colaborador.instituicao}`
                            : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {equipeTecnica.length > 0 && (
                <section className="bg-white rounded-xl shadow-sm border border-primary/10 p-6 sm:p-8">
                  <h2 className="heading-h2 text-secondary border-b border-gray-100 pb-3 mb-5">
                    Equipe Técnica
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {equipeTecnica.map((colaborador) => (
                      <div
                        key={`${colaborador.nome}-${colaborador.funcao}`}
                        className="border-l-2 border-primary/60 pl-3.5"
                      >
                        <p className="font-medium text-text">
                          {colaborador.nome}
                        </p>
                        <p className="text-xs sm:text-sm text-textSuave">
                          {colaborador.funcao}
                          {colaborador.instituicao
                            ? ` · ${colaborador.instituicao}`
                            : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

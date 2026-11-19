import Maintenance from '@/components/Maintenance';
import { Body } from '@/components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

export const metadata: Metadata = {
  title: {
    absolute:
      'História Intelectual: Pesquisa e Extensão | UFMG e Selo Cronópios',
  },
  description:
    'Plataforma colaborativa dos grupos de pesquisa e extensão em História Intelectual da UFMG e do Cronópios Selo Editorial, com e-books científicos gratuitos em acesso aberto.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'História Intelectual: Pesquisa e Extensão',
    description:
      'Plataforma colaborativa dos grupos de pesquisa e extensão em História Intelectual da UFMG e do Cronópios Selo Editorial.',
    images: [`${siteUrl}/logo-selo.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'História Intelectual: Pesquisa e Extensão',
    description:
      'E-books gratuitos em acesso aberto, pesquisa e extensão em História Intelectual (UFMG / Selo Cronópios).',
    images: [`${siteUrl}/logo-selo.png`],
  },
};

export default function Home() {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isMaintenance) {
    return <Maintenance />;
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'História Intelectual: Pesquisa e Extensão',
    alternateName: 'Cronópios Selo Editorial',
    url: siteUrl,
    logo: `${siteUrl}/logo-600.png`,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidade Federal de Minas Gerais (UFMG)',
      url: 'https://ufmg.br',
    },
    sameAs: [
      'https://www.instagram.com/selocronopios',
      'https://www.youtube.com/@selocron%C3%B3pios',
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
        urlTemplate: `${siteUrl}/busca?q={search_term_string}`,
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

      <div className="bg-background p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8 text-justify">
        <Body className="mt-4">
          Este site tem como objetivo funcionar como uma plataforma colaborativa
          interdisciplinar, reunindo pesquisadores, estudantes e profissionais
          diversas áreas. Seu propósito é fortalecer os vínculos institucionais
          acadêmicos em níveis nacional e internacional, incentivar a produção
          científica de excelência e promover a ampla e acessível disseminação
          conhecimento histórico junto à sociedade. Trata-se de uma iniciativa
          integra e articula dois grupos vinculados ao Departamento de História
          ao Programa de Pós-graduação em História da Universidade Federal de
          Minas Gerais: o Grupo de Pesquisa “História Intelectual: práticas,
          narrativas e circulação de ideias” (CNPq) e o Grupo “História
          Intelectual: pesquisa, extensão e divulgação científica” (CENEX/–
          Registro 405042).
        </Body>
        <h1 className="heading-h1 text-primary text-center">
          Grupo de Pesquisa “História Intelectual: práticas, narrativas e <br />{' '}
          circulação de ideias” (UFMG/CNPq)
        </h1>
        <Body>
          O Grupo de Pesquisa “História Intelectual: práticas, narrativas e
          circulação de ideias” (UFMG/CNPq), criado em 2020, tem contribuído de
          forma sistemática para o fortalecimento e a disseminação das
          investigações na área, bem como para a construção de caminhos que
          ampliem os debates sobre o tema, por meio do estabelecimento de com
          com pesquisadores em âmbitos nacional e internacional. O grupo será
          estruturado a partir de seis linhas norteadoras de suas atividades:
          Itinerários da História Intelectual: aportes teórico-metodológicos e
          historiografia; História Intelectual em perspectiva (trans)nacional:
          redes de sociabilidades, conexões e trânsitos; 3. História Intelectual
          esfera pública: educação, cidadania e instituições; História
          Intelectual e gênero: feminismos, sexualidades e interseccionalidades;
          Intelectual e decolonialidade: modernidade, autodeterminação e
          identidades; História Intelectual e culturas políticas: tradições,
          representações e imaginários.
        </Body>

        <Body>
          A equipe congrega pesquisadores – profissionais, docentes e discentes
          interessados em refletir, sob uma perspectiva interdisciplinar, acerca
          da História Intelectual em suas múltiplas abordagens, possibilitando,
          assim, a renovação das interpretações no campo da história das ideias
          políticas. As pesquisas desenvolvidas pelos membros abrangem diversas
          dimensões temáticas, conceituais e historiográficas, explorando fontes
          de naturezas variadas – como impressos, obras literárias, biografias,
          petições, manifestos, correspondências, ensaios, produções
          cinematográficas e musicológicas, entre outras – com o intuito de
          promover ampla discussão e difusão da produção acadêmica.
        </Body>

        <Body>
          O grupo organiza seminários de alcance nacional e internacional,
          editais para a apresentação de pesquisas, realiza conferências e
          exposições, além de fomentar o intercâmbio com outros grupos de
          congêêneres, tanto no Brasil quanto no exterior. Em síntese, o grupo
          busca consolidar-se como espaço de suporte às investigações na área,
          como à formação de novos pesquisadores.
        </Body>

        <h2 className="heading-h2 text-primary text-center">
          Grupo de história intelectual: pesquisa, extensão e divulgação
          <br />
          científica (CENEX/UFMG – Registro 405042)
        </h2>

        <Body>
          As atividades do Grupo de Pesquisa “História Intelectual: narrativas,
          práticas e circulação de ideias” foram significativamente ampliadas, o
          que motivou a criação, em 2024, do “Grupo de História Intelectual:
          pesquisa, extensão e divulgação científica”. Atuando na interface
          pesquisa, extensão e divulgação científica, o grupo busca ampliar os
          debates sobre o tema, estabelecendo conexões com pesquisadores e
          docentes em âmbito nacional e internacional e, de forma abrangente, o
          o público externo à academia – como escolas, associações culturais e
          movimentos sociais.
        </Body>

        <Body>
          O grupo reúne pesquisadores, estudantes de graduação e pós-graduação
          (inclusive egressos) da UFMG, além de participantes externos dedicados
          temas correlatos à História Intelectual. No campo da divulgação
          científica, promove eventos nacionais e internacionais e gerencia o
          Cronópios Selo Editorial, comprometido com a democratização do
          conhecimento produzido por pesquisadoras e pesquisadores da área. A
          proposta é publicar e-books de acesso gratuito, disponíveis para
          download neste site, constituindo um instrumento ágil de comunicação e
          de difusão de produções acadêmicas.
        </Body>

        <Body>
          Como ação de extensão, o grupo oferece cursos voltados à comunidade
          externa, com ênfase na formação continuada de professores interessados
          em atualizar seus saberes, abordando temas como cinema, literatura,
          ideias políticas e manifestações intelectuais e culturais. Também são
          organizadas oficinas e minicursos voltados à retomada das atividades
          pesquisa, com foco em renovação historiográfica, elaboração de
          metodologias investigativas. Além disso, propõe oficinas em escolas
          públicas de Belo Horizonte, destinadas a docentes interessados em
          explorar o cenário cultural da capital por meio do estudo da
          literatura, do cinema e da imprensa e a realização e promoção do
          podcast do grupo Intelecções e Contextus.
        </Body>

        <h2 className="heading-h2 text-primary text-center">
          Cronópios Selo Editorial
        </h2>

        <div className="flex justify-center">
          <Image
            src="/logo-selo.png"
            alt="Logo do Cronópios Selo Editorial"
            width={600}
            height={300}
            className="h-auto object-cover w-full max-w-md"
            priority
          />
        </div>

        <Body>
          A criação do selo editorial representa um passo importante para
          democratizar o acesso ao conhecimento acadêmico e valorizar a produção
          científica nacional. A disponibilização gratuita dos e-books amplia o
          alcance dessas pesquisas, promovendo a divulgação científica e
          contribuindo para a formação crítica e cidadã de leitores dentro e do
          do meio acadêmico.
        </Body>
        <Body>
          O selo editorial é destinado à divulgação de pesquisas científicas,
          fruto de dissertações e teses, por meio de e-books gratuitos
          organizados em seis coleções: Itinerários da História Intelectual;
          História Intelectual em Perspectiva (Trans)nacional; História
          Intelectual, Esfera Pública e Cultura Impressa; História Intelectual e
          Gênero; História Intelectual e Decolonialidade; e História Intelectual
          e Culturas Políticas.
        </Body>

        <Body>
          A coleção História Intelectual e Gênero contará com uma subcoleção
          intitulada Dicionário Biográfico de Mulheres Brasileiras, composta por
          livros que apresentam trajetórias de mulheres na universidade, na
          ciência, na política, nos movimentos sociais, entre outros campos. Os
          trabalhos serão selecionados por meio de editais previamente
          publicados no site, de acordo com as regras estabelecidas. Para saber
          mais,{' '}
          <Link href="/publique-conosco" className="text-primary underline">
            clique aqui
          </Link>
          .
        </Body>
      </div>
    </>
  );
}

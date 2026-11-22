import { Body } from '@/components/Typography';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

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

export default function SeloCronopiosPage() {
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
        name: 'Selo Editorial Cronópios ',
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

      <div className="bg-background p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8 text-justify">
        <h1 className="heading-h1 text-primary text-center">
          Selo Editorial Cronópios
        </h1>

        <div className="flex justify-center">
          <Image
            src="/logo-selo.png"
            alt="Logo do Selo Editorial Cronópios"
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
          contribuindo para a formação crítica e cidadã de leitores dentro e
          fora do meio acadêmico.
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

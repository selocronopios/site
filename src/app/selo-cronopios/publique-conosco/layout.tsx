import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

export const metadata: Metadata = {
  title: 'Publique Conosco | Selo Editorial Cronópios',
  description:
    'Submeta seu original para avaliação editorial do Selo Editorial Cronópios e História Intelectual (UFMG). Confira as diretrizes e envie sua obra.',
  alternates: {
    canonical: '/selo-cronopios/publique-conosco',
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/selo-cronopios/publique-conosco`,
    title: 'Publique Conosco | Selo Editorial Cronópios',
    description:
      'Submeta seu original em Word (.doc ou .docx) para avaliação editorial do Selo Editorial Cronópios (UFMG).',
    images: [`${siteUrl}/logo-selo.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publique Conosco | Selo Editorial Cronópios',
    description:
      'Submeta seu original em Word (.doc ou .docx) para avaliação editorial do Selo Editorial Cronópios (UFMG).',
    images: [`${siteUrl}/logo-selo.png`],
  },
};

export default function PubliqueConoscoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        name: 'Publique conosco',
        item: `${siteUrl}/selo-cronopios/publique-conosco`,
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
      {children}
    </>
  );
}

import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trilhaCompleta: BreadcrumbItem[] = [
    { label: 'Selo Editorial Cronópios', href: '/selo-cronopios' },
    { label: 'Acervo', href: '/selo-cronopios/acervo' },
    ...items,
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trilhaCompleta.map((passo, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: passo.label,
      item: `${siteUrl}${passo.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <nav
        aria-label="Navegação estrutural"
        className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-600 text-left"
      >
        {trilhaCompleta.map((passo, index) => {
          const isUltimo = index === trilhaCompleta.length - 1;

          return (
            <span key={passo.href} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-gray-400 select-none">
                  ›
                </span>
              )}

              {isUltimo ? (
                <span
                  aria-current="page"
                  title={passo.label}
                  className="font-semibold text-gray-900 truncate max-w-[240px] sm:max-w-md"
                >
                  {passo.label}
                </span>
              ) : (
                <Link
                  href={passo.href}
                  className="hover:text-primary hover:underline underline-offset-4 transition-colors"
                >
                  {passo.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}

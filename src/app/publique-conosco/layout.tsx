import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publique Conosco',
  description:
    'Submeta seu original para avaliação editorial do Selo Cronópios e História Intelectual (UFMG). Confira as diretrizes e envie sua obra.',
  alternates: {
    canonical: '/publique-conosco',
  },
};

export default function PubliqueConoscoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

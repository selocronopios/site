import Link from 'next/link';
import type { Metadata } from 'next';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaBookOpen,
  FaUniversity,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import CopiarEmailButton from '@/components/CopiarEmailButton';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://historiaintelectualufmg.com.br';

const EMAIL_CONTATO = 'infoselocronopios@gmail.com';

export const metadata: Metadata = {
  title: 'Contato — História Intelectual e Selo Editorial Cronópios',
  description:
    'Entre em contato com o Grupo de Pesquisa História Intelectual (UFMG) e o Selo Editorial Cronópios por e-mail ou acompanhe nossas redes sociais.',
  alternates: {
    canonical: '/contato',
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/contato`,
    title: 'Contato | História Intelectual e Selo Editorial Cronópios',
    description:
      'Canais oficiais de contato e redes sociais do Grupo de Pesquisa História Intelectual (UFMG) e do Selo Editorial Cronópios.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contato | História Intelectual e Selo Editorial Cronópios',
    description:
      'Canais oficiais de contato e redes sociais do Grupo de Pesquisa História Intelectual (UFMG) e do Selo Editorial Cronópios.',
  },
};

const redesSociais = [
  {
    name: 'Instagram',
    handle: '@selocronopios',
    description: 'Lançamentos de obras, chamadas e divulgação de eventos.',
    href: 'https://www.instagram.com/selocronopios',
    icon: FaInstagram,
    badgeClass:
      'bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white',
  },
  {
    name: 'YouTube',
    handle: '@selocronópios',
    description: 'Conferências, debates, mesas-redondas e lançamentos online.',
    href: 'https://www.youtube.com/@selocron%C3%B3pios',
    icon: FaYoutube,
    badgeClass:
      'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white',
  },
  {
    name: 'Facebook',
    handle: 'Selo Editorial Cronópios',
    description: 'Notícias, publicações e atividades do grupo de pesquisa.',
    href: 'https://www.facebook.com/people/Selo-Editorial-Cron%C3%B3pios/pfbid02o6pRAZX2bR4F4f3SvUkjSiADx8S9mAoErDNPA9pnE9sU5vTcw1Spsp6zALecxhiXl/',
    icon: FaFacebookF,
    badgeClass:
      'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  },
];

export default function ContatoPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contato — História Intelectual e Selo Editorial Cronópios',
    url: `${siteUrl}/contato`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Selo Editorial Cronópios — História Intelectual (UFMG)',
      url: siteUrl,
      email: EMAIL_CONTATO,
      sameAs: redesSociais.map((rede) => rede.href),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="min-h-screen bg-background text-text py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Cabeçalho */}
          <header className="max-w-2xl mx-auto text-center space-y-3">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Canais Oficiais
            </span>
            <h1 className="heading-h1 text-primary">Contato</h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Entre em contato com a equipe do Grupo de Pesquisa História
              Intelectual (UFMG) e do Selo Editorial Cronópios para dúvidas,
              informações institucionais ou parcerias acadêmicas.
            </p>
          </header>

          {/* Cartão principal de E-mail */}
          <section
            aria-labelledby="heading-email"
            className="rounded-2xl border border-primary/20 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary text-2xl">
                <FaEnvelope aria-hidden="true" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Atendimento por E-mail
                </span>
                <h2
                  id="heading-email"
                  className="text-lg sm:text-xl font-bold text-gray-900 break-all"
                >
                  {EMAIL_CONTATO}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Canal direto para assuntos institucionais, imprensa, eventos e
                  dúvidas sobre o catálogo.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={`mailto:${EMAIL_CONTATO}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                <FaEnvelope aria-hidden="true" />
                <span>Enviar e-mail</span>
              </a>

              <CopiarEmailButton email={EMAIL_CONTATO} />
            </div>
          </section>

          {/* Redes Sociais */}
          <section aria-labelledby="heading-redes" className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 id="heading-redes" className="heading-h2 text-text shrink-0">
                Redes Sociais
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {redesSociais.map((rede) => {
                const Icone = rede.icon;

                return (
                  <a
                    key={rede.name}
                    href={rede.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${rede.name} (${rede.handle})`}
                    className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between h-full"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-colors ${rede.badgeClass}`}
                        >
                          <Icone aria-hidden="true" />
                        </div>

                        <FaExternalLinkAlt
                          className="text-xs text-gray-400 group-hover:text-primary transition-colors"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-bold text-base text-gray-900 group-hover:text-primary transition-colors">
                          {rede.name}
                        </h3>
                        <p className="text-xs font-medium text-gray-500">
                          {rede.handle}
                        </p>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {rede.description}
                      </p>
                    </div>

                    <span className="mt-5 inline-flex items-center text-xs font-semibold text-primary group-hover:underline">
                      Acessar perfil →
                    </span>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Informações complementares */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg">
                <FaBookOpen aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h2 className="font-bold text-base text-gray-900">
                  Submissão de Originais
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Propostas de publicação para o Selo Editorial Cronópios devem
                  ser enviadas exclusivamente pelo formulário próprio, conforme
                  as diretrizes e o calendário editorial.
                </p>
                <div className="pt-1">
                  <Link
                    href="/selo-cronopios/publique-conosco"
                    className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
                  >
                    Ir para Publique Conosco →
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg">
                <FaUniversity aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h2 className="font-bold text-base text-gray-900">
                  Vinculação Institucional
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Departamento de História · Faculdade de Filosofia e Ciências
                  Humanas (FAFICH) — Universidade Federal de Minas Gerais
                  (UFMG), Belo Horizonte – MG.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

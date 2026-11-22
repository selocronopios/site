'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const linksRapidos = [
  { href: '/', label: 'Início' },
  { href: '/selo-cronopios', label: 'Selo Cronópios' },
  { href: '/selo-cronopios/acervo', label: 'Acervo' },
  { href: '/quem-somos-nos', label: 'Quem somos' },
  { href: '/contato', label: 'Contato' },
];

const redesSociaisGrupo = [
  {
    name: 'YouTube',
    ariaLabel: 'Canal do YouTube do Grupo História Intelectual UFMG',
    href: 'https://www.youtube.com/@historiaintelectualufmg8540',
    icon: FaYoutube,
  },
  {
    name: 'Facebook',
    ariaLabel: 'Página do Facebook do Grupo História Intelectual UFMG',
    href: 'https://www.facebook.com/historiaintelectualufmg',
    icon: FaFacebookF,
  },
  {
    name: 'Instagram',
    ariaLabel: 'Perfil do Instagram do Grupo História Intelectual UFMG',
    href: 'https://www.instagram.com/historiaintelectual/',
    icon: FaInstagram,
  },
];

export default function Footer() {
  const pathName = usePathname();
  const isAdmin = pathName?.startsWith('/admin');
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isAdmin || isMaintenance) return null;

  return (
    <footer className="bg-white border-t border-primary/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Identidade Institucional */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Logo História Intelectual UFMG"
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <div className="hidden sm:block h-8 w-px bg-gray-200" />
          <p className="text-xs text-gray-500 leading-snug max-w-[230px]">
            Departamento de História · Universidade Federal de Minas Gerais
            (UFMG)
          </p>
        </div>

        {/* Navegação Rápida */}
        <nav
          aria-label="Links do rodapé"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-600"
        >
          {linksRapidos.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Redes Sociais do Grupo */}
        <div className="flex items-center gap-3">
          {redesSociaisGrupo.map((rede) => {
            const Icone = rede.icon;
            return (
              <a
                key={rede.name}
                href={rede.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={rede.ariaLabel}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary text-lg hover:bg-primary hover:text-white transition-colors"
              >
                <Icone aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Faixa de Direitos Autorais */}
      <div className="bg-primary text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} História Intelectual: pesquisa e
            extensão. Todos os direitos reservados.
          </p>
          <span className="text-white/80 text-xs">CNPq · CENEX/UFMG</span>
        </div>
      </div>
    </footer>
  );
}

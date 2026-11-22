'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaSearch, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  {
    href: '/selo-cronopios',
    label: 'Selo Cronópios',
    subItems: [
      {
        href: '/selo-cronopios',
        label: 'Sobre o Selo',
      },
      {
        href: '/selo-cronopios/acervo',
        label: 'Acervo',
      },
      {
        href: '/selo-cronopios/publique-conosco',
        label: 'Publique conosco',
      },
      {
        href: '/selo-cronopios/equipe',
        label: 'Equipe',
      },
    ],
  },
  { href: '/quem-somos-nos', label: 'Quem somos nós' },
  { href: '/contato', label: 'Contato' },
];

export default function Header() {
  const pathName = usePathname();
  const currentPath = pathName ?? '';
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(false);

  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSubmenuOpen(false);
    setDesktopSubmenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDesktopSubmenuOpen(false);
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isMaintenance) return null;

  const isSubItemActive = (subHref: string) => {
    if (subHref === '/selo-cronopios') {
      return currentPath === '/selo-cronopios';
    }
    return currentPath === subHref || currentPath.startsWith(`${subHref}/`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (!trimmed) return;

    router.push(`/busca?query=${encodeURIComponent(trimmed)}`);
    setSearch('');
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-b border-primary/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-600.png"
            alt="Logo História Intelectual"
            width={200}
            height={67}
            className="h-auto w-40 sm:w-48 object-contain"
            priority
            sizes="(max-width: 640px) 160px, 192px"
          />
        </Link>

        {/* Desktop Menu */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-2 lg:gap-4 text-text"
        >
          {links.map((link) => {
            const isParentActive = link.subItems
              ? link.subItems.some((sub) => isSubItemActive(sub.href))
              : currentPath === link.href;

            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.subItems && setDesktopSubmenuOpen(true)
                }
                onMouseLeave={() =>
                  link.subItems && setDesktopSubmenuOpen(false)
                }
                onFocus={() => link.subItems && setDesktopSubmenuOpen(true)}
                onBlur={(e) => {
                  if (
                    link.subItems &&
                    !e.currentTarget.contains(e.relatedTarget as Node | null)
                  ) {
                    setDesktopSubmenuOpen(false);
                  }
                }}
              >
                <Link
                  href={link.href}
                  aria-current={currentPath === link.href ? 'page' : undefined}
                  aria-haspopup={link.subItems ? 'true' : undefined}
                  aria-expanded={link.subItems ? desktopSubmenuOpen : undefined}
                  onClick={(e) => {
                    setDesktopSubmenuOpen(false);
                    e.currentTarget.blur();
                  }}
                  className={`h-full px-3 lg:px-4 py-2 rounded-lg flex items-center gap-1.5 text-sm lg:text-base transition-colors ${
                    isParentActive
                      ? 'text-primary font-semibold'
                      : 'text-text hover:text-primary'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.subItems && (
                    <FaChevronDown
                      aria-hidden="true"
                      className={`text-xs transition-transform duration-200 ${
                        desktopSubmenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {link.subItems && (
                  <div
                    className={`transition-all duration-150 absolute left-0 top-full pt-1.5 w-56 z-50 ${
                      desktopSubmenuOpen
                        ? 'visible opacity-100 translate-y-0'
                        : 'invisible opacity-0 -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white border border-primary/20 rounded-xl shadow-lg py-1.5 overflow-hidden">
                      {link.subItems.map((sub) => {
                        const active = isSubItemActive(sub.href);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            aria-current={active ? 'page' : undefined}
                            onClick={(e) => {
                              setDesktopSubmenuOpen(false);
                              e.currentTarget.blur();
                            }}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              active
                                ? 'text-primary font-semibold bg-primary/5'
                                : 'text-text hover:text-primary hover:bg-background'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Search form desktop */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="flex items-center border border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 rounded-full px-3.5 py-1.5 ml-2 transition-all bg-background/40"
          >
            <input
              type="search"
              placeholder="Pesquisar..."
              aria-label="Pesquisar no site e no acervo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm text-text bg-transparent placeholder:text-textSuave w-36 lg:w-44"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="ml-2 text-primary hover:opacity-80 transition-opacity"
            >
              <FaSearch aria-hidden="true" />
            </button>
          </form>
        </nav>

        {/* Mobile Menu & Search Icons */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((prev) => !prev);
              setMenuOpen(false);
            }}
            className="text-text hover:text-primary p-2.5 rounded-lg transition-colors"
            aria-label={searchOpen ? 'Fechar busca' : 'Abrir busca'}
            aria-expanded={searchOpen}
          >
            {searchOpen ? (
              <FaTimes aria-hidden="true" />
            ) : (
              <FaSearch aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              const nextOpen = !menuOpen;
              setMenuOpen(nextOpen);
              setSearchOpen(false);
              if (nextOpen) {
                setSubmenuOpen(currentPath.startsWith('/selo-cronopios'));
              }
            }}
            className="text-text hover:text-primary p-2.5 rounded-lg transition-colors"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <FaTimes aria-hidden="true" />
            ) : (
              <FaBars aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 border-t border-gray-100 pt-2.5 bg-white">
          <form
            onSubmit={handleSearch}
            role="search"
            className="flex items-center border border-primary rounded-full px-3.5 py-1.5 bg-background/40"
          >
            <input
              type="search"
              placeholder="Pesquisar..."
              aria-label="Pesquisar no site e no acervo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="outline-none text-sm text-text bg-transparent placeholder:text-textSuave w-full"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="ml-2 text-primary"
            >
              <FaSearch aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Links */}
      {menuOpen && (
        <nav
          aria-label="Navegação mobile"
          className="md:hidden px-4 pb-4 pt-2 border-t border-gray-100 bg-white flex flex-col gap-1.5 text-text"
        >
          {links.map((link) => {
            const isParentActive = link.subItems
              ? link.subItems.some((sub) => isSubItemActive(sub.href))
              : currentPath === link.href;

            if (link.subItems) {
              return (
                <div key={link.href} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => {
                        setMenuOpen(false);
                        setSubmenuOpen(false);
                      }}
                      className={`flex-1 px-2 py-2 rounded-lg ${
                        isParentActive
                          ? 'text-primary font-semibold'
                          : 'text-text hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmenuOpen((prev) => !prev)}
                      aria-label={
                        submenuOpen
                          ? `Fechar submenu de ${link.label}`
                          : `Abrir submenu de ${link.label}`
                      }
                      aria-expanded={submenuOpen}
                      className="p-2.5 text-text hover:text-primary rounded-lg"
                    >
                      <FaChevronDown
                        aria-hidden="true"
                        className={`text-xs transition-transform duration-200 ${
                          submenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {submenuOpen && (
                    <div className="pl-3 ml-2 border-l-2 border-primary/30 flex flex-col gap-1 mt-1 mb-1">
                      {link.subItems.map((sub) => {
                        const active = isSubItemActive(sub.href);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            aria-current={active ? 'page' : undefined}
                            onClick={() => {
                              setMenuOpen(false);
                              setSubmenuOpen(false);
                            }}
                            className={`px-2.5 py-1.5 text-sm rounded-lg ${
                              active
                                ? 'text-primary font-semibold bg-primary/5'
                                : 'text-text hover:text-primary'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={currentPath === link.href ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-2 rounded-lg ${
                  currentPath === link.href
                    ? 'text-primary font-semibold'
                    : 'text-text hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

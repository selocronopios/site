'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaSearch, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(false);

  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === '') return;
    router.push(`/busca?query=${encodeURIComponent(search.trim())}`);
    setSearch('');
    setSearchOpen(false);
    setMenuOpen(false);
  };

  if (isMaintenance) return null;

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

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white border-b border-primary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-600.png"
            alt="Logo História Intelectual"
            width={200}
            height={67}
            className="object-contain"
            priority
            sizes="(max-width: 400px) 200px,
               (max-width: 768px) 400px,
               600px"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4 text-text">
          {links.map((link) => {
            const isParentActive =
              pathName === link.href ||
              link.subItems?.some((sub) => pathName === sub.href);

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
                  onClick={(e) => {
                    setDesktopSubmenuOpen(false);
                    e.currentTarget.blur();
                  }}
                  className={`h-full px-4 py-2 flex items-center gap-1.5 ${
                    isParentActive
                      ? 'text-primary font-semibold'
                      : 'text-text hover:text-primary'
                  }`}
                >
                  {link.label}
                  {link.subItems && (
                    <FaChevronDown
                      className={`text-xs transition-transform duration-200 ${
                        desktopSubmenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {link.subItems && (
                  <div
                    className={`transition-all duration-150 absolute left-0 top-full pt-1 w-52 z-50 ${
                      desktopSubmenuOpen
                        ? 'visible opacity-100'
                        : 'invisible opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white border border-primary/20 rounded-md shadow-lg py-1">
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={(e) => {
                            setDesktopSubmenuOpen(false);
                            e.currentTarget.blur();
                          }}
                          className={`block px-4 py-2 text-sm ${
                            pathName === sub.href
                              ? 'text-primary font-semibold bg-background'
                              : 'text-text hover:text-primary hover:bg-background'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Search form desktop */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-primary rounded px-2 py-1 ml-4"
          >
            <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm text-text bg-transparent placeholder:text-textSuave"
            />
            <button type="submit" className="ml-2 text-primary">
              <FaSearch />
            </button>
          </form>
        </nav>

        {/* Mobile Menu & Search Icons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-text p-2"
            aria-label="Buscar"
          >
            <FaSearch />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text p-2"
            aria-label="Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-2 animate-slide-down">
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-primary rounded px-2 py-1"
          >
            <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm text-text bg-transparent placeholder:text-textSuave w-full"
            />
            <button type="submit" className="ml-2 text-primary">
              <FaSearch />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Links */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-2 text-text animate-slide-down">
          {links.map((link) => {
            const isParentActive =
              pathName === link.href ||
              link.subItems?.some((sub) => pathName === sub.href);

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
                      className={`flex-1 px-2 py-2 rounded ${
                        isParentActive
                          ? 'text-primary font-semibold'
                          : 'text-text hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmenuOpen(!submenuOpen)}
                      aria-label={`Abrir submenu de ${link.label}`}
                      className="p-2 text-text hover:text-primary"
                    >
                      <FaChevronDown
                        className={`text-xs transition-transform duration-200 ${
                          submenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {submenuOpen && (
                    <div className="pl-4 ml-2 border-l-2 border-primary/30 flex flex-col gap-1 mt-1">
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => {
                            setMenuOpen(false);
                            setSubmenuOpen(false);
                          }}
                          className={`px-2 py-1.5 text-sm rounded ${
                            pathName === sub.href
                              ? 'text-primary font-semibold'
                              : 'text-text hover:text-primary'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-2 rounded ${
                  pathName === link.href
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

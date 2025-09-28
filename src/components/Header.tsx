'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isAdmin = pathName.startsWith('/admin');
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === '') return;
    router.push(`/busca?query=${encodeURIComponent(search.trim())}`);
    setSearch('');
    setSearchOpen(false);
    setMenuOpen(false);
  };

  if (isAdmin || isMaintenance) return null;

  const links = [
    { href: '/quem-somos-nos', label: 'Quem somos nós' },
    { href: '/publique-conosco', label: 'Publique conosco' },
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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`h-full px-4 py-2 flex items-center ${
                pathName === link.href
                  ? 'text-primary font-semibold'
                  : 'text-text hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}

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
          {links.map((link) => (
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
          ))}
        </nav>
      )}
    </header>
  );
}

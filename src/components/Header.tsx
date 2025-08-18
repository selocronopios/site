'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const isAdmin = pathName.startsWith('/admin');
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === '') return;

    // Redireciona para a página de busca com a query
    router.push(`/busca?query=${encodeURIComponent(search.trim())}`);
    setSearch(''); // opcional: limpa o input após a busca
  };

  if (isAdmin || isMaintenance) return null;

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white border-b border-primary">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-4 flex-wrap">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-site2.png"
            alt="Logo História Intelectual"
            width={180}
            height={200}
          />
        </Link>
        <nav className="flex items-center flex-wrap gap-4 text-text">
          <Link
            href="/colecoes"
            className={`h-full px-4 flex items-center ${
              pathName === '/colecoes'
                ? 'text-primary font-semibold'
                : 'text-text hover:text-primary'
            }`}
          >
            Coleções
          </Link>
          <Link
            href="/quem-somos-nos"
            className={`h-full px-4 flex items-center ${
              pathName === '/quem-somos-nos'
                ? 'text-primary font-semibold'
                : 'text-text hover:text-primary'
            }`}
          >
            Quem somos nós
          </Link>
          <Link
            href="/publique-conosco"
            className={`h-full px-4 flex items-center ${
              pathName === '/publique-conosco'
                ? 'text-primary font-semibold'
                : 'text-text hover:text-primary'
            }`}
          >
            Publique conosco
          </Link>
          <Link
            href="/contato"
            className={`h-full px-4 flex items-center ${
              pathName === '/contato'
                ? 'text-primary font-semibold'
                : 'text-text hover:text-primary'
            }`}
          >
            Contato
          </Link>
        </nav>

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
      </div>
    </header>
  );
}

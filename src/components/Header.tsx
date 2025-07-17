'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === '') return;
    // redireciona ou faz algo com o termo de busca
    // console.log('Buscando por:', search);
  };
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white border-b border-primary">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-site2.png"
            alt="Logo História Intelectual"
            width={180}
            height={200}
            // className="h-12 w-auto"
          />
        </Link>
        <nav className="space-x-4 text-text">
          <Link href="/">Início</Link>
          <Link href="/colecoes">Coleções</Link>
          <Link href="/quem-somos-nos">Quem somos nós</Link>
          <Link href="/publique-conosco">Publique conosco</Link>
          <Link href="/contato">Contato</Link>
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

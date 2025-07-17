'use client';

import { useState, useEffect } from 'react';
import LogoutButton from './LogoutButton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Botão hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5 bg-primary text-white rounded"
        aria-label="Menu"
      >
        <span
          className={`block h-1 w-6 bg-white rounded transition-transform origin-left ${
            menuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block h-1 w-6 bg-white rounded transition-opacity ${
            menuOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`block h-1 w-6 bg-white rounded transition-transform origin-left ${
            menuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative top-0 left-0 w-64 h-screen
            bg-selectionLight text-text flex flex-col justify-between
            transform transition-transform duration-300 ease-in-out z-50
            ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:flex
          `}
        >
          {/* Conteúdo do menu */}
          <div className="p-4">
            <h2 className="heading-h1 mb-6">Admin Painel</h2>
            <nav className="flex flex-col gap-2">
              <a href="/admin" className="body">
                Dashboard
              </a>
              <a href="/admin/collections" className="body">
                Coleções
              </a>
              <a href="/admin/ebooks" className="body">
                Ebooks
              </a>
              <a href="/admin/config" className="body">
                Configurações
              </a>
            </nav>
          </div>

          {/* Botão sair colado no rodapé */}
          <div className="p-4">
            <div className="w-full">
              <LogoutButton />
            </div>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </>
  );
}

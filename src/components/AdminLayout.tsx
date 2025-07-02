'use client';

import LogoutButton from './LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#E2A249] p-4 text-white">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <a href="/admin" className="font-semibold">Dashboard</a>
          <a href="/admin/collections">Coleções</a>
          <a href="/admin/ebooks">Ebooks</a>
          <a href="/admin/team">Equipe</a>
          <a href="/admin/config">Configurações</a>
        </nav>
        <div className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 self-start mt-6">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

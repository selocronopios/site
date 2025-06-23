// src/components/AdminLayout.tsx
import LogoutButton from './LogoutButton';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#E2A249] p-4 text-white">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/team">Equipe</Link>
          <Link href="/admin/ebooks">Ebooks</Link>
          <Link href="/admin/media">Mídias</Link>
        </nav>
        <div className="mt-10">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

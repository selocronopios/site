import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export default async function AdminPage({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  // const supabase = createServerSupabaseClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  return  (
    <div className="flex">
      {/* Menu lateral fixo */}
      <aside className="w-64 bg-gray-100 h-screen p-4">
        <nav className="flex flex-col gap-2">
          <a href="/admin" className="font-semibold">Dashboard</a>
          <a href="/admin/collections">Coleções</a>
          <a href="/admin/ebooks">Ebooks</a>
          <a href="/admin/team">Equipe</a>
          <a href="/admin/config">Configurações</a>
        </nav>
      </aside>

      {/* Conteúdo da página */}
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
  )
}

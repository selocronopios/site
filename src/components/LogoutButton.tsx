'use client';

import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabaseClient';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabaseClient.auth.signOut();
    router.push('/admin/login');
  }

  return <button onClick={handleLogout}>Sair</button>;
}

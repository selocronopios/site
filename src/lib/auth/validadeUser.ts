// lib/auth/validateUser.ts
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

export async function validateUser(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  // 1. Tenta autenticar via token (ex: Insomnia)
  if (token) {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data?.user) {
      return null;
    }
    return data.user;
  }

  // 2. Se não houver token, tenta via cookie (painel admin)
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return null;
  }

  return data.user;
}

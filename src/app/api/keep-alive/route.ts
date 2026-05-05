import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  // 1. Validar se a requisição tem a chave secreta de Cron para evitar abuso público
  const { searchParams } = new URL(req.url);
  const cronToken = searchParams.get('token');

  if (cronToken !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // 2. Fazer uma query extremamente simples e rápida para bater no banco do supabaseClient
    // Substitua 'profiles' ou 'users' por qualquer tabela real que você tenha
    const { error } = await supabaseClient.from('ebooks').select('id').limit(1);

    if (error) throw error;

    return NextResponse.json({
      status: 'ok',
      message: 'supabaseClient acordado com sucesso!',
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao conectar ao banco', err },
      { status: 500 }
    );
  }
}

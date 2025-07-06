import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { handleSupabaseError, validateUUID } from '@/lib/utils';
import { logError } from '@/lib/logger';

export async function GET(req: NextRequest) {
  // Extrai o id da url manualmente:
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const collectionId = parts[parts.indexOf('collections') + 1];

  const idError = validateUUID(collectionId);
  if (idError) {return NextResponse.json({ error: idError }, { status: 400 });}

  try {
    const { data, error } = await supabaseAdmin
      .from('ebooks')
      .select('id, title, collection_id')
      .eq('collection_id', collectionId);

    if (error) {return handleSupabaseError(error);}

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    logError('Erro inesperado:', err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

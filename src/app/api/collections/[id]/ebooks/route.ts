import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { handleSupabaseError, validateUUID } from '@/lib/utils';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const collectionId = params?.id?.trim();
  const idError = validateUUID(collectionId)
  if (idError) return NextResponse.json({ error: idError }, { status: 400 })

  // if (!collectionId) {
  //   return NextResponse.json({ error: 'ID da coleção é obrigatório' }, { status: 400 });
  // }

  try {
    const { data, error } = await supabaseAdmin
      .from('ebooks')
      .select('id, title, collection_id')
      .eq('collection_id', collectionId);

    if (error) return handleSupabaseError(error)

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Erro inesperado:', err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}

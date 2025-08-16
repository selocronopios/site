// src/app/api/media/signed-url/[id]/route.ts
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextRequest, NextResponse } from 'next/server';
import { handleSupabaseError, validateUUID } from '@/lib/validacoes';
import { logError } from '@/lib/logger';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const id = parts[parts.indexOf('signed-url') + 1]?.trim();
  const idError = validateUUID(id);
  if (idError) {
    return NextResponse.json({ error: idError }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('media_files')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return handleSupabaseError(error);
    }

    const { bucket, path } = data;

    const { data: selectData, error: selectError } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUrl(path, 60 * 10);

    if (selectError) {
      if (selectError.message === 'Object not found') {
        return NextResponse.json({ error: 'não encontrada' }, { status: 404 });
      } else {
        return NextResponse.json(
          { error: selectError.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ url: selectData.signedUrl });
  } catch (err) {
    logError(err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

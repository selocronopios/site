import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { handleSupabaseError, validateUUID } from '@/lib/validacoes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const collectionId = parts[parts.indexOf('collections') + 1];

  const idError = validateUUID(collectionId);
  if (idError) {
    return NextResponse.json({ error: idError }, { status: 400 });
  }

  try {
    const { data: ebooks, error: ebookError } = await supabaseAdmin
      .from('ebooks')
      .select('id, title, link')
      .eq('collection_id', collectionId);

    if (ebookError) {
      return handleSupabaseError(ebookError);
    }

    const { data: children, error: childrenError } = await supabaseAdmin
      .from('collections')
      .select('id, name')
      .eq('id_pai', collectionId);

    if (childrenError) {
      return handleSupabaseError(childrenError);
    }

    return NextResponse.json({
      ebooks,
      childCollections: children,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Erro no servidor: ${err}` },
      { status: 500 }
    );
  }
}

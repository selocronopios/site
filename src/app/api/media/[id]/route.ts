// src/app/api/media/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { validateUser } from '@/lib/auth/validadeUser';
import { validateUUID, handleSupabaseError } from '@/lib/validacoes';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const id = parts[parts.indexOf('media') + 1]?.trim();
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

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `Erro no servidor: ${err}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const user = await validateUser(req);

  if (!user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const id = parts[parts.indexOf('media') + 1]?.trim();
  const idError = validateUUID(id);
  if (idError) {
    return NextResponse.json({ error: idError }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('media_files')
      .select('bucket, path')
      .eq('id', id)
      .single();

    if (error) {
      return handleSupabaseError(error);
    } else {
      const { error: deleteStorageError } = await supabaseAdmin.storage
        .from(data.bucket)
        .remove([data.path]);

      if (deleteStorageError) {
        return NextResponse.json(
          { error: deleteStorageError.message },
          { status: 500 }
        );
      }

      const { error: deleteDbError } = await supabaseAdmin
        .from('media_files')
        .delete()
        .eq('id', id);

      if (deleteDbError) {
        return NextResponse.json(
          { error: deleteDbError.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: 'Deletado com sucesso' },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Erro no servidor: ${err}` },
      { status: 500 }
    );
  }
}

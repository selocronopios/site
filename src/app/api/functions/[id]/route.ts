import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { validateUser } from '@/lib/auth/validadeUser';
import {
  validateUUID,
  handleSupabaseError,
  validateFieldType,
} from '@/lib/utils';
import { logError } from '@/lib/logger';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const id = parts[parts.indexOf('functions') + 1]?.trim();
  const idError = validateUUID(id);
  if (idError) {
    return NextResponse.json({ error: idError }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('functions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return handleSupabaseError(error);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    logError('Erro inesperado:', err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

interface UpdateBody {
  description?: string;
  group_type?: number;
}

export async function PUT(req: NextRequest) {
  const user = await validateUser(req);

  if (!user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const id = parts[parts.indexOf('functions') + 1]?.trim();
  const idError = validateUUID(id);
  if (idError) {
    return NextResponse.json({ error: idError }, { status: 400 });
  }

  let body: UpdateBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'JSON inválido no corpo da requisição' },
      { status: 400 }
    );
  }

  const { description, group_type } = body;

  if (description === undefined && group_type === undefined) {
    return NextResponse.json({ error: 'Nada para atualizar' }, { status: 400 });
  }

  const errors: Record<string, string> = {};

  const descriptionError = validateFieldType(
    description,
    'string',
    'description',
    { required: false, nullable: false }
  );
  if (descriptionError) {
    errors.description = descriptionError;
  }

  const group_typeError = validateFieldType(
    group_type,
    'number',
    'group_type',
    { required: false, nullable: false }
  );
  if (group_typeError) {
    errors.group_type = group_typeError;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  const updates: UpdateBody & { updated_at: string } = {
    updated_at: new Date().toISOString(),
    ...(description !== undefined ? { description } : {}),
    ...(group_type !== undefined ? { group_type } : {}),
  };

  try {
    const { data, error } = await supabaseAdmin
      .from('functions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return handleSupabaseError(error);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    logError(err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await validateUser(req);

  if (!user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  const id = parts[parts.indexOf('functions') + 1]?.trim();
  const idError = validateUUID(id);
  if (idError) {
    return NextResponse.json({ error: idError }, { status: 400 });
  }

  try {
    const { error } = await supabaseAdmin
      .from('functions')
      .select('id')
      .eq('id', id)
      .single();

    if (error) {
      return handleSupabaseError(error);
    }

    const { error: deleteError } = await supabaseAdmin
      .from('functions')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: 'Deletado com sucesso' },
      { status: 200 }
    );
  } catch (err) {
    logError(err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

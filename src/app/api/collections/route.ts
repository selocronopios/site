//src/app/api/collections/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import {
  isValidUUID,
  handleSupabaseError,
  validateFieldType,
} from '@/lib/validacoes';
import { validateUser } from '@/lib/auth/validadeUser';
import { logError } from '@/lib/logger';

interface UpdateBody {
  id_pai?: string | null;
  name?: string;
  description?: string;
}

export async function POST(req: NextRequest) {
  const user = await validateUser(req);

  if (!user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
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

  const { id_pai, name, description } = body;

  const errors: Record<string, string> = {};

  const idPaiError = validateFieldType(id_pai, 'string', 'id_pai', {
    required: true,
    nullable: true,
  });
  if (idPaiError) {
    errors.id_pai = idPaiError;
  } else if (id_pai !== null && id_pai !== undefined && !isValidUUID(id_pai)) {
    errors.id_pai = 'ID do pai inválido';
  }

  const nameError = validateFieldType(name, 'string', 'name', {
    required: true,
    nullable: false,
  });
  if (nameError) {
    errors.name = nameError;
  }

  const descriptionError = validateFieldType(
    description,
    'string',
    'description',
    { required: true, nullable: false }
  );
  if (descriptionError) {
    errors.description = descriptionError;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('collections')
      .insert([{ id_pai, name, description }])
      .select();

    if (error) {
      return handleSupabaseError(error);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    logError(err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id_pai = url.searchParams.get('id_pai');

    let query = supabaseAdmin
      .from('collections')
      .select('*, ebooks(*)')
      .order('name', { ascending: true });
    if (id_pai) {
      query = query.eq('id_pai', id_pai);
    }

    const { data, error } = await query;

    if (error) {
      logError('Erro do Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    logError(err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

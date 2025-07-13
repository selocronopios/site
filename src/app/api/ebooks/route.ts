import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import {
  isValidUUID,
  handleSupabaseError,
  validateFieldType,
} from '@/lib/utils';
import { validateUser } from '@/lib/auth/validadeUser';
import { logError } from '@/lib/logger';

interface UpdateBody {
  title?: string;
  subtitle?: string | null;
  authors?: string;
  authorship?: string;
  summary?: string;
  details?: string;
  year?: number;
  description?: string;
  file_id?: string;
  cover_id?: string;
  // link?: string | null;
  collection_id?: string;
  keywords?: string;
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

  const {
    title,
    subtitle,
    authors,
    authorship,
    summary,
    details,
    year,
    description,
    file_id,
    cover_id,
    // link,
    collection_id,
    keywords,
  } = body;

  const errors: Record<string, string> = {};

  const titleError = validateFieldType(title, 'string', 'title', {
    required: true,
    nullable: false,
  });
  if (titleError) {
    errors.title = titleError;
  }

  const subtitleError = validateFieldType(subtitle, 'string', 'subtitle', {
    required: true,
    nullable: true,
  });
  if (subtitleError) {
    errors.subtitle = subtitleError;
  }

  const authorsError = validateFieldType(authors, 'string', 'authors', {
    required: true,
    nullable: false,
  });
  if (authorsError) {
    errors.authors = authorsError;
  }

  const authorshipError = validateFieldType(
    authorship,
    'string',
    'authorship',
    { required: true, nullable: false }
  );
  if (authorshipError) {
    errors.authorship = authorshipError;
  }

  const summaryError = validateFieldType(summary, 'string', 'summary', {
    required: true,
    nullable: false,
  });
  if (summaryError) {
    errors.summary = summaryError;
  }

  const detailsError = validateFieldType(details, 'string', 'details', {
    required: true,
    nullable: false,
  });
  if (detailsError) {
    errors.summary = detailsError;
  }

  let yearFinal = 0;

  if (typeof year === 'string') {
    yearFinal = parseInt(year, 10);
  } else if (typeof year === 'number') {
    yearFinal = year;
  }

  const yearError = validateFieldType(yearFinal, 'number', 'year', {
    required: true,
    nullable: false,
  });
  if (yearError) {
    errors.year = yearError;
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

  const file_idError = validateFieldType(file_id, 'string', 'file_id', {
    required: true,
    nullable: false,
  });
  if (file_idError) {
    errors.file_id = file_idError;
  } else if (
    file_id !== null &&
    file_id !== undefined &&
    !isValidUUID(file_id)
  ) {
    errors.file_id = 'ID do file_id inválido';
  }

  const cover_idError = validateFieldType(cover_id, 'string', 'cover_id', {
    required: true,
    nullable: false,
  });
  if (cover_idError) {
    errors.cover_id = cover_idError;
  } else if (
    cover_id !== null &&
    cover_id !== undefined &&
    !isValidUUID(cover_id)
  ) {
    errors.cover_id = 'ID do cover_id inválido';
  }

  // const linkError = validateFieldType(link, 'string', 'link', {
  //   required: true,
  //   nullable: true,
  // });
  // if (linkError) {
  //   errors.link = linkError;
  // }

  const collection_idError = validateFieldType(
    collection_id,
    'string',
    'collection_id',
    { required: true, nullable: false }
  );
  if (collection_idError) {
    errors.collection_id = collection_idError;
  } else if (
    collection_id !== null &&
    collection_id !== undefined &&
    !isValidUUID(collection_id)
  ) {
    errors.collection_id = 'ID do collection_id inválido';
  }

  const keywordsError = validateFieldType(keywords, 'string', 'keywords', {
    required: true,
    nullable: false,
  });
  if (keywordsError) {
    errors.keywords = keywordsError;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('ebooks')
      .insert([
        {
          title,
          subtitle,
          authors,
          authorship,
          summary,
          details,
          year: yearFinal,
          description,
          file_id,
          cover_id,
          // link,
          collection_id,
          keywords,
        },
      ])
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

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('ebooks')
      .select(
        `
        *,
        collections (
          name
        )`
      )
      .order('title', { ascending: true });

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

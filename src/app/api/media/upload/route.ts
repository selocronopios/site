import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { validateUser } from '@/lib/auth/validadeUser';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const user = await validateUser(req);

  if (!user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const file = formData.get('file') as File | null;
    const bucket = formData.get('bucket') as string | null;
    const folder = formData.get('folder') as string | null;

    if (!file || !bucket || !folder) {
      return NextResponse.json(
        { error: 'Arquivo, bucket e pasta obrigatórios' },
        { status: 400 }
      );
    }

    // pega buffer do arquivo
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const fileName = `${randomUUID()}-${file.name}`;
    const path = `${folder}/${fileName}`;

    // upload no supabase
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // insere registro no banco
    const { data, error: insertError } = await supabaseAdmin
      .from('media_files')
      .insert([{ path, bucket, type: file.type, size: file.size }])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { parseForm } from '@/lib/parseForm'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { validateUser } from '@/lib/auth/validadeUser'
import { randomUUID } from 'crypto'
import fs from 'fs'

export async function POST(req: NextRequest) {
  const user = await validateUser(req)

  if (!user) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }


  let fields, files
  try {
    ({ fields, files } = await parseForm(req))
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Erro ao processar formulário' }, { status: 400 })
  }

  const file = (files.file as any)[0]
  const bucket = (fields.bucket as string[])[0]
  const folder = (fields.folder as string[])[0]

  if (!file || !bucket || !folder) {
    return NextResponse.json({ error: 'Arquivo, bucket e pasta obrigatórios' }, { status: 400 })
  }

  const fileBuffer = fs.readFileSync(file.filepath)
  const path = `${folder}/${randomUUID()}-${file.originalFilename}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, fileBuffer, {
      contentType: file.mimetype || 'application/octet-stream',
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { data, error: insertError } = await supabaseAdmin
    .from('media_files')
    .insert([{ path, bucket, type: file.mimetype, size: file.size }])
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

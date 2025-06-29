// app/api/media/signed-url/route.ts
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { NextRequest, NextResponse } from 'next/server'
import { validateUUID } from '@/lib/utils'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params?.id?.trim()
  const idError = validateUUID(id)
  if (idError) return NextResponse.json({ error: idError }, { status: 400 })

  try {
    const { data, error } = await supabaseAdmin
      .from('media_files')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
    console.error('Erro do Supabase:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { bucket, path } = data
    
    const { data: selectData, error: selectError } = await supabaseAdmin
      .storage
      .from(bucket)
      .createSignedUrl(path, 60 * 10)

    if (selectError) {
    return NextResponse.json({ error: selectError.message }, { status: 500 })
    }

    return NextResponse.json({ url: selectData.signedUrl })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }

}
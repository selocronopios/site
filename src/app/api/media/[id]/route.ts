// src/app/api/media/[id]/route.ts
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { isValidUUID, validateUUID, handleSupabaseError, validateFieldType } from '@/lib/utils'

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

    if (error) return handleSupabaseError(error)

    return NextResponse.json( data, { status: 200 })

  } catch (err) {
    console.error('Erro inesperado:', err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params?.id?.trim()
  const idError = validateUUID(id)
  if (idError) return NextResponse.json({ error: idError }, { status: 400 })

  try {
    const { data, error } = await supabaseAdmin
      .from('media_files')
      .select('bucket, path')
      .eq('id', id)
      .single()

    if (error) { 
      return handleSupabaseError(error)
    } else {
      const { error: deleteStorageError } = await supabaseAdmin
      .storage
      .from(data.bucket)
      .remove([data.path])
      
      if(deleteStorageError) return NextResponse.json({ error: deleteStorageError.message }, { status: 500 })
          
      const { error: deleteDbError } = await supabaseAdmin
          .from('media_files')
          .delete()
          .eq('id', id)
      
      if (deleteDbError) return NextResponse.json({ error: deleteDbError.message }, { status: 500 })
      return NextResponse.json({ message: 'Deletado com sucesso' }, { status: 200 })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}

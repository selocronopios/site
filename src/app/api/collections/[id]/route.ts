//src/app/api/collections/[id]/route.ts
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { isValidUUID, validateUUID, handleSupabaseError, validateFieldType } from '@/lib/utils'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params?.id?.trim()
  const idError = validateUUID(id)
  if (idError) return NextResponse.json({ error: idError }, { status: 400 })

  try {
    const { data, error } = await supabase
      .from('collections')
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

interface UpdateBody {
  id_pai?: string | null
  name?: string
  description?: string
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params?.id?.trim()
  const idError = validateUUID(id)
  if (idError) return NextResponse.json({ error: idError }, { status: 400 })

  let body: UpdateBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido no corpo da requisição' }, { status: 400 })
  }

  const { id_pai, name, description } = body

  if (id_pai === undefined && name === undefined && description === undefined) {
    return NextResponse.json({ error: 'Nada para atualizar' }, { status: 400 })
  }  

  const errors: Record<string, string> = {}

  const idPaiError = validateFieldType(id_pai, 'string', 'id_pai', { required: false, nullable: true })
  if (idPaiError) {
    errors.id_pai = idPaiError
  } else if (id_pai !== null && id_pai !== undefined && !isValidUUID(id_pai)) {
    errors.id_pai = 'ID do pai inválido'
  }

  const nameError = validateFieldType(name, 'string', 'name', { required: false, nullable: false })
  if (nameError) errors.name = nameError

  const descriptionError = validateFieldType(description, 'string', 'description', { required: false, nullable: false })
  if (descriptionError) errors.description = descriptionError

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: errors }, { status: 400 })
  }

  const updates: Record<string, any> = {
    updated_at: new Date().toISOString(),
    ...(id_pai !== undefined ? { id_pai } : {}),
    ...(name !== undefined ? { name } : {}),
    ...(description !== undefined ? { description } : {}),
  }

  try {
    const { data, error } = await supabase
      .from('collections')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) return handleSupabaseError(error)

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params?.id?.trim()
  const idError = validateUUID(id)
  if (idError) return NextResponse.json({ error: idError }, { status: 400 })

  try {
    const { error } = await supabase
      .from('collections')
      .select('id')
      .eq('id', id)
      .single()

    if (error) return handleSupabaseError(error)

    const { error: deleteError } = await supabase
      .from('collections')
      .delete()
      .eq('id', id)

    if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 })
    return NextResponse.json({ message: 'Deletado com sucesso' }, { status: 200 })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}
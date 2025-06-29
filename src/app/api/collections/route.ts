//src/app/api/collections/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { isValidUUID, handleSupabaseError, validateFieldType } from '@/lib/utils'

interface UpdateBody {
  id_pai?: string | null
  name?: string
  description?: string
}

export async function POST(req: Request) {
  let body: UpdateBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido no corpo da requisição' }, { status: 400 })
  }

  const { id_pai, name, description } = body

  const errors: Record<string, string> = {}
  
  const idPaiError = validateFieldType(id_pai, 'string', 'id_pai', { required: true, nullable: true })
  if (idPaiError) {
    errors.id_pai = idPaiError
  } else if (id_pai !== null && id_pai !== undefined && !isValidUUID(id_pai)) {
    errors.id_pai = 'ID do pai inválido'
  }

  const nameError = validateFieldType(name, 'string', 'name', { required: true, nullable: false })
  if (nameError) errors.name = nameError

  const descriptionError = validateFieldType(description, 'string', 'description', { required: true, nullable: false })
  if (descriptionError) errors.description = descriptionError

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: errors }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from('collections')
      .insert([{ id_pai, name, description }])
      .select()

    if (error) return handleSupabaseError(error)

    return NextResponse.json( data, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select()

    if (error) {
      console.error('Erro do Supabase:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}
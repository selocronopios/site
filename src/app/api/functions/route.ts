import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { validateUser } from '@/lib/auth/validadeUser'
import { validateFieldType } from '@/lib/utils'

interface UpdateBody {
  description?: string
  group_type?: number
}

export async function POST(req: NextRequest) {
  const user = await validateUser(req)

  if (!user) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }

  let body: UpdateBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido no corpo da requisição' }, { status: 400 })
  }

  const { description, group_type } = body
  const errors: Record<string, string> = {}

  const descriptionError = validateFieldType(description, 'string', 'description', {
    required: true,
    nullable: false,
  })
  if (descriptionError) errors.description = descriptionError

  const group_typeError = validateFieldType(group_type, 'number', 'group_type', {
    required: true,
    nullable: false,
  })
  if (group_typeError) {
    errors.group_type = group_typeError
  } else if (typeof group_type !== 'number' || group_type < 1 || group_type > 3) {
    errors.group_type = 'Grupo inválido'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: errors }, { status: 400 })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('functions')
      .insert([{ description, group_type }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}


export async function GET(req: Request) {
  try {
    const { data, error } = await supabaseAdmin
      .from('functions')
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json( data, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}
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
      .from('ebooks')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return handleSupabaseError(error)

    return NextResponse.json({ data }, { status: 200 })

  } catch (err) {
    console.error('Erro inesperado:', err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}

interface UpdateBody {
  title?: string
  subtitle?: string | null
  authors?: string
  authorship?: string
  summary?: string
  details?: string
  year?: number
  description?: string 
  file_id?: string
  cover_id?: string
  link?: string | null
  collection_id?: string
  keywords?: string
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
  
  const { title, subtitle, authors, authorship, summary, details, year, description, file_id, cover_id, link, collection_id, keywords } = body

  if ( title === undefined && subtitle === undefined && authors === undefined && authorship === undefined && summary === undefined && details === undefined && year === undefined && description === undefined && file_id === undefined && cover_id === undefined && collection_id === undefined && keywords === undefined) {
    return NextResponse.json({ error: 'Nada para atualizar' }, { status: 400 })
  }

  const errors: Record<string, string> = {}

  const titleError = validateFieldType(title, 'string', 'title', { required: false, nullable: false })
  if (titleError) errors.title = titleError

  const subtitleError = validateFieldType(subtitle, 'string', 'subtitle', { required: false, nullable: true })
  if (subtitleError) errors.subtitle = subtitleError  

  const authorsError = validateFieldType(authors, 'string', 'authors', { required: false, nullable: false })
  if (authorsError) errors.authors = authorsError    

  const authorshipError = validateFieldType(authorship, 'string', 'authorship', { required: false, nullable: false })
  if (authorshipError) errors.authorship = authorshipError   

  const summaryError = validateFieldType(summary, 'string', 'summary', { required: false, nullable: false })
  if (summaryError) errors.summary = summaryError

  const detailsError = validateFieldType(details, 'string', 'details', { required: false, nullable: false })
  if (detailsError) errors.summary = detailsError  

  const yearError = validateFieldType(year, 'number', 'year', { required: false, nullable: false })
  if (yearError) errors.year = yearError  

  const descriptionError = validateFieldType(description, 'string', 'description', { required: false, nullable: false })
  if (descriptionError) errors.description = descriptionError  

  const file_idError = validateFieldType(file_id, 'string', 'file_id', { required: false, nullable: false })
  if (file_idError) {
    errors.file_id = file_idError
  } else if (file_id !== null && file_id !== undefined && !isValidUUID(file_id)) {
    errors.file_id = 'ID do file_id inválido'
  }  

  const cover_idError = validateFieldType(cover_id, 'string', 'cover_id', { required: false, nullable: false })
  if (cover_idError) {
    errors.cover_id = cover_idError
  } else if (cover_id !== null && cover_id !== undefined && !isValidUUID(cover_id)) {
    errors.cover_id = 'ID do cover_id inválido'
  }  

  const linkError = validateFieldType(link, 'string', 'link', { required: false, nullable: true })
  if (linkError) errors.link = linkError  

  const collection_idError = validateFieldType(collection_id, 'string', 'collection_id', { required: false, nullable: false })
  if (collection_idError) {
    errors.collection_id = collection_idError
  } else if (collection_id !== null && collection_id !== undefined && !isValidUUID(collection_id)) {
    errors.collection_id = 'ID do collection_id inválido'
  }  

  const keywordsError = validateFieldType(keywords, 'string', 'keywords', { required: false, nullable: false })
  if (keywordsError) errors.keywords = keywordsError 

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: errors }, { status: 400 })
  }

  const updates: Record<string, any> = {
    updated_at: new Date().toISOString(),
    ...(title !== undefined ? { title } : {}),
    ...(subtitle !== undefined ? { subtitle } : {}),
    ...(authors !== undefined ? { authors } : {}),
    ...(authorship !== undefined ? { authorship } : {}),
    ...(summary !== undefined ? { summary } : {}),
    ...(details !== undefined ? { details } : {}),
    ...(year !== undefined ? { year } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(file_id !== undefined ? { file_id } : {}),
    ...(cover_id !== undefined ? { cover_id } : {}),
    ...(link !== undefined ? { link } : {}),
    ...(collection_id !== undefined ? { collection_id } : {}),
    ...(keywords !== undefined ? { keywords } : {}),
  }  

  try {
    const { data, error } = await supabase
      .from('ebooks')
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
      .from('ebooks')
      .select('id')
      .eq('id', id)
      .single()

    if (error) return handleSupabaseError(error)

    const { error: deleteError  } = await supabase
      .from('ebooks')
      .delete()
      .eq('id', id)

    if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 })
    return NextResponse.json({ message: 'Deletado com sucesso' }, { status: 200 })
  
  } catch (err) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}
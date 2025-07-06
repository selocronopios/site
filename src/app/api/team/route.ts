import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { validateUser } from '@/lib/auth/validadeUser'
import { handleSupabaseError, validateFieldType } from '@/lib/utils'
import { logError } from '@/lib/logger';

interface UpdateBody {
  name?: string
  function_group?: string | null
  function_imprint?: string | null
  function_association?: string | null
  institution?: string
  degree?: string
  picture?: string
  lattes?: string
  is_team_group?: boolean
  is_team_imprint?: boolean
  is_team_association?: boolean
  is_active?: boolean
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

  const { name, function_group, function_imprint, function_association, institution, degree, picture, lattes, is_team_group, is_team_imprint, is_team_association, is_active } = body

  const errors: Record<string, string> = {}

  const nameError = validateFieldType(name, 'string', 'name', { required: false, nullable: false })
  if (nameError) {errors.name = nameError}

  const function_groupError = validateFieldType(function_group, 'string', 'function_group', { required: false, nullable: true })
  if (function_groupError) { 
    errors.function_group = function_groupError 
  } else if ( is_team_group && function_group === null ){
    errors.function_group = "Colaborador ativo na equipe Group, mas sem função declarada"
  }

  const function_imprintError = validateFieldType(function_imprint, 'string', 'function_imprint', { required: false, nullable: true })
  if (function_imprintError) {
    errors.function_imprint = function_imprintError 
  } else if (is_team_imprint && function_imprint === null) {
    errors.function_group = "Colaborador ativo na equipe Selo, mas sem função declarada"
  }   

  const function_associationError = validateFieldType(function_association, 'string', 'function_association', { required: false, nullable: true })
  if (function_associationError) {
    errors.function_association = function_associationError
  } else if (is_team_association && function_association === null) {
    errors.function_association = "Colaborador ativo na equipe Selo, mas sem função declarada"
  } 
       
  const institutionError = validateFieldType(institution, 'string', 'institution', { required: false, nullable: false })
  if (institutionError) {errors.institution = institutionError}  
  
  const degreeError = validateFieldType(degree, 'string', 'degree', { required: false, nullable: false })
  if (degreeError) {errors.degree = degreeError}
  
  const pictureError = validateFieldType(picture, 'string', 'picture', { required: false, nullable: false })
  if (pictureError) {errors.picture = pictureError}

  const lattesError = validateFieldType(lattes, 'string', 'lattes', { required: false, nullable: false })
  if (lattesError) {errors.lattes = lattesError}  

  const is_team_groupError = validateFieldType(is_team_group, 'boolean', 'is_team_group', { required: false, nullable: false })
  if (is_team_groupError) {errors.is_team_group = is_team_groupError}    

  const is_team_imprintError = validateFieldType(is_team_imprint, 'boolean', 'is_team_imprint', { required: false, nullable: false })
  if (is_team_imprintError) {errors.is_team_imprint = is_team_imprintError}     

  const is_team_associationError = validateFieldType(is_team_association, 'boolean', 'is_team_association', { required: false, nullable: false })
  if (is_team_associationError) {errors.is_team_association = is_team_associationError}       

  const is_activeError = validateFieldType(is_active, 'boolean', 'is_active', { required: false, nullable: false })
  if (is_activeError) {
    errors.is_active = is_activeError
  } else if( is_active && !is_team_group && !is_team_imprint  && !is_team_association ){
    errors.is_active = "Colaborador precisa estar ativo em ao menos um dos grupos"
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: errors }, { status: 400 })
  }  

  try {
    const { data, error } = await supabaseAdmin
      .from('team')
      .insert([{ name, function_group, function_imprint, function_association, institution, degree, picture, lattes, is_team_group, is_team_imprint, is_team_association, is_active }])
      .select()

    if (error) {return handleSupabaseError(error)}

    return NextResponse.json( data, { status: 201 })
  } catch (err) {
    logError(err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('team')
      .select()

    if (error) {
      logError('Erro do Supabase:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    logError(err)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}
import { NextResponse } from 'next/server'

export function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

export function validateUUID(id?: string) {
  if (!id) return 'ID não fornecido'
  if (!isValidUUID(id.trim())) return 'ID inválido'
  return null
}

export function handleSupabaseError(error: any) {
  if (error.details === 'The result contains 0 rows') {
    return NextResponse.json({ error: 'Não encontrado!' }, { status: 404 })
  }
  if (error.message.includes('invalid input syntax for type uuid')) {
    return NextResponse.json({ error: 'ID inválido (não é UUID válido)' }, { status: 400 })
  }
  if (error.message.includes('duplicate key value')) {
    return NextResponse.json({ error: 'Nome duplicado' }, { status: 400 })
  }
  if (error.message.includes('violates foreign key constraint')) {
    const regex = /Key \(([^)]+)\)=\(([^)]+)\)/
    const match = error.details.match(regex)
    if (match) {
      const chave = match[1]       
      const identificador = match[2]
      return NextResponse.json({ error: `Chave ${chave}(${identificador}) não encontrada!` }, { status: 400 })
    } else {
      return NextResponse.json({ error: 'Chave indefinida não encontrada!' }, { status: 400 })
    }
  }
  return NextResponse.json({ error: error.message }, { status: 500 })
}

export function validateFieldType(
  value: any,
  expectedType: string,
  fieldName: string,
  { required = false, nullable = false } = {}
): string | undefined {
  if (value === undefined) {
    if (required) return `Campo ${fieldName} é obrigatório`
    return 
  }

  if (value === null && !nullable) return `Campo ${fieldName} não pode ser nulo`

  if (value !== null && typeof value !== expectedType) {
    return `Campo ${fieldName} deve ser ${expectedType}`
  }
}

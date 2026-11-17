import { NextResponse } from 'next/server';

export function isValidUUID(id: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

export function validateUUID(id?: string) {
  if (!id) {
    return 'ID não fornecido';
  }
  if (!isValidUUID(id.trim())) {
    return 'ID inválido';
  }
  return null;
}

export function validateFieldType(
  value: unknown,
  expectedType: string,
  fieldName: string,
  { required = false, nullable = false } = {}
): string | undefined {
  if (value === undefined) {
    if (required) return `Campo ${fieldName} é obrigatório`;
    return;
  }

  if (value === null) {
    if (!nullable) return `Campo ${fieldName} não pode ser nulo`;
    return;
  }

  if (expectedType === 'string[]') {
    if (!Array.isArray(value)) {
      return `Campo ${fieldName} deve ser uma lista (array) de strings`;
    }
    const isStringArray = value.every((v) => typeof v === 'string');
    if (!isStringArray)
      return `Todos os itens do campo ${fieldName} devem ser strings`;
    return;
  }

  if (typeof value !== expectedType)
    return `Campo ${fieldName} deve ser ${expectedType}`;
}

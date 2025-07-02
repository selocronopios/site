// src/__tests__/functions.test.ts
import { GET as getFunction, PUT, DELETE } from '@/app/api/functions/[id]/route'
import { POST, GET as listFunctions } from '@/app/api/functions/route'

const validId = 'eebc15fd-f644-4514-ae38-f60be5153309'
const invalidId = 'invalid-id'
const mockParams = (id: string) => ({ params: { id } })

let createdId = ''

describe('Functions API', () => {
  it('POST - cria nova função', async () => {
    const req = {
      method: 'POST',
      json: async () => ({
        description: 'Função da Louca',
        group_type: 1,
      }),
      headers: new Headers({ 'content-type': 'application/json' }),
    } as any

    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(201)
    expect(json[0]).toHaveProperty('id')
    createdId = json[0].id
  })

  it('GET - lista funções', async () => {
    const res = await listFunctions({} as any)
    expect(res.status).toBe(200)
  })

  it('GET - retorna erro com ID inválido', async () => {
    const res = await getFunction({} as any, mockParams(invalidId))
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.error).toMatch(/inválido/i)
  })

  it('GET - retorna função válida', async () => {
    const res = await getFunction({} as any, mockParams(validId))
    const json = await res.json()
    if (res.status === 404) {
      expect(json.error).toMatch(/não encontrada/i)
    } else {
      expect(res.status).toBe(200)
      expect(json).toHaveProperty('id', validId)
    }
  })

  it('PUT - atualiza função', async () => {
    const req = {
      json: async () => ({ description: 'Função Editada', group_type: 2 }),
    } as any

    const res = await PUT(req, mockParams(validId))
    const json = await res.json()
    if (res.status === 404) {
      expect(json.error).toMatch(/não encontrada/i)
    } else {
      expect(res.status).toBe(200)
      expect(json).toHaveProperty('description', 'Função Editada')
    }
  })

  it('DELETE - remove função criada', async () => {
    if (!createdId) return
    const res = await DELETE({} as any, mockParams(createdId))
    const json = await res.json().catch(() => ({}))
    expect(res.status).toBe(200)
    expect(json.message).toMatch(/sucesso/i)
  })
})

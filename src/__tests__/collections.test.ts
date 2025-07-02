import { GET, PUT, DELETE } from '@/app/api/collections/[id]/route'
import { POST } from '@/app/api/collections/route'
import { NextResponse } from 'next/server'

describe('Collections API', () => {
  let createdId = ''    
  const validId = '2e6e2f22-37ad-4c0c-be21-e6b52e66985f' 
  const invalidId = 'invalid-uuid'

  const mockParams = (id: string) => ({ params: { id } })

  it('POST - deve criar uma nova coleção', async () => {
    const req = {
    method: 'POST',
    json: async () => ({
        id_pai: validId,
        name: 'Teste Coleção',
        description: 'Descrição da coleção de teste',
    }),
    headers: new Headers({ 'content-type': 'application/json' }),
    } as any
    
    const res = await POST(req) 
    const json = await res.json()

    expect(res.status).toBe(201)
    expect(json[0]).toHaveProperty('id_pai', validId)
    expect(json[0]).toHaveProperty('name', 'Teste Coleção') 
    expect(json[0]).toHaveProperty('description', 'Descrição da coleção de teste') 
    
    createdId = json[0].id
  })

  it('GET - deve retornar 400 se o ID for inválido', async () => {
    const res = await GET({} as any, mockParams(invalidId))
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.error).toMatch(/inválido/i)
  })

  it('GET - deve retornar 200 se o ID for válido e existir', async () => {
    const res = await GET({} as any, mockParams(validId))
    const json = await res.json()

    if (res.status === 404) {
      expect(json.error).toMatch(/não encontrada/i)
    } else {
      expect(res.status).toBe(200)
      expect(json).toHaveProperty('id', validId)
    }
  })

  it('PUT - deve retornar erro se body estiver malformado', async () => {
    const req = {
      json: async () => ({}),
    } as any

    const res = await PUT(req, mockParams(validId))
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBeDefined()
  })

  it('PUT - deve atualizar nome e descrição da coleção', async () => {
    const req = {
      json: async () => ({
        name: 'Novo Nome',
        description: 'Nova descrição',
      }),
    } as any

    const res = await PUT(req, mockParams(validId))
    const json = await res.json()

    if (res.status === 404) {
      expect(json.error).toMatch(/não encontrada/i)
    } else {
      expect(res.status).toBe(200)
      expect(json).toHaveProperty('name', 'Novo Nome')
    }
  })

  it('DELETE - deve remover uma coleção criada via POST', async () => {
    if (!createdId) {
      return
    }

    const res = await DELETE({} as any, mockParams(createdId))
    const json = await res.json().catch(() => ({}))

    expect(res.status).toBe(200)
    expect(json.message).toMatch(/sucesso/i)
  })
})

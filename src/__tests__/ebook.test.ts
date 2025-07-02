// src/__tests__/ebooks.test.ts
import { GET as getEbook, PUT, DELETE } from '@/app/api/ebooks/[id]/route'
import { POST, GET as listEbooks } from '@/app/api/ebooks/route'

const validId = '1cb59d45-3e24-4a85-960a-66cd3226993c'
const invalidId = 'invalid-id'
const mockParams = (id: string) => ({ params: { id } })

let createdId = ''

describe('Ebooks API', () => {
  it('POST - cria novo ebook', async () => {
    const req = {
      method: 'POST',
      json: async () => ({
        title: 'Title de teste',
        subtitle: 'Subtitle de teste',
        authors: 'Autor de teste',
        authorship: 'Resumo do autor de teste',
        summary: 'Sumario de teste',
        details: 'Detalhes de teste',
        year: 2024,
        description: 'Descições de teste',
        file_id: 'fb3679f7-611a-42a2-be13-6c7cb88cd425',
        cover_id: 'fb3679f7-611a-42a2-be13-6c7cb88cd425',
        link: null,
        collection_id: '2e6e2f22-37ad-4c0c-be21-e6b52e66985f',
        keywords: 'keywords de teste',
      }),
      headers: new Headers({ 'content-type': 'application/json' }),
    } as any

    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(201)
    expect(json[0]).toHaveProperty('id')
    createdId = json[0].id
  })

  it('GET - lista todos ebooks', async () => {
    const res = await listEbooks({} as any)
    expect(res.status).toBe(200)
  })

  it('GET - retorna erro com ID inválido', async () => {
    const res = await getEbook({} as any, mockParams(invalidId))
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.error).toMatch(/inválido/i)
  })

  it('GET - retorna ebook válido se existir', async () => {
    const res = await getEbook({} as any, mockParams(validId))
    const json = await res.json()
    if (res.status === 404) {
      expect(json.error).toMatch(/não encontrado/i)
    } else {
      expect(res.status).toBe(200)
      expect(json).toHaveProperty('id', validId)
    }
  })

  it('PUT - atualiza campos do ebook', async () => {
    const req = {
      json: async () => ({ title: 'title editado' }),
    } as any

    const res = await PUT(req, mockParams(validId))
    const json = await res.json()

    if (res.status === 404) {
      expect(json.error).toMatch(/não encontrado/i)
    } else {
      expect(res.status).toBe(200)
      expect(json).toHaveProperty('title', 'title editado')
    }
  })

  it('DELETE - remove ebook criado', async () => {
    if (!createdId) return

    const res = await DELETE({} as any, mockParams(createdId))
    const json = await res.json().catch(() => ({}))

    expect(res.status).toBe(200)
    expect(json.message).toMatch(/sucesso/i)
  })
})

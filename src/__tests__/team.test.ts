// src/__tests__/team.test.ts
import { GET as getTeam, PUT, DELETE } from '@/app/api/team/[id]/route'
import { POST, GET as listTeam } from '@/app/api/team/route'

const validId = '862eb277-fb3e-4399-a373-60442229b52f'
const invalidId = 'invalid-id'
const mockParams = (id: string) => ({ params: { id } })

let createdId = ''

describe('Team API', () => {
  it('POST - cria novo colaborador', async () => {
    const req = {
      method: 'POST',
      json: async () => ({
        name: 'Beatriz Caroline Rosa',
        function_group: null,
        function_imprint: '35f1fdc0-2238-469a-8d00-771ad963be79',
        function_association: '3c1ea952-0e22-4520-acf2-659c9c69d88b',
        institution: 'UFOP',
        degree: 'Engenharia de Controle e Automação',
        picture: 'fb3679f7-611a-42a2-be13-6c7cb88cd425',
        lattes: 'abc.com.br',
        is_team_group: false,
        is_team_imprint: true,
        is_team_association: true,
        is_active: true,
      }),
      headers: new Headers({ 'content-type': 'application/json' }),
    } as any

    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(201)
    expect(json[0]).toHaveProperty('id')
    createdId = json[0].id
  })

  it('GET - lista todos colaboradores', async () => {
    const res = await listTeam({} as any)
    expect(res.status).toBe(200)
  })

  it('GET - retorna erro com ID inválido', async () => {
    const res = await getTeam({} as any, mockParams(invalidId))
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.error).toMatch(/inválido/i)
  })

  it('GET - retorna colaborador se existir', async () => {
    const res = await getTeam({} as any, mockParams(validId))
    const json = await res.json()

    if (res.status === 404) {
      expect(json.error).toMatch(/não encontrado/i)
    } else {
      expect(res.status).toBe(200)
      expect(json).toHaveProperty('id', validId)
    }
  })

  it('PUT - atualiza colaborador', async () => {
    const req = {
      json: async () => ({
        name: 'Nome Alterado',
        institution: 'Nova Instituição'
      }),
    } as any

    const res = await PUT(req, mockParams(createdId))
    const json = await res.json()

    if (res.status === 404) {
      expect(json.error).toMatch(/não encontrado/i)
    } else {
      expect(res.status).toBe(200)
      expect(json).toHaveProperty('name', 'Nome Alterado')
    }
  })

  it('DELETE - remove colaborador criado', async () => {
    if (!createdId) return

    const res = await DELETE({} as any, mockParams(createdId))
    const json = await res.json().catch(() => ({}))

    expect(res.status).toBe(200)
    expect(json.message).toMatch(/sucesso/i)
  })
})

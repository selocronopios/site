export default async function TeamPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/team`, {
    cache: 'no-store'
  })
  const team = await res.json()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Equipes</h1>
      {team.length === 0 && <p>Nenhum colaborador cadastrado.</p>}
      <ul className="grid gap-4">
        {team.map((team: any) => (
          <li key={team.id} className="border p-4 rounded">
            <h2 className="font-semibold">{team.name}</h2>
            <p className="text-sm text-gray-600">{team.institution}</p>
            <p className="text-xs">{team.lattes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
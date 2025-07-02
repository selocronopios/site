// app/admin/collections/page.tsx

export default async function CollectionsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/collections`, {
    cache: 'no-store'
  })
  const collections = await res.json()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Coleções</h1>
      {collections.length === 0 && <p>Nenhuma coleção cadastrada.</p>}
      <ul className="grid gap-4">
        {collections.map((collection: any) => (
          <li key={collection.id} className="border p-4 rounded">
            <h2 className="font-semibold">{collection.name}</h2>
            <p className="text-sm text-gray-600">{collection.description}</p>
            <p className="text-xs">{collection.id_pai}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

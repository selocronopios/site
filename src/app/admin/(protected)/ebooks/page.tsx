// app/admin/ebooks/page.tsx

interface Ebook {
  id: number;
  title: string;
  authors: string;
  year: number | string;
  collection_id: number | null;
}

export default async function EbooksPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ebooks`, {
    cache: 'no-store'
  })
  const ebooks = await res.json()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">eBooks</h1>
      {ebooks.length === 0 && <p>Nenhum eBook cadastrado.</p>}
      <ul className="grid gap-4">
        {ebooks.map((ebook: Ebook) => (
          <li key={ebook.id} className="border p-4 rounded">
            <h2 className="font-semibold">{ebook.title}</h2>
            <p className="text-sm text-gray-600">{ebook.authors}</p>
            <p className="text-xs">{ebook.year}</p>
            <p className="text-xs">{ebook.collection_id}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

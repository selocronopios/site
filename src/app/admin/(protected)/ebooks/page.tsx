// app/admin/ebooks/page.tsx
import TableManager from '@/components/TableManager/TableManager';

interface Ebook {
  id: string;
  title: string;
  authors: string;
  year: number | string;
  collection_id: string | null;
  collections: {
    name: string;
  } | null;
}

export default async function EbooksPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ebooks`, {
    cache: 'no-store',
  });
  const data: Ebook[] = await res.json();

  const ebooksWithCollectionName = data.map((item) => ({
    id: item.id,
    title: item.title,
    authors: Array.isArray(item.authors)
      ? item.authors.join(', ')
      : item.authors,
    year: item.year,
    collection_id: item.collection_id,
    collection_name: item.collections?.name || '—',
  }));

  const tableFields = [
    { key: 'title', label: 'Título' },
    { key: 'authors', label: 'Autores' },
    { key: 'year', label: 'Ano' },
    { key: 'collection_name', label: 'Coleção' },
  ];

  return (
    <TableManager
      title="Gerenciar Ebooks"
      data={ebooksWithCollectionName}
      fields={tableFields}
      apiPath="/api/ebooks"
      onAddClick="/admin/ebooks/novo"
      resourceType="ebook"
    />
  );
}

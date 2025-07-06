//src/app/admin/(protected)/collections/page.tsx
import TableManager from '@/components/TableManager/TableManager';

interface Collection {
  id: number;
  name: string;
  description: string;
  id_pai?: number | null;
  parent_name?: string;
}

export default async function CollectionsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/collections`, {
    cache: 'no-store',
  });
  const data = await res.json();

  const dataWithParentName = data.map((item: Collection) => {
    const parent = data.find((col: Collection) => col.id === item.id_pai);
    return {
      ...item,
      parent_name: parent ? parent.name : '',
    };
  });

  const tableFields = [
    { key: 'name', label: 'Nome' },
    { key: 'description', label: 'Descrição' },
    { key: 'parent_name', label: 'Coleção Pai' }, 
  ];

  const modalFields = [
    ...tableFields,
    { key: 'id_pai', label: 'Coleção Pai' }, 
  ];

  return (
    <TableManager
      title="Gerenciar Coleções"
      data={dataWithParentName}
      fields={tableFields}
      modalFields={modalFields}
      apiPath="/api/collections"
    />
  );
}

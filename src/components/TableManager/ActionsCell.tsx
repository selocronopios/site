// src/components/TableManager/ActionsCell.tsx
'use client';

import { useRouter } from 'next/navigation';
import DeleteButton from '../DeleteButton';
import { DataItem } from './types';

interface Props {
  item: DataItem;
  apiPath: string;
  resourceType: 'ebook' | 'collection';
  onEdit: (item: DataItem) => void;
}

export default function ActionsCell({
  item,
  apiPath,
  resourceType,
  onEdit,
}: Props) {
  const router = useRouter();

  const handleEdit = () => {
    if (resourceType === 'ebook') {
      router.push(`/admin/ebooks/${item.id}`);
    } else {
      onEdit(item);
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      <button onClick={handleEdit} className="text-blue-600 hover:underline">
        Editar
      </button>
      {item.id && (
        <DeleteButton
          id={item.id.toString()}
          apiPath={apiPath}
          resourceType={resourceType}
        />
      )}
    </div>
  );
}

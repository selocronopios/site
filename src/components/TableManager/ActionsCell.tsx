'use client';

import DeleteButton from '../DeleteButton';
import { DataItem } from './types';

interface Props {
  item: DataItem;
  onEdit: (item: DataItem) => void;
  apiPath: string;
}

export default function ActionsCell({ item, onEdit, apiPath }: Props) {
  return (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => onEdit(item)}
        className="text-blue-600 hover:underline"
      >
        Editar
      </button>
      {item.id && <DeleteButton id={item.id} apiPath={apiPath} />}
    </div>
  );
}

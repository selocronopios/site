// src/components/TableManager/TableManager.tsx
'use client';

import { useState } from 'react';
import Table from './Table';
import ModalForm from './ModalForm';
import { Field, DataItem } from './types';

interface Props {
  title: string;
  data: DataItem[];
  fields: Field[];
  modalFields?: Field[];
  apiPath: string;
  onAddClick?: string;
  resourceType: 'collection' | 'ebook';
}

export default function TableManager({
  title,
  data,
  fields,
  modalFields,
  apiPath,
  onAddClick,
  resourceType,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  const openCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEdit = (item: DataItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const reload = () => window.location.reload();

  return (
    <div className="px-0 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        {onAddClick ? (
          <a
            href={onAddClick}
            className="px-4 py-2 bg-[#9EC5AE] hover:bg-[#85a790] text-white rounded"
          >
            Adicionar
          </a>
        ) : (
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-[#9EC5AE] hover:bg-[#85a790] text-white rounded"
          >
            Adicionar
          </button>
        )}
      </div>

      <Table
        data={data}
        fields={fields}
        onEdit={openEdit}
        apiPath={apiPath}
        resourceType={resourceType}
      />

      {modalOpen && modalFields && (
        <ModalForm
          item={editingItem}
          fields={modalFields}
          apiPath={apiPath}
          onClose={() => setModalOpen(false)}
          onSuccess={reload}
        />
      )}
    </div>
  );
}

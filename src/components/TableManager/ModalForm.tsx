//src/components/TableManager/ModalForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Field, DataItem } from './types';

interface Props {
  item: DataItem | null;
  fields: Field[];
  apiPath: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalForm({ item, fields, apiPath, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<DataItem>({});
  const [collections, setCollections] = useState<{ id: string; name: string }[]>([]);

  // Ignora parent_name no form e mantém id_pai como ID
  useEffect(() => {
    if (item) {
      const { parent_name, ...cleanItem } = item;
      setForm(cleanItem);
    } else {
      const empty = fields.reduce((acc, field) => {
        acc[field.key] = '';
        return acc;
      }, {} as DataItem);
      setForm(empty);
    }
  }, [item, fields]);

  // Busca coleções e remove a própria do dropdown
  useEffect(() => {
    async function fetchCollections() {
      const res = await fetch('/api/collections');
      const data = await res.json();

      const filtered = item?.id
        ? data.filter((col: any) => col.id !== item.id)
        : data;

      setCollections(filtered);
    }

    fetchCollections();
  }, [item]);
    
    // useEffect(() => {
    // console.log('fields:', fields);
    // }, [fields]);

    // useEffect(() => {
    // console.log('form:', form);
    // }, [form]);

    // useEffect(() => {
    // console.log('collections:', collections);
    // }, [collections]);



  function handleChange(key: string, value: string) {
    setForm((prev: DataItem) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = item?.id ? 'PUT' : 'POST';
    const url = item?.id ? `${apiPath}/${item.id}` : apiPath;

    const payload = {
      ...form,
      id_pai: form.id_pai?.trim() === '' ? null : form.id_pai,
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSuccess();
    } else {
      alert('Erro ao salvar.');
    }
  }

  // Ignora campos que são apenas de exibição
  const editableFields = fields.filter(f => f.key !== 'parent_name');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px] max-w-full">
        <h2 className="text-lg font-bold mb-4">
          {item?.id ? 'Editar' : 'Criar'} Registro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {editableFields.map(field => (
            <div key={field.key}>
              <label className="block mb-1 text-sm">{field.label}</label>
              {field.key === 'id_pai' ? (
                <select
                  value={form[field.key] ?? ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Nenhum</option>
                  {collections.map(col => (
                    <option key={col.id} value={col.id}>
                      {col.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={form[field.key] ?? ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Salvar
            </button>
          </div>
        </form>

        {/* <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block mb-1 text-sm">Coleção Pai (teste)</label>
            <select
                value={form.id_pai ?? ''}
                onChange={e => handleChange('id_pai', e.target.value)}
                className="w-full border px-3 py-2 rounded"
            >
                <option value="">Nenhum</option>
                {collections.map(col => (
                <option key={col.id} value={col.id}>
                    {col.name}
                </option>
                ))}
            </select>

            <div className="flex justify-end gap-2 pt-4">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                Salvar
                </button>
            </div>
            </form> */}

      </div>
    </div>
  );
}

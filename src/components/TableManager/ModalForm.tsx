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

export default function ModalForm({
  item,
  fields,
  apiPath,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<DataItem>(() =>
    fields.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {} as DataItem)
  );

  useEffect(() => {
    if (item) {
      setForm(item);
    } else {
      const empty = fields.reduce((acc, field) => {
        acc[field.key] = '';
        return acc;
      }, {} as DataItem);
      setForm(empty);
    }
  }, [item, fields]);

  function handleChange(key: string, value: string) {
    setForm((prev: DataItem) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validação dos campos obrigatórios (allowEmpty === false)
    for (const field of fields) {
      if (
        field.type === 'select' &&
        field.allowEmpty === false &&
        !form[field.key]
      ) {
        alert(`O campo "${field.label}" é obrigatório.`);
        return;
      }
    }

    const method = item?.id ? 'PUT' : 'POST';
    const url = item?.id ? `${apiPath}/${item.id}` : apiPath;

    // Converte '' para null nos selects
    const payload = { ...form };
    fields.forEach((field) => {
      if (field.type === 'select' && payload[field.key] === '') {
        payload[field.key] = null;
      }
    });

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px] max-w-full">
        <h2 className="text-lg font-bold mb-4">
          {item?.id ? 'Editar' : 'Criar'} Registro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block mb-1 text-sm">{field.label}</label>

              {field.type === 'select' && field.options ? (
                <select
                  value={form[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required={field.allowEmpty === false}
                >
                  {field.allowEmpty !== false && (
                    <option value="">Nenhum</option>
                  )}
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={form[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
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
      </div>
    </div>
  );
}

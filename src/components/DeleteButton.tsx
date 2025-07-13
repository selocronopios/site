// src/components/DeleteButton.tsx
'use client';

import { useState, useEffect } from 'react';

interface Props {
  id: string;
  apiPath: string;
  resourceType: 'collection' | 'ebook';
}

interface Ebook {
  id: string;
  title: string;
}

interface Collection {
  id: string;
  name: string;
}

export default function DeleteButton({ id, apiPath, resourceType }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [impedimentoEbook, setImpedimentoEbook] = useState(false);
  const [impedimentoColecao, setImpedimentoColecao] = useState(false);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [childCollections, setChildCollections] = useState<Collection[]>([]);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);

  const [newEbookCollections, setNewEbookCollections] = useState<
    Record<string, string>
  >({});
  const [newParentCollections, setNewParentCollections] = useState<
    Record<string, string | null>
  >({});

  const canConfirm = () => {
    if (impedimentoEbook) {
      const allSelected = ebooks.every(
        (ebook) => newEbookCollections[ebook.id]
      );
      if (!allSelected) return false;
    }
    if (impedimentoColecao) {
      const allSelected = childCollections.every((col) =>
        newParentCollections.hasOwnProperty(col.id)
      );
      if (!allSelected) return false;
    }
    return true;
  };

  async function handleDelete() {
    const confirm = window.confirm('Deseja excluir este item?');
    if (!confirm) return;

    if (resourceType === 'collection') {
      const usageRes = await fetch(`/api/collections/${id}/usage`);
      const usage = await usageRes.json();

      setEbooks(usage.ebooks);
      setChildCollections(usage.childCollections);

      if (usage.ebooks.length > 0) setImpedimentoEbook(true);
      if (usage.childCollections.length > 0) setImpedimentoColecao(true);

      if (usage.ebooks.length > 0 || usage.childCollections.length > 0) {
        const collectionsRes = await fetch('/api/collections');
        const collections = await collectionsRes.json();
        setAllCollections(collections.filter((c: Collection) => c.id !== id));
        setShowModal(true);
        return;
      }
    }

    // delete direto se for ebook ou collection sem dependências
    await deleteResource();
  }

  async function deleteResource() {
    if (impedimentoEbook) {
      await Promise.all(
        ebooks.map((ebook) =>
          fetch(`/api/ebooks/${ebook.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              collection_id: newEbookCollections[ebook.id],
            }),
          })
        )
      );
    }

    if (impedimentoColecao) {
      await Promise.all(
        childCollections.map((col) =>
          fetch(`/api/collections/${col.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_pai: newParentCollections[col.id] }),
          })
        )
      );
    }

    const res = await fetch(`${apiPath}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      window.location.reload();
    } else {
      alert('Erro ao excluir.');
    }
  }

  return (
    <>
      <button
        type="button" // <-- isso evita o submit se tiver num form
        onClick={handleDelete}
        className="text-red-600 hover:underline"
      >
        Excluir
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[600px] max-w-full max-h-[90vh] overflow-auto">
            <h2 className="text-lg font-bold mb-4">
              Resolvendo dependências antes de excluir
            </h2>

            {impedimentoEbook && (
              <div className="mb-4">
                <p className="font-medium mb-2">Ebooks usando esta coleção:</p>
                {ebooks.map((ebook) => (
                  <div key={ebook.id} className="mb-2">
                    <label className="block text-sm font-semibold mb-1">
                      {ebook.title}
                    </label>
                    <select
                      className="w-full border px-2 py-1 rounded"
                      value={newEbookCollections[ebook.id] || ''}
                      onChange={(e) =>
                        setNewEbookCollections((prev) => ({
                          ...prev,
                          [ebook.id]: e.target.value,
                        }))
                      }
                    >
                      <option value="">-- Escolha nova coleção --</option>
                      {allCollections.map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {impedimentoColecao && (
              <div className="mb-4">
                <p className="font-medium mb-2">
                  Coleções que têm esta como pai:
                </p>
                {childCollections.map((col) => (
                  <div key={col.id} className="mb-2">
                    <label className="block text-sm font-semibold mb-1">
                      {col.name}
                    </label>
                    <select
                      className="w-full border px-2 py-1 rounded"
                      value={newParentCollections[col.id] ?? ''}
                      onChange={(e) =>
                        setNewParentCollections((prev) => ({
                          ...prev,
                          [col.id]: e.target.value || null,
                        }))
                      }
                    >
                      <option value="">-- Sem pai --</option>
                      {allCollections.map((colOption) => (
                        <option key={colOption.id} value={colOption.id}>
                          {colOption.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancelar
              </button>
              <button
                disabled={!canConfirm()}
                onClick={deleteResource}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
              >
                Confirmar e deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

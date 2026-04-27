// src/components/DeleteButton.tsx
'use client';

import { useState } from 'react';

interface Props {
  id: string;
  apiPath: string;
  resourceType: 'collection' | 'ebook';
  onDeleteSuccess?: () => void;
}

interface Ebook {
  id: string;
  title: string;
}

interface Collection {
  id: string;
  name: string;
}

export default function DeleteButton({
  id,
  apiPath,
  resourceType,
  onDeleteSuccess,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [impedimentoEbook, setImpedimentoEbook] = useState(false);
  const [impedimentoColecao, setImpedimentoColecao] = useState(false);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [childCollections, setChildCollections] = useState<Collection[]>([]);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setShowModal(true);

    // const confirm = window.confirm('Deseja excluir este item?');
    // if (!confirm) return;

    if (resourceType === 'collection') {
      try {
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        return;
      }
    }

    await deleteResource();
  }

  async function deleteResource() {
    try {
      setIsDeleting(true);
      setError(null);

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

      if (!res.ok) {
        throw new Error('Erro ao excluir item');
      }

      setShowModal(false);
      setIsDeleting(false);

      setImpedimentoEbook(false);
      setImpedimentoColecao(false);
      setNewEbookCollections({});
      setNewParentCollections({});

      onDeleteSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        className="text-red-600 hover:underline"
        disabled={isDeleting} // ✅ ADICIONE
      >
        {isDeleting ? 'Excluindo...' : 'Excluir'}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[600px] max-w-full max-h-[90vh] overflow-auto">
            <h2 className="text-lg font-bold mb-4">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
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
                      disabled={isDeleting}
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
                      disabled={isDeleting}
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
                className="px-4 py-2 border rounded disabled:opacity-50"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                disabled={!canConfirm() || isDeleting}
                onClick={deleteResource}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
              >
                {isDeleting ? 'Deletando...' : 'Confirmar e deletar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useState } from 'react';

interface Props {
  id: string;
  apiPath: string;
}

export default function DeleteButton({ id, apiPath }: Props) {
  const [ebooksUsingCollection, setEbooksUsingCollection] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [showModal, setShowModal] = useState(false);

  async function handleDelete() {
    const confirmDelete = confirm('Deseja deletar esta coleção?');
    if (!confirmDelete) return;

    // Verifica se algum ebook usa esta coleção
    const ebooksRes = await fetch(`/api/collections/${id}/ebooks`);
    const ebooks = await ebooksRes.json();

    if (ebooks.length === 0) {
      // Deleta direto
      await deleteCollection();
    } else {
      // Pega outras coleções disponíveis
      const allCollectionsRes = await fetch('/api/collections');
      const allCollections = await allCollectionsRes.json();
      const filtered = allCollections.filter((col: any) => col.id !== id);
      setCollections(filtered);
      setEbooksUsingCollection(ebooks);
      setShowModal(true);
    }
  }

  async function deleteCollection(newCollectionId?: string) {
    if (newCollectionId) {
      // Atualiza todos os ebooks para nova coleção
      await Promise.all(
        ebooksUsingCollection.map((ebook: any) =>
          fetch(`/api/ebooks/${ebook.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collection_id: newCollectionId }),
          })
        )
      );
    }

    const res = await fetch(`${apiPath}/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert('Erro ao excluir.');
    }
  }

  return (
    <>
      <button onClick={handleDelete} className="text-red-600 hover:underline">
        Excluir
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[500px] max-w-full">
            <h2 className="text-lg font-bold mb-4">Coleção usada por ebooks</h2>
            <p className="mb-2">Os seguintes ebooks usam esta coleção:</p>
            <ul className="list-disc list-inside mb-4 max-h-32 overflow-y-auto">
              {ebooksUsingCollection.map(ebook => (
                <li key={ebook.id}>{ebook.title}</li>
              ))}
            </ul>
            <label className="block mb-2 text-sm font-semibold">
              Selecione uma nova coleção para substituir:
            </label>
            <select
              className="w-full border px-3 py-2 rounded mb-4"
              value={selectedCollection}
              onChange={e => setSelectedCollection(e.target.value)}
            >
              <option value="">-- Escolha uma coleção --</option>
              {collections.map(col => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancelar
              </button>
              <button
                disabled={!selectedCollection}
                onClick={() => deleteCollection(selectedCollection)}
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

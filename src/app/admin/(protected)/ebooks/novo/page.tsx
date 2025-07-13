'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Collection {
  id: string;
  name: string;
}

export default function NewEbookPage() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    authors: '',
    authorship: '',
    summary: '',
    details: '',
    year: 0,
    description: '',
    collection_id: '',
    keywords: '',
    file_id: '',
    cover_id: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch('/api/collections');
        if (!res.ok) throw new Error('Erro ao buscar coleções');
        const data = await res.json();
        setCollections(data);
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido');
      }
    };
    fetchCollections();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === 'year' && /[^0-9]/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.year || isNaN(Number(formData.year))) {
      setError('Ano inválido');
      setLoading(false);
      return;
    }

    if (!file || !cover) {
      setError('Selecione o ebook e a capa antes de enviar.');
      setLoading(false);
      return;
    }

    let fileId = '';
    let coverId = '';

    const uploadFile = async (file: File): Promise<string> => {
      const form = new FormData();
      form.append('bucket', 'privado');
      form.append('folder', 'convers');
      form.append('file', file);

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) throw new Error('Falha ao enviar arquivo');
      const data = await res.json();
      return data.id || '';
    };

    try {
      fileId = await uploadFile(file);
      coverId = await uploadFile(cover);

      if (!fileId || !coverId) {
        setError('Falha ao obter os IDs dos arquivos enviados.');
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        file_id: fileId,
        cover_id: coverId,
      };

      const res = await fetch('/api/ebooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.clone().text();
      console.log('Resposta da API (raw):', text);

      if (!res.ok) throw new Error('Falha ao salvar ebook');

      fileInputRef.current && (fileInputRef.current.value = '');
      coverInputRef.current && (coverInputRef.current.value = '');
      setFile(null);
      setCover(null);

      router.push('/admin/ebooks');
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const authorsArr = formData.authors.split(',');
  const authorshipArr = formData.authorship.split(',');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Adicionar Ebook</h1>
      {error && (
        <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">
              Título
            </label>
            <input
              id="title"
              name="title"
              placeholder="Digite o título"
              value={formData.title}
              onChange={handleChange}
              className="input w-full"
              required
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block font-semibold mb-1">
              Subtítulo
            </label>
            <input
              id="subtitle"
              name="subtitle"
              placeholder="Digite o subtítulo"
              value={formData.subtitle}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          <div className="col-span-full">
            <div className="grid grid-cols-5 gap-2 mb-1">
              <label className="block font-semibold col-span-2">Autor</label>
              <label className="block font-semibold col-span-3">Autoria</label>
            </div>
            {authorsArr.map((author, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 gap-2 mb-2 items-center"
              >
                <input
                  type="text"
                  value={author}
                  onChange={(e) => {
                    const newAuthors = [...authorsArr];
                    newAuthors[idx] = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      authors: newAuthors.join(','),
                    }));
                  }}
                  className="input col-span-2"
                  placeholder={`Autor ${idx + 1}`}
                  required
                />
                <input
                  type="text"
                  value={authorshipArr[idx] || ''}
                  onChange={(e) => {
                    const newAuthorship = [...authorshipArr];
                    newAuthorship[idx] = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      authorship: newAuthorship.join(','),
                    }));
                  }}
                  className="input col-span-2"
                  placeholder={`Autoria ${idx + 1}`}
                  required
                />
                <button
                  type="button"
                  className="px-2 py-1 bg-red-100 hover:bg-red-200 rounded text-sm"
                  onClick={() => {
                    if (authorsArr.length === 1) return;
                    const newAuthors = [...authorsArr];
                    const newAuthorship = [...authorshipArr];
                    newAuthors.splice(idx, 1);
                    newAuthorship.splice(idx, 1);
                    setFormData((prev) => ({
                      ...prev,
                      authors: newAuthors.join(','),
                      authorship: newAuthorship.join(','),
                    }));
                  }}
                  disabled={authorsArr.length === 1}
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              className="px-3 py-1 bg-green-100 hover:bg-green-200 rounded text-sm"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  authors: prev.authors ? prev.authors + ',' : ',',
                  authorship: prev.authorship ? prev.authorship + ',' : ',',
                }));
              }}
            >
              + Adicionar autor
            </button>
          </div>

          <div className="col-span-full">
            <label htmlFor="summary" className="block font-semibold mb-1">
              Resumo
            </label>
            <textarea
              id="summary"
              name="summary"
              placeholder="Digite o resumo"
              value={formData.summary}
              onChange={handleChange}
              className="input w-full"
              required
              rows={2}
            />
          </div>

          <div className="col-span-full">
            <label htmlFor="details" className="block font-semibold mb-1">
              Detalhes
            </label>
            <textarea
              id="details"
              name="details"
              placeholder="Digite os detalhes"
              value={formData.details}
              onChange={handleChange}
              className="input w-full"
              required
              rows={2}
            />
          </div>

          <div>
            <label htmlFor="year" className="block font-semibold mb-1">
              Ano
            </label>
            <input
              id="year"
              name="year"
              type="number"
              inputMode="numeric"
              min="0"
              max={new Date().getFullYear()}
              placeholder="Ano de publicação"
              value={formData.year}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="collection_id" className="block font-semibold mb-1">
              Coleção
            </label>
            <select
              id="collection_id"
              name="collection_id"
              value={formData.collection_id}
              onChange={handleChange}
              className="input w-full"
              required
            >
              <option value="">Selecione uma coleção</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="keywords" className="block font-semibold mb-1">
              Palavras-chave
            </label>
            <input
              id="keywords"
              name="keywords"
              placeholder="separadas por vírgula"
              value={formData.keywords}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="file_id" className="block font-semibold mb-1">
              Ebook (PDF, DOC, EPUB)
            </label>
            <input
              id="file_id"
              name="file_id"
              type="file"
              className="input w-full"
              accept=".pdf,.epub,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              ref={fileInputRef}
              required
            />
          </div>

          <div>
            <label htmlFor="cover_id" className="block font-semibold mb-1">
              Capa (imagem)
            </label>
            <input
              id="cover_id"
              name="cover_id"
              type="file"
              className="input w-full"
              accept="image/*"
              onChange={(e) => setCover(e.target.files?.[0] || null)}
              ref={coverInputRef}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-[#9EC5AE] hover:bg-[#85a790] text-white rounded shadow"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded shadow"
            disabled={loading}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

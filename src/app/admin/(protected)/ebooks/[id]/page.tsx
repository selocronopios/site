//src/app/admin/(protected)/ebooks/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import KeywordsInput from '@/components/KeywordSelector';

interface Collection {
  id: string;
  name: string;
}

interface Author {
  nameAuthor: string;
  authorship: string;
}

interface FormData {
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  year: number | '';
  collection_id: string;
  keywords: string[];
  publisher: string;
  edition: number | '';
  pages: number | '';
  format: string;
  isbn: string;
  authors: Author[];
}

export default function EditEbookPage() {
  const router = useRouter();
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fileId, setFileId] = useState('');
  const [coverId, setCoverId] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      authors: [{ nameAuthor: '', authorship: '' }],
      keywords: [],
      year: '',
      edition: '',
      pages: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'authors',
  });

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch('/api/collections');
        if (!res.ok) throw new Error('Erro ao buscar coleções');
        const data = await res.json();
        setCollections(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      }
    };

    const fetchKeywords = async () => {
      try {
        const res = await fetch('/api/ebooks/keywords');
        if (!res.ok) throw new Error('Erro ao buscar palavras-chave');
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      }
    };

    const fetchEbook = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/ebooks/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar ebook');
        const data = await res.json();

        setFileId(data.file_id || '');
        setCoverId(data.cover_id || '');

        reset({
          title: data.title || '',
          subtitle: data.subtitle || '',
          summary: data.summary || '',
          description: data.description || '',
          year: data.year || '',
          edition: data.edition || '',
          pages: data.pages || '',
          collection_id: data.collection_id || '',
          keywords: data.keywords || [],
          publisher: data.publisher || '',
          format: data.format || '',
          isbn: data.isbn || '',
          authors: Array.isArray(data.authors)
            ? data.authors.map((name: string, i: number) => ({
                nameAuthor: name,
                authorship: data.authorship?.[i] || '',
              }))
            : [
                {
                  nameAuthor: data.authors || '',
                  authorship: data.authorship || '',
                },
              ],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      }
    };

    fetchCollections();
    fetchKeywords();
    fetchEbook();
  }, [id, reset]);

  function handlePasteClean(
    e: React.ClipboardEvent<HTMLTextAreaElement>,
    updateFn: (newValue: string) => void,
    currentValue: string
  ) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const cleanedText = pastedText
      .replace(/[\n\r\t]+/g, ' ')
      .replace(/\s\s+/g, ' ')
      .trim();

    const target = e.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const newValue =
      currentValue.slice(0, start) + cleanedText + currentValue.slice(end);
    updateFn(newValue);
  }

  const onSubmit = async (data: FormData) => {
    setError(null);

    const year = Number(data.year);
    const edition = Number(data.edition);
    const pages = Number(data.pages);

    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      setError('Ano inválido');
      return;
    }

    if (isNaN(edition) || edition < 1) {
      setError('Edição inválida');
      return;
    }

    if (isNaN(pages) || pages < 1) {
      setError('Número de páginas inválido');
      return;
    }

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
      let finalFileId = fileId;
      let finalCoverId = coverId;

      if (file) finalFileId = await uploadFile(file);
      if (cover) finalCoverId = await uploadFile(cover);

      const payload = {
        ...data,
        year,
        edition,
        pages,
        authors: data.authors.map((a) => a.nameAuthor),
        authorship: data.authors.map((a) => a.authorship),
        file_id: finalFileId,
        cover_id: finalCoverId,
      };

      const res = await fetch(`/api/ebooks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Falha ao salvar ebook');
      router.push('/admin/ebooks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Editar Ebook</h1>
      {error && (
        <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Título */}
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Título
          </label>
          <input
            id="title"
            {...register('title', { required: 'Título obrigatório' })}
            placeholder="Digite o título"
            className="w-full p-3 border border-gray-300 rounded text-justify"
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Subtítulo */}
        <div>
          <label htmlFor="subtitle" className="block font-semibold mb-1">
            Subtítulo
          </label>
          <input
            id="subtitle"
            {...register('subtitle', { required: 'Subtítulo obrigatório' })}
            placeholder="Digite o subtítulo"
            className="w-full p-3 border border-gray-300 rounded text-justify"
          />
          {errors.subtitle && (
            <p className="text-red-600">{errors.subtitle.message}</p>
          )}
        </div>

        {/* Autores dinâmicos */}
        <div className="col-span-full">
          <div className="grid grid-cols-5 gap-2 mb-1">
            <label className="block font-semibold col-span-2">Autor</label>
            <label className="block font-semibold col-span-3">Autoria</label>
          </div>

          {fields.map((author, index) => (
            <div
              key={author.id}
              className="grid grid-cols-5 gap-2 mb-2 items-center"
            >
              <input
                {...register(`authors.${index}.nameAuthor` as const, {
                  required: 'Nome do autor obrigatório',
                })}
                className="input col-span-2 p-3 border border-gray-300 rounded text-justify"
                placeholder="Autor"
              />
              {errors.authors?.[index]?.nameAuthor && (
                <p className="text-red-600 col-span-2">
                  {errors.authors[index].nameAuthor?.message}
                </p>
              )}
              <textarea
                {...register(`authors.${index}.authorship` as const, {
                  required: 'Resumo obrigatório',
                })}
                onPaste={(e) =>
                  handlePasteClean(
                    e,
                    (newVal) => setValue(`authors.${index}.authorship`, newVal),
                    watch(`authors.${index}.authorship`) || ''
                  )
                }
                className="input col-span-2 p-3 border border-gray-300 rounded text-justify"
                placeholder="Resumo sobre o autor"
                rows={2}
              />
              {errors.authors?.[index]?.authorship && (
                <p className="text-red-600 col-span-3">
                  {errors.authors[index].authorship?.message}
                </p>
              )}
              <button
                type="button"
                className="px-2 py-1 bg-red-100 hover:bg-red-200 rounded text-sm"
                disabled={fields.length === 1}
                onClick={() => remove(index)}
              >
                x
              </button>
            </div>
          ))}

          <button
            type="button"
            className="px-3 py-1 bg-green-100 hover:bg-green-200 rounded text-sm"
            onClick={() => append({ nameAuthor: '', authorship: '' })}
          >
            + Adicionar autor
          </button>
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Descrição
          </label>
          <textarea
            id="description"
            {...register('description', { required: 'Descrição obrigatória' })}
            onPaste={(e) =>
              handlePasteClean(
                e,
                (newVal) => setValue('description', newVal),
                watch('description') || ''
              )
            }
            placeholder="Digite a descrição"
            className="w-full p-3 border border-gray-300 rounded text-justify"
            rows={6}
          />
          {errors.description && (
            <p className="text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Sumário */}
        <div>
          <label htmlFor="summary" className="block font-semibold mb-1">
            Sumário
          </label>
          <textarea
            id="summary"
            {...register('summary', { required: 'Sumário obrigatório' })}
            onPaste={(e) =>
              handlePasteClean(
                e,
                (newVal) => setValue('summary', newVal),
                watch('summary') || ''
              )
            }
            placeholder="Digite o sumário"
            className="w-full p-3 border border-gray-300 rounded text-justify"
            rows={6}
          />
          {errors.summary && (
            <p className="text-red-600">{errors.summary.message}</p>
          )}
        </div>

        {/* Publisher, Edition, Year, Pages, Format, ISBN */}
        <div className="space-y-4">
          <div>
            <label htmlFor="publisher" className="block font-semibold mb-1">
              Editora
            </label>
            <input
              id="publisher"
              {...register('publisher', { required: 'Editora obrigatória' })}
              placeholder="Qual é a Editora?"
              className="w-full p-3 border border-gray-300 rounded text-justify"
            />
            {errors.publisher && (
              <p className="text-red-600">{errors.publisher.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="edition" className="block font-semibold mb-1">
              Edição
            </label>
            <input
              id="edition"
              type="number"
              min={1}
              {...register('edition', {
                required: 'Edição obrigatória',
                valueAsNumber: true,
                min: { value: 1, message: 'Edição deve ser no mínimo 1' },
              })}
              placeholder="Qual é a edição?"
              className="w-full p-3 border border-gray-300 rounded text-justify"
            />
            {errors.edition && (
              <p className="text-red-600">{errors.edition.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="year" className="block font-semibold mb-1">
              Ano de Publicação
            </label>
            <input
              id="year"
              type="number"
              min={1000}
              max={new Date().getFullYear()}
              {...register('year', {
                required: 'Ano obrigatório',
                valueAsNumber: true,
                min: { value: 1000, message: 'Ano inválido' },
                max: {
                  value: new Date().getFullYear(),
                  message: 'Ano inválido',
                },
              })}
              placeholder="Qual o ano de publicação?"
              className="w-full p-3 border border-gray-300 rounded text-justify"
            />
            {errors.year && (
              <p className="text-red-600">{errors.year.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="pages" className="block font-semibold mb-1">
              Número de páginas
            </label>
            <input
              id="pages"
              type="number"
              min={1}
              {...register('pages', {
                required: 'Número de páginas obrigatório',
                valueAsNumber: true,
                min: { value: 1, message: 'Deve ser maior que zero' },
              })}
              placeholder="Qual é o número de páginas?"
              className="w-full p-3 border border-gray-300 rounded text-justify"
            />
            {errors.pages && (
              <p className="text-red-600">{errors.pages.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="format" className="block font-semibold mb-1">
              Formato do ebook
            </label>
            <input
              id="format"
              {...register('format', { required: 'Formato obrigatório' })}
              placeholder="Qual é o formato do ebook? PDF?"
              className="w-full p-3 border border-gray-300 rounded text-justify"
            />
            {errors.format && (
              <p className="text-red-600">{errors.format.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="isbn" className="block font-semibold mb-1">
              ISBN
            </label>
            <input
              id="isbn"
              {...register('isbn', { required: 'ISBN obrigatório' })}
              placeholder="Qual é o ISBN?"
              className="w-full p-3 border border-gray-300 rounded text-justify"
            />
            {errors.isbn && (
              <p className="text-red-600">{errors.isbn.message}</p>
            )}
          </div>
        </div>

        {/* Coleção */}
        <div>
          <label htmlFor="collection_id" className="block font-semibold mb-1">
            Coleção
          </label>
          <select
            id="collection_id"
            {...register('collection_id', { required: 'Coleção obrigatória' })}
            className="w-full p-3 border border-gray-300 rounded text-justify"
          >
            <option value="">Selecione uma coleção</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.collection_id && (
            <p className="text-red-600">{errors.collection_id.message}</p>
          )}
        </div>

        {/* Keywords */}
        <div className="mb-4">
          <label htmlFor="keywords" className="block font-semibold mb-1">
            Palavras-chave
          </label>
          <KeywordsInput
            value={watch('keywords')}
            onChange={(val) => setValue('keywords', val)}
            suggestions={suggestions}
          />
          {errors.keywords && (
            <p className="text-red-600">{errors.keywords.message}</p>
          )}
        </div>

        {/* Arquivos */}
        <div>
          <label htmlFor="file" className="block font-semibold mb-1">
            Ebook (arquivo atual será mantido se não alterar)
          </label>
          <input
            id="file"
            type="file"
            accept=".pdf,.epub,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            // required
            className="input w-full"
          />
        </div>

        <div>
          <label htmlFor="cover" className="block font-semibold mb-1">
            Capa (arquivo atual será mantido se não alterar)
          </label>
          <input
            id="cover"
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files?.[0] ?? null)}
            // required
            className="input w-full"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#9EC5AE] hover:bg-[#85a790] text-white rounded shadow"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/ebooks')}
            disabled={isSubmitting}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded shadow"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

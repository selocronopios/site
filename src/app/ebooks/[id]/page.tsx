//src/app/admin/ebooks/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Ebook {
  id: string;
  collections: {
    name: string;
  };
  title: string;
  subtitle: string;
  authors: string;
  keywords: string;
  description: string;
  authorship: string;
  summary: string;
  publisher: string;
  year: number;
  edition: number;
  pages: number;
  format: string;
  isbn: string;
  link: string;
}

export default function EbookPage() {
  const params = useParams();
  const id = params?.id as string;

  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [aceito, setAceito] = useState(false);
  const [ebookLinkURL, setEbookLinkURL] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEbook = async () => {
      try {
        const res = await fetch(`/api/ebooks/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar ebook.');
        const data = await res.json();
        setEbook(data);

        const ebookLink = data.file_id;

        const resLink = await fetch(`/api/media/signed-url/${ebookLink}`);
        if (!resLink.ok) throw new Error('Erro ao consultar ebook');
        const dataLink = await resLink.json();
        setEbookLinkURL(dataLink.url);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEbook();
  }, [id]);

  const urlImagem = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publico/`;

  if (loading) return <p>Carregando...</p>;
  if (error) return <div>Erro: {error}</div>;
  if (!ebook) return <div>Ebook não encontrado!</div>;

  return (
    <main>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded">
            {error}
          </div>
        )}
        <div
          className="grid grid-cols-[15rem_auto] gap-x-6 gap-y-4"
          style={{ alignItems: 'stretch' }}
        >
          <div style={{ height: '100%' }}>
            {ebook.link && (
              <img
                src={`${urlImagem}${ebook.link}`}
                alt={ebook.title}
                className="h-full w-auto object-contain"
              />
            )}
          </div>
          <div className="h-full text-left">
            <h3 className="heading-h3 text-text mb-2">
              {ebook.collections.name}
            </h3>
            <h1 className="heading-h1 text-text mb-2">{ebook.title}</h1>
            {ebook.subtitle && (
              <h2 className="heading-h2 text-text mb-2">{ebook.subtitle}</h2>
            )}
            <h3 className="heading-h3 text-text mb-2">{ebook.authors}</h3>
            <h3 className="heading-h3 text-text mb-2">
              Palavras-chave:{ebook.keywords}
            </h3>
            <p className="heading-text text-text text-justify mb-2">
              {ebook.description}
            </p>
            <div className="my-4 flex items-center space-x-2 justify-center w-full">
              <input
                type="checkbox"
                id="confirmar"
                checked={aceito}
                onChange={(e) => setAceito(e.target.checked)}
              />
              <label htmlFor="confirmar">
                O acesso e a leitura deste livro estão condicionados ao aceite
                dos nossos{` `}
                <a
                  href="/termos-uso"
                  className="text-text underline"
                  target="_blank"
                >
                  termos de uso
                </a>
                .
              </label>
            </div>
            {ebookLinkURL && (
              <a
                href={ebookLinkURL}
                target="_blank"
                className={`bg-success text-white heading-h2 w-[300px] h-[40px] rounded-2xl hover:bg-hoverSucesso flex items-center justify-center mx-auto ${!aceito ? 'pointer-events-none opacity-50' : ''}`}
              >
                <button className="bg-success text-white heading-h2 w-[300px] h-[40px] rounded-2xl hover:bg-hoverSucesso">
                  Baixar eBook
                </button>
              </a>
            )}
          </div>
        </div>
        <div>
          <h2 className="heading-h2 text-text">Autoria</h2>
          <p>{ebook.authorship}</p>
          <h2 className="heading-h2 text-text">Sumário</h2>
          <p>{ebook.summary}</p>
          <h2 className="heading-h2 text-text">Ficha Técnica</h2>
          <p>
            <span className="font-bold">Título:</span> {ebook.title}
          </p>
          <p>
            <span className="font-bold">Subtítulo:</span> {ebook.subtitle}
          </p>
          <p>
            <span className="font-bold">Editora:</span> {ebook.publisher}
          </p>
          <p>
            <span className="font-bold">Ano de publicação:</span> {ebook.year}
          </p>
          <p>
            <span className="font-bold">Edição:</span> {ebook.edition}
          </p>
          <p>
            <span className="font-bold">Páginas:</span> {ebook.pages}
          </p>
          <p>
            <span className="font-bold">Formato:</span> {ebook.format}
          </p>
          <p>
            <span className="font-bold">ISBN:</span> {ebook.isbn}
          </p>
        </div>
      </div>
    </main>
  );
}

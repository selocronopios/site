'use client';

import { useState } from 'react';

interface EbookDownloadBoxProps {
  pdfUrl: string;
  titulo: string;
}

export default function EbookDownloadBox({
  pdfUrl,
  titulo,
}: EbookDownloadBoxProps) {
  const [aceito, setAceito] = useState(false);

  return (
    <>
      <div className="my-4 flex items-center space-x-2 justify-center w-full">
        <input
          type="checkbox"
          id="confirmar"
          checked={aceito}
          onChange={(e) => setAceito(e.target.checked)}
        />
        <label htmlFor="confirmar">
          O acesso e a leitura deste livro estão condicionados ao aceite dos
          nossos{' '}
          <a
            href="/termos-uso"
            className="text-text underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            termos de uso
          </a>
          .
        </label>
      </div>

      {pdfUrl && (
        <a
          href={aceito ? pdfUrl : undefined}
          download={aceito ? `${titulo}.pdf` : undefined}
          onClick={(e) => {
            if (!aceito) e.preventDefault();
          }}
          aria-disabled={!aceito}
          className={`bg-success text-white heading-h2 w-[300px] h-[40px] rounded-2xl hover:bg-hoverSucesso flex items-center justify-center mx-auto transition ${
            !aceito ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Baixar eBook
        </a>
      )}
    </>
  );
}

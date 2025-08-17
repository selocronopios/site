//src/app/publique-conosco/page.tsx
'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function Publique() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    autores: '',
    afiliacao: '',
    title: '',
    email: '',
    telefone: '',
  });

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus('Selecione um arquivo.');
      return;
    }

    setLoading(true);
    setStatus('');

    const form = new FormData();
    form.append('autores', formData.autores);
    form.append('afiliacao', formData.afiliacao);
    form.append('title', formData.title);
    form.append('email', formData.email);
    form.append('telefone', formData.telefone);
    form.append('file', file);

    const res = await fetch('/api/enviar-proposta', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setStatus('Proposta enviada com sucesso!');
    } else {
      setStatus('Erro ao enviar proposta.');
    }
  };
  return (
    <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
      <h1 className="heading-h1 text-primary text-center">Publique conosco</h1>

      <div className="grid grid-cols-2 gap-4">
        <a href="/arquivos/DiretrizesEditoriais-2025-07-19.pdf" target="_blank">
          <button className="bg-success text-white heading-h1 w-full h-[120px] px-4 py-2 rounded-2xl hover:bg-hoverSucesso">
            Formatação
          </button>
        </a>

        <Link href="/termos-uso" target="_blank">
          <button className="bg-success text-white heading-h1 w-full h-[120px] px-4 py-2 rounded-2xl hover:bg-hoverSucesso">
            Termos de Uso e Política de Direitos Autorais
          </button>
        </Link>
      </div>

      <div>
        <h1 className="heading-h1 text-primary text-center">
          Envio de proposta
        </h1>
        <p>Preencha os campos abaixo e envie seu arquivo</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            name="autores"
            value={formData.autores}
            onChange={handleChange}
            placeholder="Autor(es)"
            className="input w-full"
            required
          />
          <input
            name="afiliacao"
            value={formData.afiliacao}
            onChange={handleChange}
            placeholder="Filiação institucional"
            className="input w-full"
            required
          />
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título da obra"
            className="input w-full"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="input w-full"
            required
          />
          <input
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Telefone"
            className="input w-full"
            required
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="input w-full"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Enviando...' : 'Enviar proposta'}
          </button>
        </form>

        {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
      </div>
    </div>
  );
}

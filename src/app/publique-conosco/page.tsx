'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function Publique() {
  const [aceito, setAceito] = useState(false);
  const [formatado, setFormatado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ email?: string; telefone?: string }>(
    {}
  );

  const [formData, setFormData] = useState({
    autores: '',
    afiliacao: '',
    title: '',
    email: '',
    telefone: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      let cleaned = value.replace(/\D/g, '');
      if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);
      let formatted = cleaned;
      if (cleaned.length > 0) formatted = `(${cleaned.slice(0, 2)}`;
      if (cleaned.length > 2) formatted += `) ${cleaned.slice(2, 7)}`;
      if (cleaned.length > 7) formatted += `-${cleaned.slice(7, 11)}`;
      setFormData((prev) => ({ ...prev, telefone: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'E-mail inválido';
    }
    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido, use formato (XX) XXXXX-XXXX';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    if (!file) {
      setStatus('Selecione um arquivo.');
      return;
    }
    if (!validateForm()) return;

    setLoading(true);

    const form = new FormData();
    form.append('autores', formData.autores);
    form.append('afiliacao', formData.afiliacao);
    form.append('title', formData.title);
    form.append('email', formData.email);
    form.append('telefone', formData.telefone);
    form.append('file', file);

    try {
      const res = await fetch('/api/enviar-proposta', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      setStatus(
        data.success
          ? 'Proposta enviada com sucesso!'
          : 'Erro ao enviar proposta.'
      );
    } catch (err) {
      setStatus(`Erro ao enviar proposta: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-start p-8 max-w-5xl mx-auto space-y-8">
      <h1 className="heading-h1 text-primary text-center mb-6">
        Publique conosco
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a href="/arquivos/DiretrizesEditoriais-2025-07-19.pdf" target="_blank">
          <button className="bg-success text-white heading-h1 w-full h-28 rounded-2xl hover:bg-hoverSucesso transition">
            Formatação
          </button>
        </a>
        <Link href="/termos-uso" target="_blank">
          <button className="bg-success text-white heading-h1 w-full h-28 rounded-2xl hover:bg-hoverSucesso transition">
            Termos de Uso e Política de Direitos Autorais
          </button>
        </Link>
      </div>

      <div className="flex-1">
        <h2 className="heading-h1 text-primary text-center mb-4">
          Envio de proposta
        </h2>
        <p className="text-center mb-6">
          Preencha os campos abaixo e envie seu arquivo
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label>Autores:</label>
            <input
              name="autores"
              value={formData.autores}
              onChange={handleChange}
              placeholder="Autor(es)"
              className="input w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Afiliação:</label>
            <input
              name="afiliacao"
              value={formData.afiliacao}
              onChange={handleChange}
              placeholder="UFMG, UFOP, PUC-MG, etc..."
              className="input w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Título:</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título da obra"
              className="input w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>e-mail de contato:</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="input w-full border border-gray-300 rounded px-3 py-2"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Telefone:</label>
            <input
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
              className="input w-full border border-gray-300 rounded px-3 py-2"
              required
            />
            {errors.telefone && (
              <p className="text-red-500 text-sm">{errors.telefone}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Arquivo:</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="input w-full"
              required
            />
          </div>
          <div className="my-4 flex flex-col gap-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="aceito"
                checked={aceito}
                onChange={(e) => setAceito(e.target.checked)}
              />
              <label htmlFor="aceito" className="text-sm">
                Li e estou de acordo com os{' '}
                <a
                  href="/termos-uso"
                  className="text-text underline"
                  target="_blank"
                >
                  termos de uso e a política de direitos autorais
                </a>{' '}
                do Selo Editorial Cronópios (UFMG).
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="formatado"
                checked={formatado}
                onChange={(e) => setFormatado(e.target.checked)}
              />
              <label htmlFor="formatado" className="text-sm">
                Formatei o arquivo conforme as{' '}
                <a
                  href="/arquivos/DiretrizesEditoriais-2025-07-19.pdf"
                  className="text-text underline"
                  target="_blank"
                >
                  diretrizes de publicação
                </a>{' '}
                exigidas pelo Selo Editorial Cronópios (UFMG).
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !aceito || !formatado}
            className={`bg-success text-white px-6 py-3 rounded hover:bg-hoverSucesso transition mt-4 ${
              (!aceito || !formatado) && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {loading ? 'Enviando...' : 'Enviar proposta'}
          </button>
        </form>

        {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
      </div>
    </div>
  );
}

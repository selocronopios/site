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

  const handleTelefoneChange = (value: string) => {
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

    let formatted = '';
    if (cleaned.length > 0) formatted = `(${cleaned.slice(0, 2)}`;
    if (cleaned.length > 2) formatted += `) ${cleaned.slice(2, 7)}`;
    if (cleaned.length > 7) formatted += `-${cleaned.slice(7, 11)}`;

    setFormData((prev) => ({ ...prev, telefone: formatted }));

    // validação em tempo real
    setErrors((prev) => ({
      ...prev,
      telefone: /^\(\d{2}\) \d{5}-\d{4}$/.test(formatted)
        ? undefined
        : 'Telefone inválido, use (XX) XXXXX-XXXX',
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === 'telefone') {
      handleTelefoneChange(value);
    } else if (name === 'email') {
      setFormData((prev) => ({ ...prev, email: value }));
      setErrors((prev) => ({
        ...prev,
        email: value.includes('@') ? undefined : 'E-mail inválido',
      }));
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
    if (!formData.email.includes('@')) newErrors.email = 'E-mail inválido';
    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone))
      newErrors.telefone = 'Telefone inválido, use (XX) XXXXX-XXXX';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      autores: '',
      afiliacao: '',
      title: '',
      email: '',
      telefone: '',
    });
    setFile(null);
    setAceito(false);
    setFormatado(false);
    setErrors({});
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

      if (!res.ok) throw new Error(`Status ${res.status}`);

      const data = await res.json();

      if (data.success) {
        setStatus('Proposta enviada com sucesso!');
        resetForm();
      } else {
        setStatus(data.message || 'Erro ao enviar proposta.');
      }
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Modal de Loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-lg text-center space-y-4 shadow-lg">
            <p className="text-lg font-semibold">Enviando arquivo...</p>
            <div className="w-12 h-12 border-4 border-gray-300 border-t-success rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}

      <h1 className="heading-h1 text-primary text-center mb-6">
        Publique conosco
      </h1>

      {/* Botões */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a
          href="/arquivos/DiretrizesEditoriais-2025-07-19.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-success text-white heading-h2 w-full h-20 sm:h-28 rounded-2xl hover:bg-hoverSucesso transition">
            Formatação
          </button>
        </a>
        <Link href="/termos-uso" target="_blank">
          <button className="bg-success text-white heading-h2 w-full h-20 sm:h-28 rounded-2xl hover:bg-hoverSucesso transition">
            Termos de Uso e Política
          </button>
        </Link>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label>Telefone:</label>
            <input
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
              className={`input w-full border rounded px-3 py-2 ${
                errors.telefone ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.telefone && (
              <p className="text-red-500 text-sm">{errors.telefone}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label>e-mail de contato:</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className={`input w-full border rounded px-3 py-2 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label>Arquivo:</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="input w-full"
              required
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3 mt-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={aceito}
              onChange={(e) => setAceito(e.target.checked)}
            />
            Li e estou de acordo com os{' '}
            <a
              href="/termos-uso"
              className="text-text underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              termos de uso e política de direitos autorais
            </a>
            .
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={formatado}
              onChange={(e) => setFormatado(e.target.checked)}
            />
            Formatei o arquivo conforme as{' '}
            <a
              href="/arquivos/DiretrizesEditoriais-2025-07-19.pdf"
              className="text-text underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              diretrizes de publicação
            </a>
            .
          </label>
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
  );
}

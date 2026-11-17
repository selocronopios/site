'use client';

import Link from 'next/link';
import React, { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function Publique() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [aceito, setAceito] = useState(false);
  const [formatado, setFormatado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setAceito(false);
    setFormatado(false);
    setErrors({});
    setCaptchaToken(null);
    captchaRef.current?.resetCaptcha();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    if (!file) {
      setStatus('Selecione um arquivo.');
      return;
    }
    if (!validateForm()) return;

    if (!captchaToken) {
      setStatus(
        'Por favor, confirme a verificação de segurança (captcha) antes de enviar.'
      );
      return;
    }

    const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!web3FormsKey) {
      setStatus('Chave de envio de e-mail não configurada.');
      return;
    }

    setLoading(true);

    try {
      // 1. Solicita a URL pré-assinada ao backend
      const resUrl = await fetch('/api/enviar-proposta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      });

      const dataUrl = await resUrl.json();
      if (!resUrl.ok) {
        throw new Error(
          dataUrl.detalhe || dataUrl.error || `Erro ${resUrl.status}`
        );
      }

      const { uploadUrl, downloadUrl, contentType } = dataUrl;

      // 2. Envia o arquivo direto do navegador para o Backblaze B2
      const resUpload = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file,
      });

      if (!resUpload.ok) {
        throw new Error('Falha ao transferir o arquivo para o servidor.');
      }

      // 3. Dispara os dados da proposta + link temporário para o e-mail do selo
      const resEmail = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsKey,
          'h-captcha-response': captchaToken,
          subject: `Nova Proposta Editorial: ${formData.title}`,
          from_name: 'Cronópios Selo Editorial',
          replyto: formData.email,
          Autores: formData.autores,
          Afiliação: formData.afiliacao,
          Título: formData.title,
          'E-mail de contato': formData.email,
          Telefone: formData.telefone,
          Arquivo: `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`,
          'Link para download (válido por 7 dias)': downloadUrl,
        }),
      });

      const dataEmail = await resEmail.json();

      if (resEmail.ok && dataEmail.success) {
        setStatus('Proposta enviada com sucesso!');
        resetForm();
      } else {
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
        setStatus(
          dataEmail.message ||
            'Arquivo enviado, mas houve erro ao notificar por e-mail.'
        );
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
              ref={fileInputRef}
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

        <div className="mt-2">
          <HCaptcha
            ref={captchaRef}
            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
            reCaptchaCompat={false}
            onVerify={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
          />
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

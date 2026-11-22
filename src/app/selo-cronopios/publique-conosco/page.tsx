'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {
  FileText,
  Scale,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  CalendarClock,
} from 'lucide-react';

interface StatusFeedback {
  type: 'success' | 'error';
  text: string;
}

interface FormErrors {
  autores?: string;
  afiliacao?: string;
  title?: string;
  email?: string;
  telefone?: string;
  file?: string;
}

interface StatusJanela {
  aberto: boolean;
  janelaAtual?: string;
  proximaJanela: string;
}

const WORD_MIME_TYPES = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function isArquivoWordValido(file: File): boolean {
  const extensaoValida = /\.(doc|docx)$/i.test(file.name);
  const mimeValido = !file.type || WORD_MIME_TYPES.includes(file.type);
  return extensaoValida && mimeValido;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONE_REGEX = /^\(\d{2}\) \d{5}-\d{4}$/;
const MESES_PERMITIDOS = [3, 4, 8, 9]; // Março, Abril, Agosto e Setembro

function getStatusSubmissao(dataReferencia = new Date()): StatusJanela {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(dataReferencia);

  const ano = Number(
    partes.find((p) => p.type === 'year')?.value ?? dataReferencia.getFullYear()
  );
  const mes = Number(
    partes.find((p) => p.type === 'month')?.value ??
      dataReferencia.getMonth() + 1
  );

  // Antes de agosto de 2027 (inclui todo o ano de 2026 e jan–jul de 2027)
  if (ano < 2027 || (ano === 2027 && mes < 8)) {
    return {
      aberto: false,
      proximaJanela: 'agosto e setembro de 2027',
    };
  }

  // Em 2027, apenas agosto (8) e setembro (9) estão abertos
  if (ano === 2027) {
    if (mes === 8 || mes === 9) {
      return {
        aberto: true,
        janelaAtual: 'agosto e setembro de 2027',
        proximaJanela: 'março e abril de 2028',
      };
    }

    return {
      aberto: false,
      proximaJanela: 'março e abril de 2028',
    };
  }

  // A partir de 2028: março (3), abril (4), agosto (8) e setembro (9)
  if (MESES_PERMITIDOS.includes(mes)) {
    const janelaAtual =
      mes === 3 || mes === 4
        ? `março e abril de ${ano}`
        : `agosto e setembro de ${ano}`;
    const proximaJanela =
      mes === 3 || mes === 4
        ? `agosto e setembro de ${ano}`
        : `março e abril de ${ano + 1}`;

    return {
      aberto: true,
      janelaAtual,
      proximaJanela,
    };
  }

  if (mes < 3) {
    return {
      aberto: false,
      proximaJanela: `março e abril de ${ano}`,
    };
  }

  if (mes >= 5 && mes <= 7) {
    return {
      aberto: false,
      proximaJanela: `agosto e setembro de ${ano}`,
    };
  }

  return {
    aberto: false,
    proximaJanela: `março e abril de ${ano + 1}`,
  };
}

export default function Publique() {
  const [statusJanela, setStatusJanela] = useState<StatusJanela | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [aceito, setAceito] = useState(false);
  const [formatado, setFormatado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('Enviando arquivo...');
  const [status, setStatus] = useState<StatusFeedback | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    autores: '',
    afiliacao: '',
    title: '',
    email: '',
    telefone: '',
  });

  useEffect(() => {
    setStatusJanela(getStatusSubmissao(new Date()));
  }, []);

  const validateField = (
    name: keyof typeof formData,
    value: string
  ): string | undefined => {
    const trimmed = value.trim();

    switch (name) {
      case 'autores':
        return trimmed.length === 0
          ? 'Informe o(s) autor(es) ou organizador(es).'
          : undefined;
      case 'afiliacao':
        return trimmed.length === 0
          ? 'Informe a afiliação institucional.'
          : undefined;
      case 'title':
        return trimmed.length === 0 ? 'Informe o título da obra.' : undefined;
      case 'email':
        if (trimmed.length === 0) return 'Informe um e-mail de contato.';
        return EMAIL_REGEX.test(trimmed) ? undefined : 'E-mail inválido.';
      case 'telefone':
        if (trimmed.length === 0) return 'Informe um telefone para contato.';
        return TELEFONE_REGEX.test(value)
          ? undefined
          : 'Telefone inválido, use (XX) XXXXX-XXXX.';
      default:
        return undefined;
    }
  };

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
      telefone:
        formatted.length === 0
          ? undefined
          : validateField('telefone', formatted),
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
      return;
    }

    const fieldName = name as keyof typeof formData;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value),
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof typeof formData;
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, e.target.value),
    }));
  };

  const processSelectedFile = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      setErrors((prev) => ({
        ...prev,
        file: 'Selecione um arquivo Word (.doc ou .docx).',
      }));
      return;
    }

    if (!isArquivoWordValido(selectedFile)) {
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setErrors((prev) => ({
        ...prev,
        file: 'Apenas arquivos no formato Word (.doc ou .docx) são permitidos.',
      }));
      return;
    }

    setFile(selectedFile);
    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processSelectedFile(e.target.files?.[0] || null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processSelectedFile(e.dataTransfer.files?.[0] || null);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrors((prev) => ({
      ...prev,
      file: 'Selecione um arquivo Word (.doc ou .docx).',
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {
      autores: validateField('autores', formData.autores),
      afiliacao: validateField('afiliacao', formData.afiliacao),
      title: validateField('title', formData.title),
      email: validateField('email', formData.email),
      telefone: validateField('telefone', formData.telefone),
      file: !file ? 'Selecione um arquivo Word (.doc ou .docx).' : undefined,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
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
    setStatus(null);

    const janelaAtual = getStatusSubmissao(new Date());
    if (!janelaAtual.aberto) {
      setStatusJanela(janelaAtual);
      return;
    }

    if (!validateForm() || !file) {
      setStatus({
        type: 'error',
        text: 'Preencha todos os campos obrigatórios e anexe o arquivo Word antes de enviar.',
      });
      return;
    }

    if (!aceito || !formatado) {
      setStatus({
        type: 'error',
        text: 'Marque as duas declarações obrigatórias antes de enviar.',
      });
      return;
    }

    if (!captchaToken) {
      setStatus({
        type: 'error',
        text: 'Por favor, confirme a verificação de segurança (captcha) antes de enviar.',
      });
      return;
    }

    const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!web3FormsKey) {
      setStatus({
        type: 'error',
        text: 'Chave de envio de e-mail não configurada.',
      });
      return;
    }

    setLoading(true);

    try {
      setLoadingStep('Preparando envio seguro...');
      const resUrl = await fetch('/api/enviar-proposta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType:
            file.type ||
            (file.name.toLowerCase().endsWith('.doc')
              ? 'application/msword'
              : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
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

      setLoadingStep('Transferindo arquivo Word...');
      const resUpload = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file,
      });

      if (!resUpload.ok) {
        throw new Error('Falha ao transferir o arquivo para o servidor.');
      }

      setLoadingStep('Notificando equipe editorial...');
      const resEmail = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsKey,
          'h-captcha-response': captchaToken,
          subject: `Nova Proposta Editorial: ${formData.title.trim()}`,
          from_name: 'Selo Editorial Cronópios',
          replyto: formData.email.trim(),
          Autores: formData.autores.trim(),
          Afiliação: formData.afiliacao.trim(),
          Título: formData.title.trim(),
          'E-mail de contato': formData.email.trim(),
          Telefone: formData.telefone,
          Arquivo: `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`,
          'Link para download (válido por 7 dias)': downloadUrl,
        }),
      });

      const dataEmail = await resEmail.json();

      if (resEmail.ok && dataEmail.success) {
        setStatus({
          type: 'success',
          text: 'Proposta enviada com sucesso! Nossa equipe editorial entrará em contato pelo e-mail informado.',
        });
        resetForm();
      } else {
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
        setStatus({
          type: 'error',
          text:
            dataEmail.message ||
            'Arquivo enviado, mas houve erro ao notificar por e-mail.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        text: err instanceof Error ? err.message : 'Erro desconhecido',
      });
    } finally {
      setLoading(false);
    }
  };

  const allFieldsFilled =
    formData.autores.trim().length > 0 &&
    formData.afiliacao.trim().length > 0 &&
    formData.title.trim().length > 0 &&
    EMAIL_REGEX.test(formData.email.trim()) &&
    TELEFONE_REGEX.test(formData.telefone) &&
    Boolean(file);

  const canSubmit =
    !loading && allFieldsFilled && aceito && formatado && Boolean(captchaToken);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Modal de Loading */}
      {loading && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="bg-white p-8 rounded-xl text-center space-y-4 shadow-lg max-w-sm w-full">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-success rounded-full animate-spin mx-auto" />
            <p className="text-lg font-semibold text-text">{loadingStep}</p>
            <p className="text-xs text-textSuave">
              Não feche ou atualize esta página até a conclusão.
            </p>
          </div>
        </div>
      )}

      {/* Cabeçalho Institucional */}
      <div className="border-b border-primary/10 py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center space-y-3">
          <h1 className="heading-h1 text-primary">Publique conosco</h1>
          <p className="text-sm sm:text-base text-textSuave max-w-2xl mx-auto leading-relaxed">
            Submeta seu original em Word (.doc ou .docx) para avaliação do{' '}
            <strong className="font-medium text-text">
              Selo Editorial Cronópios
            </strong>
            . Consulte abaixo as diretrizes de formatação e os termos de
            publicação em acesso aberto.
          </p>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
        {/* Cartões de Documentos Obrigatórios (sempre disponíveis) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <a
            href="/arquivos/DiretrizesEditoriais-2025-07-19.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-success text-white rounded-2xl p-5 sm:p-6 hover:bg-hoverSucesso transition shadow-sm flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/15 p-3 rounded-xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="heading-h2 block">Formatação</span>
                <span className="text-xs sm:text-sm text-white/90">
                  Consultar diretrizes editoriais (PDF)
                </span>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>

          <Link
            href="/termos-uso"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-success text-white rounded-2xl p-5 sm:p-6 hover:bg-hoverSucesso transition shadow-sm flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/15 p-3 rounded-xl shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="heading-h2 block">
                  Termos de Uso e Política
                </span>
                <span className="text-xs sm:text-sm text-white/90">
                  Direitos autorais e acesso aberto
                </span>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </Link>
        </div>

        {/* Estado de carregamento inicial da verificação de data */}
        {statusJanela === null && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-primary/10 text-center text-sm text-textSuave">
            Verificando período de submissão...
          </div>
        )}

        {/* Aviso quando fora da janela de submissão */}
        {statusJanela !== null && !statusJanela.aberto && (
          <section
            aria-live="polite"
            className="bg-white p-6 sm:p-10 rounded-xl shadow-sm border border-primary/15 text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-selectionLight text-primary flex items-center justify-center mx-auto">
              <CalendarClock className="w-6 h-6" />
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              <h2 className="heading-h2 text-primary">
                Submissões temporariamente indisponíveis
              </h2>
              <p className="text-sm sm:text-base text-text leading-relaxed">
                O{' '}
                <strong className="font-medium">
                  Selo Editorial Cronópios
                </strong>{' '}
                receberá propostas de publicação exclusivamente nos meses de{' '}
                <strong className="font-medium">
                  março, abril, agosto e setembro
                </strong>
                , com abertura inicial prevista para{' '}
                <strong className="font-medium">agosto de 2027</strong>.
              </p>
            </div>

            <div className="inline-block bg-selectionLight/70 border border-primary/15 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-text">
              Próximo período de recebimento:{' '}
              <strong className="text-primary font-semibold">
                {statusJanela.proximaJanela}
              </strong>
            </div>

            <p className="text-xs sm:text-sm text-textSuave max-w-xl mx-auto pt-1">
              Enquanto o formulário estiver fechado, você já pode consultar as
              normas de <strong className="font-medium">Formatação</strong> e os{' '}
              <strong className="font-medium">Termos de Uso e Política</strong>{' '}
              acima para preparar seu original.
            </p>
          </section>
        )}

        {/* Formulário de Submissão (exibido apenas dentro da janela) */}
        {statusJanela !== null && statusJanela.aberto && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-primary/10"
          >
            <div className="border-b border-gray-100 pb-3 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h2 className="heading-h2 text-primary">Dados da proposta</h2>
                <p className="text-xs sm:text-sm text-textSuave mt-1">
                  Todos os campos abaixo são obrigatórios para a submissão.
                </p>
              </div>
              {statusJanela.janelaAtual && (
                <span className="text-xs bg-selectionLight text-primary font-medium px-3 py-1 rounded-full">
                  Chamada aberta ({statusJanela.janelaAtual})
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="autores" className="text-sm font-medium">
                  Autor(es) / Organizador(es){' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="autores"
                  name="autores"
                  value={formData.autores}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.autores)}
                  placeholder="Nome completo do(s) autor(es)"
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
                    errors.autores
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                  required
                />
                {errors.autores && (
                  <p className="text-red-600 text-xs">{errors.autores}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="afiliacao" className="text-sm font-medium">
                  Afiliação institucional{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="afiliacao"
                  name="afiliacao"
                  value={formData.afiliacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.afiliacao)}
                  placeholder="UFMG, UFOP, PUC-MG, etc."
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
                    errors.afiliacao
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                  required
                />
                {errors.afiliacao && (
                  <p className="text-red-600 text-xs">{errors.afiliacao}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="title" className="text-sm font-medium">
                  Título da obra <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.title)}
                  placeholder="Título e subtítulo da obra"
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
                    errors.title
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                  required
                />
                {errors.title && (
                  <p className="text-red-600 text-xs">{errors.title}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="telefone" className="text-sm font-medium">
                  Telefone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.telefone)}
                  placeholder="(XX) XXXXX-XXXX"
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
                    errors.telefone
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                  required
                />
                {errors.telefone && (
                  <p className="text-red-600 text-xs">{errors.telefone}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-mail de contato <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.email)}
                  placeholder="seuemail@instituicao.br"
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 transition ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Upload de Arquivo PDF */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label htmlFor="arquivo-word" className="text-sm font-medium">
                  Original da obra (Word)<span className="text-red-500">*</span>
                </label>

                <input
                  id="arquivo-word"
                  ref={fileInputRef}
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="sr-only"
                />

                {!file ? (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                      isDragging
                        ? 'border-primary bg-selectionLight/60'
                        : errors.file
                          ? 'border-red-400 bg-red-50/30 hover:border-red-500'
                          : 'border-gray-300 hover:border-primary hover:bg-background/60'
                    }`}
                  >
                    <Upload className="w-7 h-7 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-text">
                      Clique para selecionar ou arraste o arquivo Word aqui
                    </p>
                    <p className="text-xs text-textSuave mt-1">
                      Formato aceito: exclusivamente .doc ou .docx
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3 border border-primary/30 bg-selectionLight/40 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-5 h-5 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-textSuave">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB · Word
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      aria-label="Remover arquivo selecionado"
                      className="p-1.5 text-textSuave hover:text-red-600 rounded-lg hover:bg-white transition shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {errors.file && (
                  <p className="text-red-600 text-xs">{errors.file}</p>
                )}
              </div>
            </div>

            {/* Checkboxes de Declaração */}
            <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
              <label className="flex items-start gap-2.5 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={aceito}
                  onChange={(e) => setAceito(e.target.checked)}
                  className="mt-0.5 accent-primary w-4 h-4 shrink-0"
                />
                <span>
                  Li e estou de acordo com os{' '}
                  <a
                    href="/termos-uso"
                    className="text-primary font-medium underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    termos de uso e política de direitos autorais
                  </a>
                  . <span className="text-red-500">*</span>
                </span>
              </label>

              <label className="flex items-start gap-2.5 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={formatado}
                  onChange={(e) => setFormatado(e.target.checked)}
                  className="mt-0.5 accent-primary w-4 h-4 shrink-0"
                />
                <span>
                  Formatei o arquivo conforme as{' '}
                  <a
                    href="/arquivos/DiretrizesEditoriais-2025-07-19.pdf"
                    className="text-primary font-medium underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    diretrizes de publicação
                  </a>
                  . <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Captcha */}
            <div className="pt-1 overflow-x-auto">
              <HCaptcha
                ref={captchaRef}
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                reCaptchaCompat={false}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                onError={() => setCaptchaToken(null)}
              />
            </div>

            {/* Feedback de Status */}
            {status && (
              <div
                role="alert"
                className={`flex items-start gap-3 p-4 rounded-xl text-sm border ${
                  status.type === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <p>{status.text}</p>
              </div>
            )}

            {/* Botão de Envio */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full sm:w-auto bg-success text-white font-medium px-8 py-3 rounded-lg hover:bg-hoverSucesso transition ${
                  !canSubmit ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Enviando...' : 'Enviar proposta'}
              </button>

              {!canSubmit && !loading && (
                <p className="text-xs text-textSuave">
                  Para habilitar o envio, preencha todos os campos obrigatórios,
                  anexe o arquivo Word, marque as duas declarações e conclua a
                  verificação de segurança (captcha).
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

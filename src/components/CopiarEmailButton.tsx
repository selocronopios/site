'use client';

import { useState } from 'react';
import { FaCheck, FaRegCopy } from 'react-icons/fa';

interface CopiarEmailButtonProps {
  email: string;
}

export default function CopiarEmailButton({ email }: CopiarEmailButtonProps) {
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopiar}
      aria-label={`Copiar endereço de e-mail ${email}`}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors cursor-pointer"
    >
      {copiado ? (
        <>
          <FaCheck className="text-emerald-600" aria-hidden="true" />
          <span className="text-emerald-700">E-mail copiado</span>
        </>
      ) : (
        <>
          <FaRegCopy aria-hidden="true" />
          <span>Copiar e-mail</span>
        </>
      )}
    </button>
  );
}

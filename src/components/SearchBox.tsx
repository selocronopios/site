'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBox() {
  const [termo, setTermo] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (termo.trim()) {
      router.push(`/busca?query=${encodeURIComponent(termo)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Buscar..."
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        className="px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 transition"
      >
        Buscar
      </button>
    </form>
  );
}

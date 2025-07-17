'use client';

import { useState } from 'react';

export default function PasswordChangeForm() {
  const [form, setForm] = useState({
    email: 'infoselocronopios@gmail.com',
    oldPassword: '',
    newPassword: '',
  });

  const [modal, setModal] = useState({
    open: false,
    message: '',
    type: 'error' as 'error' | 'success',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setModal({
      open: true,
      message: data.message || data.error || 'Erro inesperado',
      type: res.ok ? 'success' : 'error',
    });
  };

  const closeModal = () => setModal({ ...modal, open: false });

  return (
    <div className="min-h-screen flex justify-center items-start pt-20 px-6">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">Alterar Senha</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <input
            type="password"
            name="oldPassword"
            placeholder="Senha atual"
            value={form.oldPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Nova senha"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Trocar senha
          </button>
        </form>
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p
              className={`text-center font-semibold ${modal.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
            >
              {modal.message}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

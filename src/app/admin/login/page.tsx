//src/app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabaseClient';
import Image from 'next/image'; 

export default function AdminLogin() {
  const router = useRouter();
  const redirectTo = '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace(redirectTo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-backgroundExtra px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8 md:gap-24">
        
        {/* Texto e formulário */}
        <div className="w-full md:max-w-md">
          <h1 className="heading-h1 text-primary mb-12 text-center md:text-left break-words">
            Selo Editorial Cronópios
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <label className="heading-h3 text-text flex flex-col gap-1">
              Login 
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 border border-text bg-background rounded-md p-2 text-text placeholder:text-textSuave"
                placeholder="Seu e-mail"
              />
            </label>

            <label className="heading-h3 text-text flex flex-col gap-1">
              Senha
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 border border-text bg-background rounded-md p-2 text-text placeholder:text-textSuave"
                placeholder="Sua senha"
              />
            </label>

            {error && <p className="text-red-500 font-roboto">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 bg-success text-background rounded-md py-3 font-roboto font-semibold hover:bg-[#85a790] transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Entrando...' : 'Login'} 
            </button>
          </form>
        </div>

        {/* Imagem lado direito */}
        <div className="flex items-center justify-center w-full md:w-auto">
          <Image
            src="/logo-selo.png"
            alt="Selo Editorial Cronópios"
            width={240} // define largura
            height={240} // define altura
            className="w-40 md:w-60"
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from 'react-icons/fa';

interface ContatoItem {
  name: string;
  href: string;
  icon: React.ReactElement;
  color: string;
}

const contatos: ContatoItem[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/people/Selo-Editorial-Cron%C3%B3pios/pfbid02o6pRAZX2bR4F4f3SvUkjSiADx8S9mAoErDNPA9pnE9sU5vTcw1Spsp6zALecxhiXl/',
    icon: <FaFacebookF />,
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/selocronopios',
    icon: <FaInstagram />,
    color: 'bg-pink-500 hover:bg-pink-600',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@selocron%C3%B3pios',
    icon: <FaYoutube />,
    color: 'bg-red-600 hover:bg-red-700',
  },
  {
    name: 'Email',
    href: 'mailto:infoselocronopios@gmail.com',
    icon: <FaEnvelope />,
    color: 'bg-gray-800 hover:bg-gray-900',
  },
];

const Contato: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-16 p-6 sm:p-8 space-y-8">
      <h1 className="heading-h1 text-primary text-center mb-4">Contato</h1>
      <p className="text-center max-w-xl text-gray-700">
        Fale conosco ou nos acompanhe nas redes sociais. Estamos sempre
        disponíveis para esclarecer dúvidas e receber sugestões!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full max-w-4xl">
        {contatos.map((contato) => (
          <a
            key={contato.name}
            href={contato.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={contato.name}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl text-white ${contato.color} transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            <div className="text-3xl mb-2">{contato.icon}</div>
            <span className="font-semibold text-center">{contato.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contato;

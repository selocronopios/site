'use client';

import { FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathName = usePathname();
  const isAdmin = pathName.startsWith('/admin');
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  if (isAdmin || isMaintenance) return null;
  return (
    <footer className="bg-white border-t border-primary mt-0">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        </div>

        <div className="flex gap-4 mt-4 md:mt-0 text-primary text-xl">
          <a
            href="https://www.youtube.com/@selocron%C3%B3pios"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.facebook.com/people/Selo-Editorial-Cron%C3%B3pios/pfbid02o6pRAZX2bR4F4f3SvUkjSiADx8S9mAoErDNPA9pnE9sU5vTcw1Spsp6zALecxhiXl/"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/selocronopios"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="bg-primary text-white text-sm px-4 py-2 flex justify-between items-center">
        <p>
          ©2025 História Intelectual: pesquisa e extensão. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

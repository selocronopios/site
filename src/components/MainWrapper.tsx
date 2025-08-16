'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isAdmin = pathName.startsWith('/admin');
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  return (
    <main className={`${isAdmin || isMaintenance ? '' : 'pt-20'} min-h-screen`}>
      {children}
    </main>
  );
}

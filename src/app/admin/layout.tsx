//src/app/admin/layout.tsx
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-background text-text">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

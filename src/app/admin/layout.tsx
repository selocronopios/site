//src/app/admin/layout.tsx
import '../globals.css';

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

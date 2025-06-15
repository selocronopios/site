import Maintenance from '@/components/Maintenance'

export default function Home() {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'

  if (isMaintenance) {
    return <Maintenance />
  }

  return (
    // seu site normal aqui
    <main>
      <h1>Bem-vindo ao site!</h1>
      {/* resto do conteúdo */}
    </main>
  )
}

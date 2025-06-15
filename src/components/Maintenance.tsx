import Image from 'next/image'

export default function Maintenance() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-neutral-900 px-4">
      <Image
        src="/logo.png"
        alt="História Intelectual: Pesquisa e Extensão"
        width={600}
        height={200}
        className="mb-6 object-contain max-w-[80%]"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        🚧 Em construção...
      </h1>
      <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 text-center max-w-md">
        Estamos trabalhando para trazer uma plataforma incrível. <br /> Volte em breve!
      </p>
    </main>
  )
}

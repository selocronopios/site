import Image from 'next/image';
import React from 'react';

export default function QuemSomos() {
  return (
    <div>
      <div className="bg-background p-8 max-w-7xl mx-auto px-4 space-y-8 text-justify">
        <h1 className="heading-h1 text-primary text-center">
          Grupo de Pesquisa “História Intelectual: práticas, narrativas e <br />{' '}
          circulação de ideias” (UFMG/CNPq)
        </h1>
        <div
          className="grid gap-x-6 gap-y-4 items-center"
          style={{ gridTemplateColumns: 'auto 7rem 7rem auto' }}
        >
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {/* Coluna texto */}
              <div className="text-right space-y-1">
                <p>Nome</p>
                <p>Função</p>
                <p>Titulação</p>
              </div>

              {/* Coluna foto 1 */}
              <div className="bg-gray-300 w-28 h-20 flex items-center justify-center">
                Foto
              </div>

              {/* Coluna foto 2 */}
              <div className="bg-gray-300 w-28 h-20 flex items-center justify-center">
                Foto
              </div>
              <div className="text-left space-y-1">
                <p>Nome</p>
                <p>Função</p>
                <p>Titulação</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="bg-selectionLight w-full">
        <div className="max-w-7xl mx-auto p-8 space-y-8 text-justify">
          <h1 className="heading-h1 text-secondary text-center">
            Cronópios Selo Editorial
          </h1>
          <h2 className="heading-h2 text-secondary text-center">
            Equipe Editorial
          </h2>
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            <div className="flex justify-left">
              <Image
                src="/selo.png"
                alt="Selo"
                width={450}
                height={300}
                className="h-auto object-cover"
                priority
              />
            </div>
            <div className="flex flex-col text-text text-center">
              <h3 className="heading-h3">Coordenação Geral</h3>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <h3 className="heading-h3 mt-3">Coordenação Geral</h3>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <h3 className="heading-h3 mt-3">Coordenação Geral</h3>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <h3 className="heading-h3 mt-3">Coordenação Geral</h3>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
            </div>
            <div className="flex flex-col text-text text-center">
              <h3 className="heading-h3">Conselho Científico</h3>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
              <p className="body">Nome (instituição)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

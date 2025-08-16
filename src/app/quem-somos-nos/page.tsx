import Image from 'next/image';
import React from 'react';

const membros = [
  {
    nome: 'Adriane Vidal Costa',
    funcao: 'Professora do Departamento de História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/9890139156631559',
    foto: '/membros/AdrianeCosta.webp',
  },
  {
    nome: 'André Luis Martins Amaral',
    funcao: 'Mestrando em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/9510133332400585',
    foto: '/membros/AndreAmaral.webp',
  },
  {
    nome: 'Carolina Costa',
    funcao: 'Graduanda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/2624304363116889',
    foto: '/membros/CarolinaCosta.webp',
  },
  {
    nome: 'Carolina Pedro Soares',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/2809676140430556',
    foto: '/membros/CarolinaSoares.webp',
  },
  {
    nome: 'Caroline Maria Ferreira Drummond',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/3499805105196501',
    foto: '/membros/CarolineDrummond.webp',
  },
  {
    nome: 'Elvis de Almeida Diana',
    funcao: 'Doutor em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/8440932980939738',
    foto: '/membros/ElvisDiana.webp',
  },
  {
    nome: 'Estela Gontijo da Cruz',
    funcao: 'Mestranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/0612647970268215',
    foto: '/membros/EstelaCruz.webp',
  },
  {
    nome: 'Ewerton Wirlley Silva Barros',
    funcao: 'Doutorando em História',
    titulacao: 'Universidade Federal do Rio Grande do Sul (UFRGS)',
    lattes: 'https://lattes.cnpq.br/4662705277578215',
    foto: '/membros/EwertonBarros.webp',
  },
  {
    nome: 'Guilherme Cardoso Caldeira',
    funcao: 'Graduando em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/9280775080557023',
    foto: '/membros/GuilhermeCaldeira.webp',
  },
  {
    nome: 'Ingrid Pereira de Brito Figueira Santana',
    funcao: 'Graduanda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/5597519524176703',
    foto: '/membros/IngridSantana.webp',
  },
  {
    nome: 'Isadora Bolina Monteiro Vivacqua',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/1878913894178376',
    foto: '/membros/IsadoraVivacqua.webp',
  },
  {
    nome: 'Izabelle Seoldo Marques',
    funcao: 'Mestranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/5346573533355564',
    foto: '/membros/IzabelleMarques.webp',
  },
  {
    nome: 'Jessica Gonçalves Santomauro',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/2564946047846591',
    foto: '/membros/JessicaSantomauro.webp',
  },
  {
    nome: 'José Antônio de Souza Queiroz',
    funcao: 'Doutorando em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/0936708852934400',
    foto: '/membros/JoseQueiroz.webp',
  },
  {
    nome: 'Laize Costa Barbosa Lacerda',
    funcao: 'Licenciada em História. Graduanda Bacharel em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/0452292391314586',
    foto: '/membros/LaizeLacerda.webp',
  },
  {
    nome: 'Mariana Oliveira Cruz',
    funcao: 'Graduada em História',
    titulacao: 'Fundação João Pinheiro/Fapemig',
    lattes: 'https://lattes.cnpq.br/2315905575280846',
    foto: '/membros/MarianaCruz.webp',
  },
  {
    nome: 'Nathalia Guimarães e Sousa',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/8623174887174879',
    foto: '/membros/NathaliaSousa.webp',
  },
  {
    nome: 'Nayara Ferreira Vilela',
    funcao: 'Mestranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/9993555561523351',
    foto: '/membros/NayaraVilela.webp',
  },
  {
    nome: 'Pauliane de Carvalho Braga',
    funcao: 'Doutoranda em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/7390920523751212',
    foto: '/membros/PaulianeBraga.webp',
  },
  {
    nome: 'Taciana Almeida Garrido de Resende',
    funcao: 'Mestrando em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/2136645835800739',
    foto: '/membros/TacianaResende.webp',
  },
  {
    nome: 'Vítor Nazaré Pereira',
    funcao: 'Mestre em História',
    titulacao: 'Universidade Federal de Minas Gerais (UFMG)',
    lattes: 'https://lattes.cnpq.br/1537876901491256',
    foto: '/membros/VitorPereira.webp',
  },
  {
    nome: 'Stella Ferreira Gontijo',
    funcao: 'Doutoranda',
    titulacao: 'UFMG',
    lattes: 'https://lattes.cnpq.br/4794994866272483',
    foto: '/membros/StellaGontijo.webp',
  },
];

function agruparEmPares<T>(array: T[]): T[][] {
  const pares = [];
  for (let i = 0; i < array.length; i += 2) {
    pares.push([array[i], array[i + 1]]);
  }
  return pares;
}

const membrosAgrupados = agruparEmPares(membros);

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
          style={{ gridTemplateColumns: 'auto 5rem 5rem auto' }}
        >
          {membrosAgrupados.map((par, i) => (
            <React.Fragment key={i}>
              {/* Lado esquerdo */}
              <div className="text-right space-y-1">
                <p>
                  <strong>{par[0]?.nome}</strong>
                </p>
                <p>{par[0]?.funcao}</p>
                <p>{par[0]?.titulacao}</p>
                {par[0]?.lattes && (
                  <p>
                    <a
                      href={par[0].lattes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Lattes
                    </a>
                  </p>
                )}
              </div>

              <div className="bg-gray-300 w-full max-w-[80px] h-auto flex items-center justify-center overflow-hidden">
                {par[0]?.foto && (
                  <img
                    src={par[0].foto}
                    alt={par[0].nome}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* Lado direito */}
              {par[1] ? (
                <>
                  <div className="bg-gray-300 w-full max-w-[80px] h-auto flex items-center justify-center overflow-hidden">
                    {par[1]?.foto && (
                      <img
                        src={par[1].foto}
                        alt={par[1].nome}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="text-left space-y-1">
                    <p>
                      <strong>{par[1]?.nome}</strong>
                    </p>
                    <p>{par[1]?.funcao}</p>
                    <p>{par[1]?.titulacao}</p>
                    {par[1]?.lattes && (
                      <p>
                        <a
                          href={par[1].lattes}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Lattes
                        </a>
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div />
                  <div />
                </>
              )}
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
          <div
            className="grid gap-x-6 gap-y-4"
            style={{ gridTemplateColumns: '28rem auto auto' }}
          >
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
              <p className="body">Adriane Vidal Costa (UFMG)</p>
            </div>
            <div className="flex flex-col text-text text-center">
              <h3 className="heading-h3">Conselho Editorial</h3>
              <p className="body">
                Alexandra Pita González (Universidad de Colima, México)
              </p>
              <p className="body">Ana Amélia de Melo (UEC, Brasil)</p>
              <p className="body">Carine Dalmás (UEMA, Brasil)</p>
              <p className="body">Carlos Armani (UFSM, Brasil)</p>
              <p className="body">Claudio Maíz (UNCuyo, Argentina)</p>
              <p className="body">Eduardo Devés Valdés (Usach, Chile)</p>
              <p className="body">Eliana R. de Freitas Dutra (UFMG, Brasil)</p>
              <p className="body">Elisa Campos Borges (UFF, Brasil)</p>
              <p className="body">Giselle Venâncio (UFF, Brasil)</p>
              <p className="body">
                Heloisa Maria Murgel Starling (UFMG, Brasil)
              </p>
              <p className="body">Inés de Torres (UDELAR, Uruguai)</p>
              <p className="body">
                José Alves de Freitas Neto (UNICAMP, Brasil)
              </p>
              <p className="body">Liliana Weinberg (UNAM, México)</p>
              <p className="body">
                Maria Elisa Noronha de Sá (PUC-Rio, Brasil)
              </p>
              <p className="body">
                Maria da Gloria de Oliveira (UFRRJ, Brasil)
              </p>
              <p className="body">Petrônio Domingues (UFS)</p>
              <p className="body">Rafael Araújo (UERJ, Brasil)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

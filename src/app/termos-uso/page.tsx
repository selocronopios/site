'use client';

import { useEffect, useState } from 'react';
import { Body } from '@/components/Typography';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Termo() {
  const sections = [
    { id: 'clausulas', title: 'CLÁUSULAS' },
    { id: 'aceitacao', title: '1. Aceitação dos Termos de Uso' },
    { id: 'servico', title: '2. Serviço e Condições de Utilização' },
    { id: 'conteudo-autor', title: '3. Do conteúdo enviado pelo Autor' },
    {
      id: 'responsabilidades-selo',
      title: '4. Responsabilidades do Selo Editorial Cronópios',
    },
    {
      id: 'obrigações-usuario',
      title: '5. Obrigações e Responsabilidades do Usuário',
    },
    { id: 'vigencia', title: '6. Prazo de vigência e rescisão' },
    { id: 'atualizacao', title: '7. Atualização dos Termos de Uso' },
    { id: 'disposicoes-gerais', title: '8. Disposições gerais' },
  ];

  const [activeSection, setActiveSection] = useState<string>('clausulas');
  const [mobileIndexOpen, setMobileIndexOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Ajuste do header
      let currentSection = 'clausulas';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 120; // Ajuste do header
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setMobileIndexOpen(false);
    }
  };

  return (
    <div className="bg-background p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="heading-h1 text-primary text-center">
        Termos de Uso e Política de Direitos Autorais
      </h1>

      <div className="flex flex-col md:flex-row gap-6 mt-8 scroll-smooth">
        {/* BOTÃO MOBILE */}
        <div className="md:hidden fixed top-[80px] left-4 z-50">
          {' '}
          {/* Ajustado para não colar no header */}
          <button
            onClick={() => setMobileIndexOpen(!mobileIndexOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium shadow"
          >
            {mobileIndexOpen ? <FaTimes /> : <FaBars />}
            Índice
          </button>
          {mobileIndexOpen && (
            <div className="mt-2 bg-white rounded-lg shadow-lg p-4 space-y-2 border border-gray-200">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    activeSection === section.id
                      ? 'bg-backgroundExtra font-semibold text-primary'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ÍNDICE DESKTOP */}
        <div className="hidden md:block md:w-64">
          <div className="sticky top-32 p-4 bg-white rounded-lg shadow border border-gray-200 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  activeSection === section.id
                    ? 'bg-backgroundExtra font-semibold text-primary'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo do Termo */}
        <div className="flex-1 space-y-6 text-justify">
          {/* ... Todos os textos que você já forneceu permanecem aqui ... */}
          <Body className="mt-4">
            Os livros (e-books) publicados pelo Selo Editorial Cronópios (UFMG)
            estão licenciados conforme os termos da licença{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              className="text-blue-600 underline"
              target="_blank"
            >
              Creative Commons Atribuição 4.0
            </a>
            .
          </Body>

          <Body className="mt-4">
            O Selo Editorial Cronópios (UFMG) adota{' '}
            <a
              href="https://livroaberto.ibict.br/Manifesto.pdf"
              className="text-blue-600 underline"
              target="_blank"
            >
              livre acesso à informação
            </a>
            , com ênfase na disseminação do conhecimento gerado por pesquisas na
            área de História Intelectual, por meio da distribuição e divulgação
            gratuitas e irrestritas das versões digitais de seus livros.
          </Body>

          {/* Seções do Termo */}
          <h2 id="clausulas" className="heading-h2 text-text scroll-mt-32">
            CLÁUSULAS
          </h2>

          <h3 id="aceitacao" className="heading-h3 text-text scroll-mt-32">
            1. Aceitação dos Termos de Uso
          </h3>
          <Body className="mt-4">
            1.1. Ao usar os serviços oferecidos pelo Selo Editorial Cronópios, o
            Usuário concorda, expressa e voluntariamente, com todas as cláusulas
            do presente Termos de Uso.
          </Body>
          <Body className="mt-4">
            1.2. Se o Autor não concordar com o Termos de Uso, ele não está
            autorizado a enviar seus Livros, pois o envio está diretamente
            condicionado às regras nos Termos de Uso, conforme solicitado no
            formulário de envio.
          </Body>
          <Body className="mt-4">
            1.3. O Autor será responsável pelo Livro que disponibilizar no Selo
            Editorial Cronópios, nos termos aqui estabelecidos, observando toda
            a legislação nacional vigente.
          </Body>
          <Body className="mt-4">
            1.4. Se o Usuário Leitor não concordar com o Termos de Uso, não
            estará autorizado a realizar o download de qualquer Livro
            disponibilizado no Selo Editorial Cronópios, pois esta
            disponibilização está diretamente condicionada às regras nos Termos
            de Uso, conforme solicitado no momento do download.
          </Body>
          <Body className="mt-4">
            1.5. O Usuário Leitor será responsável pela utilização que fizer das
            publicações baixadas, nos termos aqui estabelecidos, observando toda
            a legislação nacional vigente.
          </Body>

          <h3 id="servico" className="heading-h3 text-text scroll-mt-32">
            2. Serviço e Condições de Utilização
          </h3>
          <Body className="mt-4">
            2.1. O Selo Editorial Cronópios colocará à disposição do Usuário
            Autor os serviços de editoração, publicação e hospedagem dos livros
            no Selo, bem como colocará à disposição do Usuário Leitor a
            possibilidade de leitura e download dos Livros.
          </Body>
          <Body className="mt-4">
            2.2. É de total responsabilidade do Usuário Autor se assegurar de
            que o conteúdo por ele enviado ou quaisquer dados inseridos no Selo
            Editorial Cronópios são permitidos e verídicos, não devendo ser
            ilegais.
          </Body>
          <Body className="mt-4">
            2.3. O Usuário Leitor pode ler e realizar o download dos conteúdos
            disponibilizados, desde que não infrinja nenhuma cláusula deste
            Termos de Uso. É de total responsabilidade do Usuário Leitor a
            utilização que fará dos Livros disponibilizados, estando a Selo
            Editorial Cronópios afastada de qualquer responsabilidade
            proveniente de eventuais plágios ou vendas não permitidas que possam
            eventualmente ocorrer.
          </Body>
          <Body className="mt-4">
            2.4. O Usuário Leitor somente conseguirá realizar o download de
            quaisquer livros se novamente concordar com os Termos de Download
            disponíveis no ato do download, devendo concordar que não irá
            utilizar os materiais disponibilizados para venda ilegal, plágio ou
            qualquer ato em inconformidade com as legislações vigentes e que
            afete os direitos autorais do Usuário Autor que tiver enviado o
            Livro.
          </Body>
          <Body className="mt-4">
            2.5. O Selo Editorial Cronópios se reserva o direito de oferecer
            acesso ao conteúdo próprio ou selecionado. Eventuais mudanças, neste
            sentido, podem ser realizadas a qualquer momento pelo Selo Editorial
            Cronópios, sem necessidade de aviso prévio.
          </Body>
          <h3 id="conteudo-autor" className="heading-h3 text-text scroll-mt-32">
            3. Do conteúdo enviado pelo Autor
          </h3>
          <Body className="mt-4">
            3.1. O Autor será integralmente responsável pelo conteúdo dos livros
            publicados pelo Selo Editorial Cronópios.
          </Body>
          <Body className="mt-4">
            3.1.1. O Autor manterá o Selo Editorial Cronópios livre e isento de
            qualquer responsabilidade quanto ao conteúdo publicado no Selo,
            assumindo imediatamente todos os ônus e encargos que o Selo
            eventualmente possa ter em razão destas demandas ou reclamações.
          </Body>
          <Body className="mt-4">
            3.2. Todo conteúdo enviado pelo Autor será submetido a uma avaliação
            prévia pelo Conselho Editorial do Selo Editorial Cronópios, cabendo
            aos editores decidirem sobre a publicação ou não do conteúdo.
          </Body>
          <Body className="mt-4">
            3.3. Com relação ao conteúdo publicado pelo Selo Editorial
            Cronópios, são absolutamente vedadas as seguintes práticas:
          </Body>
          <Body className="mt-4">
            a) compartilhar: (i) conteúdo que não seja da autoria do Usuário
            Autor; (ii) conteúdo sobre o qual o Usuário Autor não possua os
            direitos ou uma autorização de utilização; ou (iii) conteúdo que não
            esteja liberado para divulgação pública;
          </Body>
          <Body className="mt-4">
            b) compartilhar qualquer material que contenha conteúdo ofensivo ou,
            ainda, que viole qualquer das regras de uso do Selo Editorial
            Cronópios;
          </Body>
          <Body className="mt-4">
            c) compartilhar conteúdo que tenha teor racista, preconceituoso ou
            jocoso sobre terceiros;
          </Body>
          <Body className="mt-4">
            d) violar normas previstas na Lei nº 8.069/1990 (Estatuto da Criança
            e do Adolescente);
          </Body>
          <Body className="mt-4">
            e) divulgar, transmitir ou disponibilizar qualquer conteúdo que seja
            da titularidade de outrem, que viole direito autoral ou direito de
            imagem de terceiros;
          </Body>
          <Body className="mt-4">
            f) compartilhar conteúdo que vise disseminar a pedofilia, assim como
            conteúdo de cunho discriminatório, difamatório, abusivo, ofensivo ou
            ilegal;
          </Body>
          <Body className="mt-4">
            g) divulgar conteúdo com fins comerciais, como venda de bens e
            serviços;
          </Body>
          <Body className="mt-4">
            h) praticar bullying ou qualquer atitude que tenha como intenção
            intimidar, agredir ou humilhar terceiros.
          </Body>
          <Body className="mt-4">
            3.4. O Selo Editorial Cronópios poderá, a qualquer tempo e a seu
            critério, retirar de sua página qualquer conteúdo publicado pelo
            Autor, parcial ou integralmente, sem gerar nenhum direito ao Autor,
            caso possa ser interpretado que o conteúdo contido neste são:
          </Body>
          <Body className="mt-4">
            a) contrários às normas legais em vigor ou contrários a este Termos
            de Uso; ou
          </Body>
          <Body className="mt-4">
            b) prejudiciais para a utilização deste serviço por terceiros, não
            caracterizando infração do presente documento ou responsabilidade do
            Selo Editorial Cronópios, nem gerando qualquer direito ao Usuário
            Autor.
          </Body>
          <Body className="mt-4">
            c) incondizentes com a proposta do Selo Editorial Cronópios, sendo
            cabível também ao Conselho Editorial essa avaliação.
          </Body>
          <Body className="mt-4">
            3.5. O Selo Editorial Cronópios segue estritamente as exigências
            legais brasileiras com relação à proteção aos direitos autorais e
            irá reagir prontamente às denúncias de violação de direitos autorais
            que estiverem em conformidade com a lei e forem devidamente
            notificadas por e-mail, correio ou outro canal de comunicação
            disponível. As notificações devem necessariamente indicar as URLs
            (Uniform Resource Locator) do conteúdo que não estiver em
            conformidade para que o Selo Editorial Cronópios possa identificá-lo
            e removê-lo prontamente da plataforma.
          </Body>
          <Body className="mt-4">
            3.6. Caso haja suspeita, denúncias e/ou fortes indícios da má
            utilização da publicação, o Selo Editorial Cronópios se reserva o
            direito de: (i) remover eventual conteúdo irregular do Autor,
            temporária ou definitivamente, sem notificação ou aviso prévio;
          </Body>
          <Body className="mt-4">
            3.7. O Autor declara que detém todas as licenças necessárias, quando
            for o caso, para a transmissão, o armazenamento, ou o
            compartilhamento de qualquer conteúdo, dado ou informação no Selo
            Editorial Cronópios, incluindo, mas não se limitando às licenças de
            direitos autorais, direitos conexos e de uso de imagem, sendo neste
            caso o único e integral responsável por obter as liberações
            necessárias para divulgação completamente livre e isenta de qualquer
            limitação, restrição, ônus ou gravame. Nesta hipótese, o Autor será
            o único e integral responsável pela realização de qualquer pagamento
            inerente aos direitos mencionados nesta cláusula que eventualmente
            possam ser reivindicados por terceiros. Os danos causados a
            terceiros em decorrência do não cumprimento desta cláusula serão de
            total e exclusiva responsabilidade do Autor.
          </Body>
          <Body className="mt-4">
            3.8. O Autor concede ao Selo Editorial Cronópios uma licença não
            exclusiva, transferível, sublicenciável, gratuita e válida
            mundialmente para hospedar, usar, distribuir, modificar, veicular,
            copiar, transmitir, executar publicamente ou exibir, traduzir e
            criar trabalhos derivados de seu conteúdo publicado no Selo.
          </Body>
          <Body className="mt-4">
            3.9. O conteúdo próprio do Selo Editorial Cronópios não poderá ser
            reproduzido ou comercializado por qualquer Usuário, salvo com uma
            autorização por escrito.
          </Body>
          <Body className="mt-4">
            3.10. Caso deseje excluir o conteúdo disponibilizado, o Usuário
            Autor deve notificar o Selo Editorial Cronópios com o pedido formal
            da remoção do conteúdo, que terá 10 dias úteis para responde-lo
            sobre a exclusão ou não do conteúdo, uma vez que ao disponibilizar o
            conteúdo o Autor concede licença de uso do conteúdo ao Selo,
            conforme disposto no item (3.8).
          </Body>
          <h3
            id="responsabilidades-selo"
            className="heading-h3 text-text scroll-mt-32"
          >
            4. Responsabilidades do Selo Editorial Cronópios
          </h3>
          <Body className="mt-4">
            4.1. O Selo Editorial Cronópios não é responsável por quaisquer
            danos ou prejuízos decorrentes de interrupções devidas aos serviços
            que presta, não sendo, pois, responsável por eventual não
            disponibilização dos conteúdos em razão de problemas na plataforma
            do Selo.
          </Body>
          <Body className="mt-4">
            4.2. O Selo Editorial Cronópios não se responsabiliza por usos
            indevidos dos Livros disponibilizados pelos Autores, por parte de
            qualquer Usuário, estando o próprio Usuário que realizou o uso
            indevido responsável pelos atos que cometeu, inclusive quando se
            tratar de plágio, venda proibida ou qualquer outra ilegalidade que
            possa ser cometida na posse dos conteúdos.
          </Body>
          <h3
            id="obrigações-usuario"
            className="heading-h3 text-text scroll-mt-32"
          >
            5. Obrigações e Responsabilidades do Usuário
          </h3>
          <Body className="mt-4">
            5.1. Para usufruir do Selo Editorial Cronópios, o Usuário deverá
            observar a existência de qualquer impedimento legal ou contratual a
            que esteja eventualmente sujeito, inclusive, mas sem se limitar, aos
            impedimentos relativos ao tipo, espécie e/ou qualidade de conteúdo
            que vier a incluir no Selo.
          </Body>
          <Body className="mt-4">
            5.2. O serviço é disponibilizado ao Autor para a publicação e
            utilização do Selo Editorial Cronópios dentro das regras previstas
            nesses Termos de Uso, devendo o autor segui-las adequadamente.
          </Body>
          <Body className="mt-4">
            5.3. O Usuário declara estar ciente de que todos os serviços do Selo
            Editorial Cronópios a que tiver acesso em conformidade com o
            presente Termos de Uso serão para uso único e exclusivo do próprio
            Usuário, não podendo comercializá-los, cedê-los a terceiros a
            qualquer título ou explorá-los economicamente de qualquer forma.
          </Body>
          <Body className="mt-4">
            5.4. O Usuário declara e concorda expressamente que:
          </Body>
          <Body className="mt-4">
            a) Reconhece que o presente documento se formaliza, vinculando as
            partes, com a sua aceitação eletrônica, o que se fará mediante o
            envio do formulário na plataforma do Selo Editorial Cronópios, no
            caso do usuário autor; e o download de publicações disponibilizadas
            pelo selo, no caso do usuário leitor;
          </Body>
          <Body className="mt-4">
            b) Leu e está ciente e de pleno acordo com todos os termos e
            condições deste Termos de Uso;
          </Body>
          <Body className="mt-4">
            c) Não irá divulgar propaganda ou anunciar produtos e serviços com
            fins comerciais sem anuência dos destinatários e autorização do Selo
            Editorial Cronópios, bem como também não divulgará conteúdo ilegal,
            ideias racistas, discursos de ódio ou referentes a quaisquer outras
            práticas discriminatórias;
          </Body>
          <Body className="mt-4">
            d) Inocentará, e, caso necessário, indenizará por perdas e danos o
            Selo Editorial Cronópios de qualquer processo legal resultante do
            uso ilegal do Selo;
          </Body>
          <Body className="mt-4">
            e) Não irá coletar conteúdo ou informações de Usuários, ou acessar a
            rede, usando meios automatizados (como bots de coleta, robôs,
            spiders ou scrapers);
          </Body>
          <Body className="mt-4">
            f) Não irá intimidar, assediar ou praticar bullying contra qualquer
            Usuário;
          </Body>
          <Body className="mt-4">
            g) É maior de 18 anos, ou menor devidamente representado/assistido
            pelos pais ou responsáveis;
          </Body>
          <Body className="mt-4">
            h) Não utilizará os serviços com a finalidade de desrespeitar a lei,
            as normas de direito autoral e/ou propriedade industrial, os
            direitos à honra, à vida privada, à imagem, à intimidade pessoal e
            familiar;
          </Body>
          <Body className="mt-4">
            i) Não utilizará os serviços do Selo Editorial Cronópios para
            propagar material ilegal, difamatório, que viole a privacidade de
            terceiros, ou que seja abusivo, ameaçador, obsceno, prejudicial,
            vulgar, injurioso, ou que de qualquer outra forma viole direito de
            terceiros;
          </Body>
          <Body className="mt-4">
            j) Irá cumprir com todas as leis aplicáveis com relação à
            transmissão de dados a partir do Brasil ou do território onde o
            Usuário resida;
          </Body>
          <Body className="mt-4">
            k) Não irá obter ou tentar obter acesso não autorizado a outros
            sistemas ou redes de computadores conectados ao serviço;
          </Body>
          <Body className="mt-4">
            l) Será o único responsável pelo conteúdo que vier a informar,
            transmitir ou retransmitir, bem como pelo conteúdo e informações que
            vier a disponibilizar nos serviços ofertados pelo Selo Editorial
            Cronópios e/ou seus parceiros;
          </Body>
          <Body className="mt-4">
            m) Não irá tomar nenhuma ação que possa desabilitar, sobrecarregar,
            interromper ou impedir os serviços ou os servidores ou redes
            conectadas ao serviço;
          </Body>
          <Body className="mt-4">
            n) Reconhece e garante ao Selo Editorial Cronópios que somente
            divulgará conteúdo em absoluta e plena conformidade com a legislação
            vigente;
          </Body>
          <Body className="mt-4">
            o) Irá cumprir todos os procedimentos, políticas, normas e
            regulamentos dos serviços do Selo Editorial Cronópios e de seus
            parceiros, divulgados nas páginas de cada serviço;
          </Body>
          <Body className="mt-4">
            5.8. Toda e qualquer desconformidade com o disposto nesta cláusula
            será de total e integral responsabilidade do Usuário.
          </Body>
          <h3 id="vigencia" className="heading-h3 text-text scroll-mt-32">
            6. Prazo de vigência e rescisão
          </h3>
          <Body className="mt-4">
            6.1. Este Termos de Uso entra em vigor na data da efetivação da
            publicação do mesmo na plataforma e permanece em vigor durante
            período indeterminado.
          </Body>
          <Body className="mt-4">
            6.2 O presente Termos de Uso poderá ser rescindido, de pleno
            direito, independentemente de qualquer notificação ou interpelação,
            judicial ou extrajudicial, na hipótese de quebra de quaisquer das
            disposições previstas neste contrato ou em outro estabelecido pelas
            mesmas partes.
          </Body>
          <Body className="mt-4">
            6.3. No caso de encerramento do acesso aos serviços do Selo
            Editorial Cronópios em razão do disposto na cláusula 6.2 por motivos
            atribuíveis ao Usuário, o Selo poderá, ou não, proceder com a
            exclusão de todas as informações e conteúdo relativos ao Usuário,
            cabendo avaliação a ser realizada pelo Conselho Editorial do Selo.
          </Body>
          <h3 id="atualizacao" className="heading-h3 text-text scroll-mt-32">
            7. Atualização dos Termos de Uso
          </h3>
          <Body className="mt-4">
            7.1. Selo Editorial Cronópios poderá atualizar este Termos de Uso
            periodicamente, sendo que a versão em vigor será sempre a mais
            recente. Para verificar a data da versão em vigor, o Usuário deverá
            verificar a data de atualização que aparece no início deste
            documento.
          </Body>
          <Body className="mt-4">
            7.2. Caso sejam feitas alterações de cunho material neste Termos de
            Uso, Selo Editorial Cronópios irá comunicar o usuário de forma
            adequada com até 3 (três) dias de antecedência a alteração.
          </Body>
          <Body className="mt-4">
            7.3. Qualquer novo recurso que aprimore o nosso serviço atual, tal
            como a disponibilização de novas ferramentas e recursos, estará
            sujeito a este Termos de Uso.
          </Body>
          <Body className="mt-4">
            7.4. A continuação do uso dos serviços do Selo Editorial Cronópios
            pelo Usuário, após qualquer alteração dos Termos de Uso, constituirá
            a aceitação de quaisquer alterações ou modificações feitas no Termos
            de Uso.
          </Body>
          <h3
            id="disposicoes-gerais"
            className="heading-h3 text-text scroll-mt-32"
          >
            8. Disposições gerais
          </h3>
          <Body className="mt-4">
            8.1 Este Termos de Uso, publicado no website do Selo Editorial
            Cronópios, constitui o acordo integral entre as Partes, e substituem
            quaisquer acordos anteriores, escritos ou verbais.
          </Body>
          <Body className="mt-4">
            8.2 As Partes são contratantes independentes, não resultando este
            instrumento na criação de qualquer sociedade, franquia,
            representação de vendas ou relações que não as expressamente
            previstas neste Termos de Uso.
          </Body>
          <Body className="mt-4">
            8.3 A tolerância ou o não exercício, por parte do Selo Editorial
            Cronópios, de quaisquer direitos a ele assegurados neste Termos de
            Uso ou na lei em geral, não importará em novação ou em renúncia a
            qualquer desses direitos, podendo o selo exercê-los durante a
            vigência destes Termos de Uso.
          </Body>
          <Body className="mt-4">
            8.4 O Selo Editorial Cronópios reserva-se o direito, a seu exclusivo
            critério, de suspender ou terminar o uso da sua plataforma e de seus
            serviços, de recusar todo e qualquer uso corrente ou futuro de todas
            ou algumas partes de sua plataforma e/ou serviços.
          </Body>
          <Body className="mt-4">
            8.5 O Selo Editorial Cronópios poderá modificar os serviços e/ou
            conteúdo ou descontinuar a sua disponibilidade a qualquer momento.
          </Body>
          <Body className="mt-4">
            8.6 Caso qualquer uma das cláusulas e condições deste Termos de Uso
            venha a ser declarada nula, no todo ou em parte, por qualquer motivo
            legal ou contratual, as demais cláusulas continuarão em pleno vigor
            e efeito.
          </Body>
          <Body className="mt-4">
            8.7 As Partes elegem o Foro da Comarca de Belo Horizonte – MG como
            competente para dirimir quaisquer controvérsias oriundas do presente
            Termos de Uso, à exclusão de qualquer outro, por mais privilegiado
            que seja.
          </Body>
        </div>
      </div>
    </div>
  );
}

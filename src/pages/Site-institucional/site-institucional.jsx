import './site-inst-stylesheet.scss';
import { Link } from 'react-router-dom';
import blackNormalSize from '@assets/logos/greenNormalSizeBlackColor.svg';
import vectorParalelepipedo from '@assets/vector-paralelepipedo.png';
import vectorParalelepipedoInvertido from '@assets/vector-paralelepipedo-invertido.svg';
import vectorCoracao from '@assets/vector-coracao.svg';
import vectorCaraCorrendo from '@assets/vector-cara-correndo.svg';
import vectorCalendario from '@assets/vector-calendario.svg';
import vectorSorriso from '@assets/vector-sorriso.svg';
import celularENotebook from '@assets/celular-e-notebook.svg';
import vectorBottomRecursos from '@assets/vector-bottom-recursos.svg';
import ProtoPersonaMarcelo from '@assets/proto-persona-marcelo.png';
import ProtoPersonaTauane from '@assets/proto-persona-tauane.png';
import logoNormal from '@assets/logos/greenNormalSize.svg';
import celulaesrGenericos from '@assets/celulares-genericos.png';
import {
  PersonSimpleCircle,
  EnvelopeSimple,
  Phone,
} from '@phosphor-icons/react';
import { Button } from '@components/Button/button';

const SiteInstitucional = () => {
  return (
    <main>
      <div className="fixed right-5 z-10 h-full  flex items-center">
        <ul className="flex flex-col gap-5   rounded-lg items-center backdrop-blur-sm bg-white/10 *:text-center *:w-12 *:transition-all *:px-4 w-fit ">
          <a
            href="#projetoInfo"
            className="pt-3 rounded-t-lg text-primary-green300 font-medium text-lg hover:bg-primary-green300/50 hover:text-gray100"
          >
            P r o j e t o
            
          </a>

          <a
            href="#objetivo"
            className="text-primary-green300 font-medium text-lg hover:bg-primary-green300/50 hover:text-gray100"
          >
            O b j e t i v o
          </a>

          <a
            href="#contato"
            className="pb-3 rounded-b-lg text-primary-green300 font-medium text-lg hover:bg-primary-green300/50 hover:text-gray100"
          >
            C o n t a t o
          </a>
        </ul>
      </div>

      <section className="w-full">
        <div className="bg-white p-6 relative">
          <nav className="flex justify-between items-center py-4 px-1 sm:px-14 mt-4">
            <div className="flex items-center gap-4">
              <img
                className="w-36 cursor-pointer"
                src={blackNormalSize}
                alt="Logo"
              />
              <PersonSimpleCircle size={32} className="cursor-pointer" />
              {/* fazer algo de acessibilidade ainda hoje, puta merda */}
            </div>

            <div>
              <Link to={'/login'}>
                <Button
                  iconVisibility={false}
                  content={'Entrar'}
                  buttonStyle={
                    'text-gray100 bg-primary-green300 rounded-full font-bold w-40 py-4 hover:bg-primary-green400 transition-all flex items-center justify-center gap-1'
                  }
                />
              </Link>
            </div>
          </nav>

          <div className=" flex justify-center">
            <div className=" absolute text-center text-primary-green300  left-10 bottom-20 z-10">
              <ul className="flex items-center justify-center gap-6 list-[square] marker:text-alt-purple300">
                <li>
                  <Link
                    to=""
                    className="font-medium hover:text-primary-green400 transition-all"
                  >
                    Instagram
                  </Link>
                </li>

                <li>
                  <Link
                    to=""
                    className="font-medium hover:text-primary-green400 transition-all"
                  >
                    Github
                  </Link>
                </li>

                <li>
                  <Link
                    to=""
                    className="font-medium hover:text-primary-green400 transition-all"
                  >
                    Linkedin
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center  max-w-3xl flex flex-col items-center gap-12 pb-36 pt-12">
              <h1 className=" text-primary-green300 text-8xl font-medium">
                Bem estar de forma certa
                <span className="text-alt-purple300 font-inter">.</span>
              </h1>

              <h5 className="text-gray500 font-medium text-lg max-w-lg">
                Nosso aplicativo é uma plataforma abrangente projetada para
                atender às necessidades específicas daqueles que buscam ganhos
                musculares. Com uma interface amigável e recursos
                personalizados, oferecemos uma experiência única que vai além do
                simples acompanhamento de exercícios.
              </h5>
            </div>
          </div>
        </div>
      </section>

      <section id="projetoInfo">
        <div className="projetoInfoWrapper relative flex flex-col items-center md:items-start px-6 py-8 md:py-16 gap-5">
          <h1 className="px-4 text-4xl md:text-5xl font-semibold tracking-wider ">
            VITALIS
          </h1>

          <img
            src={{ vectorParalelepipedo }}
            alt=""
            className="absolute top-0 left-0 w-full md:w-auto"
          />
          <img
            src={vectorParalelepipedoInvertido}
            alt=""
            className="absolute bottom-0 left-0 w-full md:w-auto"
          />

          <div className="projetoInfoContent flex flex-col md:flex-row items-center md:justify-end w-full relative">
            <img
              src={celulaesrGenericos}
              alt=""
              className="w-2/4 absolute left-0 -top-28"
            />

            <div className="beneficios border-4 border-primary-green300 rounded-lg md:ml-20 py-6 md:py-8 px-6 md:px-12 flex flex-col items-start md:items-end gap-8 md:gap-12 text-white">
              <div className="beneficio flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="text-right md:text-left">
                  <h1 className="font-semibold text-lg md:text-xl">
                    Guia ao bem-estar
                  </h1>
                  <h4 className="text-sm md:text-base">
                    Descubra o caminho para uma vida equilibrada e feliz.
                  </h4>
                </div>
                <img src={vectorCoracao} alt="" className="w-24" />
              </div>

              <div className="beneficio flex flex-col md:flex-row-reverse items-start md:items-center gap-4 md:gap-8">
                <div className="text-right md:text-left">
                  <h1 className="font-semibold text-lg md:text-xl">
                    Mais produtividade
                  </h1>
                  <h4 className="text-sm md:text-base">
                    Dicas essenciais para alcançar seus objetivos com
                    eficiência.
                  </h4>
                </div>
                <img src={vectorCaraCorrendo} alt="" className="w-24" />
              </div>

              <div className="beneficio flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="text-right md:text-left">
                  <h1 className="font-semibold text-lg md:text-xl">
                    Rotina organizada
                  </h1>
                  <h4 className="text-sm md:text-base">
                    Transforme o caos em ordem e conquiste seus dias.
                  </h4>
                </div>
                <img src={vectorCalendario} alt="" className="w-24" />
              </div>

              <div className="beneficio flex flex-col md:flex-row-reverse items-start md:items-center gap-4 md:gap-8">
                <div className="text-right md:text-left">
                  <h1 className="font-semibold text-lg md:text-xl">
                    Auto-estima
                  </h1>
                  <h4 className="text-sm md:text-base">
                    Fortaleça sua confiança e amor próprio para uma vida plena.
                  </h4>
                </div>
                <img src={vectorSorriso} alt="" className="w-24" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="objetivo">
        <div className="objetivoWrapper relative flex justify-around items-center py-8 md:py-16 mb-16">
          <div className="objetivoContent flex flex-col items-center px-6 md:px-12">
            <h1 className="noUnderline text-primary">Nosso objetivo</h1>
            <b>
              <h3 className="text-lg md:text-xl font-semibold text-center relative mt-4 md:mt-6 lg:mt-8">
                <span className="absolute left-0 -ml-6 text-primary-alternative text-xl md:text-2xl"></span>
                Se sinta bem. Se sinta vivo. Se sinta vita. Seja Vitalis.
                <span className="absolute right-0 -mr-6 text-primary-alternative text-xl md:text-2xl"></span>
              </h3>
            </b>

            <div className="text-lg md:text-xl text-center">
              <p>
                Oferecemos uma solução completa para maximizar seus ganhos
                musculares.
              </p>

              <p>
                Conectamos você a personal trainers especializados, facilitando
                o acesso à orientação profissional adaptada.
              </p>

              <p>
                Além disso, fornecemos ferramentas avançadas de monitoramento de
                progresso, permitindo que você acompanhe suas conquistas ao
                longo do tempo de forma eficaz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contato">
        <img
          src={vectorParalelepipedo}
          alt=""
          className="absolute w-full -top-20 left-0"
        />
        <div className="contatoWrapper flex flex-col gap-12 text-white p-32">
          <h1 className="text-8xl font-bold text-primary">
            Entre em contato conosco!
          </h1>
          <div className="flex flex-col md:flex-row justify-between gap-12 items-center">
            <h2 className="text-3xl w-full leading-relaxed">
              Queremos ouvir de você!
              <br />
              <br />
              Se você tiver alguma dúvida, comentário, sugestão ou simplesmente
              quiser entrar em contato conosco, sinta-se à vontade!
              <br />
              <br />
              Nossa equipe está aqui para ajudar e responder todas as suas
              perguntas.
            </h2>

            <div className="flex flex-col items-center ring-4 ring-primary-green300 rounded-xl w-2/4 p-16 gap-6">
              <span className="flex items-center gap-4 text-2xl underline">
                <EnvelopeSimple size={32} />
                contato.nhyira@gmail.com
              </span>
              <span className="flex items-center gap-4 text-2xl">
                <Phone size={32} />
                +55 (11) 9-8982-4422
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="footer">
        <div className="footerWrapper flex justify-center gap-12 px-6 md:px-12">
          <div className="leftFooterContent flex flex-col gap-4">
            <div>
              <h1 className="text-lg font-semibold">Endereço</h1>
              <h3>
                Rua Haddock Lobo, 595 - Cerqueira César, São Paulo - SP,
                01414-001
              </h3>
            </div>
          </div>

          <div className="middleFooterContent flex flex-col items-center">
            <img src={logoNormal} alt="" className="w-72" />
            <h2 className="text-sm mt-4">© 2024 nhyira. All Rights reserved</h2>
          </div>
          <div className="rightFooterContent">
            <div>
              <h1 className="text-lg font-semibold">Legal</h1>
              <h3>Políticas de privacidade</h3>
              <h3>Termos de serviço</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SiteInstitucional;

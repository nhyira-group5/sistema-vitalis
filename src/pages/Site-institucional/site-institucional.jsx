import "./site-inst-stylesheet.scss";
import { Link } from "react-router-dom";

// import "@shoelace-style/shoelace/dist/themes/base.css";
// import "@shoelace-style/shoelace/dist/components/carousel/carousel.css";

import logoSmallWB from "@assets/logos/greenSmallSizeNBG.svg";
import cordaoTDAH from "@assets/cordao-tdah.svg";
import vectorParalelepipedo from "@assets/vector-paralelepipedo.png"
import vectorParalelepipedoInvertido from "@assets/vector-paralelepipedo-invertido.svg"
import vectorCoracao from "@assets/vector-coracao.svg"
import vectorCaraCorrendo from "@assets/vector-cara-correndo.svg"
import vectorCalendario from "@assets/vector-calendario.svg"
import vectorSorriso from "@assets/vector-sorriso.svg"
import celularENotebook from "@assets/celular-e-notebook.svg"
import vectorBottomRecursos from "@assets/vector-bottom-recursos.svg"
import ProtoPersonaMarcelo from "@assets/proto-persona-marcelo.png"
import ProtoPersonaTauane from "@assets/proto-persona-tauane.png"
import logoNormal from "@assets/logos/greenNormalSize.svg";
import celularGenerico from "@assets/celular-generico.svg";
import vai from "@assets/vai.png";
import volta from "@assets/volta.png";

const SiteInstitucional = () => {

    return (
        <main>
            

            <section className="w-full h-screen">
                <div className="bg-white py-6 px-6 relative">
                    <nav className="flex justify-between items-center py-4 px-1 sm:px-4 mt-4">
                        <div className="flex items-center gap-4">
                            <img className="w-16 cursor-pointer" src={logoSmallWB} alt="Logo" />
                            <img src={cordaoTDAH} alt="Cordão" />
                        </div>
                        <h1 className="no-underline font-megrim text-3xl font-bold text-center text-green-600 flex-grow">
                            Plataforma que te guiará ao seu bem-estar!
                        </h1>
                        <div>
                            <Link to={'/login/aluno'}>
                                <button className="py-2 px-4 rounded-lg bg-green-600 text-white font-semibold text-lg">
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    </nav>
                    <div className="absolute right-5 top-6 z-10 h-full w-10 flex" style={{ marginTop: '5rem' }}>
                        <ul className="flex flex-col gap-1 py-2 px-2 rounded items-center w-1 text-wrap">
                            <li><a href="/projetoInfo" className="text-megrin text-green-600"> P r o j e t o</a></li>
                            <li><a href="/recursos" className="text-megrin text-green-600"> R e c u r s o s</a></li>
                            <li><a href="/contato" className="text-megrin text-green-600"> C o n t a t o s</a></li>
                        </ul>
                    </div>
                    <div className=" flex justify-center">
                        <div className="text-center text-megrim text-green-600 absolute left-1 bottom-20 z-10">
                            <ul className="flex items-center justify-center gap-6">
                                <li><Link to="">Instagram</Link></li>
                                <div className="h-2 w-2 bg-purple-700 transform rotate-45"></div>
                                <li><Link to="">Github</Link></li>
                                <div className="h-2 w-2 bg-purple-700 transform rotate-45"></div>
                                <li><Link to="">Linkedin</Link></li>
                            </ul>
                        </div>
                        <div className="font-maven-pro text-center mx-auto mt-16 mb-16 max-w-lg">

                            <h1 className="no-underline text-7xl text-green-600">
                                Bem estar de forma certa<span className="text-purple-700 font-inter">.</span>
                            </h1>

                            <h5 className="text-black-color text-lg mt-16 mb-20 mx-auto max-w-lg">
                                Nosso aplicativo é uma plataforma abrangente projetada para atender às necessidades específicas daqueles que buscam ganhos musculares. Com uma interface amigável e recursos personalizados, oferecemos uma experiência única que vai além do simples acompanhamento de exercícios.
                            </h5>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projetoInfo">
                <div className="projetoInfoWrapper relative flex flex-col items-center md:items-start px-6 py-8 md:py-16">
                    <h1 className="mx-auto noUnderline text-transparent bg-gradient-to-r from-green-500 to-green-900 text-4xl md:text-5xl font-semibold tracking-wider mb-8 text-center">VITALIS</h1>

                    <img src={{ vectorParalelepipedo }} alt="" className="absolute top-0 left-0 w-full md:w-auto" />
                    <img src={vectorParalelepipedoInvertido} alt="" className="absolute bottom-0 left-0 w-full md:w-auto" />

                    <div className="projetoInfoContent flex flex-col md:flex-row items-center md:justify-end w-full relative">
                        <img src={celularGenerico} alt="" className="w-50 absolute left-0 top-0 md:top-20" />

                        <div className="beneficios border-4 border-secondary rounded-lg md:ml-20 py-6 md:py-8 px-6 md:px-12 flex flex-col items-start md:items-end gap-8 md:gap-12 text-white">
                            <div className="beneficio flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                                <div className="text-right md:text-left">
                                    <h1 className="font-semibold text-lg md:text-xl">Guia ao bem-estar</h1>
                                    <h4 className="text-sm md:text-base">Descubra o caminho para uma vida equilibrada e feliz.</h4>
                                </div>
                                <img src={vectorCoracao} alt="" className="w-24" />
                            </div>

                            <div className="beneficio flex flex-col md:flex-row-reverse items-start md:items-center gap-4 md:gap-8">
                                <div className="text-right md:text-left">
                                    <h1 className="font-semibold text-lg md:text-xl">Mais produtividade</h1>
                                    <h4 className="text-sm md:text-base">Dicas essenciais para alcançar seus objetivos com eficiência.</h4>
                                </div>
                                <img src={vectorCaraCorrendo} alt="" className="w-24" />
                            </div>

                            <div className="beneficio flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                                <div className="text-right md:text-left">
                                    <h1 className="font-semibold text-lg md:text-xl">Rotina organizada</h1>
                                    <h4 className="text-sm md:text-base">Transforme o caos em ordem e conquiste seus dias.</h4>
                                </div>
                                <img src={vectorCalendario} alt="" className="w-24" />
                            </div>

                            <div className="beneficio flex flex-col md:flex-row-reverse items-start md:items-center gap-4 md:gap-8">
                                <div className="text-right md:text-left">
                                    <h1 className="font-semibold text-lg md:text-xl">Auto-estima</h1>
                                    <h4 className="text-sm md:text-base">Fortaleça sua confiança e amor próprio para uma vida plena.</h4>
                                </div>
                                <img src={vectorSorriso} alt="" className="w-24" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="objetivo">
                <div className="objetivoWrapper relative flex justify-around items-center py-8 md:py-16">
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
                                Oferecemos uma solução completa para maximizar seus ganhos musculares.
                            </p>

                            <p>
                                Conectamos você a personal trainers especializados em hipertrofia, facilitando o acesso à orientação profissional adaptada.
                            </p>

                            <p>
                                Além disso, fornecemos ferramentas avançadas de monitoramento de progresso, permitindo que você acompanhe suas conquistas ao longo do tempo de forma eficaz.
                            </p>
                        </div>
                    </div>

                    <img src={celularENotebook} alt="" className="w-3/5" />
                </div>
            </section>
            <section id="recursos">
                <div className="recursosWrapper noUnderline px-6 md:px-12">
                    <div className="recursos flex flex-col gap-12 md:gap-20 mt-16 md:mt-0">

                        <div className="group recurso flex flex-col items-center justify-center h-72 md:h-96 rounded-lg overflow-hidden shadow-md transition duration-500 ease-in-out hover:brightness-110 hover:shadow-lg hover:scale-105">
                            <h1 className="text-white group-hover:w-20 font-semibold text-lg md:text-xl text-center break-line transition duration-600 ease-in-out  transition: all 600ms ease-in-out;">Lista de Personal Trainers Especializados</h1>
                            <h4 className="text-white text-base md:text-lg text-center transition duration-500 ease-in-out">Encontre personal trainers qualificados em hipertrofia e crescimento muscular. Localize profissionais próximos com a integração da Google Places API</h4>
                        </div>

                        <div className="group recurso flex flex-col items-center justify-center h-72 md:h-96 rounded-lg overflow-hidden shadow-md transition duration-500 ease-in-out hover:brightness-110 hover:shadow-lg hover:scale-105">
                            <h1 className="text-white group-hover:w-20 font-semibold text-lg md:text-xl text-center transition duration-600 ease-in-out m-9">Agendamento de Sessões de Treinamento</h1>
                            <h4 className="text-white text-base md:text-lg text-center transition duration-500 ease-in-out">Agende sessões de treinamento personalizado diretamente pelo aplicativo. Você tem controle da sua agenda e rotina pelo aplicativo.</h4>
                        </div>
                        <div className="recurso flex flex-col items-center justify-center h-72 md:h-96 rounded-lg overflow-hidden shadow-md transition duration-500 ease-in-out hover:brightness-110 hover:shadow-lg hover:scale-105">
                            <h1 className="text-white font-semibold text-lg md:text-xl text-center transition duration-600 ease-in-out">Monitoramento de Progresso</h1>
                            <h4 className="text-white text-base md:text-lg text-center transition duration-500 ease-in-out">Encontre personal trainers qualificados em hipertrofia e crescimento muscular. Localize profissionais próximos com a integração da Google Places API</h4>
                        </div>
                        <div className="recurso flex flex-col items-center justify-center h-72 md:h-96 rounded-lg overflow-hidden shadow-md transition duration-500 ease-in-out hover:brightness-110 hover:shadow-lg hover:scale-105">
                            <h1 className="text-white font-semibold text-lg md:text-xl text-center break-line transition duration-600 ease-in-out">Lembretes e Acompanhamento</h1>
                            <h4 className="text-white text-base md:text-lg text-center transition duration-500 ease-in-out">Encontre personal trainers qualificados em hipertrofia e crescimento muscular. Localize profissionais próximos com a integração da Google Places API</h4>
                        </div>
                        <div className="recurso flex flex-col items-center justify-center h-72 md:h-96 rounded-lg overflow-hidden shadow-md transition duration-500 ease-in-out hover:brightness-110 hover:shadow-lg hover:scale-105">
                            <h1 className="text-white font-semibold text-lg md:text-xl text-center transition duration-600 ease-in-out">Guia e rotina para o seu bem-estar</h1>
                            <h4 className="text-white text-base md:text-lg text-center transition duration-500 ease-in-out">Encontre personal trainers qualificados em hipertrofia e crescimento muscular. Localize profissionais próximos com a integração da Google Places API</h4>
                        </div>
                        <img src={vectorBottomRecursos} alt="" className="absolute bottom-0 left-0 w-full mt-16" />
                    </div>

                </div>
            </section>
            <section id="depoimentos">
                <div>
                    <sl-carousel loop navigation pagination>
                        <sl-carousel-item>
                            <div class="testimonial-item">
                                <div class="carouselItemBody personal flex justify-center items-center shadow-md rounded-lg p-8 md:p-10 gap-8 md:gap-12">
                                    <img src={ProtoPersonaMarcelo} alt="Foto de Marcelo da Silva" class="w-32 h-32 rounded-full" />
                                    <div class="carouselItemContent">
                                        <h1 class="noUnderline text-xl font-semibold">Marcelo da Silva</h1>
                                        <div>
                                            <h3 class="text-gray-700">Os lembretes de sessões agendadas foram muito úteis. Antes, eu costumava perder alguns treinos devido à minha agenda, mas agora consigo me manter consistente. O sistema de agendamento é simples e eficiente</h3>
                                            <h2 class="text-primary">Personal Trainer</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </sl-carousel-item>
                        <sl-carousel-item>
                            <div class="testimonial-item">
                                <div class="carouselItemBody aluno flex justify-center items-center shadow-md rounded-lg p-8 md:p-10 gap-8 md:gap-12">
                                    <img src={ProtoPersonaTauane} alt="Foto de Tauane da Silva" class="w-32 h-32 rounded-full" />
                                    <div class="carouselItemContent">
                                        <h1 class="noUnderline text-xl font-semibold">Tauane da Silva</h1>
                                        <div>
                                            <h3 class="text-gray-700">Adorei ter acesso a um guia completo para o meu bem-estar. As dicas de nutrição foram especialmente úteis, e as sugestões de exercícios me ajudaram a alcançar meus objetivos de saúde</h3>
                                            <h2 class="text-primary">Estudante de administração</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </sl-carousel-item>
                    </sl-carousel>
                </div>
            </section>

            <section id="contato">
                <img src={vectorParalelepipedo} alt="" className="absolute w-full -top-20 left-0" />
                <div className="contatoWrapper flex flex-col gap-12 items-center text-white px-6 md:px-12">
                    <h1 className="noUnderline text-3xl font-bold text-primary">Entre em contato conosco!</h1>
                    <div className="flex flex-col md:flex-row justify-between gap-12 items-center">
                        <h2 className="text-lg w-full md:w-1/2 leading-relaxed">
                            Queremos ouvir de você! Se você tiver alguma dúvida, comentário, sugestão ou simplesmente quiser entrar em contato conosco, sinta-se à vontade! Nossa equipe está aqui para ajudar e responder todas as suas perguntas.
                        </h2>
                        <button className="bg-green-500 text-white py-2 px-6 md:py-2 md:px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out">Contate-nos!</button>
                    </div>
                </div>
            </section>
            <section id="footer">
                <div className="footerWrapper flex justify-center gap-12 px-6 md:px-12">
                    <div className="leftFooterContent flex flex-col gap-4">
                        <div>
                            <h1 className="text-lg font-semibold">Endereço</h1>
                            <h3>Rua Haddock Lobo, 595 - Cerqueira César, São Paulo - SP, 01414-001</h3>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">Meios de contato</h1>
                            <h3>contato.nhyira@gmail.com</h3>
                            <h3>+55 (11) 9-8982-4422</h3>
                        </div>
                    </div>
                    <div className="middleFooterContent flex flex-col items-center">
                        <img src={logoNormal} alt="" className="w-72" />
                        <h2 className="text-sm mt-4">© 2024 nhyira. All Rights reserved</h2>
                    </div>
                    <div className="rightFooterContent">
                        <div>
                            <h1 className="text-lg font-semibold">Legal</h1>
                            <h3>Informações Gerais</h3>
                            <h3>Políticas de privacidade</h3>
                            <h3>Termos de serviço</h3>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default SiteInstitucional;
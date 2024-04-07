import React from "react";
import "./site-inst-stylesheet.scss";
import { Outlet, Link } from "react-router-dom";

import logoSmallWB from "@assets/logos/greenSmallSizeNBG.svg";
import cordaoTDAH from "@assets/inst-assets/cordaoTdah.svg";
import vectorParalelepipedo from "@assets/inst-assets/vectorParalelepipedo.png"
import vectorParalelepipedoInvertido from "@assets/inst-assets/vectorParalelepipedoInvertido.svg"
import vectorCoracao from "@assets/inst-assets/vectorCoracao.svg"
import vectorCaraCorrendo from "@assets/inst-assets/VectorCaraCorrendo.svg"
import vectorCalendario from "@assets/inst-assets/VectorCalendario.svg"
import vectorSorriso from "@assets/inst-assets/VectorSorriso.svg"
import celularENotebook from "@assets/inst-assets/celularEnotebook.svg"
import vectorBottomRecursos from "@assets/inst-assets/vectorBottomRecursos.svg"
import ProtoPersonaMarcelo from "@assets/inst-assets/ProtoPersona_Marcelo.png"
import ProtoPersonaTauane from "@assets/inst-assets/ProtoPersona_Tauane.png"
import logoNormal from "@assets/logos/greenNormalSize.svg";



const SiteInstitucional = () =>{
    return(
        <main>
        <section class="header">
            <div class="lateralNav">
                <ul>
                    <li><a href="#projetoInfo">Projeto</a></li>
               
                    <li><a href="#recursos">Recursos</a></li>
               
                    <li><a href="#depoimentos">Depoimentos</a></li>

                    <li><a href="#contato">Contatos</a></li>
                </ul>
            </div>

            <div class="headerWrapper">
                <nav>
                    <div>
                    <img class="logo" src={logoSmallWB} alt="" srcset=""/>
                    <img src={cordaoTDAH} alt="" srcset=""/> 
                    </div>

                    <h1 class="noUnderline">Plataforma que te guiará ao seu bem-estar!</h1>

                    <div>                
                        <Link to={'login/aluno'}><button>Sign In</button></Link>
                    </div>
                </nav>

                <div class="headerContainer">

                    <div class="headerSocialMidia">
                        <ul>
                            <li><a href="">Instagram</a></li>

                            <li><a href="">Github</a></li>

                            <li><a href="">Linkedin</a></li>
                        </ul>
                    </div>

                    <div class="headerContent">
                        <h1 class="headerTittle noUnderline">
                            Bem estar de forma certa<b>.</b>
                        </h1>
        
                        <h5>
                            Nosso aplicativo é uma plataforma abrangente projetada para atender às necessidades específicas daqueles que buscam ganhos musculares. Com uma interface amigável e recursos personalizados, oferecemos uma experiência única que vai além do simples acompanhamento de exercícios.
                        </h5>
                    </div>
                </div>

                
            </div>

        </section>

        <section id="projetoInfo">
            <div class="projetoInfoWrapper">
                <h1 class="noUnderline" >VITALIS</h1>

                <img src={vectorParalelepipedo} alt=""/>
                <img src={vectorParalelepipedoInvertido} alt=""/>


                <div class="projetoInfoContent">
                    <img src="Assets/celularGenerico.svg" alt="" srcset=""/>

                    <div class="beneficios noUnderline">

                        <div class="beneficio noUnderline">
                            <div>
                                <h1>Guia ao bem-estar</h1>
                                <h4>Descubra o caminho para uma vida equilibrada e feliz.</h4>
                            </div>

                            <img src={vectorCoracao} alt=""/>
                        </div>

                        <div class="beneficio noUnderline">
                            <div>
                                <h1>Mais produtividade</h1>
                                <h4>Dicas essenciais para alcançar seus objetivos com eficiência.</h4>
                            </div>

                            <img src={vectorCaraCorrendo} alt=""/>
                        </div>

                        <div class="beneficio noUnderline">
                            <div>
                                <h1>Rotina organizada</h1>
                                <h4>Transforme o caos em ordem e conquiste seus dias.</h4>
                            </div>

                            <img src={vectorCalendario} alt=""/>
                        </div>

                        <div class="beneficio noUnderline">
                            <div>
                                <h1>Auto-estima</h1>
                                <h4>Fortaleça sua confiança e amor próprio para uma vida plena.</h4>
                            </div>

                            <img src={vectorSorriso} alt=""/>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <section id="objetivo">
            <div class="objetivoWrapper">
                <div class="objetivoContent">
                    <h1 class="noUnderline">Nosso objetivo</h1>

                    <b>
                        <h3>
                            Se sinta bem. Se sinta vivo. Se sinta vita. Seja Vitalis.
                        </h3>
                    </b>

                    <div>
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

                <img src={celularENotebook} alt=""/>
            </div>
        </section>

        <section id="recursos">
            <div class="recursosWrapper noUnderline">

                <div class="recursos">
                    <div class="recurso noUnderline">
                        <h1>Lista de Personal Trainers Especializados</h1>
                        <h4>Encontre personal trainers qualificados em hipertrofia e crescimento muscular.
                            Localize profissionais próximos com a integração da Google Places API</h4>
                    </div>
                    <div class="recurso noUnderline">
                        <h1>Agendamento de Sessões de Treinamento</h1>
                        <h4>Agende sessões de treinamento personalizado diretamente pelo aplicativo. Você tem controle da sua agenda e rotina pelo aolicativo.</h4>
                    </div>
                    <div class="recurso noUnderline">
                        <h1>Monitoramento de Progresso</h1>
                        <h4>Encontre personal trainers qualificados em hipertrofia e crescimento muscular.
                            Localize profissionais próximos com a integração da Google Places API</h4>
                    </div>
                    <div class="recurso noUnderline">
                        <h1>Lembretes e acompanhamento</h1>
                        <h4>Encontre personal trainers qualificados em hipertrofia e crescimento muscular.
                            Localize profissionais próximos com a integração da Google Places API</h4>
                    </div>
                    <div class="recurso noUnderline">
                        <h1>Guia e rotina para o seu bem-estar</h1>
                        <h4>Encontre personal trainers qualificados em hipertrofia e crescimento muscular.
                            Localize profissionais próximos com a integração da Google Places API</h4>
                    </div>
                </div>
                <img src={vectorBottomRecursos} alt=""/>
            </div>
        </section>

        <section id="depoimentos">
            <div class="depoimentosWrapper">
                <sl-carousel navigation loop slides-per-page="2" slides-per-move="2">
                    <sl-carousel-item class="testimonial-item">
                        <div class="carouselItemBody personal">
                            <img src={ProtoPersonaMarcelo} alt=""/>
                            <div class="carouselItemContent">
                                <h1 class="noUnderline">Marcelo da Silva</h1>
                                <div>
                                    <h3>Os lembretes de sessões agendadas foram muito úteis. Antes, eu costumava perder alguns treinos devido à minha agenda, mas agora consigo me manter consistente. O sistema de agendamento é simples e eficiente</h3>
                                    <h2>Personal Trainer</h2>
                                </div>
                            </div>
                        </div>
                    </sl-carousel-item>
        
                    <sl-carousel-item class="testimonial-item">
                        <div class="carouselItemBody aluno">
                            <img src={ProtoPersonaTauane} alt=""/>
                            <div class="carouselItemContent">
                                <h1 class="noUnderline">Tauane da Silva</h1>
                                <div>
                                    <h3>Adorei ter acesso a um guia completo para o meu bem-estar. As dicas de nutrição foram especialmente úteis, e as sugestões de exercícios me ajudaram a alcançar meus objetivos de saúde</h3>
                                    <h2>Estudante de administração</h2>
                                </div>
                            </div>
                        </div>
                    </sl-carousel-item>
        
                    <sl-carousel-item class="testimonial-item">
                        <div class="carouselItemBody aluno">
                            <img src={ProtoPersonaTauane} alt=""/>
                            <div class="carouselItemContent">
                                <h1 class="noUnderline">Will Dantas</h1>
                                <div>
                                    <h3>Encontrei na plataforma uma fonte de motivação e apoio incrível para minha jornada de bem-estar. As orientações personalizadas me ajudaram a superar desafios e a alcançar resultados além do esperado.</h3>
                                    <h2>Estudante de Educação Física</h2>
                                </div>
                            </div>
                        </div>
                    </sl-carousel-item>
                </sl-carousel>
            </div>
        </section>

        <section id="contato">
            <div class="contatoWrapper">
                <img src={vectorParalelepipedo} alt=""/>
                <h1 class="noUnderline">Entre em contato conosco!</h1>

                <div>
                    <h2>Queremos ouvir de você! Se você tiver alguma dúvida, comentário, sugestão ou simplesmente quiser entrar em contato conosco, sinta-se à vontade! Nossa equipe está aqui para ajudar e responder todas as suas perguntas.</h2>
                
                    <button>Contate-nos!</button>
                </div>
            </div>
        </section>

        <section id="footer">
            <div class="footerWrapper">
                <div class="leftFooterContent">
                    <div>
                        <h1>Endereço</h1>
                        <h3>Rua Haddock Lobo, 595 - Cerqueira César, São Paulo - SP, 01414-001</h3>
                    </div>

                    <div>
                        <h1>Meios de contato</h1>
                        <h3>contato.nhyira@gmail.com</h3>
                        <h3>+55 (11) 9-8982-4422</h3>
                    </div>
                </div>

                <div class="middleFooterContent">
                    <img src={logoNormal} alt=""/>
                    <h2>© 2024 nhyira. All Rights reserved</h2>
                </div>

                <div class="rightFooterContent">
                    <div>
                        <h1>Legal</h1>
                        <h3>Informações Gerais</h3>
                        <h3>Políticas de privacidade</h3>
                        <h3>Termos de serviçõ</h3>
                    </div>
                </div>
            </div>
        </section>
    </main>
    )
}
export default SiteInstitucional;

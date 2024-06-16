import { SideBar } from "@components/SideBar/sideBar";
import { IngredienteCard } from "@components/IngredienteCard/ingredienteCard"
import {Button} from "@components/Button/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";


import { api } from "@apis/api";
import { validateLogin, validateUsuario} from "@utils/globalFunc"

export function RefeicaoPage() {
    
    const navigate = useNavigate();

    const { idRefeicao } = useParams();
    const [refeicao, setRefeicao] = useState({});


    useEffect(() => {
        const validarLoginEUsuario = async () =>{

            await validateLogin(navigate);
            await validateUsuario(navigate);
      
          try{
            api.get(`/refeicoes/${idRefeicao}`)
            .then((response) => {
                 setRefeicao(response.data);
             })
          } catch (error){
            console.log(error)
          }
        }
      
        validarLoginEUsuario();

    }, []);

    function abreviarMetrica(metrica){
        switch(metrica){
            case "gramas":
                return("g")
            break;
            case "quilogramas":
                return("Kg")
            break;
            case "miligramas":
                return("Ml")
            break;
            case "litros":
                return("l")
            break;
            case "mililitros":
                return("Ml")
            break;
            case "xícaras":
                return("x")
            break;
            case "colheres de sopa":
                return("cs")
            break;
            case "colheres de chá":
                return("cc")
            break;
            case "unidade":
                return("u")
            break;
        }
    }


        return (
            <>
                <div className="flex items-center justify-center  w-screen h-screen px-10 py-10 gap-5">
                    <SideBar />

                    <div className="w-[90vw] h-full flex flex-col">
                        <div className="flex flex-col gap-2">
                            <span className="text-[#2B6E36] font-semibold text-2xl">{refeicao.nome}</span>
                            <div className="flex gap-1">
                                <Link to={'/refeicoes'} className="text-primary-green400 font-bold">Refeições</Link>
                                <span className="text-primary-green400 font-extrabold">></span>
                                <span className="text-primary-green400 font-bold">{refeicao.nome}</span>
                            </div>
                        </div>

                        <div className="flex w-full h-3/5 max-h-3/5 py-5 gap-10">
                            <div className="w-3/5 p-5 bg-white shadow-sombra-padrao rounded-xl">
                                <div className="h-full w-full rounded-lg flex items-center justify-center">
                               
                                {
                                    refeicao.midia && refeicao.midia.caminho? (
                                        <img className="w-full h-full bg-gray500 object-cover rounded-lg" src={refeicao.midia.caminho} alt={refeicao.nome} />
                                    ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <div className="animate-bounce rounded-full w-5 h-5 bg-primary-green300"></div>
                                        <p className="text-gray-700 ">Carregando...</p>
                                    </div>
                                    )
                                }

                                    
                                </div>
                            </div>

                            <div className="w-2/5 h-full shadow-sombra-padrao flex flex-col items-center rounded-xl py-5 gap-5">
                                <span className="text-2xl font-semibold">Ingredientes</span>

                                <div className="flex gap-10 w-full h-full overflow-auto">
                                    <ul className="flex flex-col gap-5 w-full px-5">
                                        {refeicao.alimentoPorRefeicao?.map((ingrediente) => (
                                            <li className="flex justify-between rounded-md bg-primary-green300 text-white *:font-medium text-lg p-3" key={ingrediente.idAlimentoRefeicao}>
                                                <span>{ingrediente.alimento.nome}</span>
                                                <span>{ingrediente.qtdAlimento}{abreviarMetrica(ingrediente.metrica.metrica)} </span>    
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full h-2/5 max-h-2/5 py-5 gap-10">
                            <div className="w-3/5 max-w-3/5 overflow-auto scrollbar-thin flex gap-5">
                            {
                                refeicao.alimentoPorRefeicao && refeicao.alimentoPorRefeicao.length > 0? (
                                    refeicao.alimentoPorRefeicao.map((ingrediente, index) => (
                                        <IngredienteCard key={index} ingrediente={ingrediente}/>
                                    ))
                                ) : (
                                    <></>
                                )
                            }
                            
                            </div>

                            <div className="w-2/5 h-full shadow-sombra-padrao flex flex-col items-center rounded-xl py-5 gap-5">
                                <span className="text-2xl font-semibold">Descrição</span>

                                <div className="flex gap-10 w-full h-full overflow-auto">
                                    <ul className="flex flex-col gap-2 w-full px-5">
                                            <li className="text-lg">{refeicao.preparo}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

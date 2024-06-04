import { Link } from "react-router-dom";
import {
    Check
  } from "@phosphor-icons/react";


export function ExercicioImageCard({exercicio, URI}){
    return(
        <Link to={URI} className="h-[80%]">
                <div className="group overflow-hidden shadow-sombra-padrao rounded-xl h-full w-80 flex flex-col items-center justify-end ">
                    <div className="w-full h-full relative overflow-hidden">
                        <img className="object-contain w-full h-full group-hover:scale-110 transition-all duration-300 ease-in-out" src={exercicio.img} alt="" />
                        
                        {exercicio.concluido && (
                            <div className="h-full w-full bg-primary-green300/30 absolute top-0 left-0 "/>
                        )}
                        
                    </div>

                    <div className={`${exercicio.concluido ? 'bg-primary-green300' : 'bg-white'} w-full p-3 flex justify-center items-center gap-3`}>
                        <span className={`${exercicio.concluido ? 'text-white' : 'text-black'} font-semibold text-lg`}>{exercicio.nome}</span>
                        
                        {exercicio.concluido && (
                              <Check size={25} color={'#ffffff'}/>
                        )}
                    </div>
                </div>
        </Link>
    )
}
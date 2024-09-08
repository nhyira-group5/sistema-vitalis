import {Button} from "@components/Button/button";
import { useEffect } from "react";
export function IngredienteCard({ingrediente}){

    useEffect(()=>{
        console.log(ingrediente)
    })
    return(
    <div className="group p-5 flex flex-col justify-end items-center bg-gray500 rounded-xl h-full min-w-48 overflow-hidden gap-2 relative">
        
        {
           ingrediente.alimento.midia ? (
             <img className="transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-[.6] absolute w-full h-full object-cover rounded-lg top-0 left-0 brightness-[.5] bg-gray500" src={ingrediente.alimento.midiaId ? ingrediente.alimento.midia.caminho ? ingrediente.alimento.midia.caminho : null : null} alt={ingrediente.alimento.nome} />
                                ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <div className="animate-bounce rounded-full w-5 h-5 bg-primary-green300"></div>
                                </div>
                                )
                            }

        <div className="flex flex-col gap-1 z-10 text-center">
            <span className="text-white font-semibold">{ingrediente.alimento.nome}</span>
        </div>

        <Button buttonStyle={'z-10 text-gray100 bg-primary-green300 rounded-full font-semibold text-sm px-3 py-2 hover:bg-primary-green400 transition-all flex items-center gap-1'} content={'Ver ingrediente'} iconVisibility={false} />
    </div>
    )
} 
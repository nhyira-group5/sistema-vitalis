import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ImageBroken } from '@phosphor-icons/react';

export function RefeicaoCard({ refeicao }){
    
    useEffect(()=>{

        }, [refeicao])

    return(
        <Link to={`/refeicoes/${refeicao.idRefeicao}`}>
            <div className=" group flex flex-col px-3 py-4  h-fit gap-2 rounded-xl  transition-all duration-100 ease-in-out hover:bg-gray200/70">
                <div className="w-full h-36  bg-gray500 rounded-lg overflow-hidden">
                    {refeicao.midia && refeicao.midia[0].caminho ? (
                        <img className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-100 ease-in-out" src={refeicao.midia[0].caminho} />
                    ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <ImageBroken size={32} color="white"/>
                    </div>
                    )}
                    
                </div>
                <span className="text-primary-green500 font-semibold text-lg truncate-multiline">{refeicao.nome}</span>
            </div>
        </Link>
    )
}
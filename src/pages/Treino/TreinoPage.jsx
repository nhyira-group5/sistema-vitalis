
import { SideBar } from "@components/SideBar/sideBar";
import { useEffect, useState } from "react";

export function TreinoPage(){
    return(
        <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
        <SideBar />

        <div className="w-full h-full flex flex-col">
            <div className="flex flex-col gap-3 p-5">
                        <span className="text-[#2B6E36] font-semibold text-2xl">Nome do treino - Exercicios</span>

            </div>

                    <div className="flex gap-5 items-center h-full w-full">

                        <div className="group overflow-hidden shadow-sombra-padrao rounded-xl h-[80%] w-80 flex flex-col items-center justify-end cursor-pointer">
                            <div className="w-full h-full">
                                <img className="object-contain w-full h-full group-hover:scale-110 transition-all duration-300 ease-in-out " src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png" alt="" />
                            </div>

                            <div className="w-full p-3 flex justify-center items-center">
                                <span>Nome Exercicio</span>
                            </div>
                        </div>


            </div>
        </div>

    </div>
    )
}
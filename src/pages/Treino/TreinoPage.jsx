
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
        </div>

    </div>
    )
}
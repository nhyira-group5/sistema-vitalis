
import { SideBar } from "@components/SideBar/sideBar";
import { useEffect, useState } from "react";

import { ExercicioImageCard } from "@components/ImageCard/imageCard";
import { useParams  } from "react-router-dom";


import { api } from "@apis/api";

export function TreinoPage(){
    const [rotinaDiaria, setRotinaDiaria] = useState([]);
   
    const { idRotinaDiaria } = useParams();

    function getRotinaDiaria(){
        try{
            api.get(`/treinos/por-dia/${idRotinaDiaria}`)
            .then((response)=>{
                setRotinaDiaria([...rotinaDiaria,...response.data]);
            })
        } catch (error){
            console.log(error)
        }


    }


    useEffect(()=>{
        getExercicios();
    },[]);

    return(
        <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
        <SideBar />

        <div className="w-[90vw] h-full flex flex-col overflow-hidden">
            <div className="flex flex-col gap-3 p-5">
                        <span className="text-[#2B6E36] font-semibold text-2xl">Rotina diaria - Exercicios</span>

            </div>

            <div className="flex gap-5 items-center h-full w-full overflow-auto p-5">
                    {exercicios.map(exercicio => (
                            <ExercicioImageCard 
                            key={exercicio.key} 
                            exercicio={exercicio}
                            URI={`/rotinas/treino/${rotinaDiaria.fkTreino}/exercicio/${rotinaDiaria.id}`}/>
                    ))}


            </div>
        </div>

    </div>
    )
}
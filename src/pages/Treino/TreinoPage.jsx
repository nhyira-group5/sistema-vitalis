
import { SideBar } from "@components/SideBar/sideBar";
import { useEffect, useState } from "react";

import { ExercicioImageCard } from "@components/ImageCard/imageCard";
import { useParams  } from "react-router-dom";

export function TreinoPage(){
    const [exercicios, setExercicios] = useState([]);
   
    const { idTreino } = useParams();

    function getExercicios(){
        //blabalbala req

        const exerciciosResponse = [
            {id: 1,
            fkTreino: idTreino,
            nome: 'Boquete Parafuso',
            img: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png',
            concluido: false},
            {id: 2,
            fkTreino: idTreino,
            nome: 'Boquete Quente (Hot Blowjob) ',
            img: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png',
            concluido: false},
            {id: 3,
            fkTreino: idTreino,
            nome: 'Boquete Duplo ',
            img: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png',
            concluido: true},
        ];

        setExercicios([...exercicios,...exerciciosResponse]);
    }


    useEffect(()=>{
        getExercicios();
    },[]);

    return(
        <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
        <SideBar />

        <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="flex flex-col gap-3 p-5">
                        <span className="text-[#2B6E36] font-semibold text-2xl">Nome do treino - Exercicios</span>

            </div>

            <div className="flex gap-5 items-center h-full w-full overflow-auto p-5">
                    {exercicios.map(exercicio => (
                            <ExercicioImageCard 
                            key={exercicio.key} 
                            exercicio={exercicio}
                            URI={`/rotinas/treino/${exercicio.fkTreino}/exercicio/${exercicio.id}`}/>
                    ))}


            </div>
        </div>

    </div>
    )
}
import { SideBar } from "@components/SideBar/sideBar";

import { useEffect, useState } from "react";
import { RotinaCard, TreinoCard } from "@components/HorizontalCard/horizontalCard";
import {
    CaretRight,
    Barbell
  } from "@phosphor-icons/react";

export function RotinasSemanaisPage() {
    const [rotinas, setRotinas] = useState([]);

    const [treinosRotina, setTreinosRotina] = useState([]);
    const [rotinaSelecionada, setRotinaSelecionada] = useState(null); 

    useEffect(()=>{
        getRotinas();
    }, [])

    function handleClick(rotinaId) {
        const rotinaSelecionada = rotinas.find(rotina => rotina.id === rotinaId);

        if (rotinaSelecionada) {
            setTreinosRotina(rotinaSelecionada.treinos);

            setRotinaSelecionada(rotinaSelecionada.id);
        }
    }

    function getRotinas(){
      //blablabla req

      const rotinasResponse =[
        {id: 1,
         nome: 'Rotina semanal 1',
         treinos: [
            {id: 1,
             nome: 'Treino 1',
             exerciciosFeitos: 2,
             totalExercicios: 5
            },
            {id: 2,
             nome: 'Treino 2',
             exerciciosFeitos: 3,
             totalExercicios: 8
            },
            {id: 3,
             nome: 'Treino 3',
             exerciciosFeitos: 1,
             totalExercicios: 7
            }
         ]   
        },
        {id: 2,
            nome: 'Rotina semanal 2',
            treinos: [
               {id: 4,
                nome: 'Treino 4',
                exerciciosFeitos: 0,
                totalExercicios: 10
               },
               {id: 5,
                nome: 'Treino 5',
                exerciciosFeitos: 0,
                totalExercicios: 12
               },
               {id: 6,
                nome: 'Treino 6',
                exerciciosFeitos: 0,
                totalExercicios: 15
               },
               {id: 7,
                nome: 'Treino 7',
                exerciciosFeitos: 0,
                totalExercicios: 9
               }
            ]   
           }
      ];

      setRotinas([...rotinas,...rotinasResponse])
    }

    return(
        <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
                <SideBar />

                <div className="w-full h-full flex flex-col">
                    <div className="flex flex-col gap-3 p-5">
                        <span className="text-[#2B6E36] font-semibold text-2xl">Rotinas semanais</span>
                    </div>
                    <div className="flex h-full">
                        <div className="w-1/2 h-full flex flex-col gap-5 p-5 ">

                            {rotinas.map(rotina => (
                                <RotinaCard key={rotina.id}
                                            rotina={rotina}
                                            onClickFunction={() => {handleClick(rotina.id)}}
                                            rotinaSelecionada={rotinaSelecionada}/>
                            ))}

                        </div>

                        <div className={`relative w-1/2 flex flex-col gap-5 p-5 rounded-xl overflow-hidden`}>
                        {!rotinaSelecionada && (
                            <div className="h-full w-full flex items-center justify-center">
                                <span>Selecione uma rotina!</span>
                            </div>
                        )}

                        {treinosRotina.map(treino => (
                            <TreinoCard key={treino.id} treino={treino}/>
                        ))}


                         </div>
                    </div>
                </div>
        </div>
        )
}
import { SideBar } from "@components/SideBar/sideBar";

import { useEffect, useState } from "react";
import { RotinaCard, TreinoCard } from "@components/HorizontalCard/horizontalCard";

import {validateLogin} from "@utils/globalFunc"

import { useNavigate } from "react-router-dom";

export function RotinasSemanaisPage() {
    const [rotinas, setRotinas] = useState([]);
    const [treinosRotina, setTreinosRotina] = useState([]);
    const [rotinaSelecionada, setRotinaSelecionada] = useState(null); 

    const navigate = useNavigate();


    useEffect(()=>{
        validateLogin(navigate);
        

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
             exerciciosFeitos: 5,
             totalExercicios: 5,
             concluido: true
            },
            {id: 2,
             nome: 'Treino 2',
             exerciciosFeitos: 8,
             totalExercicios: 8,
             concluido: true
            },
            {id: 3,
             nome: 'Treino 3',
             exerciciosFeitos: 7,
             totalExercicios: 7,
             concluido: true
            }
         ],
         concluido: true   
        },
        {id: 2,
            nome: 'Rotina semanal 2',
            treinos: [
               {id: 4,
                nome: 'Treino 4',
                exerciciosFeitos: 0,
                totalExercicios: 10,
                concluido: false
               },
               {id: 5,
                nome: 'Treino 5',
                exerciciosFeitos: 0,
                totalExercicios: 12,
                concluido: false
               },
               {id: 6,
                nome: 'Treino 6',
                exerciciosFeitos: 0,
                totalExercicios: 15,
                concluido: false
               },
               {id: 7,
                nome: 'Treino 7',
                exerciciosFeitos: 0,
                totalExercicios: 9,
                concluido: false
               }
            ],
            concluido: false
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
                    <div className="flex h-full overflow-hidden">
                        <div className="w-1/2 h-full flex flex-col gap-5 p-5 overflow-auto">
                            {rotinas.map(rotina => (
                                <RotinaCard key={rotina.id}
                                            rotina={rotina}
                                            onClickFunction={() => {handleClick(rotina.id)}}
                                            rotinaSelecionada={rotinaSelecionada}
                                           />
                            ))}

                        </div>

                        <div className={`relative w-1/2 h-full overflow-auto flex flex-col gap-5 p-5 rounded-xl`}>
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
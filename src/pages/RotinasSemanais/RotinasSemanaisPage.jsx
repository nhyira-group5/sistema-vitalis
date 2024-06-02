import { SideBar } from "@components/SideBar/sideBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
                                <div onClick={() => handleClick(rotina.id)} key={rotina.id} className={`${rotinaSelecionada === rotina.id ? ' w-[100%]' : 'w-[90%]'} justify-between transition-all duration-300 ease-in-out  overflow-hidden group cursor-pointer relative flex items-center p-3 bg-white rounded-xl shadow-sombra-padrao h-28`}>
                                   <div className={`${rotinaSelecionada === rotina.id ? 'w-[100%]' : 'group-hover:w-[35%]'} w-[0%]  absolute left-0 h-full transition-all duration-300 ease-in-out bg-primary-green300 `}></div>
                                   
                                   <span className={`${rotinaSelecionada === rotina.id ? ' text-white' : 'text-black'} group-hover:text-white z-10 font-semibold text-2xl transition-all duration-300 ease-in-out`}>{rotina.nome}</span>
                                   <CaretRight size={32} className={`${rotinaSelecionada === rotina.id ? ' text-white' : 'text-black'} z-10 transition-all duration-300 ease-in-out`}/>
                                </div>
                            ))}

                        </div>

                        <div className={`relative w-1/2 flex flex-col gap-5 p-5 rounded-xl overflow-hidden`}>
                        {!rotinaSelecionada && (
                            <div className="h-full w-full flex items-center justify-center">
                                <span>Selecione uma rotina!</span>
                            </div>
                        )}

                        {treinosRotina.map(treino => (
                            <Link key={treino.id} to={`/rotinas/treino/${treino.id}`}>
                                <div  className="group relative z-10 flex items-center justify-center p-3 gap-5 bg-white rounded-xl shadow-sombra-padrao h-28 overflow-hidden cursor-pointer">
                                   <div className={`absolute left-0 bottom-0 w-full h-[0%] group-hover:h-[100%] transition-all duration-300 ease-in-out bg-primary-green300 `}></div>

                                   <span className="font-semibold text-2xl z-10 group-hover:text-white transition-all duration-300 ease-in-out">{treino.nome}</span>

                                   <div className=" flex flex-col shadow-sombra-padrao rounded-lg bg-white z-10 p-2 w-20">

                                        <div className="flex justify-center items-center gap-2 ">
                                          <Barbell size={25} />
                                          <span>{treino.exerciciosFeitos}/{treino.totalExercicios}</span>
                                        </div>

                                   </div>
                                </div>
                            </Link>
                        ))}


                         </div>
                    </div>
                </div>
        </div>
        )
}
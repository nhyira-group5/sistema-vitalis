import { Link } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";
import { api } from "@apis/api"

import {
    CaretRight,
    Barbell,
    Check,
    Info
  } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function RotinaCard({rotina, onClickFunction, rotinaSelecionada}){
    return(
        <div onClick={onClickFunction} key={rotina.id} className={`${rotinaSelecionada === rotina.id ?  'w-[100%]' : 'w-[90%]'} ${rotina.concluido == 1 ? 'bg-primary-green200' : 'bg-white'} justify-between transition-all duration-300 ease-in-out  overflow-hidden group cursor-pointer relative flex items-center p-3  rounded-xl shadow-sombra-padrao min-h-28`}>
             <div className={`${rotinaSelecionada === rotina.id ? 'w-[100%]' : 'group-hover:w-[50%]'} w-[0%]  absolute left-0 h-full transition-all duration-300 ease-in-out bg-primary-green300 `}></div>
        
            <div className="flex gap-5">
               <span className={`${rotina.concluido == 1 ? 'text-white' : rotinaSelecionada === rotina.id ? ' text-white' : 'text-black'} group-hover:text-white z-10 font-semibold text-2xl transition-all duration-300 ease-in-out`}>Rotina semanal {rotina.numSemana}</span>
               
               {rotina.concluido == 1 && (
                     <Check size={32} color={'#ffffff'} className="z-10"/>
                )}
            </div>
            <CaretRight size={32} className={`${rotina.concluido == 1 ? 'text-white' : rotinaSelecionada === rotina.id ? ' text-white' : 'text-black'} z-10 transition-all duration-300 ease-in-out`}/>
     </div>
    )
}

export function TreinoCard({rotinaDiaria}){
  const [exerciciosFeitos, setExerciciosFeitos] = useState(0);
  const [exercicios, setExercicios] = useState([]);



  useEffect(() => {
  
    const buscarDetalhesDaRotinaDiaria = async () => {
      try {
        const response = await api.get(`/rotinaDiarias/buscarIdDiario/${rotinaDiaria.idRotinaDiaria}`);
        const exerciciosDaRotina = response.data.treinoDto; 
        setExercicios(exerciciosDaRotina);
      } catch (error) {
        console.error(error);
      }
    };

    setExercicios([]);
    buscarDetalhesDaRotinaDiaria();
  }, [rotinaDiaria]); 



  return(
    <Link key={rotinaDiaria.idRotinaDiaria} to={`/rotinas_semanais/diaria/${rotinaDiaria.idRotinaDiaria}`}>
        <div  className={`${rotinaDiaria.concluido == 1 ? 'bg-primary-green200' : 'bg-white'}  group relative z-10 flex items-center justify-center p-3 gap-5 rounded-xl shadow-sombra-padrao h-28 overflow-hidden cursor-pointer`}>
          <div className={`absolute left-0 bottom-0 w-full h-[0%] group-hover:h-[100%] transition-all duration-300 ease-in-out bg-primary-green300 `}></div>

          <span className={`${rotinaDiaria.concluido == 1 ? 'text-white' : 'group-hover:text-white'} font-semibold text-2xl z-10  transition-all duration-300 ease-in-out`}>Rotina diaria {rotinaDiaria.dia}</span>
          <div className={`${rotinaDiaria.concluido == 1 ? 'bg-primary-green300' : 'bg-white'} flex flex-col shadow-sombra-padrao rounded-lg  z-10 p-2 w-fit`}>

                <div className="flex justify-center items-center gap-2 ">
                  <Barbell size={25} color={`${rotinaDiaria.concluido == 1 ? '#ffffff' : '#000000'}`}/>
                  <span className={`${rotinaDiaria.concluido ? 'text-white' : 'text-black'} font-semibold`}>{exerciciosFeitos}/{exercicios.length}</span>
                  {rotinaDiaria.concluido == 1 && (
                     <Check size={25} color={`${rotinaDiaria.concluido ? '#ffffff' : '#000000'}`} className="z-10"/>
                  )}
                  
                </div>

          </div>
        </div>
    </Link>
  )
}

export function InfoCard({infoMessage, titulo, content}){
  return(
      <div className="bg-white rounded-xl p-2 flex flex-col items-start gap-4 justify-end w-1/3 relative h-full">
        <Tooltip.Provider delayDuration={100} >
            <Tooltip.Root>
            <Tooltip.Trigger side="top" className="absolute right-1 top-1">
                <Info size={25}/>
            </Tooltip.Trigger>


            <Tooltip.Portal>  
                <Tooltip.Content
                    side={"top"}
                    className={`data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-gray100 px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]`}
                    sideOffset={5}
                >
                    <span>{infoMessage}</span>
                </Tooltip.Content>
                </Tooltip.Portal>

            </Tooltip.Root>
        </Tooltip.Provider>

        <span className="text-lg text-primary-green300 font-semibold">{titulo}</span>
        <span className="text-xl font-semibold">{content}</span>
      </div>
  )
}


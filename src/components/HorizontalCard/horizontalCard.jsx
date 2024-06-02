import { Link } from "react-router-dom";

import {
    CaretRight,
    Barbell,
    Check
  } from "@phosphor-icons/react";

export function RotinaCard({rotina, onClickFunction, rotinaSelecionada}){
    return(
        <div onClick={onClickFunction} key={rotina.id} className={`${rotinaSelecionada === rotina.id ?  'w-[100%]' : 'w-[90%]'} ${rotina.concluido ? 'bg-primary-green200' : 'bg-white'} justify-between transition-all duration-300 ease-in-out  overflow-hidden group cursor-pointer relative flex items-center p-3 bg-white rounded-xl shadow-sombra-padrao min-h-28`}>
             <div className={`${rotinaSelecionada === rotina.id ? 'w-[100%]' : 'group-hover:w-[35%]'} w-[0%]  absolute left-0 h-full transition-all duration-300 ease-in-out bg-primary-green300 `}></div>
        
            <div className="flex gap-5">
               <span className={`${rotina.concluido ? 'text-white' : rotinaSelecionada === rotina.id ? ' text-white' : 'text-black'} group-hover:text-white z-10 font-semibold text-2xl transition-all duration-300 ease-in-out`}>{rotina.nome}</span>
               {rotina.concluido && (
                     <Check size={32} color={'#ffffff'} className="z-10"/>
                )}
            </div>
            <CaretRight size={32} className={`${rotina.concluido? 'text-white' : rotinaSelecionada === rotina.id ? ' text-white' : 'text-black'} z-10 transition-all duration-300 ease-in-out`}/>
     </div>
    )
}

export function TreinoCard({treino}){
  return(
    <Link key={treino.id} to={`/rotinas/treino/${treino.id}`}>
        <div  className={`${treino.concluido ? 'bg-primary-green200' : 'bg-white'}  group relative z-10 flex items-center justify-center p-3 gap-5 rounded-xl shadow-sombra-padrao h-28 overflow-hidden cursor-pointer`}>
          <div className={`absolute left-0 bottom-0 w-full h-[0%] group-hover:h-[100%] transition-all duration-300 ease-in-out bg-primary-green300 `}></div>

          <span className={`${treino.concluido ? 'text-white' : 'group-hover:text-white'} font-semibold text-2xl z-10  transition-all duration-300 ease-in-out`}>{treino.nome}</span>
          <div className={`${treino.concluido? 'bg-primary-green300' : 'bg-white'} flex flex-col shadow-sombra-padrao rounded-lg  z-10 p-2 w-fit`}>

                <div className="flex justify-center items-center gap-2 ">
                  <Barbell size={25} color={`${treino.concluido ? '#ffffff' : '#000000'}`}/>
                  <span className={`${treino.concluido ? 'text-white' : 'text-black'} font-semibold`}>{treino.exerciciosFeitos}/{treino.totalExercicios}</span>
                  {treino.concluido && (
                     <Check size={25} color={`${treino.concluido ? '#ffffff' : '#000000'}`} className="z-10"/>
                  )}
                  
                </div>

          </div>
        </div>
    </Link>
  )
}
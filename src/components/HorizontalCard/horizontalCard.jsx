import { Link } from "react-router-dom";

import {
    CaretRight,
    Barbell
  } from "@phosphor-icons/react";

export function RotinaCard({rotina, onClickFunction, rotinaSelecionada}){
    return(
        <div onClick={onClickFunction} key={rotina.id} className={`${rotinaSelecionada === rotina.id ? ' w-[100%]' : 'w-[90%]'} justify-between transition-all duration-300 ease-in-out  overflow-hidden group cursor-pointer relative flex items-center p-3 bg-white rounded-xl shadow-sombra-padrao h-28`}>
             <div className={`${rotinaSelecionada === rotina.id ? 'w-[100%]' : 'group-hover:w-[35%]'} w-[0%]  absolute left-0 h-full transition-all duration-300 ease-in-out bg-primary-green300 `}></div>
        
            <span className={`${rotinaSelecionada === rotina.id ? ' text-white' : 'text-black'} group-hover:text-white z-10 font-semibold text-2xl transition-all duration-300 ease-in-out`}>{rotina.nome}</span>
            <CaretRight size={32} className={`${rotinaSelecionada === rotina.id ? ' text-white' : 'text-black'} z-10 transition-all duration-300 ease-in-out`}/>
     </div>
    )
}

export function TreinoCard({treino}){
  return(
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
  )
}
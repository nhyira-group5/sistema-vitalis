import { Barbell, CookingPot } from "@phosphor-icons/react";
import { CardBoard } from "../CardBoard/cardBoard";
import { useEffect } from "react";

export function ExercicioBoard({ description, type, name, media, duration, repetitions, series, concluido, onClickFunction}) {
    useEffect(()=> {
      console.log("TIPO:" + type + " " + name)
    }, [])

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="w-full h-[35%] bg-black rounded-xl flex justify-center">
        <img className="max-w-full max-h-full" src={media} alt="" />
      </div>
      <div className="w-full h-fit flex justify-center items-center gap-2">
        {type == "Exercício" ? <Barbell size={28} color="#48B75A" /> : <CookingPot size={28} color="#48B75A" />}
        <span className="text-[#48B75A] font-semibold">{type}:</span>
        <span className="font-medium">{name}</span>
      </div>
      <span className="w-full h-fit flex flex-col font-semibold px-4">
        Descrição:
      </span>
      <div className="w-full h-fit px-4 shadow-lg rounded-lg text-xs min-h-28 max-h-28 overflow-hidden">
        <div className="truncate text-wrap whitespace-nowrap">{description}</div>
      </div>
      <div className="w-full h-[18%] flex justify-around">
        <CardBoard 
          numberInfo={duration}
          textInfo="Duração" />
        <CardBoard
          numberInfo={repetitions}
          textInfo="Repetições" />
        <CardBoard 
          numberInfo={series}
          textInfo="Séries" />
      </div>
      <div className="w-full flex justify-evenly">
        <button className="w-[40%] py-2 rounded-2xl shadow-lg text-sm text-white bg-[#48B75A]">
          Ir para o treino
        </button>
        <button className="w-[40%] py-2 rounded-2xl shadow-lg text-sm text-white bg-[#1B70CA]" onClick={onClickFunction}>
          {concluido ? "Desmarcar como concluido" : "Marcar como conlcuido"}
        </button>
      </div>
    </div>
  );
}

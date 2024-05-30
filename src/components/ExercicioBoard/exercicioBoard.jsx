import { Barbell } from "@phosphor-icons/react";
import { CardBoard } from "../CardBoard/cardBoard";
import { useEffect, useState } from "react";

export function ExercicioBoard({ description, type, name, selected }) {
  const [nameActivity, setNameActivity] = useState("");

  function whichActivity() {
    return activity == "ex" ? "exercicio" : "refeicao";
  }

  function handleActivity() {
    let activity = whichActivity();

    if (activity == "exercicio") {
      setNameActivity("Exercício");
    } else {
      setNameActivity("Refeição");
    }
  }

    useEffect(()=> {
      console.log("TIPO:" + type + " " + name)
    }, [selected])

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="w-full h-[30%] bg-black rounded-xl"></div>
      <div className="w-full h-fit flex justify-center items-center gap-2">
        <Barbell size={28} color="#48B75A" />
        <span className="text-[#48B75A] font-semibold">{type}:</span>
        <span className="font-medium">{name}</span>
      </div>
      <span className="w-full h-fit flex flex-col font-semibold px-4">
        Descrição:
      </span>
      <div className="w-full h-fit p-4 shadow-lg rounded-lg text-xs">
        {description}
      </div>
      <div className="w-full h-[18%] flex justify-around">
        <CardBoard />
        <CardBoard />
        <CardBoard />
      </div>
      <div className="w-full flex justify-evenly">
        <button className="w-[40%] py-2 rounded-2xl shadow-lg text-sm text-white bg-[#48B75A]">
          Ir para o treino
        </button>
        <button className="w-[40%] py-2 rounded-2xl shadow-lg text-sm text-white bg-[#1B70CA]">
          Marcar como concluido
        </button>
      </div>
    </div>
  );
}

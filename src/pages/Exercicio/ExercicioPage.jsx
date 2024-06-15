import { InfoCard } from "@components/HorizontalCard/horizontalCard";
import { Check, X } from "@phosphor-icons/react";
import { SideBar } from "@components/SideBar/sideBar";
import { Link, useParams } from "react-router-dom";
import Button from "@components/Button/button";
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player'


export function ExercicioPage() {
  const [exercicio, setExercicio] = useState({});
  const { idTreino, idExercicio } = useParams();

  function getExercicio() {
    //blablabla req

    const exercicioResponse = {
      id: idExercicio,
      fkTreino: idTreino,
      nome: "Cruxificio",
      sourceUrl: "https://www.youtube.com/watch?v=lGnd8shUQXM",
      descricao:
        "O crucifixo com halteres é um exercício de isolamento que visa especificamente os músculos peitorais. Ao contrário dos movimentos compostos, como o supino, que envolvem múltiplos grupos musculares e articulações, o crucifixo se concentra em um único grupo muscular, proporcionando uma estimulação mais direta e intensa dos peitorais. O crucifixo com halteres é um exercício de isolamento que visa especificamente os músculos peitorais. Ao contrário dos movimentos compostos, como o supino, que envolvem múltiplos grupos musculares e articulações, o crucifixo se concentra em um único grupo muscular, proporcionando uma estimulação mais direta e intensa dos peitorais. O crucifixo com halteres é um exercício de isolamento que visa especificamente os músculos peitorais. Ao contrário dos movimentos compostos, como o supino, que envolvem múltiplos grupos musculares e articulações, o crucifixo se concentra em um único grupo muscular, proporcionando uma estimulação mais direta e intensa dos peitorais.",
      concluido: false,
      tempoExecucao: "2 minutos e 10 segundos",
      repeticoes: 15,
      series: 5,
      tags: ["Peito", "Ante-braço", "Peito"],
    };

    setExercicio(exercicioResponse);
  }

  function handleClick() {
    setExercicio((prevExercicio) => ({
      ...prevExercicio,
      concluido: !prevExercicio.concluido,
    }));
  }

  useEffect(() => {
    getExercicio();
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
      <SideBar />

      <div className="w-[90vw] h-full flex flex-col overflow-hidden">
        <div className="flex flex-col gap-3 p-5">
          <span className="text-[#2B6E36] font-semibold text-2xl">
            {exercicio.nome}
          </span>
          <div className="flex gap-1">
            <Link to={"/rotinas"} className="text-primary-green400 font-bold">
              Rotinas
            </Link>
            <span className="text-primary-green400 font-extrabold">></span>
            <Link
              to={`/rotinas/treino/${exercicio.fkTreino}`}
              className="text-primary-green400 font-bold"
            >
              Treino {exercicio.fkTreino}
            </Link>
            <span className="text-primary-green400 font-extrabold">></span>
            <span className="text-primary-green400 font-bold">
              {exercicio.nome}
            </span>
          </div>
        </div>

        <div className="flex w-full h-3/5 max-h-3/5 py-5 gap-10 p-5">
          <div className="w-3/5 p-5 bg-white shadow-sombra-padrao rounded-xl">
            <ReactPlayer
              url={exercicio.sourceUrl}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>

          <div className="w-2/5 h-full flex flex-col  rounded-xl gap-5 justify-between items-center">
            <div className="h-5/6  flex flex-col gap-5">
              <span className="text-2xl font-semibold">Descrição</span>

              <div className="h-full overflow-auto">
                <span className="text-lg text-justify ">
                  {exercicio.descricao}
                </span>
              </div>
            </div>

            {!exercicio.concluido ? (
              <Button
                content={"Marcar como concluído"}
                variant={"accept"}
                icon={<Check size={25} color={"#ffffff"} />}
                onClick={() => {
                  handleClick(exercicio.id);
                }}
              />
            ) : (
              <Button
                content={"Desmarcar como concluído"}
                variant={"decline"}
                icon={<X size={25} color={"#ffffff"} />}
                onClick={() => {
                  handleClick(exercicio.id);
                }}
              />
            )}
          </div>
        </div>

        <div className="flex w-full h-2/5 max-h-2/5 py-5 gap-10 p-5">
          <div className="w-3/5 flex flex-col gap-2 bg-gray500 rounded-xl p-5">
            <span className="text-white text-xl font-semibold">
              Informações de execução
            </span>

            <div className="flex gap-5 h-full">
              <InfoCard
                infoMessage={"Tempo de execução de repetições"}
                titulo={"Tempo de execução"}
                content={exercicio.tempoExecucao}
              />

              <InfoCard
                infoMessage={"Total de repetições por série"}
                titulo={"Número de repetições"}
                content={`${exercicio.repeticoes} Repetições`}
              />

              <InfoCard
                infoMessage={"Total de execução de séries"}
                titulo={"Número de séries"}
                content={`${exercicio.series} Séries de repetições`}
              />
            </div>
          </div>
          <div className="w-2/5 h-full flex flex-wrap rounded-xl p-5 gap-5">
            {exercicio.tags &&
              exercicio.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

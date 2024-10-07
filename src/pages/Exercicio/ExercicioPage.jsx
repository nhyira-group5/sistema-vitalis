import { InfoCard } from "@components/HorizontalCard/horizontalCard";
import { Check, X, ImageBroken } from "@phosphor-icons/react";
import { SideBar } from "@components/SideBar/sideBar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@components/Button/button";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../user-context";
import ReactPlayer from "react-player";
import { Tag } from "../../components/Tag/tag";
import { api } from "../../api";
import { validateLogin, validateUsuario } from "@utils/globalFunc";

export function ExercicioPage() {
  const [treino, setTreino] = useState(null);
  const { user } = useContext(UserContext);
  const { idTreino } = useParams();
  const [videoTreino, setVideoTreino] = useState(null);

  const navigate = useNavigate();

  function desconcluirTreino() {
    const concluido = 0;

    try {
      api
        .patch(`/treinos/concluir/${idTreino}`, null, {
          params: {
            concluido: concluido,
          },
        })
        .then((response) => {
          setTreino(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function concluirTreino() {
    const concluido = 1;

    try {
      api
        .patch(`/treinos/concluir/${idTreino}`, null, {
          params: {
            concluido: concluido,
          },
        })
        .then((response) => {
          setTreino(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchCore = async () => {
      try {
        const response = await api.get(`/treinos/buscarIdTreinos/${idTreino}`);
        console.log("treino", response.data);
        setTreino(response.data);
        findVideoTreino(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCore();
  }, []);

  const findVideoTreino = (treino) => {
    console.log(treino);
    if (
      !treino.exercicioId.idMidia ||
      !Array.isArray(treino.exercicioId.idMidia)
    ) {
      console.error("Propriedade idMidia não encontrada ou não é um array");
      return;
    }

    const video = treino.exercicioId.idMidia.find(
      (midia) => midia.tipo === "Video"
    );

    console.log(video);

    if (!video) {
      console.warn("Nenhum vídeo encontrado para este treino");
      return;
    }

    const videoPath = video.caminho;

    setVideoTreino(videoPath);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
      <SideBar />

      <div className="w-[90vw] h-full flex flex-col overflow-hidden">
        <div className="flex flex-col gap-3 p-5">
          <span className="text-[#2B6E36] font-semibold text-2xl">
            {treino ? treino.exercicioId.nome : "..."}
          </span>
          <div className="flex gap-1">
            <Link
              to={"/rotinas_semanais"}
              className="text-primary-green400 font-bold hover:text-primary-green300"
            >
              Rotinas
            </Link>
            <span className="text-primary-green400 font-extrabold">•</span>
            {treino ? (
              <Link
                to={`/rotinas_semanais/diaria/${treino.rotinaDiariaId.idRotinaDiaria}`}
                className="text-primary-green400 font-bold hover:text-primary-green300"
              >
                Treino {treino.idTreino}
              </Link>
            ) : (
              "..."
            )}

            <span className="text-primary-green400 font-extrabold">•</span>
            <span className="text-primary-green400 font-bold">
              {treino ? treino.exercicioId.nome : "..."}
            </span>
          </div>
        </div>

        <div className="flex w-full h-3/5 max-h-3/5 py-5 gap-10 p-5">
          <div className="w-3/5 p-5 bg-white shadow-sombra-padrao rounded-xl">
            {/* <ReactPlayer
              url={'https://youtu.be/GOj4TMPVuZg?si=oOY0c63n1bEW2v6M'}
              controls={true}
              width="100%"
              height="100%"
            /> */}
            {treino && videoTreino ? (
              <ReactPlayer
                url={videoTreino}
                controls={true}
                width="100%"
                height="100%"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageBroken size={32} color="black" />
              </div>
            )}
          </div>

          <div className="w-2/5 h-full flex flex-col  rounded-xl gap-5 justify-between items-center">
            <div className="h-5/6  flex flex-col gap-5">
              <span className="text-2xl font-semibold">Descrição</span>

              <div className="h-full overflow-auto">
                <span className="text-lg text-justify ">
                  {treino ? treino.exercicioId.descricao : "..."}
                </span>
              </div>
            </div>
            {treino ? (
              treino.concluido == 0 ? (
                <Button
                  content={"Marcar como concluído"}
                  variant={"accept"}
                  icon={<Check size={25} color={"#ffffff"} />}
                  onClick={() => {
                    concluirTreino();
                  }}
                />
              ) : (
                <Button
                  content={"Desmarcar como concluído"}
                  variant={"decline"}
                  icon={<X size={25} color={"#ffffff"} />}
                  onClick={() => {
                    desconcluirTreino();
                  }}
                />
              )
            ) : (
              "..."
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
                content={treino ? treino.tempo : "..."}
              />

              <InfoCard
                infoMessage={"Total de repetições por série"}
                titulo={"Número de repetições"}
                content={`${treino ? treino.repeticao : "..."} Repetições`}
              />

              <InfoCard
                infoMessage={"Total de execução de séries"}
                titulo={"Número de séries"}
                content={`${
                  treino ? treino.serie : "..."
                } Séries de repetições`}
              />
            </div>
          </div>

          <div className="w-2/5 h-full flex flex-col  rounded-xl gap-5 justify-between">
            <div className="h-5/6  flex flex-col gap-5">
              <span className="text-2xl font-semibold">Grupos musculares</span>
              <div className="w-2/5 h-full flex flex-wrap rounded-xl gap-5">
                {treino
                  ? treino.exercicioId.tagExercicioDtos &&
                    treino.exercicioId.tagExercicioDtos.map((tag, index) => (
                      <Tag key={index} text={tag.tagId.nome} />
                    ))
                  : "..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

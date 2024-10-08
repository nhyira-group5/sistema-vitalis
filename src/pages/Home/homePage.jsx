import { ExercicioBoard } from "../../components/ExercicioBoard/exercicioBoard";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { api } from "../../api";
import { Template } from "../template";
import { Reminder } from "../../components/Reminder/reminder";

import { UserContext } from "../../user-context";
import { useNavigate } from "react-router-dom";

import { Activities } from "./activities";
import { toast } from "react-toastify";

export function HomePage() {
  const [nicknameUser, setNicknameUser] = useState("");

  const [activityId, setActivityId] = useState("");
  const [activityIdPatch, setActivityIdPatch] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityMedia, setActivityMedia] = useState("");
  const [activitySeries, setActivitySeries] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityRepetitions, setActivityRepetitions] = useState("");
  const [activityInformation, setActivityInformation] = useState({});
  const [activityCompleteded, setActivityCompleteded] = useState(0);
  const [activitySelected, setActivitySelected] = useState(false);

  const [listFood, setListFood] = useState(null);
  const [listFoodName, setListFoodName] = useState(null);

  const [currentyAmountMeals, setCurrentyAmountMeals] = useState(0);
  const [currentyAmountExercises, setCurrentyAmountExercises] = useState(0);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user !== null) {
      setNicknameUser(user.userData.nome);
    }
  }, [user]);

  useEffect(() => {
    if (
      activityInformation.type === "Refeição" &&
      activityId !== "" &&
      activityId !== null
    ) {
      api
        .get(`/refeicoes/${activityId}`)
        .then((response) => {
          setListFood(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [activityInformation]);

  useEffect(() => {
    if (listFood !== null && listFood !== undefined) {
      let vetorAux = [];
      for (let i = 0; i < listFood.alimentoPorRefeicao.length; i++) {
        const element = listFood.alimentoPorRefeicao[i];
        vetorAux.push(element.alimento.nome);
      }
      setListFoodName(vetorAux);
    }
  }, [listFood]);

  function handleSelectActivity(e) {
    console.log(e)
    setActivityType(e.type);
    setActivityName(e.nome);

    const id = e.type === "Refeição" ? e.idRefeicao : e.idExercicio;
    const idPatch = e.type === "Refeição" ? e.idRefeicaoDiaria : e.idTreino;
    const description = e.type === "Refeição" ? e.preparo : e.descricao;

    setActivityId(id);
    setActivityIdPatch(idPatch)
    setActivityDescription(description);
    if (e.midia !== null) {
      setActivityMedia(e.midia[0].caminho);
    }
    setActivityDuration(e.tempo);
    setActivityRepetitions(e.repeticao);
    setActivitySeries(e.serie);
    setActivityInformation(e);
    setActivityCompleteded(e.concluido);

    setActivitySelected(true);
  }

  

  function completedActivity() {
    console.log(activityInformation);
    if (activityCompleteded === 0) {
      if (activityType === "Refeição") {
        setCurrentyAmountMeals(currentyAmountMeals + 1);
        setarParaConcluidoRefeicao();
      } else {
        setCurrentyAmountExercises(currentyAmountExercises + 1);
        setarParaConcluidoTreino();
      }
      setActivityCompleteded(1);
    } else {
      toast.error("Atividade já concluída!"); 
    }
  }

  function setarParaConcluidoTreino() {
    console.log(activityId);
    api
      .patch(`/treinos/concluir/${activityIdPatch}?concluido=1`)
      .then((response) => {
        console.log(response.data);
      });
  }

  function setarParaConcluidoRefeicao() {
    console.log(activityId);
    api
      .patch(`/refeicaoDiarias/concluir/${activityIdPatch}?concluido=1`)
      .then((response) => {
        console.log(response.data);
      });
  }

  // useEffect(() => {
  //   const validarLoginEUsuario = async () => {

  //     await validateLogin(navigate, user);
  //     await validateUsuario(navigate, user);
  //   };

  //   validarLoginEUsuario();
  // }, []);

  return (
    <Template name="Home">
      <div className="w-full h-[93%] flex justify-between items-center">
        <div className="w-[34%] h-full flex flex-col justify-between">
          <div className="w-full h-[5%] font-semibold text-xl flex justify-center items-center rounded-xl">
            <h1>Bem-vindo(a), {nicknameUser}</h1>
          </div>

          <Activities onClickFunction={handleSelectActivity} activityInformation={activityInformation} activityCompleteded={activityCompleteded}/>

          <div className="w-full h-[16%] bg-white text-sm shadow-lg flex justify-between items-center rounded-xl p-4">
            <h1 className="w-[60%] text-wrap ">
              Observe o seu resultado do seu esforço com o seu
              <span className="font-bold"> mural de fotos!</span>
            </h1>
            <Link
              to="/mural"
              className="px-9 py-2 rounded-2xl shadow-lg text-white bg-[#48B75A]"
            >
              Ver mural!
            </Link>
          </div>
        </div>
        <div className="w-[40%] h-full bg-white flex flex-col justify-center items-center rounded-xl shadow-lg p-4">
          {!activitySelected ? (
            <span className="h-full w-full flex justify-center items-center font-medium text-xl">
              Escolha uma atividade
            </span>
          ) : (
            <ExercicioBoard
              activitySelected
              id={activityId}
              type={activityType}
              name={activityName}
              description={activityDescription}
              media={activityMedia}
              duration={activityDuration}
              repetitions={activityRepetitions}
              series={activitySeries}
              listFoodName={listFoodName}
              concluido={activityCompleteded}
              onClickFunction={() => completedActivity()}
            />
          )}
        </div>
        <Reminder />
      </div>
    </Template>
  );
}

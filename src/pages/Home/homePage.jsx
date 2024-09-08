import { AtividadeOption } from "../../components/AtividadeOption/atividadeOption";
import { ExercicioBoard } from "../../components/ExercicioBoard/exercicioBoard";
import { AtividadeCard } from "../../components/AtividadeCard/atividadeCard";
import { useState, useEffect } from "react";
import { BowlSteam, Barbell, CalendarCheck } from "@phosphor-icons/react";
import { Link } from "react-router-dom";


import { getLoginResponse } from "@utils/globalFunc";
import { api } from "../../api";
import { Template } from "../template";
import { Reminder } from "../../components/Reminder/reminder";
import { Activities } from "./activities";

export function HomePage() {
  const [nicknameUser, setNicknameUser] = useState("");

  const [activityId, setActivityId] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activitiesDay, setActivitiesDay] = useState([]);
  const [activityMedia, setActivityMedia] = useState("");
  const [activitySeries, setActivitySeries] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activitySelected, setActivitySelected] = useState(false);
  const [activityDescription, setActivityDescription] = useState("");
  const [activityRepetitions, setActivityRepetitions] = useState("");
  const [activityInformation, setActivityInformation] = useState({});
  const [activityCompleteded, setActivityCompleteded] = useState("");

  const [activitiesWeek, setActivitiesWeek] = useState(null);

  const [listFood, setListFood] = useState(null);
  const [listFoodName, setListFoodName] = useState(null);

  const [totalAmountDays, setTotalAmountDays] = useState(0);
  const [totalAmountMeals, setTotalAmountMeals] = useState(0);
  const [totalAmountExercises, setTotalAmountExercises] = useState(0);

  const [currentyAmountDays, setCurrentyAmountDays] = useState(0);
  const [currentyAmountMeals, setCurrentyAmountMeals] = useState(0);
  const [currentyAmountExercises, setCurrentyAmountExercises] = useState(0);

  useEffect(() => {
    api
      .get(`/refeicoes/por-semana/1`)
      .then((response) => {
        const listaRefeicoesDaSemana = response.data;

        const agrupadosPelaRefeicaoDiaria = listaRefeicoesDaSemana.reduce(
          (acc, curr) => {
            if (!acc[curr.rotinaDiaria.id]) {
              acc[curr.rotinaDiaria.id] = [];
            }
            acc[curr.rotinaDiaria.id].push({
              ...curr,
              type: "Refeição",
            });
            return acc;
          },
        );

        console.log(`LISTA REFEIÇÕES:`);
        console.log(agrupadosPelaRefeicaoDiaria);
        setActivitiesWeek(agrupadosPelaRefeicaoDiaria);

        api
          .get(`/treinos/por-semana/1`)
          .then((response) => {
            const listaExerciciosDaSemana = response.data;

            const agrupadosPorExercicioDiario = listaExerciciosDaSemana.reduce(
              (acc, curr) => {
                if (!acc[curr.rotinaDiaria.id]) {
                  acc[curr.rotinaDiaria.id] = [];
                }
                acc[curr.rotinaDiaria.id].push({
                  ...curr,
                  type: "Exercício",
                });
                return acc;
              },
              {}
            );

            // setActivitiesWeek(agrupadosPorRotinaDiaria);
            console.log(`LISTA EXERCICIO:`);
            console.log(agrupadosPorExercicioDiario);

            // console.log(
            //   agrupadosPelaRefeicaoDiaria[1].concat(
            //     agrupadosPorExercicioDiario[1]
            //   )
            // );

            //SOSCORO
            let vetorAux = [];
            for (let i = 1; i <= 3; i++) {
              console.log("JUNTANDO O DIA: " + i);

              const aux = agrupadosPelaRefeicaoDiaria[i].concat(
                agrupadosPorExercicioDiario[i]
              );
              console.log(aux);
              vetorAux.push(aux);
            }
            console.log("O VETOR AUXILIAR FICOU ASSIM:");
            console.log(vetorAux);
            setActivitiesWeek((prev) => ({
              ...prev,
              1: vetorAux[0],
            }));
            setActivitiesWeek((prev) => ({
              ...prev,
              2: vetorAux[1],
            }));
            setActivitiesWeek((prev) => ({
              ...prev,
              3: vetorAux[2],
            }));
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const loginResponse = getLoginResponse();

    api.get(`/usuarios/${loginResponse.id}`).then((response) => {
      const loginResponse = getLoginResponse();
      setNicknameUser(loginResponse.nome);
    });
  }, []);

  useEffect(() => {
    generateActivitiesDay();
  }, [activitiesWeek]);

  useEffect(() => {
    if (activitiesWeek !== null) {
      generateCurrentyAmountExercises();
      generateCurrentyAmountMeals();
      generateCurrentyAmountDays();

      generateTotalAmountExercises();
      generateTotalAmountMeals();
      generateTotalAmountDays();
    }
  }, [activitiesDay]);

  useEffect(() => {
    if (
      activityInformation.type === "Refeição" &&
      activityId !== "" &&
      activityId !== null
    ) {
      console.log(activityId);

      api
        .get(`/refeicoes/${activityId}`)
        .then((response) => {
          console.log(response.data);
          setListFood(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [activityInformation]);

  // useEffect(
  //   () => {
  //     console.log("AQUELE LA ")
  //     generateCurrentyAmountExercises();
  //     generateCurrentyAmountMeals();
  //     generateCurrentyAmountDays();

  //     generateActivitiesDay();
  //   },
  //   [activitySelected],
  //   [activityInformation]
  // );

  function handleSelectActivity(e) {
    console.log(e);
    setActivityType(e.type);
    setActivityName(e.nome);

    if (e.type === "Refeição") {
      setActivityId(e.idRefeicao);
      setActivityDescription(e.preparo);
    } else {
      setActivityId(e.idExercicio);
      setActivityDescription(e.descricao);
    }
    setActivityMedia(e.midia.caminho);
    setActivityDuration(e.tempo);
    setActivityRepetitions(e.repeticao);
    setActivitySeries(e.serie);
    setActivityInformation(e);
    setActivityCompleteded(e.concluido);

    setActivitySelected(true);
  }

  useEffect(() => {
    if (listFood !== null && listFood !== undefined) {
      let vetorAux = [];
      for (let i = 0; i < listFood.alimentoPorRefeicao.length; i++) {
        const element = listFood.alimentoPorRefeicao[i];
        console.log(element.alimento.nome);
        vetorAux.push(element.alimento.nome);
      }
      console.log(vetorAux);
      setListFoodName(vetorAux);
    }
  }, [listFood]);

  useEffect(() => {
    if (activitiesDay != null) {
      console.log("gerando");
      generateActivitiesDay();
    }
  }, [activityInformation, completedActivity]);

  // useEffect(() => {
  //   const url = `/treinos/concluir/${activityId}`
  //   axios.patch(url)
  //   .then((response) => {
  //     response.data
  //   })
  // })

  // QUANTIDADES TOTAIS DE EXERCÍCIOS, REFEIÇÕES E DIAS SEMANAIS

  function handleTotalAmount(activity) {
    const response = activitiesDay.filter((element) => {
      // console.log(element.type);
      return element.type == activity;
    });
    // console.log("Lista de " + activity + ": " + response);
    return response;
  }

  function generateTotalAmountExercises() {
    const totalAmountExercises = handleTotalAmount("Exercício").length;
    // console.log("Total de exercícios: " + totalAmountExercises);
    setTotalAmountExercises(totalAmountExercises);
  }

  function generateTotalAmountMeals() {
    const amountMealsTotal = handleTotalAmount("Refeição").length;
    // console.log("Total de refeições: " + amountMealsTotal);
    setTotalAmountMeals(amountMealsTotal);
  }

  function generateTotalAmountDays() {
    const totalDays = Object.keys(activitiesWeek).length;
    setTotalAmountDays(totalDays);
  }

  // QUANTIDADES ATUAIS DE EXERCÍCIO, REFEIÇÕES E DIAS SEMANAIS

  function handleCurrentyAmount(activity) {
    const array = handleTotalAmount(activity);
    const response = array.filter((element) => element.concluido == true);
    // console.log("Lista de " + activity + " concluídos: " + response);
    return response;
  }

  function generateCurrentyAmountExercises() {
    const currentyAmountExercises = handleCurrentyAmount("Exercício").length;
    // console.log("Exercícios concluídos: " + currentyAmountExercises);
    setCurrentyAmountExercises(currentyAmountExercises);
  }

  function generateCurrentyAmountMeals() {
    const currentyAmountMeals = handleCurrentyAmount("Refeição").length;
    // console.log("Refeições concluídas: " + currentyAmountMeals);
    setCurrentyAmountMeals(currentyAmountMeals);
  }

  function generateCurrentyAmountDays() {
    console.log(activitiesWeek[1]);

    let qtdConcluido = 0;
    for (let i = 0; i <= activitiesWeek[1].length; i++) {
      const element = activitiesWeek[1];
      if (element[i] !== undefined && element[i] !== null) {
        if (element[i].concluido == 1) {
          qtdConcluido++;
        }
      }
      // const currentyDays = element.filter(
      //   (element) => element.concluido == true
      // ).length;

      // if (currentyDays === Object.keys(activitiesWeek).length) {
      //   setCurrentyAmountDays((prev) => prev);
      // }
    }

    console.log(qtdConcluido);
    console.log(activitiesWeek[1].length);
    if (qtdConcluido === activitiesWeek[1].length) {
      setCurrentyAmountDays(1);
    }
  }

  // GERAR ATIVIDADES DO DIA
  function generateActivitiesDay() {
    console.log("ACTIVITY WEEKS FICOU ASSIM");

    console.log(activitiesWeek);
    if (activitiesWeek !== null && activitiesWeek !== undefined) {
      for (let i = 1; i <= Object.keys(activitiesWeek).length; i++) {
        const element = activitiesWeek[i];
        console.log(element);

        setActivitiesDay(element);
        return;
      }
    }

    console.log("Não há itens com concluido == false.");
  }

  // MARCAR ATIVIDADE COMO CONCLUÍDA
  function completedActivity() {
    console.log(activityInformation);
    if (activityCompleteded == 0) {
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
      .patch(`/treinos/concluir/${activityId}?concluido=1`)
      .then((response) => {
        console.log(response.data);
      });
  }

  function setarParaConcluidoRefeicao() {
    console.log(activityId);
    api
      .patch(`/refeicaoDiarias/concluir/${activityId}?concluido=1`)
      .then((response) => {
        console.log(response.data);
      });
  }

  return (
    <Template name="Home">
        <div className="w-full h-[93%] flex justify-between items-center">
          <div className="w-[34%] h-full flex flex-col justify-between">
            <div className="w-full h-[5%] font-semibold text-xl flex justify-center items-center rounded-xl">
              <h1>Bem-vindo(a), {nicknameUser}</h1>
            </div>

            {/* <div className="w-full h-[72%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
              <h2 className="w-full font-semibold">Atividades de hoje</h2>
              <div className="w-full h-[31%] bg-black flex justify-between items-center rounded-3xl p-4">
                <AtividadeCard
                  icon={<BowlSteam size={28} />}
                  title="Refeições"
                  currentAmount={currentyAmountMeals}
                  totalAmount={totalAmountMeals}
                />
                <AtividadeCard
                  icon={<Barbell size={28} />}
                  title="Exercícios"
                  currentAmount={currentyAmountExercises}
                  totalAmount={totalAmountExercises}
                />
                <AtividadeCard
                  icon={<CalendarCheck size={28} />}
                  title="Meta semanal"
                  currentAmount={currentyAmountDays}
                  totalAmount={totalAmountDays}
                />
              </div>

              <div className="w-full p-2 flex flex-col  overflow-auto scrollbar-thin gap-5">
                {activitiesDay.length == 0 ? (
                  <span>Ainda sem atividades</span>
                ) : (
                  activitiesDay.map((objeto, index) => {
                    return (
                      <AtividadeOption
                        key={index}
                        activity={objeto.type}
                        nameActivity={objeto.nome}
                        onClickFunction={() => handleSelectActivity(objeto)}
                        done={objeto.concluido}
                        option
                      />
                    );
                  })
                )}
              </div>
            </div> */}
            <Activities />


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

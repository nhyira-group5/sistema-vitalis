import { Barbell, BowlSteam, CalendarCheck } from "@phosphor-icons/react";
import { AtividadeCard } from "../../components/AtividadeCard/atividadeCard";
import { useEffect, useState } from "react";
import { getLoginResponse } from "@utils/globalFunc";
import { api } from "../../api";
import { AtividadeOption } from "../../components/AtividadeOption/atividadeOption";

export function Activities({ onClickFunction }) {
  const [activityId, setActivityId] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activitiesDay, setActivitiesDay] = useState([]);
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
    fetchAtividadesPorSemana();

    // const loginResponse = getLoginResponse();
  }, []);

  useEffect (() => {
    // arrumar a lógica para pegar cada dia
    // setActivitiesDay(activitiesWeek[1]);
    if (activitiesWeek !== null ) {
      setActivitiesDay(activitiesWeek[1])
    }
  }, [activitiesWeek])

  const fetchAtividadesPorSemana = async () => {
    try {
      // O PARAMETRO É O ID DA ROTINA SEMANAL
      const responseRefeicao = await api.get(`/refeicoes/por-semana/1`);
      const listaRefeicoesDaSemana = agruparPorDia(
        responseRefeicao.data,
        "Refeição"
      );
      
      const responseExercicio = await api.get(`/treinos/por-semana/1`);
      const listaTreinosDaSemana = agruparPorDia(
        responseExercicio.data,
        "Exercício"
      );
      
      const rotinasMescladas = mesclarRotinas(listaRefeicoesDaSemana, listaTreinosDaSemana);
      setActivitiesWeek(rotinasMescladas);
    } catch (e) {
      console.error("Error in GET request:", e);
    }
  };

  function agruparPorDia(lista, tipo) {
    return lista.reduce((acc, curr) => {
      const { dia } = curr.rotinaDiaria;

      if (!acc[dia]) {
        acc[dia] = [];
      }

      acc[dia].push({
        ...curr,
        type: tipo,
      });

      return acc;
    }, {});
  }

  function mesclarRotinas(refeicoes, exercicios) {
    const merged = {};

    for (const dia in refeicoes) {
        if (!merged[dia]) {
            merged[dia] = [];
        }
        merged[dia].push(...refeicoes[dia]);
    }

    for (const dia in exercicios) {
        if (!merged[dia]) {
            merged[dia] = [];
        }
        merged[dia].push(...exercicios[dia]);
    }

    return merged;
}
  // useEffect(() => {
  //   const loginResponse = getLoginResponse();

  //   api.get(`/usuarios/${loginResponse.id}`).then((response) => {
  //     const loginResponse = getLoginResponse();
  //     setNicknameUser(loginResponse.nome);
  //   });
  // }, []);

  // useEffect(() => {
  //   generateActivitiesDay();
  // }, [activitiesWeek]);

  // useEffect(() => {
  //   if (activitiesWeek !== null) {
  //     generateCurrentyAmountExercises();
  //     generateCurrentyAmountMeals();
  //     generateCurrentyAmountDays();

  //     generateTotalAmountExercises();
  //     generateTotalAmountMeals();
  //     generateTotalAmountDays();
  //   }
  // }, [activitiesDay]);

  // useEffect(() => {
  //   if (
  //     activityInformation.type === "Refeição" &&
  //     activityId !== "" &&
  //     activityId !== null
  //   ) {
  //     console.log(activityId);

  //     api
  //       .get(`/refeicoes/${activityId}`)
  //       .then((response) => {
  //         console.log(response.data);
  //         setListFood(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [activityInformation]);

  // // useEffect(
  // //   () => {
  // //     console.log("AQUELE LA ")
  // //     generateCurrentyAmountExercises();
  // //     generateCurrentyAmountMeals();
  // //     generateCurrentyAmountDays();

  // //     generateActivitiesDay();
  // //   },
  // //   [activitySelected],
  // //   [activityInformation]
  // // );

  // useEffect(() => {
  //   if (listFood !== null && listFood !== undefined) {
  //     let vetorAux = [];
  //     for (let i = 0; i < listFood.alimentoPorRefeicao.length; i++) {
  //       const element = listFood.alimentoPorRefeicao[i];
  //       console.log(element.alimento.nome);
  //       vetorAux.push(element.alimento.nome);
  //     }
  //     console.log(vetorAux);
  //     setListFoodName(vetorAux);
  //   }
  // }, [listFood]);

  // useEffect(() => {
  //   if (activitiesDay != null) {
  //     console.log("gerando");
  //     generateActivitiesDay();
  //   }
  // }, [activityInformation, completedActivity]);

  // // useEffect(() => {
  // //   const url = `/treinos/concluir/${activityId}`
  // //   axios.patch(url)
  // //   .then((response) => {
  // //     response.data
  // //   })
  // // })

  // // QUANTIDADES TOTAIS DE EXERCÍCIOS, REFEIÇÕES E DIAS SEMANAIS

  // function handleTotalAmount(activity) {
  //   const response = activitiesDay.filter((element) => {
  //     // console.log(element.type);
  //     return element.type == activity;
  //   });
  //   // console.log("Lista de " + activity + ": " + response);
  //   return response;
  // }

  // function generateTotalAmountExercises() {
  //   const totalAmountExercises = handleTotalAmount("Exercício").length;
  //   // console.log("Total de exercícios: " + totalAmountExercises);
  //   setTotalAmountExercises(totalAmountExercises);
  // }

  // function generateTotalAmountMeals() {
  //   const amountMealsTotal = handleTotalAmount("Refeição").length;
  //   // console.log("Total de refeições: " + amountMealsTotal);
  //   setTotalAmountMeals(amountMealsTotal);
  // }

  // function generateTotalAmountDays() {
  //   const totalDays = Object.keys(activitiesWeek).length;
  //   setTotalAmountDays(totalDays);
  // }

  // // QUANTIDADES ATUAIS DE EXERCÍCIO, REFEIÇÕES E DIAS SEMANAIS

  // function handleCurrentyAmount(activity) {
  //   const array = handleTotalAmount(activity);
  //   const response = array.filter((element) => element.concluido == true);
  //   // console.log("Lista de " + activity + " concluídos: " + response);
  //   return response;
  // }

  // function generateCurrentyAmountExercises() {
  //   const currentyAmountExercises = handleCurrentyAmount("Exercício").length;
  //   // console.log("Exercícios concluídos: " + currentyAmountExercises);
  //   setCurrentyAmountExercises(currentyAmountExercises);
  // }

  // function generateCurrentyAmountMeals() {
  //   const currentyAmountMeals = handleCurrentyAmount("Refeição").length;
  //   // console.log("Refeições concluídas: " + currentyAmountMeals);
  //   setCurrentyAmountMeals(currentyAmountMeals);
  // }

  // function generateCurrentyAmountDays() {
  //   console.log(activitiesWeek[1]);

  //   let qtdConcluido = 0;
  //   for (let i = 0; i <= activitiesWeek[1].length; i++) {
  //     const element = activitiesWeek[1];
  //     if (element[i] !== undefined && element[i] !== null) {
  //       if (element[i].concluido == 1) {
  //         qtdConcluido++;
  //       }
  //     }
  //     // const currentyDays = element.filter(
  //     //   (element) => element.concluido == true
  //     // ).length;

  //     // if (currentyDays === Object.keys(activitiesWeek).length) {
  //     //   setCurrentyAmountDays((prev) => prev);
  //     // }
  //   }

  //   console.log(qtdConcluido);
  //   console.log(activitiesWeek[1].length);
  //   if (qtdConcluido === activitiesWeek[1].length) {
  //     setCurrentyAmountDays(1);
  //   }
  // }

  // // GERAR ATIVIDADES DO DIA
  // function generateActivitiesDay() {
  //   if (activitiesWeek !== null && activitiesWeek !== undefined) {
  //     for (let i = 1; i <= Object.keys(activitiesWeek).length; i++) {
  //       const element = activitiesWeek[i];
  //       console.log(element);

  //       setActivitiesDay(element);
  //       return;
  //       if (activitiesWeek[i] !== null && activitiesWeek[i] !== undefined) {
  //         // console.log(element.length);

  //         let quantidadeExerciciosConcluidos = 0;
  //         for (let j = 0; j < element.length; j++) {
  //           const elemento = activitiesWeek[i][j];
  //           console.log(elemento);

  //           if (elemento.concluido === 1) {
  //             quantidadeExerciciosConcluidos++;
  //           }
  //         }

  //         // if (quantidadeExerciciosConcluidos !== element.length) {
  //         //   return setActivitiesDay(element);
  //         // }
  //       }
  //     }
  //   }

  //   console.log("Não há itens com concluido == false.");
  // }

  // // MARCAR ATIVIDADE COMO CONCLUÍDA
  // function completedActivity() {
  //   console.log(activityInformation);
  //   if (activityCompleteded == 0) {
  //     if (activityType === "Refeição") {
  //       setCurrentyAmountMeals(currentyAmountMeals + 1);
  //       setarParaConcluidoRefeicao();
  //     } else {
  //       setCurrentyAmountExercises(currentyAmountExercises + 1);
  //       setarParaConcluidoTreino();
  //     }
  //     setActivityCompleteded(1);
  //   } else {
  //     toast.error("Atividade já concluída!");
  //   }
  // }

  // function setarParaConcluidoTreino() {
  //   console.log(activityId);
  //   api
  //     .patch(`/treinos/concluir/${activityId}?concluido=1`)
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }

  // function setarParaConcluidoRefeicao() {
  //   console.log(activityId);
  //   api
  //     .patch(`/refeicaoDiarias/concluir/${activityId}?concluido=1`)
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }

  return (
    <div className="w-full h-[72%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
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
                onClickFunction={() => onClickFunction(objeto)}
                done={objeto.concluido}
                option
              />
            );
          })
        )}
      </div>
    </div>
  );
}

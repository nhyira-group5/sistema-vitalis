import { AtividadeOption } from "../../components/AtividadeOption/atividadeOption";
import { AtividadeCard } from "../../components/AtividadeCard/atividadeCard";
import { Barbell, BowlSteam, CalendarCheck } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { api } from "../../api";

export function Activities({
  onClickFunction,
  activityInformation,
  activityCompleteded,
}) {
  const [activitiesDay, setActivitiesDay] = useState([]);
  const [activitiesWeek, setActivitiesWeek] = useState(null);

  const [totalAmountDays, setTotalAmountDays] = useState(0);
  const [totalAmountMeals, setTotalAmountMeals] = useState(0);
  const [totalAmountExercises, setTotalAmountExercises] = useState(0);

  const [currentyAmountDays, setCurrentyAmountDays] = useState(0);
  const [currentyAmountMeals, setCurrentyAmountMeals] = useState(0);
  const [currentyAmountExercises, setCurrentyAmountExercises] = useState(0);

  useEffect(() => {
    fetchAtividadesPorSemana();
  }, [activityCompleteded]);

  useEffect(() => {
    // arrumar a lógica para pegar cada dia
    // setActivitiesDay(activitiesWeek[1]);
    if (activitiesWeek !== null) {
      setActivitiesDay(activitiesWeek[1]);
    }
  }, [activitiesWeek, activityInformation, activityCompleteded]);

  useEffect(() => {
    if (activitiesDay !== null) {
      generateCurrentyAmountExercises();
      generateCurrentyAmountMeals();
      generateCurrentyAmountDays();

      generateTotalAmountExercises();
      generateTotalAmountMeals();
      generateTotalAmountDays();
    }
  }, [activitiesDay]);

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

      const rotinasMescladas = mesclarRotinas(
        listaRefeicoesDaSemana,
        listaTreinosDaSemana
      );
      console.log(rotinasMescladas);
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

  function handleTotalAmount(activity) {
    const response = activitiesDay.filter((element) => {
      return element.type == activity;
    });
    return response;
  }

  function generateTotalAmountExercises() {
    const totalAmountExercises = handleTotalAmount("Exercício").length;
    setTotalAmountExercises(totalAmountExercises);
  }

  function generateTotalAmountMeals() {
    const totalAmountMeals = handleTotalAmount("Refeição").length;
    setTotalAmountMeals(totalAmountMeals);
  }

  function generateTotalAmountDays() {
    if (activitiesWeek !== null) {
      const totalDays = Object.keys(activitiesWeek).length;
      setTotalAmountDays(totalDays);
    }
  }

  function handleCurrentyAmount(activity) {
    const array = handleTotalAmount(activity);
    const response = array.filter((element) => element.concluido == true);
    return response;
  }

  function generateCurrentyAmountExercises() {
    const currentyAmountExercises = handleCurrentyAmount("Exercício").length;
    setCurrentyAmountExercises(currentyAmountExercises);
  }

  function generateCurrentyAmountMeals() {
    const currentyAmountMeals = handleCurrentyAmount("Refeição").length;
    setCurrentyAmountMeals(currentyAmountMeals);
  }

  function generateCurrentyAmountDays() {
    if (activitiesWeek !== null) {
      const diaCompleto = activitiesDay.every(
        (objeto) => objeto.concluido === 1
      );
      if (diaCompleto) setCurrentyAmountDays(1);
    }
  }

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

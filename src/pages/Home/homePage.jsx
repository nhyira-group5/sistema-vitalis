import { AtividadeOption } from "../../components/AtividadeOption/atividadeOption";
import { ExercicioBoard } from "../../components/ExercicioBoard/exercicioBoard";
import { AtividadeCard } from "../../components/AtividadeCard/atividadeCard";
import { Reminder } from "../../components/Reminder/reminder";
import { SideBar } from "../../components/SideBar/sideBar";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  BowlSteam,
  Barbell,
  CalendarCheck,
  CookingPot,
} from "@phosphor-icons/react";
import axios from "axios";
import { Link } from "react-router-dom";


export function HomePage() {
  const [nicknameUser, setNicknameUser] = useState("");

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

  const [activitiesWeek, setActivitiesWeek] = useState(null);
  const [allDataActivities, setAllDataActivities] = useState(false);

  const [totalAmountDays, setTotalAmountDays] = useState(0);
  const [totalAmountMeals, setTotalAmountMeals] = useState(0);
  const [totalAmountExercises, setTotalAmountExercises] = useState(0);

  const [currentyAmountDays, setCurrentyAmountDays] = useState(0);
  const [currentyAmountMeals, setCurrentyAmountMeals] = useState(0);
  const [currentyAmountExercises, setCurrentyAmountExercises] = useState(0);

  const [reminders, setReminders] = useState([]);
  const lastInputRef = useRef(null);

  useEffect(() => {
    const url = "http://localhost:8080/refeicoes/por-semana/1";
    axios
      .get(url)
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
          {}
        );

        console.log(`LISTA REFEIÇÕES:`);
        console.log(agrupadosPelaRefeicaoDiaria);
        setActivitiesWeek(agrupadosPelaRefeicaoDiaria);

        const url = "http://localhost:8080/treinos/por-semana/1";
        axios
          .get(url)
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

  // useEffect(() => {
  //   const url = "http://localhost:8080/treinos/por-semana/1";
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       const listaExerciciosDaSemana = response.data;

  //       const agrupadosPorRotinaDiaria = listaExerciciosDaSemana.reduce(
  //         (acc, curr) => {
  //           if (!acc[curr.rotinaDiaria.id]) {
  //             acc[curr.rotinaDiaria.id] = [];
  //           }
  //           acc[curr.rotinaDiaria.id].push({
  //             ...curr,
  //             type: "Exercício",
  //           });
  //           return acc;
  //         },
  //         {}
  //       );

  //       console.log(agrupadosPorRotinaDiaria);
  //       // setActivitiesWeek(agrupadosPorRotinaDiaria);

  //       let vetorSocorro = [];
  //       for (let i = 1; i <= 3; i++) {
  //         if (activitiesWeek !== null) {
  //           const element = activitiesWeek[i];

  //           if (element !== null) {
  //             console.log(activitiesWeek[i]);
  //             const aux = activitiesWeek[i].concat(agrupadosPorRotinaDiaria[i]);
  //             // setActivitiesWeek(activitiesWeek[i] = aux)
  //             vetorSocorro.push(aux);
  //             console.log(aux);

  //             console.log(vetorSocorro);
  //           }
  //         }
  //       }
  //       setActivitiesWeek((prev) => ({
  //         ...prev,
  //         1: vetorSocorro[0],
  //       }));
  //       setActivitiesWeek((prev) => ({
  //         ...prev,
  //         2: vetorSocorro[1],
  //       }));
  //       setActivitiesWeek((prev) => ({
  //         ...prev,
  //         3: vetorSocorro[2],
  //       }));
  //       setAllDataActivities(true);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [allData]);

  useEffect(() => {
    const url = "http://localhost:8080/usuarios/1";
    axios.get(url).then((response) => {
      setNicknameUser(response.data.nickname);
    });
  }, []);

  useEffect(() => {
    generateActivitiesDay();
  }, [activitiesWeek]);

  useEffect(() => {
    generateCurrentyAmountExercises();
    generateCurrentyAmountMeals();
    generateCurrentyAmountDays();

    generateTotalAmountExercises();
    generateTotalAmountMeals();
    generateTotalAmountDays();
  }, [activitiesDay]);

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
    setActivityType(e.type);
    setActivityName(e.nome);
    setActivityDescription(e.descricao);
    setActivityMedia(e.midia.caminho);
    setActivityDuration(e.tempo);
    setActivityRepetitions(e.repeticao);
    setActivitySeries(e.serie);
    setActivityInformation(e);


    setActivitySelected(true);
  }

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
    const totalDays = listaSemanal.length;
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
    const currentyDays = listaSemanal.filter(
      (element) => element.concluido == true
    ).length;
    setCurrentyAmountDays(currentyDays);
  }

  // GERAR ATIVIDADES DO DIA
  function generateActivitiesDay() {
    console.log("ACTIVITY WEEKS FICOU ASSIM");
    console.log(activitiesWeek);
    for (let i = 1; i <= 3; i++) {
      if (activitiesWeek !== null && activitiesWeek !== undefined) {
        const element = activitiesWeek[i];
        console.log(element);
        
        setActivitiesDay(element);
        return;
        if (activitiesWeek[i] !== null && activitiesWeek[i] !== undefined) {
          // console.log(element.length);

          let quantidadeExerciciosConcluidos = 0;
          for (let j = 0; j < element.length; j++) {
            const elemento = activitiesWeek[i][j];
            console.log(elemento);

            if (elemento.concluido === 1) {
              quantidadeExerciciosConcluidos++;
            }
          }

          // if (quantidadeExerciciosConcluidos !== element.length) {
          //   return setActivitiesDay(element);
          // }
        }
      }
    }

    console.log("Não há itens com concluido == false.");
  }

  // MARCAR ATIVIDADE COMO CONCLUÍDA
  function completedActivity() {
    console.log(activityInformation);
    if (!activityInformation.concluido) {
      setActivityInformation((activityInformation.concluido = true));
    } else {
      toast.error("Atividade já concluída!");
    }
  }

  // CRIAR LEMBRETE
  function createReminder() {
    setReminders([...reminders, <Reminder />]);
    if (lastInputRef.current) {
      lastInputRef.current.focus();
    }
  }

  const listaSemanal = [
    {
      dia: "ROTINA UM",
      concluido: true,
      atividades: [
        {
          type: "Exercício",
          name: "Crucifixo funciona 1",
          concluido: true,
          description:
            "Lorem ipsum dolor sit amet. Quo dolor eveniet ut enim dolores et voluptatem maxime ut consequatur consequatur et molestiae perferendis rem soluta temporibus sed dolore facere. Ut repudiandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eius ut aspernatur maxime ut omnis iste",
          midia:
            "https://i.pinimg.com/474x/ac/6e/6b/ac6e6bde1fcab62ca489a7279380b506.jpg",
        },
        {
          type: "Refeição",
          name: "Torta de frango 321",
          concluido: true,
          description:
            "Est iusto omnis ut impedit dolorem non assumenda delectus. Qui sint amet ad fuga fuga cum quia beatae quo error aliquam. Vel esse obcaecati est voluptate provident sed dolorem impedit eum maiores reprehenderit ut internos dignissimos. Sit fuga eaque nam natus consequatur qui facere sint eum molestiae quasi ut nisi sequi.",
          midia: "https://www.designi.com.br/images/preview/10138011.jpg",
        },
        {
          type: "Exercício",
          name: "Supino",
          concluido: false,
          description:
            "Id consequatur quasi id explicabo autem aut consequatur totam est eligendi rerum At corporis libero. Aut numquam doloremque qui consequatur quas aut quibusdam obcaecati At asperiores ipsam et quibusdam distinctio et ipsum voluptatem quo quia voluptatem. Ut tempora temporibus quo veniam sint est architecto fugit sed eius internos aut consequatur dolore. Aut repudiandae omnis hic expedita adipisci in accusantium rerum aut galisum labore non consectetur modi.",
        },
        {
          type: "Refeição",
          name: "Torta de frango",
          concluido: true,
          description:
            "Est iusto omnis ut impedit dolorem non assumenda delectus. Qui sint amet ad fuga fuga cum quia beatae quo error aliquam. Vel esse obcaecati est voluptate provident sed dolorem impedit eum maiores reprehenderit ut internos dignissimos. Sit fuga eaque nam natus consequatur qui facere sint eum molestiae quasi ut nisi sequi.",
        },
        {
          type: "Refeição",
          name: "Coxinha",
          concluido: true,
          description:
            "Lorem ipsum dolor sit amet. Quo dolor eveniet ut enim dolores et voluptatem maxime ut consequatur consequatur et molestiae perferendis rem soluta temporibus sed dolore facere. Ut repudiandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eius ut aspernatur maxime ut omnis iste",
        },
      ],
    },
    {
      dia: "ROTINA DOIS",
      concluido: true,
      atividades: [
        {
          type: "Refeição",
          name: "Torta de frango",
          concluido: false,
          description:
            "Est iusto omnis ut impedit dolorem non assumenda delectus. Qui sint amet ad fuga fuga cum quia beatae quo error aliquam. Vel esse obcaecati est voluptate provident sed dolorem impedit eum maiores reprehenderit ut internos dignissimos. Sit fuga eaque nam natus consequatur qui facere sint eum molestiae quasi ut nisi sequi.",
        },
        {
          type: "Refeição",
          name: "Coxinha",
          concluido: true,
          description:
            "Lorem ipsum dolor sit amet. Quo dolor eveniet ut enim dolores et voluptatem maxime ut consequatur consequatur et molestiae perferendis rem soluta temporibus sed dolore facere. Ut repudiandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eius ut aspernatur maxime ut omnis iste",
        },
      ],
    },
    {
      dia: "ROTINA TRÊS",
      concluido: false,
      atividades: [
        {
          type: "Refeição",
          name: "Coxinha",
          concluido: false,
          description:
            "Lorem ipsum dolor sit amet. Quo dolor eveniet ut enim dolores et voluptatem maxime ut consequatur consequatur et molestiae perferendis rem soluta temporibus sed dolore facere. Ut repudiandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eius ut aspernatur maxime ut omnis isteandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiu",
          midia: "https://www.designi.com.br/images/preview/10138011.jpg",
          duration: "10:30",
          repetitions: "5",
          series: "10",
        },
        {
          type: "Refeição",
          name: "Habibs",
          concluido: false,
          description:
            "Lorem ipsum dolor sit amet. Quo dolor eveniet ut enim dolores et voluptatem maxime ut consequatur consequatur et molestiae perferendis rem soluta temporibus sed dolore facere. Ut repudiandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eius ut aspernatur maxime ut omnis iste",
          midia: "https://www.designi.com.br/images/preview/10138011.jpg",
          duration: "05:30",
          repetitions: "30",
          series: "500",
        },
        {
          type: "Exercício",
          name: "Crucifixo funciona 1",
          concluido: true,
          description: "CUSCUZ PAULISTA",
          midia:
            "https://i.pinimg.com/474x/ac/6e/6b/ac6e6bde1fcab62ca489a7279380b506.jpg",
          duration: "00:30",
          repetitions: "9",
          series: "999",
        },
      ],
    },
  ];

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#2B6E36] font-semibold text-2xl">Home</h1>
        <div className="w-full h-[93%] flex justify-between items-center">
          <div className="w-[34%] h-full flex flex-col justify-between">
            <div className="w-full h-[5%] font-semibold text-xl flex justify-center items-center rounded-xl">
              <h1>Bem-vindo(a), {nicknameUser}</h1>
            </div>
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
              <div className="w-full h-[55%] flex flex-col items-center justify-center gap-5 overflow-y-scroll p-1">
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
            </div>
            <div className="w-full h-[16%] bg-white text-sm shadow-lg flex justify-between items-center rounded-xl p-4">
              <h1 className="w-[60%] text-wrap ">
                Observe o seu resultado do seu esforço com o seu
                <span className="font-bold"> mural de fotos!</span>
              </h1>
              <Link to="/mural" className="px-9 py-2 rounded-2xl shadow-lg text-white bg-[#48B75A]">
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
                type={activityType}
                name={activityName}
                description={activityDescription}
                media={activityMedia}
                duration={activityDuration}
                repetitions={activityRepetitions}
                series={activitySeries}
                concluido={activityInformation.concluido}
                onClickFunction={() => completedActivity()}
              />
            )}
          </div>
          <div className="w-[20%] h-full bg-[#1A1A1A] flex flex-col justify-between items-center rounded-xl shadow-lg p-4">
            <h1 className="w-full text-white text-xl font-semibold flex items-center justify-center">
              Lembretes
            </h1>
            <div className="w-full h-5/6  flex flex-col gap-2 overflow-hidden overflow-y-scroll">
              {reminders.length > 0 ? (
                reminders.map((reminder, index) => {
                  return reminder;
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center text-white text-sm font-small ">
                  Nenhum lembrete adicionado.
                </div>
              )}
            </div>
            <button
              className="px-9 py-2 rounded-2xl shadow-lg text-sm text-white bg-[#48B75A]"
              onClick={createReminder}
            >
              Adicionar lembrete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

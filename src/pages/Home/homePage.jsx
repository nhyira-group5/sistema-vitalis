import { AtividadeCard } from "../../components/AtividadeCard/atividadeCard";
import { AtividadeOption } from "../../components/AtividadeOption/atividadeOption";
import { Message } from "../../components/Message/message";
import { SideBar } from "../../components/SideBar/sideBar";
import {
  BowlSteam,
  Barbell,
  CalendarCheck,
  CookingPot,
} from "@phosphor-icons/react";
import { ExercicioBoard } from "../../components/ExercicioBoard/exercicioBoard";
import { useEffect, useState } from "react";

export function HomePage() {
  const [nicknameUser, setNicknameUser] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityName, setActivityName] = useState("");
  const [totalAmountExercises, setTotalAmountExercises] = useState(0);
  const [totalAmountMeals, setTotalAmountMeals] = useState(0);
  const [totalAmountDays, setTotalAmountDays] = useState(0);
  const [currentyAmountExercises, setCurrentyAmountExercises] = useState(0);
  const [currentyAmountMeals, setCurrentyAmountMeals] = useState(0);
  const [currentyAmountDays, setCurrentyAmountDays] = useState(0);
  const [activitySelected, setActivitySelected] = useState(false);
  const [activitiesDay, setActivitiesDay] = useState([]);

  useEffect(() => {
    setNicknameUser(nickname);
    generateActivitiesDay();
    generateCurrentyAmountExercises();
    generateCurrentyAmountMeals();
    generateCurrentyAmountDays();

    generateTotalAmountExercises();
    generateTotalAmountMeals();
    generateTotalAmountDays();
  }, []);



  function handleSelectActivity(e) {
    setActivityType(e.tipo);
    setActivityName(e.nome);

    setActivitySelected(true);
  }

  // QUANTIDADES TOTAIS DE EXERCÍCIOS, REFEIÇÕES E DIAS SEMANAIS

  function handleTotalAmount(activity) {
    const response = listaObjeto.filter((element) => element.tipo == activity);
    console.log("Lista de atividades do tipo " + activity + ": " + response);
    return response;
  }

  function generateTotalAmountExercises() {
    const totalAmountExercises = handleTotalAmount("Exercício").length;
    console.log("Quantidade de exercícios: " + totalAmountExercises);
    setTotalAmountExercises(totalAmountExercises);
  }

  function generateTotalAmountMeals() {
    const amountMealsTotal = handleTotalAmount("Refeição").length;
    console.log("Quantidade de refeições: " + amountMealsTotal);
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
    console.log(
      "Lista de atividades do tipo " +
        activity +
        " que foram concluidos: " +
        response
    );
    return response;
  }

  function generateCurrentyAmountExercises() {
    const currentyAmountExercises = handleCurrentyAmount("Exercício").length;
    console.log(
      "Quantidade de exercícios concluídos: " + currentyAmountExercises
    );
    setCurrentyAmountExercises(currentyAmountExercises);
  }

  function generateCurrentyAmountMeals() {
    const currentyAmountMeals = handleCurrentyAmount("Refeição").length;
    console.log("Quantidade de refeições concluídas: " + currentyAmountMeals);
    setCurrentyAmountMeals(currentyAmountMeals);
  }

  function generateCurrentyAmountDays() {
    const currentyDays = listaSemanal.filter(
      (element) => element.concluido == true
    ).length;
    setCurrentyAmountDays(currentyDays);
  }


  function generateActivitiesDay() {


    const attsDay = listaSemanal.find(
      (element) => element.concluido == true
    );

    setActivitiesDay([...activitiesDay,...attsDay.atividades]);


  }

  const nickname = "Squirte";

  const listaSemanal = [
    {
      dia: "ROTINA UM",
      concluido: true,
      atividades: [
        {
          tipo: "Exercício",
          nome: "Crucifixo",
          concluido: true,
          description:
            "Lorem ipsum dolor sit amet. Quo dolor eveniet ut enim dolores et voluptatem maxime ut consequatur consequatur et molestiae perferendis rem soluta temporibus sed dolore facere. Ut repudiandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eius ut aspernatur maxime ut omnis iste",
        },
        {
          tipo: "Refeição",
          nome: "Torta de frango",
          concluido: false,
          description:
            "Est iusto omnis ut impedit dolorem non assumenda delectus. Qui sint amet ad fuga fuga cum quia beatae quo error aliquam. Vel esse obcaecati est voluptate provident sed dolorem impedit eum maiores reprehenderit ut internos dignissimos. Sit fuga eaque nam natus consequatur qui facere sint eum molestiae quasi ut nisi sequi.",
        },
        {
          tipo: "Exercício",
          nome: "Supino",
          concluido: false,
          description:
            "Id consequatur quasi id explicabo autem aut consequatur totam est eligendi rerum At corporis libero. Aut numquam doloremque qui consequatur quas aut quibusdam obcaecati At asperiores ipsam et quibusdam distinctio et ipsum voluptatem quo quia voluptatem. Ut tempora temporibus quo veniam sint est architecto fugit sed eius internos aut consequatur dolore. Aut repudiandae omnis hic expedita adipisci in accusantium rerum aut galisum labore non consectetur modi.",
        },
        {
          tipo: "Refeição",
          nome: "Torta de frango",
          concluido: true,
          description:
            "Est iusto omnis ut impedit dolorem non assumenda delectus. Qui sint amet ad fuga fuga cum quia beatae quo error aliquam. Vel esse obcaecati est voluptate provident sed dolorem impedit eum maiores reprehenderit ut internos dignissimos. Sit fuga eaque nam natus consequatur qui facere sint eum molestiae quasi ut nisi sequi.",
        },
        {
          tipo: "Refeição",
          nome: "Coxinha",
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
          tipo: "Refeição",
          nome: "Torta de frango",
          concluido: false,
          description:
            "Est iusto omnis ut impedit dolorem non assumenda delectus. Qui sint amet ad fuga fuga cum quia beatae quo error aliquam. Vel esse obcaecati est voluptate provident sed dolorem impedit eum maiores reprehenderit ut internos dignissimos. Sit fuga eaque nam natus consequatur qui facere sint eum molestiae quasi ut nisi sequi.",
        },
        {
          tipo: "Refeição",
          nome: "Coxinha",
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
          tipo: "Refeição",
          nome: "Coxinha",
          concluido: true,
        },
      ],
    },
  ];

  const listaObjeto = [
    {
      tipo: "Exercício",
      nome: "SOCOROSO",
      concluido: true,
    },
    {
      tipo: "Refeição",
      nome: "Torta de frango",
      concluido: false,
    },
    {
      tipo: "Exercício",
      nome: "Supino",
      concluido: false,
    },
    {
      tipo: "Refeição",
      nome: "Torta de frango",
      concluido: false,
    },
    {
      tipo: "Refeição",
      nome: "Coxinha",
      concluido: true,
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
                title="Meta de dia"
                currentAmount={currentyAmountDays}
                totalAmount={totalAmountDays}
              />
            </div>
            <div className="w-full h-[55%] flex flex-col gap-5 overflow-hidden overflow-y-scroll">
              {listaObjeto.map((objeto, index) => {
                return (
                  <AtividadeOption
                    key={index}
                    icon={<Barbell size={28} color="#2B6E36" />}
                    activity={objeto.tipo}
                    nameActivity={objeto.nome}
                    onClickFunction={() => handleSelectActivity(objeto)}
                  />
                );
              })}
              <div className="h-20 w-full flex items-center gap-2 p-4 bg-[#48B75A] rounded-xl shadow-md">
                <Barbell size={28} color="white" />
                <span className="text-white font-semibold">Exercicio:</span>
                <span className="font-medium text-white">Crucifixo</span>
              </div>
            </div>
          </div>
          <div className="w-full h-[16%] bg-white text-sm shadow-lg flex justify-between items-center rounded-xl p-4">
            <h1 className="w-[60%] text-wrap ">
              Observe o seu resultado do seu esforço com o seu
              <span className="font-bold"> mural de fotos!</span>
            </h1>
            <button className="px-9 py-2 rounded-2xl shadow-lg text-white bg-[#48B75A]">
              Ver mural!
            </button>
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
              description="Esta refeição oferece uma combinação equilibrada de nutrientes e benefícios que favorecem a perda de peso. A quinoa e os legumes grelhados são baixos em calorias e ricos em fibras, proporcionando saciedade e controlando o apetite. Além disso, são fontes de nutrientes essenciais, como proteínas, vitaminas e minerais, importantes para manter a saúde durante o processo de perda de peso. Ao ser preparadbusca emagrecer."
            />
          )}
        </div>
        <div className="w-[20%] h-full bg-[#1A1A1A] flex flex-col justify-between items-center rounded-xl shadow-lg p-4">
          <h1 className="w-full text-white text-xl font-semibold flex items-center justify-center">
            Lembretes
          </h1>
          <div className="w-full h-5/6  flex flex-col gap-2 overflow-hidden overflow-y-scroll">
            <Message
              text="Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged."
            />
          </div>
          <button className="px-9 py-2 rounded-2xl shadow-lg text-sm text-white bg-[#48B75A]">
            Adicionar lembrete
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

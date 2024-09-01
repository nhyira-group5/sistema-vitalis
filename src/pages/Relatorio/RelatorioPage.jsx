import { AtividadeOption } from '../../components/AtividadeOption/atividadeOption';
import { AtividadeCard } from '../../components/AtividadeCard/atividadeCard';
import { Barbell, BowlSteam, CalendarCheck } from '@phosphor-icons/react';
import { SideBar } from '../../components/SideBar/sideBar';
import TooltipDemo from '../../components/Tooltip/tooltip';
import { Checkbox } from '@components/Checkbox/checkbox';
import { DisplayInput } from '@components/Input/input';
import SetaEsquerda from '@assets/seta-esquerda.svg';
import Interrogacao from '@assets/interrogacao.svg';
import SetaDireita from '@assets/seta-direita.svg';
import { Splash } from '@components/Splash/splash';
import { BarChart } from '@mui/x-charts/BarChart';
import { Tag } from '../../components/Tag/tag';
import Calendar from '@assets/calendar.svg';
import { useEffect, useState } from 'react';
import { api } from '../../api';

import {
  getLoginResponse,
  validateLogin,
  validateUsuario,
  formatarCPF,
  converterDataFormato,
} from '@utils/globalFunc';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function RelatorioPage() {
  const navigate = useNavigate();

  const [currentyMouth, setCurrentyMouth] = useState('');
  const [labelImc, setLabelImc] = useState('');

  const [activitiesDay, setActivitiesDay] = useState([]);

  const [totalAmountExercises, setTotalAmountExercises] = useState(0);
  const [totalAmountMeals, setTotalAmountMeals] = useState(0);
  const [totalAmountDays, setTotalAmountDays] = useState(0);

  const [currentyAmountExercises, setCurrentyAmountExercises] = useState(0);
  const [currentyAmountMeals, setCurrentyAmountMeals] = useState(0);
  const [currentyAmountDays, setCurrentyAmountDays] = useState(0);

  const [dados, setDados] = useState(null);

  const [fichaUsuario, setFichaUsuario] = useState({});
  const [rotinaUsuario, setRotinaUsuario] = useState({});
  const [meta, setMeta] = useState(null);

  const [fichaIsLoading, setFichaIsLoading] = useState(false);

  const [listaTarefas, setListaTarefas] = useState(null);

  const [user, setUser] = useState(null);

  const [peso, setPeso] = useState(null);
  const [altura, setAltura] = useState(null);

  useEffect(() => {
    const loginResponse = getLoginResponse();
    try {
      api.get(`/usuarios/${loginResponse.id}`).then((response) => {
        setUser(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      const url = `http://localhost:8080/usuarios/${user.id}`;
      axios.get(url).then((response) => {
        console.log(response.data);
        if (response.data.meta === null) {
          setMeta('Emagrecimento');
        } else {
          console.log(response.data.meta);
          setMeta(response.data.meta.nome);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user !== null) {
      const url = `http://localhost:8080/fichas/${user.id}`;
      axios.get(url).then((response) => {
        console.log(response.data);
        setPeso(response.data.peso);
        setAltura(response.data.altura);
      });
    }
  }, [user]);

  useEffect(() => {
    const url = `http://localhost:8080/treinos/relatorio/1`;
    axios.get(url).then((response) => {
      console.log(response.data);
      setListaTarefas(response.data);
    });
  }, []);

  function retornaVetorBonito() {
    let vetorAux = [];

    listaTarefas.forEach((e) => {
      vetorAux.push(e.nome);
    });
    console.log(vetorAux);
    return vetorAux;
  }

  function getUsuarioFicha() {
    const loginResponse = getLoginResponse();
    setFichaIsLoading(true);
    try {
      api.get(`/fichas/${loginResponse.id}`).then((response) => {
        setFichaUsuario(response.data);
        setFichaIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setFichaIsLoading(false);
    }
  }

  function getRotinaUsuario() {
    const loginResponse = getLoginResponse();

    try {
      api.get(`/rotinaUsuarios/${loginResponse.id}`).then((response) => {
        setRotinaUsuario(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLabelImc(classificationImc(calculateImc(peso, altura)));
    setDados(true);
  }, [peso, altura]);

  useEffect(() => {
    generateCurrrentyMouth();
    generateActivitiesDay();
  }, []);

  useEffect(() => {
    generateCurrentyAmountExercises();
    generateCurrentyAmountMeals();
    generateCurrentyAmountDays();

    generateTotalAmountExercises();
    generateTotalAmountMeals();
    generateTotalAmountDays();
  }, [activitiesDay]);

  function generateCurrrentyMouth() {
    setCurrentyMouth('AGOSTO');
  }

  // CALCULO DO IMC E CLASSIFICAÇÃO
  function calculateImc(weight, height) {
    return weight / (height * height);
  }

  function classificationImc(imc) {
    if (imc < 18.5) {
      return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 24.9) {
      return 'Peso normal';
    } else if (imc >= 25 && imc < 29.9) {
      return 'Sobrepeso';
    } else if (imc >= 30 && imc < 34.9) {
      return 'Obeso';
    } else return 'Extremamente obeso';
  }

  // function calculatePositionArrow() {
  //   const imc = calculateImc(objetoPesoEAltura.peso, objetoPesoEAltura.altura);
  //   console.log((((imc - 18.5) * 100) / 16.5).toFixed(0) + "%");
  //   return (((imc - 18.5) * 100) / 16.5).toFixed(0) + "%";
  // }

  // QUANTIDADE TOTAL DE CADA ATIVIDADE
  function handleTotalAmount(activity) {
    const response = activitiesDay.filter(
      (element) => element.type == activity,
    );
    console.log('Lista de ' + activity + ': ' + response);
    return response;
  }

  function generateTotalAmountExercises() {
    const totalAmountExercises = handleTotalAmount('Exercício').length;
    console.log('Total de exercícios: ' + totalAmountExercises);
    setTotalAmountExercises(totalAmountExercises);
  }

  function generateTotalAmountMeals() {
    const amountMealsTotal = handleTotalAmount('Refeição').length;
    console.log('Total de refeições: ' + amountMealsTotal);
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
    console.log('Lista de ' + activity + ' concluídos: ' + response);
    return response;
  }

  function generateCurrentyAmountExercises() {
    const currentyAmountExercises = handleCurrentyAmount('Exercício').length;
    console.log('Exercícios concluídos: ' + currentyAmountExercises);
    setCurrentyAmountExercises(currentyAmountExercises);
  }

  function generateCurrentyAmountMeals() {
    const currentyAmountMeals = handleCurrentyAmount('Refeição').length;
    console.log('Refeições concluídas: ' + currentyAmountMeals);
    setCurrentyAmountMeals(currentyAmountMeals);
  }

  function generateCurrentyAmountDays() {
    const currentyDays = listaSemanal.filter(
      (element) => element.concluido == true,
    ).length;
    setCurrentyAmountDays(currentyDays);
  }

  function generateActivitiesDay() {
    const activityDays = listaSemanal.find((element) => !element.concluido);

    if (activityDays) {
      setActivitiesDay(activityDays.atividades);
    } else {
      console.log('Não há itens com concluido == false.');
    }
  }

  // MUDAR DE MÊS
  function nextMonth() {
    console.log('Mês posterior');
  }

  function previousMonth() {
    console.log('Mês anterior');
  }

  const listaSemanal = [
    {
      dia: 'ROTINA TRÊS',
      concluido: false,
      atividades: [
        {
          type: 'Refeição',
          name: 'Coxinha',
          concluido: false,
          description:
            'Lorem ipsum dolor sit amet. Quo dolor eveniet ut enim dolores et voluptatem maxime ut consequatur consequatur et molestiae perferendis rem soluta temporibus sed dolore facere. Ut repudiandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eius ut aspernatur maxime ut omnis isteandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiuandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eiu',
          midia: 'https://www.designi.com.br/images/preview/10138011.jpg',
          duration: '10:30',
          repetitions: '5',
          series: '10',
        },
        {
          type: 'Refeição',
          name: 'Habibs',
          concluido: false,
          description:
            'Lorem ipsum dolor sit amet. Quo dolor eveniet ut enim dolores et voluptatem maxime ut consequatur consequatur et molestiae perferendis rem soluta temporibus sed dolore facere. Ut repudiandae minus et assumenda repellendus et nesciunt exercitationem qui provident error aut perferendis perspiciatis qui natus sint. Aut doloribus facere eos optio eius ut aspernatur maxime ut omnis iste',
          midia: 'https://www.designi.com.br/images/preview/10138011.jpg',
          duration: '05:30',
          repetitions: '30',
          series: '500',
        },
        {
          type: 'Exercício',
          name: 'Crucifixo',
          concluido: true,
          description: 'CUSCUZ PAULISTA',
          midia:
            'https://i.pinimg.com/474x/ac/6e/6b/ac6e6bde1fcab62ca489a7279380b506.jpg',
          duration: '00:30',
          repetitions: '9',
          series: '999',
        },
        {
          type: 'Exercício',
          name: 'Crucifixo',
          concluido: true,
          description: 'CUSCUZ PAULISTA',
          midia:
            'https://i.pinimg.com/474x/ac/6e/6b/ac6e6bde1fcab62ca489a7279380b506.jpg',
          duration: '00:30',
          repetitions: '9',
          series: '999',
        },
        {
          type: 'Exercício',
          name: 'Crucifixo funciona 3',
          concluido: true,
          description: 'CUSCUZ PAULISTA',
          midia:
            'https://i.pinimg.com/474x/ac/6e/6b/ac6e6bde1fcab62ca489a7279380b506.jpg',
          duration: '00:30',
          repetitions: '9',
          series: '999',
        },
      ],
    },
  ];

  return (
    <div>
      {dados && (
        <div className="flex items-center justify-center  w-screen h-screen px-10 py-10 gap-5">
          <SideBar />

          <div className="w-[90vw] h-[90%] flex flex-col justify-between rounded-md">
            <h1 className="text-[#2B6E36] font-semibold text-2xl">
              Relatório Mensal
            </h1>
            <div className="w-full flex bg-white justify-center p-4 items-center shadow-lg rounded-se-none rounded-ss-none rounded-xl ">
              {/* <button
                className="py-3 px-[14px] bg-[#48B75A] rounded-se-none rounded-xl"
                onClick={() => previousMonth()}
              >
                <img src={SetaEsquerda} alt="" />
              </button> */}
              <span className="h-fit flex font-semibold gap-2">
                {currentyMouth} / 2024{' '}
                <img className="size-6" src={Calendar} alt="" />
              </span>
              {/* <button
                className="py-3 px-[14px] bg-[#48B75A] rounded-ss-none rounded-xl"
                onClick={() => nextMonth()}
              >
                <img src={SetaDireita} alt="" />
              </button> */}
            </div>

            <div className="w-full h-4/5 flex justify-between">
              <div className="w-[31%] h-full flex flex-col justify-between">
                <div className="w-full h-[16%] bg-white shadow-lg flex justify-center items-center rounded-xl">
                  {meta && <h1 className="font-semibold">Meta: {meta}</h1>}
                </div>
                <div className="w-full h-[22%] bg-white shadow-lg flex justify-around items-center rounded-xl">
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
                    title="Meta mensal"
                    currentAmount={currentyAmountDays}
                    totalAmount={totalAmountDays}
                  />
                </div>
                <div className="w-full h-[35%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
                  <h1 className="w-full font-semibold">
                    Atividades feitas nos últimos 15 dias
                  </h1>
                  <div className="w-full h-full flex justify-center items-center">
                    {listaTarefas !== null && (
                      <BarChart
                        series={[
                          {
                            data:
                              listaTarefas !== null &&
                              listaTarefas.map((objeto, index) => {
                                return objeto.concluido;
                              }),
                          },
                        ]}
                        xAxis={[
                          {
                            data: retornaVetorBonito(),
                            scaleType: 'band',
                          },
                        ]}
                        width={600}
                        margin={{ top: 1, bottom: 0, left: 0, right: 10 }}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full h-[19%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
                  <div className="w-full font-semibold">
                    Grupos musculares treinados nesse mês
                  </div>
                  <div className="w-full flex justify-around items-center">
                    <Tag text="#Peito" />
                    <Tag text="#Alongamento" />
                    <Tag text="#Panturilha" />
                    <Tag text="#Trapezio" />
                  </div>
                </div>
              </div>
              <div className="w-[31%] h-full flex flex-col justify-between">
                <div className="w-full h-[20%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl px-4 py py-3">
                  <div className="w-full flex justify-between items-center">
                    <h1>Seu IMC: {(peso / (altura * altura)).toFixed(2)}</h1>
                    <TooltipDemo
                      text="O Índice de Massa Corporal (IMC) é uma medida de peso corporal baseada na altura e no peso de uma pessoa. É usado para classificar o peso corporal como subpeso, normal, acima do peso ou obeso."
                      icon={Interrogacao}
                    />
                  </div>
                  <div className="w-full h-3 flex rounded-xl">
                    <div className="h-full w-1/5 bg-blue-500 rounded-s-xl"></div>
                    <div className="h-full w-1/5 bg-[#48B75A]"></div>
                    <div className="h-full w-1/5 bg-[#F6D920] "></div>
                    <div className="h-full w-1/5 bg-orange-500"></div>
                    <div className="h-full w-1/5 bg-[#CA1B1B] rounded-e-xl"></div>
                  </div>
                  <div
                    className={
                      labelImc == 'Abaixo do peso'
                        ? 'w-full text-center text-blue-500 font-medium'
                        : labelImc == 'Peso normal'
                          ? 'w-full text-center text-[#48B75A] font-medium'
                          : labelImc == 'Sobrepeso'
                            ? 'w-full text-center text-[#F6D920] font-medium'
                            : labelImc == 'Obeso'
                              ? 'w-full text-center text-orange-500 font-medium'
                              : 'w-full text-center text-[#CA1B1B] font-medium'
                    }
                  >
                    {labelImc}
                  </div>
                </div>
                <div className="w-full h-[77%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
                  <h1 className="w-full font-semibold">
                    Atividades mais realizadas no mês
                  </h1>
                  <div className="w-full h-full">
                    <div className="w-full h-[90%] flex flex-col gap-5 overflow-y-auto p-1">
                      {listaTarefas !== null &&
                        listaTarefas.map((objeto, index) => {
                          return (
                            <AtividadeOption
                              key={index}
                              activity="Exercício"
                              nameActivity={objeto.nome}
                              done={0}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[35%] h-full bg-white shadow-lg flex flex-col justify-between rounded-xl">
                {fichaIsLoading ? (
                  <Splash />
                ) : (
                  <></>
                  // <form className="grid grid-cols-6 gap-y-3 gap-x-6 p-5  grid-flow-row auto-rows-auto bg-white rounded-xl w-full h-full">
                  //   <fieldset className="col-span-6">
                  //     <DisplayInput
                  //       labelContent={"Nome completo"}
                  //       placeholder={"Nome completo do usuário"}
                  //       nome={"nomeCompletoUsuario"}
                  //       onChangeFunction={""}
                  //       inputType={"text"}
                  //       value={fichaUsuario.usuarioId.nome ?? ""}
                  //       disabled={true}
                  //     />
                  //   </fieldset>

                  //   <fieldset className="col-span-2">
                  //     <DisplayInput
                  //       labelContent={"CPF"}
                  //       placeholder={"CPF do usuário"}
                  //       nome={"cpfUsuario"}
                  //       onChangeFunction={""}
                  //       inputType={"text"}
                  //       value={formatarCPF(fichaUsuario.usuarioId.cpf) ?? ""}
                  //       disabled={true}
                  //     />
                  //   </fieldset>

                  //   <fieldset className="col-span-2">
                  //     <DisplayInput
                  //       labelContent={"Dt. Nascimento"}
                  //       placeholder={"--/--/----"}
                  //       nome={"dtNascimentoUsuario"}
                  //       onChangeFunction={""}
                  //       inputType={"text"}
                  //       value={
                  //         converterDataFormato(fichaUsuario.usuarioId.dtNasc) ??
                  //         ""
                  //       }
                  //       disabled={true}
                  //     />
                  //   </fieldset>

                  //   <fieldset className="col-span-2">
                  //     <DisplayInput
                  //       labelContent={"Sexo"}
                  //       placeholder={"Sexo do usuário"}
                  //       nome={"sexo"}
                  //       onChangeFunction={""}
                  //       inputType={"text"}
                  //       value={
                  //         fichaUsuario.usuarioId.sexo === "F"
                  //           ? "Feminino"
                  //           : fichaUsuario.usuarioId.sexo === "M"
                  //           ? "Masculino"
                  //           : ""
                  //       }
                  //       disabled={true}
                  //     />
                  //   </fieldset>

                  //   <fieldset className="col-span-6">
                  //     <DisplayInput
                  //       labelContent={"Email"}
                  //       placeholder={"Email do usuário"}
                  //       nome={"emailUsuario"}
                  //       onChangeFunction={""}
                  //       inputType={"Email"}
                  //       value={fichaUsuario.usuarioId.email ?? ""}
                  //       disabled={true}
                  //     />
                  //   </fieldset>

                  //   <fieldset className="col-span-4">
                  //     <DisplayInput
                  //       labelContent={"Meta"}
                  //       placeholder={"Meta do usuário"}
                  //       nome={"metaUsuario"}
                  //       onChangeFunction={""}
                  //       inputType={"text"}
                  //       value={rotinaUsuario.metaId.nome ?? ""}
                  //       disabled={true}
                  //     />
                  //   </fieldset>

                  //   <fieldset className="col-span-1">
                  //     <DisplayInput
                  //       labelContent={"Peso"}
                  //       placeholder={"Peso"}
                  //       nome={"pesoUsuario"}
                  //       onChangeFunction={""}
                  //       inputType={"text"}
                  //       value={
                  //         fichaUsuario.peso ? `${fichaUsuario.peso}kg` : ""
                  //       }
                  //       disabled={true}
                  //     />
                  //   </fieldset>

                  //   <fieldset className="col-span-1">
                  //     <DisplayInput
                  //       labelContent={"Altura"}
                  //       placeholder={"Altura"}
                  //       nome={"AlturaUsuario"}
                  //       onChangeFunction={""}
                  //       inputType={"text"}
                  //       value={
                  //         fichaUsuario.altura ? `${fichaUsuario.altura}cm` : ""
                  //       }
                  //       disabled={true}
                  //     />
                  //   </fieldset>

                  //   <fieldset className="col-span-6 grid auto-rows-auto grid-flow-row gap-y-2 h-full overflow-auto scrollbar-thin">
                  //     <Checkbox
                  //       disabled={true}
                  //       labelStyle={"text-gray500 text-lg"}
                  //       Id={"displayproblemasCardiacos"}
                  //       checked={
                  //         fichaUsuario.problemasCardiacos == 1 ? true : false
                  //       }
                  //       labelcontent={
                  //         "Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?"
                  //       }
                  //     />

                  //     <Checkbox
                  //       disabled={true}
                  //       labelStyle={"text-gray500 text-lg"}
                  //       Id={"displayDorPeitoAtividade"}
                  //       checked={
                  //         fichaUsuario.dorPeitoAtividade == 1 ? true : false
                  //       }
                  //       labelcontent={
                  //         "Você sente dores no peito quando pratica atividade física?"
                  //       }
                  //     />

                  //     <Checkbox
                  //       disabled={true}
                  //       labelStyle={"text-gray500 text-lg"}
                  //       Id={"displayDorPeitoUltimoMes"}
                  //       checked={
                  //         fichaUsuario.dorPeitoUltimoMes == 1 ? true : false
                  //       }
                  //       labelcontent={
                  //         "No último mês, você sentiu dores no peito quando praticou atividade física?"
                  //       }
                  //     />

                  //     <Checkbox
                  //       disabled={true}
                  //       labelStyle={"text-gray500 text-lg"}
                  //       Id={"displayProblemaOsseoArticular"}
                  //       checked={
                  //         fichaUsuario.problemaOsseoArticular == 1
                  //           ? true
                  //           : false
                  //       }
                  //       labelcontent={
                  //         "Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?"
                  //       }
                  //     />

                  //     <Checkbox
                  //       disabled={true}
                  //       labelStyle={"text-gray500 text-lg"}
                  //       Id={"displayMedicamentoPressaoCoracao"}
                  //       checked={
                  //         fichaUsuario.medicamentoPressaoCoracao == 1
                  //           ? true
                  //           : false
                  //       }
                  //       labelcontent={
                  //         "Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?"
                  //       }
                  //     />

                  //     <Checkbox
                  //       disabled={true}
                  //       labelStyle={"text-gray500 text-lg"}
                  //       Id={"displayImpedimentoAtividade"}
                  //       checked={
                  //         fichaUsuario.impedimentoAtividade == 1 ? true : false
                  //       }
                  //       labelcontent={
                  //         "Sabe de alguma outra razão pela qual você não deve praticar atividade física?"
                  //       }
                  //     />
                  //   </fieldset>
                  // </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

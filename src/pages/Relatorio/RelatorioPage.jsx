import { SideBar } from "../../components/SideBar/sideBar";
import Calendar from "@assets/calendar.svg";
import SetaEsquerda from "@assets/seta-esquerda.svg";
import SetaDireita from "@assets/seta-direita.svg";
import Interrogacao from "@assets/interrogacao.svg";

export function RelatorioPage() {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between rounded-md">
        <h1 className="text-[#2B6E36] font-semibold text-2xl">
          Relatório Mensal
        </h1>
        <div className="w-full flex bg-white justify-between items-center shadow-lg rounded-se-none rounded-ss-none rounded-xl ">
          <button className="py-3 px-[14px] bg-[#48B75A] rounded-se-none rounded-xl">
            <img src={SetaEsquerda} alt="" />
          </button>
          <span className="h-fit flex font-semibold gap-2">
            ABRIL / 2024 <img className="size-6" src={Calendar} alt="" />
          </span>
          <button className="py-3 px-[14px] bg-[#48B75A] rounded-ss-none rounded-xl">
            <img src={SetaDireita} alt="" />
          </button>
        </div>
        <div className="w-full h-4/5 flex justify-between">
          <div className="w-[31%] h-full flex flex-col justify-between">
            <div className="w-full h-[16%] bg-white shadow-lg flex justify-center items-center rounded-xl">
              <h1 className="font-semibold">Meta: Emagrecimento</h1>
            </div>
            <div className="w-full h-[22%] bg-white shadow-lg flex justify-around items-center rounded-xl">
              <div>
                <span>quadrado</span>
              </div>
              <div>
                <span>quadrado</span>
              </div>
              <div>
                <span>quadrado</span>
              </div>
            </div>
            <div className="w-full h-[35%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
              <h1 className="w-full font-semibold">
                Atividades feitas nos últimos 15 dias
              </h1>
              <div className="w-full h-full flex justify-center items-center">
                {" "}
                GRÁFICO LEGAL{" "}
              </div>
            </div>
            <div className="w-full h-[19%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
              <div className="w-full font-semibold">
                Grupos musculares treinados nesse mês
              </div>
              <div className="w-full flex justify-around">
                <div>TAG</div>
                <div>TAG</div>
                <div>TAG</div>
                <div>TAG</div>
              </div>
            </div>
          </div>
          <div className="w-[31%] h-full flex flex-col justify-between">
            <div className="w-full h-[20%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
              <div className="w-full flex justify-between ">
                <h1>Seu IMC</h1>
                <img src={Interrogacao} alt="" className="size-5" />
              </div>
              <div className="w-full h-3 flex rounded-xl">
                <div className="h-full w-1/6 bg-blue-500 rounded-s-xl"></div>
                <div className="h-full w-1/6 bg-cyan-400"></div>
                <div className="h-full w-1/6 bg-[#48B75A]"></div>
                <div className="h-full w-1/6 bg-[#F6D920] "></div>
                <div className="h-full w-1/6 bg-orange-500"></div>
                <div className="h-full w-1/6 bg-[#CA1B1B] rounded-e-xl"></div>
              </div>
              <div>^</div>
            </div>
            <div className="w-full h-[77%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
              <h1 className="w-full font-semibold">
                Atividades realizadas no mês
              </h1>
              <div className="w-full h-full">
                <div className="h-1/4 w-full flex items-center justify-center">
                  <span>componente</span>
                </div>
                <div className="h-1/4 w-full flex items-center justify-center">
                  <span>componente</span>
                </div>
                <div className="h-1/4 w-full flex items-center justify-center">
                  <span>componente</span>
                </div>
                <div className="h-1/4 w-full flex items-center justify-center">
                  <span>componente</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[31%] h-full bg-white shadow-lg flex flex-col justify-between rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

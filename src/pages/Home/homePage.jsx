import { SideBar } from "../../components/SideBar/sideBar";
import {
  BowlSteam,
  Barbell,
  CalendarCheck,
  CookingPot,
} from "@phosphor-icons/react";

export function HomePage() {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#2B6E36] font-semibold text-2xl">Home</h1>
        <div className="w-full h-[93%] flex justify-between items-center">
          <div className="w-[31%] h-full flex flex-col justify-between">
            <div className="w-full h-[5%] font-semibold text-2xl flex justify-center items-center rounded-xl">
              <h1>Bem-vindo(a), nickname</h1>
            </div>
            <div className="w-full h-[72%] bg-white shadow-lg flex flex-col justify-between items-center rounded-xl p-4">
              <h2 className="w-full font-semibold">Atividades de hoje</h2>
              <div className="w-full h-[31%] bg-black flex justify-between items-center rounded-3xl p-4">
                <div className="w-[28%] h-full bg-white rounded-xl flex flex-col justify-center items-center p-2">
                  <div className="flex items-center justify-center gap-1">
                    <BowlSteam size={28} />
                    <span className="font-semibold">--/10</span>
                  </div>
                  <h2 className="text-sm">Refeições</h2>
                </div>
                <div className="w-[28%] h-full bg-white rounded-xl flex flex-col justify-center items-center p-2">
                  <div className="flex items-center justify-center gap-1">
                    <Barbell size={28} />
                    <span className="font-semibold">01/10</span>
                  </div>
                  <h2 className="text-sm">Refeições</h2>
                </div>
                <div className="w-[28%] h-full bg-white rounded-xl flex flex-col justify-center items-center p-2">
                  <div className="flex items-center justify-center gap-1">
                    <CalendarCheck size={28} />
                    <span className="font-semibold">--/10</span>
                  </div>
                  <h2 className="text-sm">Meta Semanal</h2>
                </div>
              </div>
              <div className="w-full h-[55%] flex flex-col gap-5 overflow-hidden overflow-y-scroll">
                <div className="h-20 w-full flex items-center gap-2 p-4 bg-white rounded-xl shadow-md">
                  <Barbell size={28} color="#2B6E36" />
                  <span className="text-[#2B6E36] font-semibold">
                    Exercicio:
                  </span>
                  <span>Crucifixo</span>
                </div>
                <div className="h-20 w-full flex items-center gap-2 p-4 bg-white rounded-xl shadow-md">
                  <CookingPot size={28} color="#2B6E36" />
                  <span className="text-[#2B6E36] font-semibold">
                    Refeição:
                  </span>
                  <span>Torta de frango</span>
                </div>
                <div className="h-20 w-full flex items-center gap-2 p-4 bg-[#48B75A] rounded-xl shadow-md">
                  <Barbell size={28} color="white" />
                  <span className="text-white font-semibold">Exercicio:</span>
                  <span>Crucifixo</span>
                </div>
                <div className="h-20 w-full flex items-center gap-2 p-4 bg-[#48B75A] rounded-xl shadow-md">
                  <Barbell size={28} color="white" />
                  <span className="text-white font-semibold">Exercicio:</span>
                  <span>Crucifixo</span>
                </div>
              </div>
            </div>
            <div className="w-full h-[16%] bg-white text-sm shadow-lg flex justify-between items-center rounded-xl p-4">
              <h1 className="w-[60%] text-wrap ">
                Observe o seu resultado do seu esforço com o seu{" "}
                <span className="font-bold">mural de fotos!</span>
              </h1>
              <button className="px-9 py-2 rounded-2xl shadow-lg text-white bg-[#48B75A]">
                Ver mural!
              </button>
            </div>
          </div>
          <div className="w-[31%] h-full bg-white flex flex-col justify-center items-center rounded-xl shadow-lg p-4">
            <span className="text-xl font-semibold">Escolha uma atividade</span>
          </div>
          <div className="w-[19%] h-full bg-[#1A1A1A] flex flex-col justify-between items-center rounded-xl shadow-lg p-4">
            <h1 className="w-full text-white text-xl font-semibold flex items-center justify-center">
              Lembretes
            </h1>
            <div className="w-full h-5/6  flex flex-col gap-2 overflow-hidden overflow-y-scroll">
              <div className="rounded-lg bg-white p-4 leading-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </div>
              <div className="rounded-lg bg-white p-4 leading-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </div>
            </div>
            <button className="px-9 py-2 rounded-2xl shadow-lg text-white bg-[#48B75A]">
              Adicionar lembrete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

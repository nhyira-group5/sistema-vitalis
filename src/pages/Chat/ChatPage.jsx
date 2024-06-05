import { CardPersonal } from "../../components/CardPersonal/cardPersonal";
import { SideBar } from "../../components/SideBar/sideBar";
import { Siren } from "@phosphor-icons/react";

export function ChatPage() {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-[#2B6E36] font-semibold text-2xl">CHAT</h1>
          <button className="p-1.5 bg-[#CA1B1B] rounded-md">
            <Siren size={20} color="white" />
          </button>
        </div>
        <div className="w-full h-[90%] flex justify-between items-center">
          <div className="w-1/4 h-full bg-[#48B75A] rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <h1 className="text-white text-base font-medium">
              Personal afiliado
            </h1>

            <div className="w-full h-[20%] bg-white rounded-2xl shadow-xl p-4 flex gap-4 justify-between">
              <div className="w-full flex gap-5">
                <img
                  className="size-[50px] rounded-full object-cover flex self-center"
                  src="https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
                  alt=""
                />
                <div className="w-[65%] h-full flex flex-col justify-center self-center">
                  <h2 className="font-semibold text-sm text-[#2B6E36]">
                    Danilo de Sousa
                  </h2>
                  <span className="w-full text-xs text-wrap truncate">
                    Caua de sousa mesquista para de dar conflito em toda a pr
                    que vc abre meu bombom ou ta dificil
                  </span>
                </div>
              </div>
            </div>

            <hr className="border" />

            <h1 className="text-white text-base font-medium">
              Conversas anteriores
            </h1>

            <div className="w-full h-[20%] bg-white rounded-2xl shadow-xl p-4 flex gap-4 justify-between">
              <div className="w-full flex gap-5">
                <img
                  className="size-[50px] rounded-full object-cover flex self-center"
                  src="https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
                  alt=""
                />
                <div className="w-[65%] h-full flex flex-col justify-center self-center">
                  <h2 className="font-semibold text-sm text-[#2B6E36]">
                    Danilo de Sousa
                  </h2>
                  <span className="w-full  text-xs text-wrap truncate">
                    Caua de sousa mesquista para de dar conflito em toda a pr
                    que vc abre meu bombom ou ta dificil
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[20%] bg-white rounded-2xl shadow-xl p-4 flex gap-4 justify-between">
              <div className="w-full flex gap-5">
                <img
                  className="size-[50px] rounded-full object-cover flex self-center"
                  src="https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
                  alt=""
                />
                <div className="w-[65%] h-full flex flex-col justify-center self-center">
                  <h2 className="font-semibold text-sm text-[#2B6E36]">
                    Danilo de Sousa
                  </h2>
                  <span className="w-full  text-xs text-wrap truncate">
                    Caua de sousa mesquista para de dar conflito em toda a pr
                    que vc abre meu bombom ou ta dificil
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[70%] h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-center">
                <CardPersonal
                name={"User0101"}
                specialty={"Emagrecimento"}
                media={
                    "https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
                }
                />
                <hr className="border border-black" />
                <div className="w-full h-full bg-pink-400">
                    
                </div>
            <h1>quadro da conversa</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

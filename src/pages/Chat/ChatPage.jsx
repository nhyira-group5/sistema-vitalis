import { CardPersonal } from "../../components/CardPersonal/cardPersonal";
import { Message } from "../../components/Message/message";
import { SideBar } from "../../components/SideBar/sideBar";
import { CalendarSlash, PaperPlaneRight, Paperclip, Siren } from "@phosphor-icons/react";

export function ChatPage() {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-[#2B6E36] font-semibold text-2xl">Chat</h1>
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

          <div className="w-[70%] h-full  flex flex-col justify-between">
            <div className="w-full h-[80%] min-h-max p-6 flex flex-col justify-between bg-white rounded-2xl shadow-lg">
              <CardPersonal
                name={"User0101"}
                specialty={"Emagrecimento"}
                size={"size-14"}
                media={
                  "https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
                }
              />
              <hr className="w-full border border-black" />
              <div className="w-full h-5/6 p-4 flex flex-col gap-3 overflow-y-scroll">
                <Message user={"sender"} message={"Oi amor"} time={"00:00"} />
                <Message
                  user={"recipient"}
                  message={"Oi xuxu, tudo bem?"}
                  time={"00:00"}
                />
                <Message user={"sender"} message={"Oi amor"} time={"00:00"} />
                <Message
                  user={"recipient"}
                  message={"Oi xuxu, tudo bem?"}
                  time={"00:00"}
                />
                <Message user={"sender"} message={"Oi amor"} time={"00:00"} />
                <Message
                  user={"recipient"}
                  message={"Oi xuxu, tudo bem?"}
                  time={"00:00"}
                />
                <Message user={"sender"} message={"Oi amor"} time={"00:00"} />
                <Message
                  user={"recipient"}
                  message={"Oi xuxu, tudo bem?"}
                  time={"00:00"}
                />
                <Message user={"sender"} message={"Oi amor"} time={"00:00"} />
                <Message
                  user={"recipient"}
                  message={"Oi xuxu, tudo bem?"}
                  time={"00:00"}
                />
              </div>
            </div>
            <div className="w-full h-1/6 flex items-center justify-between py-6">
              <button className="p-2 h-fit rounded-lg bg-white drop-shadow-lg">
                <CalendarSlash size={20} />
              </button>
              <button className="p-2 h-fit rounded-lg bg-white drop-shadow-lg">
                <Paperclip size={20} />
              </button>
              <input
                className="w-[75%] border-[1.5px] border-black rounded-lg rounded-es-none rounded-se-none px-3 py-1.5 text-base"
                type="text"
                placeholder="Mensagem para Gustavinho"
              />
              <button className="px-5 py-2 rounded-2xl shadow-lg text-white bg-[#48B75A]">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

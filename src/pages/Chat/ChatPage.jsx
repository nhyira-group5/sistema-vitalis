import { CardPersonal } from "../../components/CardPersonal/cardPersonal";
import { SideBar } from "../../components/SideBar/sideBar";

export function ChatPage() {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#2B6E36] font-semibold text-2xl">CHAT</h1>
        <div className="w-full h-[90%] flex justify-between items-center">
          <div className="w-1/4 h-full bg-[#48B75A] rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <h1 className="text-white text-lg font-semibold">
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
                  <h2 className="font-semibold text-base text-[#2B6E36]">Danilo de Sousa</h2>
                  <span className="w-full text-xs  text-pretty">oi  jsdk fjsdk fjksd j asd asd asd sa d sad a sd as d a a sd as d as ds  da sd as d asd asd     fksjdf ksjd</span>
                  {/* <span className="text-sm">
                    Especialista em
                    <span className="font-semibold"> Magreza</span>
                  </span>
                  <span className="text-sm font-semibold">
                    são pualo , sp
                  </span> */}
                </div>
              </div>
            </div>

          </div>
          <div className="w-[70%] h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
            <h1>quadro da conversa</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

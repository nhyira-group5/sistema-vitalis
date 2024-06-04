import { InputAcad } from "../../components/InputAcad/inputAcad";
import { CardAcad } from "../../components/CardAcad/cardAcad";
import { SideBar } from "../../components/SideBar/sideBar";
import { DotsThree, MagnifyingGlass } from "@phosphor-icons/react";
import { CardPersonal } from "../../components/CardPersonal/cardPersonal";

export function BuscarPersonalPage() {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex justify-between">
        <div className="w-3/5 h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
          <h1 className="text-[#2B6E36] font-semibold text-2xl">
            Encontre uma academia
          </h1>

          <div className="w-full flex justify-between  text-sm">
            <InputAcad
              label="CEP"
              placeholder="00000-000"
              type="text"
              width={"w-1/5"}
            />
            <InputAcad
              label="Logradouro"
              placeholder="Ex: Rua das Araras"
              type="text"
              width={"w-3/6"}
            />
            <InputAcad
              label="Número"
              placeholder="Ex: 1234"
              type="text"
              width={"w-1/6"}
            />
            <button
              className="h-fit px-2.5 py-2.5 rounded-full shadow-lg text-white bg-[#48B75A] flex gap-2 items-center self-end"
              //   onClick={createReminder}
            >
              <MagnifyingGlass color="white" />
            </button>
          </div>

          <div className="w-full h-[55%] bg-green-600"></div>

          <div className="h-[22%] flex justify-between">
            <CardAcad
              title="Academia Araras"
              rating="1.7"
              distance="40"
              address="Rua serra dos gaviões, 712"
            />
            <CardAcad
              title="Academia Gaviões"
              rating="4.7"
              distance="10"
              address="Rua serra da araras, 416"
            />
          </div>
        </div>
        <div className="w-[38%] h-full bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between">
          <h1 className="text-[#2B6E36] font-semibold text-2xl">
            Encontre um personal
          </h1>
          <div className="m-auto w-full h-5/6 flex flex-col gap-2.5 overflow-y-scroll">
            <CardPersonal
            name={"User0101"}
            specialty={"Emagrecimento"}
            city={"Itaquera"}
            state={"SP"}
            media={"https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"}
            />
            <CardPersonal
            name={"User0101"}
            specialty={"Emagrecimento"}
            city={"Itaquera"}
            state={"SP"}
            media={"https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"}
            />
            <CardPersonal
            name={"User0101"}
            specialty={"Emagrecimento"}
            city={"Itaquera"}
            state={"SP"}
            media={"https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"}
            />
            <CardPersonal
            name={"User0101"}
            specialty={"Emagrecimento"}
            city={"Itaquera"}
            state={"SP"}
            media={"https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"}
            />
            <CardPersonal
            name={"User0101"}
            specialty={"Emagrecimento"}
            city={"Itaquera"}
            state={"SP"}
            media={"https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}

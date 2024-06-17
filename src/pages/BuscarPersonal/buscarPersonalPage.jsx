import { CardPersonal } from "../../components/CardPersonal/cardPersonal";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { InputAcad } from "../../components/InputAcad/inputAcad";
import { CardAcad } from "../../components/CardAcad/cardAcad";
import { SideBar } from "../../components/SideBar/sideBar";
import { Mapa } from "../../components/Mapa/mapa";
import { useEffect, useState } from "react";
import axios from "axios";
import { QuestionMark } from "@phosphor-icons/react/dist/ssr";
import { twMerge } from "tailwind-merge";

export function BuscarPersonalPage() {
  const [carregando, setCarregando] = useState(false);
  const [pagamentoAtivo, setPagamentoAtivo] = useState(false);

  const [cep, setCep] = useState("");
  const [infoEndereco, setInfoEndereco] = useState(null);
  const [academias, setAcademias] = useState(null);
  const [infoDistance, setInfoDistance] = useState(null);

  useEffect(() => {
    if (academias !== null) {
      console.log(academias);
    }
  }, [academias]);

  function handleInputCep(e) {
    setCep(e.target.value);
  }

  function handleClickSearch() {
    setInfoEndereco(null);
    setCarregando(true);
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    axios
      .get(url)
      .then((response) => {
        setInfoEndereco(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleClickCard(e) {
    console.log(props);
  }

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className={twMerge("w-[88%] h-[90%] flex justify-between",
            !pagamentoAtivo && "blur-sm"
          )}>
        <div
          className="w-3/5 h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between"
        >
          <h1 className="text-[#2B6E36] font-semibold text-2xl">
            Encontre uma academia
          </h1>

          <div className="w-full flex justify-between  text-sm">
            <InputAcad
              label="CEP"
              placeholder="00000-000"
              type="text"
              width={"w-1/5"}
              valueOption={cep}
              onChangeFunction={handleInputCep}
            />
            {/* <InputAcad
              label="Logradouro"
              placeholder="Ex: Rua das Araras"
              type="text"
              width={"w-3/6"}
              // valueFunction={}
              // onChangeFunction={}
            />
            <InputAcad
              label="Número"
              placeholder="Ex: 1234"
              type="text"
              width={"w-1/6"}
              // valueFunction={}
              // onChangeFunction={}
            /> */}
            <button
              className="h-fit px-2.5 py-2.5 rounded-full shadow-lg text-white bg-[#48B75A] flex gap-2 items-center self-end"
              onClick={handleClickSearch}
            >
              <MagnifyingGlass color="white" />
            </button>
          </div>

          <div className="w-full h-[55%] bg-gray-500/20 flex items-center justify-center">
            {carregando && <span>Carregando...</span>}
            <Mapa
              infoEndereco={infoEndereco}
              setAcademias={setAcademias}
              setCarregando={setCarregando}
            />
          </div>

          <div className="h-[22%] flex justify-between">
            {!academias ? (
              <div className="w-[48%] h-full rounded-xl shadow-xl p-4 flex items-center justify-center cursor-pointer">
                <QuestionMark size={30} color="black" />
              </div>
            ) : (
              <CardAcad
                title={academias[0].nome}
                rating={academias[0].classificacao}
                address={academias[0].endereco}
                cep={cep}
                lat={academias[0].latitude}
                lon={academias[0].longitude}
                onClickFunction={handleClickCard}
              />
            )}
            {!academias ? (
              <div className="w-[48%] h-full rounded-xl shadow-xl p-4 flex items-center justify-center cursor-pointer">
                <QuestionMark size={30} color="black" />
              </div>
            ) : (
              <CardAcad
                title={academias[1].nome}
                rating={academias[1].classificacao}
                address={academias[1].endereco}
                cep={cep}
                lat={academias[1].latitude}
                lon={academias[1].longitude}
                onClickFunction={handleClickCard}
              />
            )}
            {/* <CardAcad
              title={academias[1].nome}
              rating={academias[1].classificacao}
              distance="10"
              address={academias[1].endereco}
            /> */}
          </div>
        </div>
        <div
          className="w-[38%] h-full bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between"
        >
          <h1 className="text-[#2B6E36] font-semibold text-2xl">
            Encontre um personal
          </h1>
          <div className="m-auto w-full h-5/6 flex flex-col gap-2.5 overflow-y-scroll items-center">
            <CardPersonal
              name={"User0101"}
              specialty={"Emagrecimento"}
              city={"Itaquera"}
              state={"SP"}
              media={
                "https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
              }
              haveDots
              haveShadow
            />
            <CardPersonal
              name={"User0101"}
              specialty={"Emagrecimento"}
              city={"Itaquera"}
              state={"SP"}
              media={
                "https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
              }
              haveDots
              haveShadow
            />
            <CardPersonal
              name={"User0101"}
              specialty={"Emagrecimento"}
              city={"Itaquera"}
              state={"SP"}
              media={
                "https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
              }
              haveDots
              haveShadow
            />
            <CardPersonal
              name={"User0101"}
              specialty={"Emagrecimento"}
              city={"Itaquera"}
              state={"SP"}
              media={
                "https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
              }
              haveDots
              haveShadow
            />
            <CardPersonal
              name={"User0101"}
              specialty={"Emagrecimento"}
              city={"Itaquera"}
              state={"SP"}
              media={
                "https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
              }
              haveDots
              haveShadow
            />
          </div>
        </div>
      </div>
    </div>
  );
}

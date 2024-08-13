import { LockKey } from "@phosphor-icons/react";
import { SideBar } from "../../components/SideBar/sideBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Checkbox } from "@components/Checkbox/checkbox";

import defaultIcon from "@assets/defaultIcon.png";

import { DisplayInput } from "@components/Input/input";
import { api } from "@apis/api";

import {
  validateLogin,
  validateUsuario,
  getLoginResponse,
  formatarCPF,
  converterDataFormato,
} from "@utils/globalFunc";
export function PerfilPage() {
  const [user, setUser] = useState(null);
  const [personal, setPersonal] = useState(null);

  const [fichaUsuario, setFichaUsuario] = useState({});
  const [rotinaUsuario, setRotinaUsuario] = useState({});

  const [fichaIsLoading, setFichaIsLoading] = useState(false);

  const navigate = useNavigate();

  function getUsuario() {
    const loginResponse = getLoginResponse();
    api.get(`/usuarios/${loginResponse.id}`).then((response) => {
      // response.data.pagamentoAtivo = true;
      setUser(response.data);
    });
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
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate);
      await validateUsuario(navigate);

      getUsuario();
      getUsuarioFicha();
      getRotinaUsuario();
    };

    validarLoginEUsuario();
  }, []);

  useEffect(() => {
    if (user !== null && user.pagamentoAtivo == true) {
      setPersonal({
        idUsuario: 2,
        nickname: "marC@SSilV4",
        nome: "Marcos Silva Oliveira Pinto Santos",
        dtNasc: "1980-12-05",
        sexo: "M",
        email: "marcos@gmail.com",
        especialidade: { nome: "Peso Corporal" },
      });
    }
  }, [user]);

  function mesQueVem() {
    const hoje = new Date();
    hoje.setMonth(hoje.getMonth() + 1);

    const opcoes = { day: "2-digit", month: "2-digit", year: "numeric" };
    const proximoMesFormatado = hoje.toLocaleDateString("pt-BR", opcoes);

    return proximoMesFormatado;
  }

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#2B6E36] font-semibold text-2xl">Perfil</h1>
        <div className="flex w-full h-[88%] justify-between">
          <div className="w-[48%] bg-white rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-[#2B6E36]">
              Informações pessoais
            </h2>

            <div className="max-w-40 rounded rounded-3xl my-0 mx-auto">
              <img
                className="py-4 rounded-full block max-w-full "
                src={
                  personal && personal.midia
                    ? personal.midia.caminho
                    : defaultIcon
                }
                alt=""
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="px-1 py-1 col-span-2 border-r">
                <h3 className="font-semibold text-sm">Nome Completo</h3>
                <p>
                  {fichaUsuario && fichaUsuario.usuarioId
                    ? fichaUsuario.usuarioId.nome
                    : "xtop"}
                </p>
              </div>

              <div className="px-1 py-1 col-span-2">
                <h3 className="font-semibold text-sm">E-mail</h3>
                <p>
                  {fichaUsuario && fichaUsuario.usuarioId
                    ? fichaUsuario.usuarioId.email
                    : "caue@gmail.com"}
                </p>
              </div>

              <div className="px-1 py-1 col-span-2 border-r">
                <h3 className="font-semibold text-sm">CPF</h3>
                <p>
                  {fichaUsuario && fichaUsuario.usuarioId
                    ? formatarCPF(fichaUsuario.usuarioId.cpf)
                    : "000.000.000-00"}
                </p>
              </div>

              <div className="px-1 py-1">
                <h3 className="font-semibold text-sm">Data de Nasc.</h3>
                <p>
                  {fichaUsuario && fichaUsuario.usuarioId
                    ? converterDataFormato(fichaUsuario.usuarioId.dtNasc)
                    : "25/ 01/2004"}
                </p>
              </div>

              <div className="px-1 py-1">
                <h3 className="font-semibold text-sm">Sexo</h3>
                <p>
                  {fichaUsuario && fichaUsuario.usuarioId
                    ? fichaUsuario.usuarioId.sexo === "F"
                      ? "Feminino"
                      : fichaUsuario.usuarioId.sexo === "M"
                      ? "Masculino"
                      : ""
                    : ""}
                </p>
              </div>

              <div className="px-1 py-1 col-span-2 border-r">
                <h3 className="font-semibold text-sm">Meta</h3>
                <p>
                  {personal && personal.especialidade
                    ? personal.especialidade.nome
                    : ""}
                </p>
              </div>
              <div className="px-1 py-1 ">
                <h3 className="font-semibold text-sm">Peso</h3>
                <p>{fichaUsuario.peso ? `${fichaUsuario.peso}kg` : ""}</p>
              </div>
              <div className="px-1 py-1 ">
                <h3 className="font-semibold text-sm">Altura</h3>
                <p>{fichaUsuario.altura ? `${fichaUsuario.altura}cm` : ""}</p>
              </div>
            </div>
          </div>

          <div className="w-[48%] flex justify-center items-center">
            {user && user.pagamentoAtivo && personal ? (
              <div className="bg-[#1A1A1A] rounded-xl p-5 shadow-lg flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Personal Afiliado
                </h2>

                <div className="max-w-40 rounded rounded-3xl my-0 mx-auto">
                  <img
                    className="py-4 rounded-full block max-w-full "
                    src={
                      personal && personal.midia
                        ? personal.midia.caminho
                        : defaultIcon
                    }
                    alt=""
                  />
                </div>
                {/* 
                <div className="w-full  flex flex-col gap-5 items-center">
                  <button className="px-5 py-1.5 bg-white rounded-full text-sm">
                    Ir para o chat
                  </button>
                </div> */}

                <div className="grid grid-cols-4 gap-2 bg-white p-2 rounded-xl">
                  <div className="px-1 py-1 col-span-2 border-r">
                    <h3 className="font-semibold text-sm">Nome Completo</h3>
                    <p>{personal && personal.nome ? personal.nome : "xtop"}</p>
                  </div>

                  <div className="px-1 py-1 col-span-2">
                    <h3 className="font-semibold text-sm">E-mail</h3>
                    <p>
                      {personal && personal.email
                        ? personal.email
                        : "caue@gmail.com"}
                    </p>
                  </div>

                  <div className="px-1 py-1 col-span-2 border-r">
                    <h3 className="font-semibold text-sm">Meta</h3>
                    <p>
                      {personal && personal.especialidade
                        ? personal.especialidade.nome
                        : ""}
                    </p>
                  </div>

                  <div className="px-1 py-1">
                    <h3 className="font-semibold text-sm">Data de Nasc.</h3>
                    <p>
                      {personal && personal.dtNasc
                        ? converterDataFormato(personal.dtNasc)
                        : "25/ 01/2004"}
                    </p>
                  </div>

                  <div className="px-1 py-1">
                    <h3 className="font-semibold text-sm">Sexo</h3>
                    <p>
                      {personal && personal.sexo
                        ? personal.sexo === "F"
                          ? "Feminino"
                          : personal.sexo === "M"
                          ? "Masculino"
                          : ""
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-2/5 bg-white rounded-xl shadow-lg flex justify-between p-4">
                <div className="w-3/5 h-full flex flex-col justify-between">
                  <h1 className="font-semibold text-[#64C273] text-3xl">
                    Personal afiliado
                  </h1>
                  <h2 className="font-medium">
                    Este é um recurso{" "}
                    <span className="font-semibold text-[#64C273]">PAGO</span>!
                  </h2>
                  <p className="text-sm">
                    Para acessá-lo, é necessário participar do plano premium.
                    Contribua para sua experiência premium como usuário e se
                    mantenha melhor do que nunca!
                  </p>
                </div>
                <div className="w-fit h-full flex flex-col justify-between items-center pt-5 pb-2.5">
                  <LockKey size={50} />
                  <Link
                    to="/planos"
                    className="px-14 py-2.5 bg-[#2B6E36] text-white font-semibold rounded-3xl text-sm"
                  >
                    Ser Premium
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

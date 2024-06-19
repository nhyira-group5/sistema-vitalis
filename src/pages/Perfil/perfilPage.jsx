import { LockKey } from "@phosphor-icons/react";
import { SideBar } from "../../components/SideBar/sideBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {Checkbox} from "@components/Checkbox/checkbox"

import defaultIcon from "@assets/defaultIcon.png"



import { DisplayInput } from "@components/Input/input";
import { api} from "@apis/api";

import { validateLogin, validateUsuario, getLoginResponse,   formatarCPF, converterDataFormato} from "@utils/globalFunc"
export function PerfilPage() {


  const [user, setUser] = useState(null);
  const [personal, setPersonal] = useState(null);

  const [fichaUsuario, setFichaUsuario] = useState({});
  const [rotinaUsuario, setRotinaUsuario] = useState({});

  const [fichaIsLoading, setFichaIsLoading] = useState(false);

  const navigate = useNavigate();

  function getUsuario(){
    const loginResponse = getLoginResponse();
    api.get(`/usuarios/${loginResponse.id}`)
    .then((response)=>{
      // response.data.pagamentoAtivo = true;
      setUser(response.data)
    })
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

      const validarLoginEUsuario = async () =>{

        await validateLogin(navigate);
        await validateUsuario(navigate);
  

        getUsuario();
        getUsuarioFicha();
        getRotinaUsuario();
    }
  
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
        email:"marcos@gmail.com",
        especialidade:{nome: "Peso Corporal"}
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
          <div className="w-[48%] h-full bg-white rounded-xl p-5 shadow-lg flex flex-col gap-5">
            <h2 className="text-lg font-medium text-[#48B75A]">
              Informações pessoais
            </h2>

              <div className="rounded-full overflow-hidden w-52 h-52 self-center">
                <img className="object-cover h-full w-full" src={user && user.midia ? user.midia.caminho : defaultIcon} alt="" />
              </div>

            <div className="w-full h-1/4 flex gap-40">
            <form className="grid grid-cols-6 gap-y-3 gap-x-6 p-5  grid-flow-row auto-rows-auto bg-white rounded-xl w-full h-full">
                    <fieldset className="col-span-6">
                      <DisplayInput
                        labelContent={"Nome completo"}
                        placeholder={"Nome completo do usuário"}
                        nome={"nomeCompletoUsuario"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={fichaUsuario && fichaUsuario.usuarioId ? (fichaUsuario.usuarioId.nome) : ("xtop")}
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-2">
                      <DisplayInput
                        labelContent={"CPF"}
                        placeholder={"CPF do usuário"}
                        nome={"cpfUsuario"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={fichaUsuario && fichaUsuario.usuarioId ? (formatarCPF(fichaUsuario.usuarioId.cpf)) :  "000.000.000-00"}
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-2">
                      <DisplayInput
                        labelContent={"Dt. Nascimento"}
                        placeholder={"--/--/----"}
                        nome={"dtNascimentoUsuario"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={
                          fichaUsuario && fichaUsuario.usuarioId ? converterDataFormato(fichaUsuario.usuarioId.dtNasc) :  "25/ 01/2004"
                          
                        }
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-2">
                      <DisplayInput
                        labelContent={"Sexo"}
                        placeholder={"Sexo do usuário"}
                        nome={"sexo"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={
                          fichaUsuario && fichaUsuario.usuarioId ? (fichaUsuario.usuarioId.sexo === "F" ? "Feminino" : fichaUsuario.usuarioId.sexo === "M" ? "Masculino" : "") : ("")
                        }
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-6">
                      <DisplayInput
                        labelContent={"Email"}
                        placeholder={"Email do usuário"}
                        nome={"emailUsuario"}
                        onChangeFunction={""}
                        inputType={"Email"}
                        value={fichaUsuario && fichaUsuario.usuarioId ? fichaUsuario.usuarioId.email : "caue@gmail.com"}
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-4">
                      <DisplayInput
                        labelContent={"Meta"}
                        placeholder={"Meta do usuário"}
                        nome={"metaUsuario"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={fichaUsuario && fichaUsuario.metaId ? rotinaUsuario.metaId.nome : ""}
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-1">
                      <DisplayInput
                        labelContent={"Peso"}
                        placeholder={"Peso"}
                        nome={"pesoUsuario"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={
                          fichaUsuario.peso ? `${fichaUsuario.peso}kg` : ""
                        }
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-1">
                      <DisplayInput
                        labelContent={"Altura"}
                        placeholder={"Altura"}
                        nome={"AlturaUsuario"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={
                          fichaUsuario.altura ? `${fichaUsuario.altura}cm` : ""
                        }
                        disabled={true}
                      />
                    </fieldset>

            </form>

            </div>

          </div>

          <div className="w-[48%] h-full flex justify-center items-center">
            {user && user.pagamentoAtivo && personal ? (
              <div className="w-full h-full bg-[#1A1A1A] rounded-xl shadow-lg flex flex-col justify-between p-4 gap-3">
                <h1 className="w-full text-white text-lg pb-2">
                  Personal Afiliado
                </h1>

                <div className="w-full  flex flex-col gap-5 items-center">
                    <div className="rounded-full overflow-hidden w-52 h-52 self-center">
                      <img className="object-cover h-full w-full" src={personal && personal.midia ? personal.midia.caminho : defaultIcon} alt="" />
                    </div>
                    <button className="px-5 py-1.5 bg-white rounded-full text-sm">
                      Ir para o chat
                    </button>
                </div>

                <div className="w-full h-full flex justify-between">
                  <div className="w-full h-full bg-white flex flex-col justify-between text-sm p-4 rounded-xl">
                    
                  <form className="grid grid-cols-6 gap-y-3 gap-x-6 p-5  grid-flow-row auto-rows-auto bg-white rounded-xl w-full h-full">
                    <fieldset className="col-span-3">
                      <DisplayInput
                        labelContent={"Nome completo"}
                        placeholder={"Nome completo do usuário"}
                        nome={"nomeCompletoUsuario"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={personal && personal.nome ? (personal.nome) : ("xtop")}
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-2">
                      <DisplayInput
                        labelContent={"Dt. Nascimento"}
                        placeholder={"--/--/----"}
                        nome={"dtNascimentoUsuario"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={
                          personal && personal.dtNasc ? converterDataFormato(personal.dtNasc) :  "25/ 01/2004"
                          
                        }
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-1">
                      <DisplayInput
                        labelContent={"Sexo"}
                        placeholder={"Sexo do usuário"}
                        nome={"sexo"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={
                          personal && personal.sexo ? (personal.sexo  === "F" ? "Feminino" : personal.sexo  === "M" ? "Masculino" : "") : ("")
                        }
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-6">
                      <DisplayInput
                        labelContent={"Email"}
                        placeholder={"Email do usuário"}
                        nome={"emailUsuario"}
                        onChangeFunction={""}
                        inputType={"Email"}
                        value={personal && personal.email ? personal.email : "caue@gmail.com"}
                        disabled={true}
                      />
                    </fieldset>

                    <fieldset className="col-span-4">
                      <DisplayInput
                        labelContent={"Meta"}
                        placeholder={"Meta do usuário"}
                        nome={"metaUsuario"}
                        onChangeFunction={""}
                        inputType={"text"}
                        value={personal && personal.especialidade ? personal.especialidade.nome : ""}
                        disabled={true}
                      />
                    </fieldset>




            </form>
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

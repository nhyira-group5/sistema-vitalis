import { LockKey } from "@phosphor-icons/react";
import { SideBar } from "../../components/SideBar/sideBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { validateLogin, validateUsuario, getLoginResponse} from "@utils/globalFunc"
export function PerfilPage() {
  const [pagamentoAtivo, setPagamentoAtivo] = useState(false);

  const [user, setUser] = useState(null);
  const [personal, setPersonal] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const loginResponse = getLoginResponse();
    const url = `http://localhost:8080/usuarios/${loginResponse.id}`;

      const validarLoginEUsuario = async () =>{

        await validateLogin(navigate);
        await validateUsuario(navigate);
  
        axios
        .get(url)
        .then((response) => {
          setUser(response.data);
          setPagamentoAtivo(response.data.pagamentoAtivo);
        });
    }
  
    validarLoginEUsuario();
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(pagamentoAtivo);
    if (user !== null && pagamentoAtivo === false) {
      setPersonal(user.personalId);
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
            <div className="w-full h-1/4 flex gap-40">
              <img
                className="size-30 rounded-full object-contain bg-red-700"
                src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                alt=""
              />
              <div className="h-full w-full font-medium text-lg flex flex-col gap-5">
                <div className="h-1/3 w-full flex flex-col text-lg font-semibold tracking-wider">
                  Data de Nascimento
                  <span className="w-full text-base">Marcos da Silva</span>
                </div>

                <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                  Data de Nascimento
                  <span className="text-base">Marcos da Silva</span>
                </div>
              </div>
              <div className="font-medium flex flex-col gap-2"></div>
            </div>

            <div className="w-2/5 flex flex-col gap-5">
              <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                Data de Nascimento
                <span className="text-base">Marcos da Silva</span>
              </div>
              <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                Data de Nascimento
                <span className="text-base">Marcos da Silva</span>
              </div>
              <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                Data de Nascimento
                <span className="text-base">Marcos da Silva</span>
              </div>
              <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                Data de Nascimento
                <span className="text-base">Marcos da Silva</span>
              </div>
            </div>
          </div>
          <div className="w-[48%] h-full bg-green-200">
            {pagamentoAtivo && personal ? (
              <div className="w-full h-2/5 bg-[#1A1A1A] rounded-xl shadow-lg flex flex-col justify-between p-4">
                <h1 className="w-full text-white text-lg pb-2">
                  Personal Afiliado
                </h1>
                <div className="w-full h-full flex justify-between">
                  <div className="w-[72%] h-full bg-white flex flex-col justify-between text-sm p-4 rounded-xl">
                    <h2 className="font-semibold text-lg">{personal.nome}</h2>
                    <span>Username: {personal.nickname}</span>
                    <span>Email: {personal.email}</span>
                    {/* <span>Meta: {user.meta.nome}</span> */}
                    <span>Fim do plano: {mesQueVem()} </span>
                  </div>
                  <div className="w-[25%] h-full flex flex-col justify-between items-center">
                    <img
                      className="size-24 rounded-full object-contain"
                      src="https://pbs.twimg.com/profile_images/1773510543183155200/-OHcp9Ud_400x400.jpg"
                      alt=""
                    />
                    <button className="px-5 py-1.5 bg-white rounded-full text-sm">
                      Ir para o chat
                    </button>
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

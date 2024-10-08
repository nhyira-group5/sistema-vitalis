import { User, Lock } from "@phosphor-icons/react";
import { Input } from "../../components/Input/input";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { api } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../user-context";

export function LoginPage() {
  const { updateUser } = useContext(UserContext);
  const [nickname, setNicknname] = useState("");
  const [senha, setSenha] = useState("");
  const [loginSplash, setLoginSplash] = useState(false);

  const navigate = useNavigate();

  function onNicknameInputChanged(event) {
    setNicknname(event.target.value);
  }

  function onSenhaInputChanged(event) {
    setSenha(event.target.value);
  }

  function userDtoCriacao(dadosFormulario) {
    const userLoginDto = {
      login: dadosFormulario.get("nickname"),
      senha: dadosFormulario.get("senha"),
    };

    return userLoginDto;
  }

  const handleLoginError = (error) => {
    switch (error.response?.data?.status) {
      case 401:
      case 400:
        toast.error("Nickname e/ou senha inválidos!");
        break;
      case 500:
        toast.error(
          "Tivemos problemas ao efetuar seu login! Tente novamente mais tarde."
        );
        break;
      default:
        toast.error("Erro inesperado ao tentar logar.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginSplash(true);

    if (!nickname || !senha) {
      toast.error("Preencha todos os campos");
      return;
    }

    const myForm = document.getElementById("myForm");
    const dadosFormulario = new FormData(myForm);
    const userLoginDto = userDtoCriacao(dadosFormulario);

    try {
      const userLoginResponse = await api.post("/login/usuario", userLoginDto);
      const userDataResponse = await api.get(
        `/usuarios/${userLoginResponse.data.id}`
      );
      const userFichaResponse = await api.get(
        `/fichas/${userLoginResponse.data.id}`
      );

      const userData = {
        userData: userDataResponse.data,
        userFicha: userFichaResponse.data || null,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      updateUser(userData);

      if (
        userData.userFicha === null &&
        userDataResponse.data.tipo === "USUARIO"
      ) {
        navigate("/cadastroParq");
        return;
      }

      if (userData.userData.tipo === "USUARIO") navigate("/home");
      if (userData.userData.tipo === "PERSONAL") navigate("/home-personal");
    } catch (error) {
      handleLoginError(error);
    } finally {
      setLoginSplash(false);
    }
  };

  return (
    <div className="bg-[#F7FBFC]">
      <div className="h-screen py-12 px-14 max-w-min w-fit mx-auto flex flex-col gap-10 justify-between bg-[FF00FF} text-nowrap font-mavenPro">
        <div className="text-center flex flex-col gap-7">
          <h1 className="font-bold text-6xl text-center bg-gradient-to-r from-[#64C273] from-35% to-[#734A91] to-70% text-transparent bg-clip-text">
            Bem vindo(a) de volta!
          </h1>
          <div className="text-base flex flex-col gap-5 items-center font-extrabold ">
            <p className="font-medium text-lg">
              Bem-vindo de volta! Estamos felizes em tê-lo conosco novamente.
            </p>
            <p className="w-11/12 text-wrap font-medium text-lg">
              Faça login para acessar sua conta e explorar todas as novidades
              que preparamos para você.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <form className="flex flex-col gap-6" id="myForm">
            <Input
              labelContent={"Nickname:"}
              nome={"nickname"}
              icon={<User size={24} color="#000000" />}
              onChangeFunction={onNicknameInputChanged}
            />
            <Input
              labelContent={"Senha:"}
              nome={"senha"}
              icon={<Lock size={24} color="#000000" />}
              onChangeFunction={onSenhaInputChanged}
              inputType={"password"}
            ></Input>
          </form>

          <div className="w-full flex justify-center">
            <div>
              <span>Ainda não tem uma conta? </span>
              <Link to={"/cadastro"} className="font-bold text-[#519747]">
                Clique aqui!{" "}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-around">
          <button
            className="w-64 flex justify-around py-3 px-7 rounded-full text-xl text-[#FFFFFF] font-bold drop-shadow-xl bg-[#48B75A] *:h-8 *:flex *:items-center"
            type="submit"
            id="btnForm"
            onClick={handleSubmit}
          >
            {loginSplash ? (
              <div>
                <div className="animate-pulse rounded-full w-5 h-5 bg-white"></div>
              </div>
            ) : (
              <div>
                <span>Entrar</span>
              </div>
            )}
          </button>
        </div>

        <span className="w-full text-center text-xs">
          © 2024 nhyira. All Rights reserved
        </span>
      </div>
    </div>
  );
}

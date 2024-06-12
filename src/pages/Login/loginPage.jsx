import {
  User,
  PencilSimpleLine,
  EnvelopeSimple,
  Lock,
  CalendarDots,
  Hash,
} from "@phosphor-icons/react";
import { Input } from "../../components/Input/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../../apis/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {getFicha} from "@utils/globalFunc"

export function LoginPage() {
  const navigate = useNavigate();

  const redirecionarHome = () => {
    navigate("/home");
  };

  const [nicknname, setNicknname] = useState("");
  const [senha, setSenha] = useState("");

  function onNicknameInputChanged(event) {
    setNicknname(event.target.value);
  }

  function onSenhaInputChanged(event) {
    setSenha(event.target.value);
  }

  function userDtoCriacao(dadosFormulario){
    const userLoginDto = {
      login: dadosFormulario.get("nickname"),
      senha: dadosFormulario.get("senha"),
    };

    return userLoginDto;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const myForm = document.getElementById("myForm");
    const dadosFormulario = new FormData(myForm);

    const userLoginDto = userDtoCriacao(dadosFormulario);





    try {
        //const response = await api.post(`/login/usuario`, userLoginDto);
        const loginResponse = {
          id: 1,
          nome: 'Cauã Gostavo',
          email: 'cauaempr@gmail.com',
          nickname: 'Oriundo',
          token: "tokendeacessokkkkkk",
          tipo: "USUARIO"
        };
            
        sessionStorage.setItem('loginResponse', JSON.stringify(loginResponse));


        
        getFicha(navigate);  
        redirecionarHome();
        
        toast.success("Logando...");

    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          error.response.data.errors.forEach((erroMsg) => {
            toast.error(erroMsg.defaultMessage);
          });
        } else {
          toast.error("Erro ao efetuar login.");
        };
    }
  };

  return (
    <div className="bg-[#F7FBFC]">
      <div className="h-screen py-12 px-14 max-w-min w-fit mx-auto flex flex-col gap-10 justify-between bg-[FF00FF} text-nowrap font-mavenPro">
        {/* CABEÇALHO/TITULO  */}
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

        {/* FORMS COM INPUT */}
        <div className="flex flex-col gap-10">
          <form className="flex flex-col gap-6" id="myForm">
            <Input
              labelContent={"Nickname:"}
              nome={"nickname"}
              icon={<User size={24} color="#000000" />}
              onChangeFunction={onNicknameInputChanged}
              inputStyle={
                "group-focus-within:!ring-primary-green300 h-12 p-3 relative flex w-full bg-gray100 border-gray100 border rounded-full outline-none ring-1 ring-gray500"
              }
            />
            <Input
              labelContent={"Senha:"}
              nome={"senha"}
              icon={<Lock size={24} color="#000000" />}
              onChangeFunction={onSenhaInputChanged}
              inputType={"password"}
              inputStyle={
                "group-focus-within:!ring-primary-green300 h-12 p-3 relative flex w-full bg-gray100 border-gray100 border rounded-full outline-none ring-1 ring-gray500 "
              }
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
            className="w-64 flex justify-around py-3 px-7 rounded-full text-xl text-[#FFFFFF] font-bold drop-shadow-xl bg-[#48B75A]"
            type="submit"
            id="btnForm"
            onClick={handleSubmit}
          >
            Entrar
          </button>
        </div>

        <span className="w-full text-center text-xs">
          © 2024 nhyira. All Rights reserved
        </span>
      </div>
    </div>
  );
}

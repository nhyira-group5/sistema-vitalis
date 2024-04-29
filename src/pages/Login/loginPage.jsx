import {
  User,
  PencilSimpleLine,
  EnvelopeSimple,
  Lock,
  CalendarDots,
  Hash,
} from "@phosphor-icons/react";
import { Input } from "../../components/Input/input";
// import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
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
            <p className="">
              Bem-vindo de volta! Estamos felizes em tê-lo conosco novamente.
            </p>
            <p className="w-11/12 text-wrap">
              Faça login para acessar sua conta e explorar todas as novidades
              que preparamos para você.
            </p>
          </div>
        </div>

        {/* FORMS COM INPUT */}
        <div className="flex flex-col gap-10">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
              icon={<User size={24} color="#000000" />}
              labelContent={"E-mail ou Username:"}
              inputStyle={
                "group-focus-within:!ring-primary-green300 h-12 p-3 relative flex w-full bg-gray100 border-gray100 border rounded-full outline-none ring-1 ring-gray500"
              }
            />
            <Input
              labelContent={"Senha:"}
              icon={<Lock size={24} color="#000000" />}
              inputType={"password"}
              
              inputStyle={
                "group-focus-within:!ring-primary-green300 h-12 p-3 relative flex w-full bg-gray100 border-gray100 border rounded-full outline-none ring-1 ring-gray500 items-center"
              }
            ></Input>
          </form>

          {/* CHECKBOX CONECTADO E ESQUECEU A SENHA */}
          <div className="w-full flex justify-center">
            <div>
              <span>Ainda não tem uma conta? </span>
              <Link to={"/cadastro"} className="font-bold text-[#519747]">
                Clique aqui!{" "}
              </Link>
            </div>
          </div>
        </div>

        {/* BOTÕES GOOGLE E ENTRAR */}
        <div className="flex justify-around">
          {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log(decoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        /> */}
          <button className="w-64 flex justify-around py-3 px-7 rounded-full text-xl text-[#FFFFFF] font-bold drop-shadow-xl bg-[#48B75A]">
            Entrar
          </button>
        </div>

        {/* RODAPÉ */}
        <span className="w-full text-center text-xs">
          © 2024 nhyira. All Rights reserved
        </span>
      </div>
    </div>
  );
}

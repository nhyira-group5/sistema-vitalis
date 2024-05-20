import { useState } from "react";
import Button from "@components/Button/button.jsx";
import { SideCard } from "./sections/sideCard/SideCard";

import { AlunoFormCadastro } from "./sections/alunoFormCadastro/AlunoFormCadastro";
import { InstrutorFormCadastro } from "./sections/instrutorFormCadastro/InstrutorFormCadastro";

export function CadastroPage() {
  const [userType, setUserType] = useState(true);

  return (
    <>
      <div className={`relative flex w-screen h-screen bg-gray500 transition-all duration-500 ease-in-out`}>
        <SideCard
          tittle={`${userType ? "É um aluno?" : "É um personal?"}`}
          contentText={`${
            userType
              ? "Bem-vindo à nossa plataforma! Cadastra-se para acessar nossos recursos"
              : "Bem-vindo à nossa plataforma! Cadastre-se para acessar recursos exclusivos e trabalhar conosco."
          }`}
          userType={userType}
          style={`absolute transition-all duration-500 ease-in-out transform  ${userType ? '-translate-x-5' : 'translate-x-[70vw]'} z-50`}
          Button={
            <Button
              iconVisibility={false}
              content={userType ? "Sou um instrutor!" : "Sou um aluno!"}
              onClick={() => setUserType(!userType)}
              buttonStyle={`${userType ? 'bg-primary-green300 hover:bg-primary-green400' : 'bg-alt-purple300 hover:bg-alt-purple400'} rounded-full font-bold px-5 py-4 transition-all flex items-center gap-1 text-gray100 `}
            />
          }
        />

        <div className={`flex flex-col gap-6 text-gray100 py-10 px-14 w-2/3 h-full transition-all duration-500 ease-in-out absolute transform  ${userType ? 'translate-x-[33vw]' : 'translate-x-2'}`}>
          {userType ? 
          <AlunoFormCadastro /> : <InstrutorFormCadastro />}
        </div>

      </div>
    </>
  );
}

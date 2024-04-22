import { SideCard } from "./sections/sideCard/SideCard";
import { useState } from "react";
import Button from "@components/Button/button.jsx"

import { AlunoFormCadastro } from "./sections/alunoFormCadastro/AlunoFormCadastro";

export function CadastroPage() {

const [userType, setUserType] = useState(true)

return(
<>


                   
    <div className="grid grid-cols-[0.30fr_0.70fr] grid-rows-1  w-screen h-screen bg-gray500 ">
        <SideCard tittle={`${userType ? 'É um instrutor?' : 'É um aluno?'}`} 
                           contentText={`${userType ? 'Bem-vindo à nossa plataforma! Se você é um personal trainer e deseja se cadastrar para acessar recursos exclusivos e trabalhar conosco, clique no botão abaixo para iniciar o processo de registro.' : 'Bem-vindo à nossa plataforma! Se você está pronto para dar o primeiro passo em direção a uma vida mais saudável e ativa, você está no lugar certo. Clique no botão abaixo para iniciar sua jornada fitness conosco.'}`} 
                           userType = {userType} 
                            Button={<Button iconVisibility={false} 
                                            content={userType ? "Sou um instrutor!" : "Sou um aluno!"} 
                                            onClick={()=>setUserType(!userType)} 
                                            style={` rounded-full font-bold px-5 py-4 transition-all flex items-center gap-1 text-gray100 ${userType ? 'bg-primary-green300 hover:bg-primary-green400' : 'bg-alt-purple300 hover:bg-alt-purple400'}`}
                            />}
        />

        <div className=" flex flex-col gap-6 text-gray100 py-20 px-14  w-full ">
            <div className="flex flex-col gap-3 font-mavenPro text-start">
                <span className="text-7xl font-bold text-primary-green300 ">Realizando cadastro</span>
                
                <div className=" flex flex-col gap-5">
                    <span className=" text-lg font-normal">Quer acessar nossa aplicação? Vamos realizar seu cadastro!</span>
                    <span className=" text-lg font-normal">Insira algumas informações sobre você para fazermos o cadastro de sua conta!</span>
                </div>
            </div>

        {userType ? <AlunoFormCadastro/> : <span> em construcao </span>}


        
        </div>

    </div>
</>
)
}

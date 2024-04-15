import { LoginRegisterCard } from "@components/LoginRegisterCard/loginRegisterCard";
import { useState } from "react";
import Button from "@components/Button/button.jsx"

import { AlunoFormCadastro } from "./sections/alunoFormCadastro/AlunoFormCadastro";

export function CadastroPage() {

const [userType, setUserType] = useState(true)

return(
<>
    <div className="grid grid-cols-[0.30fr_0.70fr] grid-rows-1 bg-black500 w-screen h-screen">
        <LoginRegisterCard tittle={`${userType ? 'É um instrutor?' : 'É um aluno?'}`} 
                           contentText={`${userType ? 'macarao com sasicha' : 'socoro jesus'}`} 
                           userType = {userType} 
                           Button={<Button onClick={()=>setUserType(!userType)} 
                            style={`text-md px-7 py-3 rounded-xl tracking-[0.2rem] text-white font-bold ${userType ? 'bg-primary-green300' : 'bg-alt-purple300'}`} 
                            content={`${userType ? 'Instrutor' : 'Aluno'}`} />}/>

        <div className="flex flex-col gap-6 text-white p-14  w-full ">
            <div className="flex flex-col gap-3">
                <span className="text-6xl font-bold text-primary-green300 ">Realizando cadastro</span>

                <span className="mt-3 text-base font-light">Quer acessar nossa aplicação? Vamos realizar seu cadastro!</span>
                <span className="text-base font-light">Insira algumas informações sobre você para fazermos o cadastro de sua conta!</span>
            </div>

        {userType ? <AlunoFormCadastro/> : <span> em construcao </span>}


        
        </div>
    </div>
</>
)
}

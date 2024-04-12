import { LoginRegisterCard } from "@components/LoginRegisterCard/loginRegisterCard";
import { useState } from "react";
import Button from "@components/Button/button.jsx"
import * as Tabs from '@radix-ui/react-tabs';
import { ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons'


export function CadastroPage() {

const [userType, setUserType] = useState(true)



return(
<>
    <div className="flex h-screen w-screen bg-black500 ">
        <LoginRegisterCard tittle={`${userType ? 'É um instrutor?' : 'É um aluno?'}`} 
                           contentText={`${userType ? 'macarao com sasicha' : 'socoro jesus'}`} 
                           userType = {userType} 
                           Button={<Button onClick={()=>setUserType(!userType)} 
                            style={`text-md px-7 py-3 rounded-xl tracking-[0.2rem] text-white font-bold ${userType ? 'bg-primary-green300' : 'bg-alt-purple300'}`} 
                            content={`${userType ? 'Instrutor' : 'Aluno'}`} />}/>

        <div className="flex flex-col gap-4 text-white p-14 pt-20 w-3/4">

            <div className="flex flex-col gap-3">
                <span className="text-5xl font-bold text-primary-green300 tracking-widest">Realizando cadastro</span>

                <span className="mt-3 text-sm font-light">Quer acessar nossa aplicação? Vamos realizar seu cadastro!</span>
                <span className="text-sm font-light">Insira algumas informações sobre você para fazermos o cadastro de sua conta!</span>
            </div>

        
            <Tabs.Root className="w-full flex flex-col items-center" defaultValue="tab1">
                <Tabs.List className="flex gap-6"  aria-label="tabs">
                    <Tabs.Trigger value="tab1"><ChevronLeftIcon /></Tabs.Trigger>
                     <Tabs.Trigger className="border-2 px-2 rounded-full" value="tab1">1</Tabs.Trigger>
                     <Tabs.Trigger className="border-2 px-2 rounded-full" value="tab2">2</Tabs.Trigger>
                    <Tabs.Trigger value="tab2"><ChevronRightIcon /></Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="tab1">


                </Tabs.Content>


                <Tabs.Content value="tab2">Tab two content</Tabs.Content>

            </Tabs.Root>
        
        </div>
    </div>
</>
)
}

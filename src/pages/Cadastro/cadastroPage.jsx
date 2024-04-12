import { LoginRegisterCard } from "@components/LoginRegisterCard/loginRegisterCard";
import { useState } from "react";
import Button from "@components/Button/button.jsx"
import * as Tabs from '@radix-ui/react-tabs';
import * as Label from '@radix-ui/react-label';
import { ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons'


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
                <span className="text-6xl font-bold text-primary-green300 tracking-widest">Realizando cadastro</span>

                <span className="mt-3 text-base font-light">Quer acessar nossa aplicação? Vamos realizar seu cadastro!</span>
                <span className="text-base font-light">Insira algumas informações sobre você para fazermos o cadastro de sua conta!</span>
            </div>

        
            <Tabs.Root className="w-full flex flex-col  h-3/5 items-center"   defaultValue="tab1">
                <Tabs.List className="flex gap-6"  aria-label="tabs">
                    <Tabs.Trigger value="tab1"><ChevronLeftIcon /></Tabs.Trigger>
                     <Tabs.Trigger className="border-2 px-2 rounded-full text-center data-[state=active]:text-primary-green300 data-[state=active]:border-primary-green300 data-[state=active]:scale-125" value="tab1">1</Tabs.Trigger>
                     <Tabs.Trigger className="border-2 px-[0.45rem] rounded-full data-[state=active]:text-primary-green300 data-[state=active]:border-primary-green300 data-[state=active]:scale-125" value="tab2">2</Tabs.Trigger>
                    <Tabs.Trigger value="tab2"><ChevronRightIcon /></Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content className="w-full flex flex-col justify-between gap-3 h-full  data-[state=inactive]:h-0 " value="tab1">
                    
                    <div className="flex">
                        <div className="w-2/4 flex flex-col items-start gap-5">
                            <fieldset className="flex flex-col w-4/5 gap-2">
                                <Label.Root htmlFor="data-username">
                                    Nome do usuário
                                </Label.Root>
                                <input type="text" className="text-black500 p-2 font-semibold placeholder:font-medium " placeholder="Ex: Cauã Gustavo" id="data-username"/>
                            </fieldset>

                            <fieldset className="flex flex-col w-4/5 gap-2">
                                <Label.Root htmlFor="data-email">
                                    E-mail
                                </Label.Root>
                                <input type="text" className="text-black500 p-2 font-semibold placeholder:font-medium" placeholder="Ex: caua@gmail.com" id="data-email"/>
                            </fieldset>

                            <fieldset className="flex flex-col w-4/5 gap-2">
                                <Label.Root htmlFor="data-nickname">
                                    Nickname
                                </Label.Root>
                                <input type="text" className="text-black500 p-2 font-semibold placeholder:font-medium" placeholder="Ex: Cacã" id="data-nickname"/>
                            </fieldset>
                        </div>

                        <div className="w-2/4 flex flex-col items-end gap-5">
                            <fieldset className="flex flex-col w-4/5 gap-2">
                                <Label.Root htmlFor="data-usernasc">
                                    Data de nascimento
                                </Label.Root>
                                <input type="text" className="text-black500 p-2 font-semibold placeholder:font-medium" id="data-usernasc"/>
                            </fieldset>

                            <fieldset className="flex flex-col w-4/5 gap-2">
                                <Label.Root htmlFor="data-genero">
                                    Gênero
                                </Label.Root>
                                <input type="text" className="text-black500 p-2 font-semibold placeholder:font-medium" id="data-genero"/>
                            </fieldset>

    
                        </div>
                    </div>

                    <fieldset className="place-self-end">
                            <Tabs.List className="flex gap-6"  aria-label="tabs">
                                <Tabs.Trigger value="tab2"> 
                                    <Button content={"Continuar"}
                                            style={`text-md px-7 py-3 rounded-xl tracking-[0.2rem] text-white font-bold ${userType ? 'bg-primary-green300' : 'bg-alt-purple300'}`} />

                                </Tabs.Trigger>
                            </Tabs.List>
                        </fieldset>
                </Tabs.Content>


                <Tabs.Content className="data-[state=inactive]:h-0" value="tab2">Tab two content</Tabs.Content>


            </Tabs.Root>
        
        </div>
    </div>
</>
)
}

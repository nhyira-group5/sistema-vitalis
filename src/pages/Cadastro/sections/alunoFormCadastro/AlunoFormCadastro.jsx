import {useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons'
import * as Tabs from '@radix-ui/react-tabs';
import * as Label from '@radix-ui/react-label';
import Button from "@components/Button/button.jsx"
import { Input } from '@components/Input/input';






export function AlunoFormCadastro() {
    const [formData, setFormData] = useState({
        nome: '',
        username: '',
        email: '',
        emailSecundario:'',
        senha: '',
        confSenha: '',
    
        dtNasc: '',
        genero: '',
        altura: '',
        peso: '',
    })

    const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
}

const handleChange = (event) =>{
    const{name, value} = event.target;
    setFormData(prevState =>({
        ...prevState,
        [name]: value,
    }));
}


    return(
    <>
        <Tabs.Root className="w-full flex flex-col  h-3/5 items-center"   defaultValue="tab1">
          <Tabs.List className="flex gap-6 items-center"   aria-label="tabs">
                  <ChevronLeftIcon />
                    <Tabs.Trigger className="border-2 px-2 rounded-full text-center data-[state=active]:text-primary-green300 data-[state=active]:border-primary-green300 data-[state=active]:scale-125" value="tab1">1</Tabs.Trigger>
                    <Tabs.Trigger className="border-2 px-[0.45rem] rounded-full data-[state=active]:text-primary-green300 data-[state=active]:border-primary-green300 data-[state=active]:scale-125" value="tab2">2</Tabs.Trigger>
                  <ChevronRightIcon />
            </Tabs.List>

                <Tabs.Content className="w-full flex flex-col justify-between gap-3 h-full data-[state=inactive]:hidden " value="tab1">
                        <form className="w-full grid grid-cols-2 gap-5">

                            <Input isColum={true}
                                   labelContent={"Nome do usuário"}
                                   placeholder={"Ex: Cauã gustavo"}
                                   onChangeFunction={handleChange}
                                   value={formData.nome}
                                   nome={"nome"}
                                   id={"data-nomeUsuaruo"}
                                   type={"text"}
                                   isRequired={true}
                                   />


                            <fieldset className="flex flex-col w-4/5 gap-2 place-self-end">
                                <Label.Root htmlFor="data-senha">
                                    Senha
                                </Label.Root>
                                <input type="text" 
                                       className="text-black500 p-2 font-semibold placeholder:font-medium"  
                                       id="data-senha" 
                                       name="senha" 
                                       value={formData.senha}
                                       onChange={handleChange}
                                       required/>
                            </fieldset>

                            <fieldset className="flex flex-col w-4/5 gap-2">
                                <Label.Root htmlFor="data-username">
                                    Username
                                </Label.Root>
                                <input type="text" 
                                       className="text-black500 p-2 font-semibold placeholder:font-medium" 
                                       placeholder="Ex: Cauã Gustavo de Souza Mesquita" 
                                       id="data-username" 
                                       name="username" 
                                       value={formData.username}
                                       onChange={handleChange}
                                       required/>
                            </fieldset>

                            <fieldset className="flex flex-col w-4/5 gap-2  place-self-end">
                                <Label.Root htmlFor="data-confSenha">
                                    Confirmar senha
                                </Label.Root>
                                <input type="text" 
                                       className="text-black500 p-2 font-semibold placeholder:font-medium" 
                                       id="data-confSenha" 
                                       name="confSenha" 
                                       value={formData.confSenha}
                                       onChange={handleChange}
                                       required/>
                            </fieldset>

                            <fieldset className="flex flex-col w-4/5 gap-2 ">
                                <Label.Root htmlFor="data-email">
                                    Email
                                </Label.Root>
                                <input type="text" 
                                        className="text-black500 p-2 font-semibold placeholder:font-medium" 
                                        id="data-email" 
                                        name="email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        required/>
                                        
                            </fieldset>
    
                            <fieldset className="place-self-end">
                                <Tabs.List className="flex gap-6 items-center"   aria-label="tabs">
                                        <Tabs.Trigger value="tab2">
                                        <Button content={"Continuar"}
                                                        style={`text-md px-7 py-3 rounded-xl tracking-[0.2rem] text-white font-bold bg-primary-green300`} />
            
                                        </Tabs.Trigger>
                                </Tabs.List>          
                            </fieldset>
                        </form>
                </Tabs.Content>


                <Tabs.Content className="w-full flex flex-col justify-between gap-3 h-full data-[state=inactive]:hidden " value="tab2">
                        <form className="w-full grid grid-cols-2 gap-5">
                               <Input/>
                            <fieldset className="place-self-end">
                                <Tabs.List className="flex gap-6 items-center"   aria-label="tabs">
                                        <Tabs.Trigger value="tab2">
                                        <Button content={"Continuar"}
                                                        style={`text-md px-7 py-3 rounded-xl tracking-[0.2rem] text-white font-bold bg-primary-green300`} />
            
                                        </Tabs.Trigger>
                                </Tabs.List>          
                            </fieldset>
                        </form>
                </Tabs.Content>


            </Tabs.Root>
    </>
    )
}
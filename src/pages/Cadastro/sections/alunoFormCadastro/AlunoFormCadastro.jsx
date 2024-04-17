import {useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon} from '@radix-ui/react-icons'
import * as Tabs from '@radix-ui/react-tabs';
import * as Label from '@radix-ui/react-label';
import Button from "@components/Button/button.jsx"
import { Input } from '@components/Input/input';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { InputMask } from '@react-input/mask';



export function AlunoFormCadastro() {


    const [formData, setFormData] = useState({
        nome: '',
        username: '',
        email: '',
        emailSecundario: '',
        senha: '',
        confSenha: '',
        dtNasc: '',
        sexo: '',
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
        <Tabs.Root className="w-full flex flex-col gap-6 h-3/5 items-center"   defaultValue="tab1">
          <Tabs.List className="flex gap-6 items-center"   aria-label="tabs">
                  <ChevronLeftIcon />
                    <Tabs.Trigger className="border-2 px-2 rounded-full text-center data-[state=active]:text-primary-green300 data-[state=active]:border-primary-green300 data-[state=active]:scale-125" value="tab1">1</Tabs.Trigger>
                    <Tabs.Trigger className="border-2 px-[0.45rem] rounded-full data-[state=active]:text-primary-green300 data-[state=active]:border-primary-green300 data-[state=active]:scale-125" value="tab2">2</Tabs.Trigger>
                  <ChevronRightIcon />
            </Tabs.List>

                <Tabs.Content className="w-full flex flex-col justify-between gap-3 h-full data-[state=inactive]:hidden" value="tab1">
                        <form className="w-full grid grid-cols-2 gap-x-[20%] gap-5">
                            <Input isColum={true}
                                   labelContent={"Nome do usuário"}
                                   placeholder={"Ex: Cauã gustavo"}
                                   onChangeFunction={handleChange}
                                   value={formData.nome}
                                   nome={"nome"}
                                   id={"data-nomeUsuaruo"}
                                   inputType={"text"}
                                   isRequired={true}
                                   />

                            <Input isColum={true}
                                   labelContent={"Senha"}
                                   placeholder={"**********"}
                                   onChangeFunction={handleChange}
                                   value={formData.senha}
                                   nome={"senha"}
                                   id={"data-senha"}
                                   inputType={"password"}
                                   isRequired={true}
                                   />

                            <Input isColum={true}
                                   labelContent={"Username"}
                                   placeholder={"Ex: Cauã Gustavo de Souza Mesquita"}
                                   onChangeFunction={handleChange}
                                   value={formData.username}
                                   nome={"username"}
                                   id={"data-username"}
                                   inputType={"text"}
                                   isRequired={true}
                                   />

                            <Input isColum={true}
                                   labelContent={"Confirmar senha"}
                                   placeholder={"***********"}
                                   onChangeFunction={handleChange}
                                   value={formData.confSenha}
                                   nome={"confSenha"}
                                   id={"data-confSenha"}
                                   inputType={"password"}
                                   isRequired={true}
                                   />

                            <Input isColum={true}
                                   labelContent={"Email"}
                                   placeholder={"caua@gmail.com"}
                                   onChangeFunction={handleChange}
                                   value={formData.email}
                                   nome={"email"}
                                   id={"data-email"}
                                   inputType={"email"}
                                   isRequired={true}
                                   />

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
                        <form className="w-full grid grid-cols-2 gap-x-[20%] gap-5" onSubmit={handleSubmit}>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>

                                <Label.Root
                                    className={`text-sm font-sm font-semibold flex flex-col gap-1 relative`}
                                >
                                    Sexo
                                    <button className={`w-full bg-white rounded-xl text-black500 flex  items-center px-6  ${formData.sexo ? 'py-[0.85rem]' : 'py-6' }`} > {formData.sexo} <ChevronDownIcon className='absolute right-5'/> </button>
                                    </Label.Root>

                                </DropdownMenu.Trigger>

                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content data-side="left" className="min-w-80 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade" sideOffset={5}>
                                    
                                        <DropdownMenu.Item  className=" text-sm  text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                                            <div className='w-full' onClick={() => handleChange({target: {name: 'sexo', value: 'Masculino'}})}>Masculino</div>
                                        </DropdownMenu.Item>

                                        <DropdownMenu.Item  className=" text-sm  text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                                            <div className='w-full' onClick={() => handleChange({target: {name: 'sexo', value: 'Feminino'}})}>Feminino</div>
                                        </DropdownMenu.Item>

                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>

                            <Label.Root
                                    className={`text-sm font-sm font-semibold flex flex-col gap-1 relative`}
                                >
                                    Altura
                                    <InputMask value={formData.altura} name='altura' onChange={handleChange} placeholder='1.80' className=' h-0 w-full px-3 py-[1.3rem] font-inter bg-white border-white border-2 rounded-xl outline-none focus:ring focus:ring-primary-green300 text-black500 invalid:ring-red-500 ' mask="_.__" replacement={{ _: /\d/ }} />
                            </Label.Root>

                            <Input isColum={true}
                                   labelContent={"Peso"}
                                   placeholder={"67,5"}
                                   onChangeFunction={handleChange}
                                   value={formData.peso}
                                   nome={"peso"}
                                   id={"data-peso"}
                                   inputType={"number"}
                                   isRequired={true}
                                   />

                            <Input isColum={true}
                                   labelContent={"Data de nascimento"}
                                   placeholder={"25/01/2004"}
                                   onChangeFunction={handleChange}
                                   value={formData.dtNasc}
                                   nome={"dtNasc"}
                                   id={"data-dtNasc"}
                                   inputType={"date"}
                                   isRequired={true}
                                   />
                            
                            <div>
                                {/* segredinho rs */}
                            </div>

                            <fieldset className="flex justify-end gap-6 items-center mt-5">

                                        <Button content={"Continuar"}
                                                style={`mt-[0.18rem] text-md px-7 py-3 rounded-xl tracking-[0.2rem] text-white font-bold bg-primary-green300`} 
                                                type={"submit"}/>
            
            
         
                            </fieldset>
                        </form>
                </Tabs.Content>


            </Tabs.Root>
    </>
    )
}
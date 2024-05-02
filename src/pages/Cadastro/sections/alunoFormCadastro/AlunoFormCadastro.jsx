import {useState } from 'react';
import Button from "@components/Button/button.jsx"
import { Input } from '@components/Input/input';
import {Select} from '@components/Select/select'

import { validateNome, validateSenha, validateUsername, validateConfSenha, validateEmail, validateIdade, validateCPF} from "@utils/validacoes";
import { User, PencilSimpleLine, EnvelopeSimple, Lock, CalendarDots, Hash} from "@phosphor-icons/react";

function createUserBody(userFormInfo){
   const userBody ={
        tipo: userFormInfo.tipo,
        nome: userFormInfo.nome,
        username: userFormInfo.username,
        cpf: userFormInfo.CPF,
        dtNasc: userFormInfo.dtNasc,
        genero: userFormInfo.sexo,
        email: userFormInfo.email,
        senha: userFormInfo.senha
    }
    
    return userBody;
}

export function AlunoFormCadastro() {

    const [isNomeValid, setIsNomeValid] = useState(true);
    const [isSenhaValid, setIsSenhaValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isConfSenhaValid, setIsConfSenhaValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isCPFValid, setIsCPFValid] = useState(true);
    const [isIdadeValid, setIsIdadeValid] = useState(true);
    const [isSexoSelecionado , setIsSexoSelecionado ] = useState(true);
    const [isFormValid, setIsFormValid] = useState(true);
    const [formData, setFormData] = useState({
        tipo: 'USUARIO',
        nome: '',
        username: '',
        email: '',
        CPF: '',
        senha: '',
        confSenha: '',
        dtNasc: '',
        sexo: '',
    })

    const handleSubmit = (event) => {
    event.preventDefault();
    
    const isNomeValid = validateNome(formData.nome);
    const isSenhaValid = validateSenha(formData.senha);
    const isUsernameValid = validateUsername(formData.username);
    const isConfSenhaValid = validateConfSenha(formData.confSenha, formData.senha);
    const isEmailValid = validateEmail(formData.email);
    const isIdadeValid = validateIdade(formData.dtNasc);
    const isCPFValid = validateCPF(formData.CPF);
    const isSexoSelecionado = formData.sexo && formData.sexo.trim() !== '';

    setIsNomeValid(isNomeValid);
    setIsSenhaValid(isSenhaValid);
    setIsUsernameValid(isUsernameValid);
    setIsConfSenhaValid(isConfSenhaValid);
    setIsEmailValid(isEmailValid);
    setIsIdadeValid(isIdadeValid);
    setIsCPFValid(isCPFValid);
    setIsSexoSelecionado(isSexoSelecionado);

    const isFormValid = isSexoSelecionado && isNomeValid && isSenhaValid && isUsernameValid && isConfSenhaValid && isEmailValid && isIdadeValid && isCPFValid ;
    setIsFormValid(isFormValid);

    if (isFormValid) {
        const userBody = createUserBody(formData);
        console.log(userBody)
       
     }
    }

    const handleChange = (event) =>{
        const{name, value} = event.target;

        setFormData(prevState =>({
            ...prevState,
            [name]: value,
        }));

        switch (name) {
            case 'nome':
              setIsNomeValid(true);
              break;
            case 'username':
              setIsUsernameValid(true);
              break;
            case 'email':
              setIsEmailValid(true);
              break;
            case 'senha':
              setIsSenhaValid(true);
              break;
            case 'confSenha':
              setIsConfSenhaValid(true);
              break;
            case 'dtNasc':
              setIsIdadeValid(true);
              break;
            case 'CPF':
              setIsCPFValid(true);
              break;
            case 'sexo':
              setIsSexoSelecionado(true);
              break;
            default:
              break;
            }
    }

    const nomeErroList = () =>{
        return(
            <ul>
                <li>O nome precisa ter 3 caracteres no minimo</li>
                <li>O nome não pode conter caracteres especiais</li>
            </ul>
        )
    }
    const senhaErroList = () => {
        return (
            <ul>
                <li>A senha precisa ter pelo menos 5 caracteres</li>
                <li>A senha deve conter pelo menos um número</li>
                <li>A senha deve conter pelo menos um caractere especial</li>
            </ul>
        );
    };
    const usernameErroList = () => {
        return (
            <ul>
                <li>O username precisa ter pelo menos 5 caracteres</li>
            </ul>
        );
    };
    const confSenhaErroList = () => {
        return (
            <ul>
                <li>As senhas não coincidem</li>
            </ul>
        );
    };
    const emailErroList = () => {
        return (
            <ul>
                <li>O email precisa ser válido</li>
            </ul>
        );
    };
    const idadeErroList = () => {
        return (
            <ul>
                <li>A idade deve ser maior que 18 anos</li>
            </ul>
        );
    };
    const CPFErrorList = () => {
        return (
            <ul>
                <li>CPF inválido</li>
            </ul>
        );
    };


    return(
    
    <form onSubmit={handleSubmit} className='grid grid-cols-2 grid-rows-5 gap-3 gap-x-16 h-full '>
        <Input labelContent={"Nome do usuário"}
               icon={<PencilSimpleLine size={32} color='#000000'/>}
               placeholder={"Cauê Augusto da Silva Paroquia"}
               
               nome={"nome"}
               value={formData.nome}
               onChangeFunction={handleChange}
               valid={!isNomeValid}
               invalidMessage={nomeErroList}
               />
     
        <Input labelContent={"Nickname"}
               icon={<User size={32} color='#000000'/>}
               placeholder={"CaueBigForças"}

               nome={"username"}
               value={formData.username}
               onChangeFunction={handleChange}
               valid={!isUsernameValid}
               invalidMessage={usernameErroList}
        />

        <Input labelContent={"Email"}
               icon={<EnvelopeSimple  size={32} color='#000000'/>}
               placeholder={"caue@gmail.com"}

               nome={"email"}
               value={formData.email}
               onChangeFunction={handleChange}
               valid={!isEmailValid}
               invalidMessage={emailErroList}
        />

        <Input labelContent={"Data de nascimento"}
               icon={<CalendarDots  size={32} color='#000000'/>}
               placeholder={"25/01/2004"}

               nome={"dtNasc"}
               value={formData.dtNasc}
               onChangeFunction={handleChange}
               
               inputType={"date"}
               valid={!isIdadeValid}
               invalidMessage={idadeErroList}
        />

        <Input labelContent={"Senha"}
               icon={<Lock   size={32} color='#000000'/>}
               placeholder={"◦◦◦◦◦◦"}

               nome={"senha"}
               value={formData.senha}
               onChangeFunction={handleChange}
               
               inputType={"password"}
               valid={!isSenhaValid}
               invalidMessage={senhaErroList}
        />

        <Input labelContent={"Confirmar senha"}
               icon={<Lock   size={32} color='#000000'/>}
               placeholder={"◦◦◦◦◦◦"}

               nome={"confSenha"}
               value={formData.confSenha}
               onChangeFunction={handleChange}
               
               inputType={"password"}
               valid={!isConfSenhaValid}
               invalidMessage={confSenhaErroList}
        />

        <Input labelContent={"CPF"}
               icon={<Hash size={32} color='#000000'/>}
               placeholder={"123.123.123-10"}

               nome={"CPF"}
               value={formData.CPF}
               onChangeFunction={handleChange}
               
               inputType={"number"}   
               valid={!isCPFValid} 
               invalidMessage={CPFErrorList}
               
        />

        <Select options={["Masculino", "Feminino"]}
                labelContent="Sexo"
                onChangeFunction={handleChange}
                id="sexo"
                nome="sexo"
                valid={!isSexoSelecionado}
        />

        <fieldset className='col-span-2 grid justify-center items-start'>
           <Button content={"Criar conta"}
                   type={"submit"}

                   buttonStyle={"text-gray100 bg-primary-green300 rounded-full font-bold px-5 py-4 hover:bg-primary-green400 transition-all flex items-center gap-1 w-[16rem] justify-center flex-row-reverse"}
                   />
        </fieldset>
    </form>
   
    )
}

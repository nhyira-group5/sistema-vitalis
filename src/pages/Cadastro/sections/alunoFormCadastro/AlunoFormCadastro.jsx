import { Select } from '@components/Select/select';
import { Button } from '@components/Button/button';
import { Input } from '@components/Input/input';
import { api } from '../../../../Api';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import {
  validateNome,
  validateSenha,
  validateUsername,
  validateConfSenha,
  validateEmail,
  validateIdade,
  validateCPF,
} from '@utils/validacoes';

import {
  User,
  PencilSimpleLine,
  EnvelopeSimple,
  Lock,
  CalendarDots,
  Hash,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export function AlunoFormCadastro() {
  const navigate = useNavigate();

  const redirecionarLogin = () => {
    navigate('/login');
  };

  function createUserBody(userFormInfo) {
    const userBody = {
      tipo: userFormInfo.tipo,
      nome: userFormInfo.nome,
      nickname: userFormInfo.username,
      cpf: userFormInfo.CPF.replace(/[^\d]+/g, ''),
      dtNasc: userFormInfo.dtNasc,
      sexo: userFormInfo.sexo,
      email: userFormInfo.email,
      senha: userFormInfo.senha,
    };

    return userBody;
  }

  const [isNomeValid, setIsNomeValid] = useState(true);
  const [isSenhaValid, setIsSenhaValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isConfSenhaValid, setIsConfSenhaValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCPFValid, setIsCPFValid] = useState(true);
  const [isIdadeValid, setIsIdadeValid] = useState(true);
  const [isSexoSelecionado, setIsSexoSelecionado] = useState(true);
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
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isNomeValid = validateNome(formData.nome);
    const isSenhaValid = validateSenha(formData.senha);
    const isUsernameValid = validateUsername(formData.username);
    const isConfSenhaValid = validateConfSenha(
      formData.confSenha,
      formData.senha,
    );
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

    const isFormValid =
      isSexoSelecionado &&
      isNomeValid &&
      isSenhaValid &&
      isUsernameValid &&
      isConfSenhaValid &&
      isEmailValid &&
      isIdadeValid &&
      isCPFValid;
    setIsFormValid(isFormValid);

    if (isFormValid) {
      try {
        const userBody = createUserBody(formData);

        const response = await api.post(`/usuarios`, userBody);

        toast.success('Usuário cadastrado com sucesso!');
        redirecionarLogin();
      } catch (error) {
        console.log(error);

        if (error.response && error.response.data) {
          if (error.response.data.errors) {
            error.response.data.errors.forEach((erroMsg) => {
              toast.error(erroMsg.defaultMessage);
            });
          } else {
            toast.error('Erro ao efetuar cadastro.');
          }
        } else {
          toast.error('Erro ao efetuar cadastro.');
        }
      }
    }
  };

  const sexos = [
    { nome: 'Masculino', id: 'M' },
    { nome: 'Feminino', id: 'F' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
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
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const nomeErroList = () => {
    return (
      <ul>
        <li>O nome precisa ter 3 caracteres no minimo</li>
        <li>O nome não pode conter caracteres especiais</li>
      </ul>
    );
  };
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

  return (
    <>
      <div className="flex flex-col gap-3 font-mavenPro text-start">
        <span className={`text-7xl font-bold text-primary-green300`}>
          Cadastro Aluno
        </span>

        <div className="flex flex-col gap-1">
          <span className="text-lg font-normal">
            Quer acessar nossa aplicação? Vamos realizar seu cadastro!
          </span>
          <span className="text-lg font-normal">
            Insira algumas informações sobre você para fazermos o cadastro de
            sua conta!
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="lg:gap-y-10 lg:h-full lg:flex lg: flex-col lg:overflow-auto
                 xl:gap-x-16 xl:gap-y-0 xl:h-full  xl:grid xl:grid-cols-2 xl:grid-rows-5 xl:overflow-auto"
      >
        <Input
          labelContent={'Nome do usuário'}
          icon={<PencilSimpleLine size={28} color="#000000" />}
          placeholder={'Cauê Augusto da Silva Paroquia'}
          nome={'nome'}
          value={formData.nome}
          onChangeFunction={handleChange}
          valid={!isNomeValid}
          invalidMessage={nomeErroList}
        />

        <Input
          labelContent={'Nickname'}
          icon={<User size={28} color="#000000" />}
          placeholder={'CaueBigForças'}
          nome={'username'}
          value={formData.username}
          onChangeFunction={handleChange}
          valid={!isUsernameValid}
          invalidMessage={usernameErroList}
        />

        <Input
          labelContent={'Email'}
          icon={<EnvelopeSimple size={28} color="#000000" />}
          placeholder={'caue@gmail.com'}
          nome={'email'}
          value={formData.email}
          onChangeFunction={handleChange}
          valid={!isEmailValid}
          invalidMessage={emailErroList}
        />

        <Input
          labelContent={'Data de nascimento'}
          icon={<CalendarDots size={28} color="#000000" />}
          placeholder={'25/01/2004'}
          nome={'dtNasc'}
          value={formData.dtNasc}
          onChangeFunction={handleChange}
          inputType={'date'}
          valid={!isIdadeValid}
          invalidMessage={idadeErroList}
        />

        <Input
          labelContent={'Senha'}
          icon={<Lock size={28} color="#000000" />}
          placeholder={'◦◦◦◦◦◦'}
          nome={'senha'}
          value={formData.senha}
          onChangeFunction={handleChange}
          inputType={'password'}
          valid={!isSenhaValid}
          invalidMessage={senhaErroList}
        />

        <Input
          labelContent={'Confirmar senha'}
          icon={<Lock size={28} color="#000000" />}
          placeholder={'◦◦◦◦◦◦'}
          nome={'confSenha'}
          value={formData.confSenha}
          onChangeFunction={handleChange}
          inputType={'password'}
          valid={!isConfSenhaValid}
          invalidMessage={confSenhaErroList}
        />

        <Input
          labelContent={'CPF'}
          icon={<Hash size={28} color="#000000" />}
          placeholder={'123.123.123-10'}
          nome={'CPF'}
          value={formData.CPF}
          onChangeFunction={handleChange}
          inputType={'text'}
          valid={!isCPFValid}
          invalidMessage={CPFErrorList}
        />

        <Select
          options={sexos}
          labelContent="Sexo"
          onChangeFunction={handleChange}
          id="sexo"
          nome="sexo"
          valid={!isSexoSelecionado}
          placeholder={'Selecione um sexo'}
        />

        <fieldset className="col-span-2 grid justify-center items-center">
          <Button
            content={'Criar conta'}
            type={'submit'}
            buttonStyle={
              'text-gray100 bg-primary-green300 rounded-full font-bold px-5 py-4 hover:bg-primary-green400 transition-all flex items-center gap-1 w-[16rem] justify-center flex-row-reverse'
            }
          />
        </fieldset>
      </form>
    </>
  );
}

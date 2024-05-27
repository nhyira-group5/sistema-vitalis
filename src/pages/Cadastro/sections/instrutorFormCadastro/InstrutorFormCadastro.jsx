import axios from "axios";
import { useState } from "react";
import { AltInput } from "@components/Input/input";
import Button from "@components/Button/button.jsx";
import { Select } from "@components/Select/select";

import {
  validateNome,
  validateSenha,
  validateUsername,
  validateConfSenha,
  validateEmail,
  validateIdade,
  validateCPF,
  validateCEP,
} from "@utils/validacoes";
import {
  User,
  PencilSimpleLine,
  EnvelopeSimple,
  Lock,
  CalendarDots,
  Hash,
  MapPinArea,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react";
import { api } from "../../../../apis/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function userCriacaoDto(userFormInfo) {
  const userDto = {
    tipo: userFormInfo.tipo,
    nome: userFormInfo.nome,
    username: userFormInfo.username,
    cpf: userFormInfo.CPF,
    dtNasc: userFormInfo.dtNasc,
    genero: userFormInfo.sexo == "Feminino" ? "F" : "M",
    email: userFormInfo.email,
    senha: userFormInfo.senha,
  };

  return userDto;
}

function enderecoAcademiaCriacaoDto(userFormInfo) {
  const enderecoAcademiaDto = {
    logradouro: userFormInfo.rua,
    numero: userFormInfo.numero,
    bairro: userFormInfo.bairro,
    cidade: userFormInfo.cidade,
    estado: userFormInfo.estado,
    cep: userFormInfo.cep,
    complemento: "",
    idPersonal: 0,
  };

  return enderecoAcademiaDto;
}

export function InstrutorFormCadastro() {
  const navigate = useNavigate();
  const redirecionarLogin = () => {
    navigate("/login");
  };

  const [formStep, setFormStep] = useState(1);

  const [isNomeValid, setIsNomeValid] = useState(true);
  const [isSenhaValid, setIsSenhaValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isConfSenhaValid, setIsConfSenhaValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCPFValid, setIsCPFValid] = useState(true);
  const [isIdadeValid, setIsIdadeValid] = useState(true);
  const [isSexoSelecionado, setIsSexoSelecionado] = useState(true);

  const [isCepValid, setIsCepValid] = useState(true);
  const [isNumeroValid, setIsNumeroValid] = useState(true);

  const [isFormValid, setIsFormValid] = useState(true);
  const [isForm2Valid, setIsForm2Valid] = useState(true);

  const [formData, setFormData] = useState({
    tipo: "PERSONAL",
    nome: "",
    username: "",
    email: "",
    CPF: "",
    senha: "",
    confSenha: "",
    dtNasc: "",
    sexo: "",

    cep: "",
    rua: "",
    estado: "",
    bairro: "",
    numero: "",
    cidade: "",
  });

  function formNextStep() {
    setFormStep((prevStep) => prevStep + 1);
  }

  function formPreviusStep() {
    setFormStep((prevStep) => prevStep - 1);
  }

  function buscaCep() {
    let cepValue = formData.cep;

    cepValue = cepValue.replace(" ", "");
    cepValue = cepValue.replace(".", "");
    cepValue = cepValue.replace("-", "");
    cepValue = cepValue.trim();

    if (validateCEP(cepValue)) {
      axios
        .get(`https://viacep.com.br/ws/${cepValue}/json/`)
        .then((response) => {
          console.log(response);

          setFormData((prevState) => ({
            ...prevState,
            rua: response.data.logradouro,
            estado: response.data.uf,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
          }));
          return;
        });
    }

    setFormData((prevState) => ({
      ...prevState,
      rua: "",
      estado: "",
      bairro: "",
      cidade: "",
    }));
  }

  const handleFirstSubmit = (event) => {
    event.preventDefault();

    const isNomeValid = validateNome(formData.nome);
    const isSenhaValid = validateSenha(formData.senha);
    const isUsernameValid = validateUsername(formData.username);
    const isConfSenhaValid = validateConfSenha(
      formData.confSenha,
      formData.senha
    );
    const isEmailValid = validateEmail(formData.email);
    const isIdadeValid = validateIdade(formData.dtNasc);
    const isCPFValid = validateCPF(formData.CPF);
    const isSexoSelecionado = formData.sexo && formData.sexo.trim() !== "";

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
      console.log(formData);
      formNextStep();
    }
  };

  const handleSecondSubmit = (event) => {
    event.preventDefault();

    const isCepValid = validateCEP(formData.cep);
    const isNumeroValid = formData.numero && formData.numero.trim != "";

    setIsCepValid(isCepValid);
    setIsNumeroValid(isNumeroValid);

    const isForm2Valid = isCepValid && isNumeroValid;
    setIsForm2Valid(isForm2Valid);

    if (isForm2Valid) {
      const userDto = userCriacaoDto(formData);
      const enderecoAcademiaDto = enderecoAcademiaCriacaoDto(formData);
      console.log(userDto);
      console.log(enderecoAcademiaDto);
      handleForm(userDto, enderecoAcademiaDto);
    }
  };

  function handleForm(userDto, enderecoAcademiaDto) {

    let idUsuario = 0;
    api.post(`/usuarios`, userDto)
      .then((response) => {
        console.log("usuario criado");
        toast.success("Usuário criado com sucesso!")
        idUsuario = response.data.id;
        console.log("id: " + idUsuario);

        console.log("iniciando criação de endereço da academia");

        const enderecoAcademia = enderecoAcademiaDto;
        console.log("primeiro objeto:", enderecoAcademia);
        enderecoAcademia.idPersonal = idUsuario;
        console.log("segundo objeto:", enderecoAcademia);
        

        api.post(`/endereco`, enderecoAcademia)
          .then((response) => {
            toast.success("Endereço criado com sucesso!")
            console.log("endereço da academia criado");
            redirecionarLogin();
          
          })
          .catch((error) => {
            console.error("ele num qr n", error);
            toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.")
          });
      })
      .catch((error) => {
        console.error("erro criacao usuario", error);
        toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.")
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "nome":
        setIsNomeValid(true);
        break;
      case "username":
        setIsUsernameValid(true);
        break;
      case "email":
        setIsEmailValid(true);
        break;
      case "senha":
        setIsSenhaValid(true);
        break;
      case "confSenha":
        setIsConfSenhaValid(true);
        break;
      case "dtNasc":
        setIsIdadeValid(true);
        break;
      case "CPF":
        setIsCPFValid(true);
        break;
      case "sexo":
        setIsSexoSelecionado(true);
        break;
      case "cep":
        setIsCepValid(true);
        break;
      case "numero":
        setIsNumeroValid(true);
        break;

      default:
        break;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
  const CEPErrorList = () => {
    return (
      <ul>
        <li>CEP inválido</li>
      </ul>
    );
  };
  const numeroErrorList = () => {
    return (
      <ul>
        <li>Insira um número.</li>
      </ul>
    );
  };

  return (
    <>
         <div className={`${formStep == 1 ? "flex flex-col gap-3" : "hidden"}`}>
            <span
              className={`text-7xl font-bold text-alt-purple300`}
            >
              Cadastro Personal
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-lg font-normal">
                Quer acessar nossa aplicação? Vamos realizar seu cadastro!
              </span>
              <span className="text-lg font-normal">
                Insira algumas informações sobre você para fazermos o cadastro
                de sua conta!
              </span>
            </div>
          </div>


          <div className={`${formStep == 2 ? "flex flex-col gap-3" : "hidden"}`}>
            <span
              className={`text-7xl font-bold text-alt-purple300`}
            >
              Seu Endereço!
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-lg font-normal">
                Muito bem! Você está quase lá! Só mais alguns passos...
              </span>
              <span className="text-lg font-normal">
                Agora insira algumas informações sobre a localização da academia aonde você trabalha.
              </span>
            </div>
          </div>



      <form
        onSubmit={handleFirstSubmit}
        className={`lg:gap-y-10 lg:h-full lg:flex-col lg:overflow-auto
        xl:gap-x-16 xl:gap-y-0 xl:h-full xl:grid-cols-2 xl:grid-rows-5 xl:overflow-auto ${formStep == 1 ? "lg:flex  xl:grid" : "hidden"}`}
      >
        <AltInput
          labelContent={"Nome do usuário"}

          icon={<PencilSimpleLine size={`28`} color="#000000" />}
          placeholder={"Cauê Augusto da Silva Paroquia"}
          nome={"nome"}
          value={formData.nome}
          onChangeFunction={handleChange}
          valid={!isNomeValid}
          invalidMessage={nomeErroList}
        />

        <AltInput
          labelContent={"Nickname"}
          icon={<User size={`28`} color="#000000" />}
          placeholder={"CaueBigForças"}
          nome={"username"}
          value={formData.username}
          onChangeFunction={handleChange}
          valid={!isUsernameValid}
          invalidMessage={usernameErroList}
        />

        <AltInput
          labelContent={"Email"}
          icon={<EnvelopeSimple size={`28`} color="#000000" />}
          placeholder={"caue@gmail.com"}
          nome={"email"}
          value={formData.email}
          onChangeFunction={handleChange}
          valid={!isEmailValid}
          invalidMessage={emailErroList}
        />

        <AltInput
          labelContent={"Data de nascimento"}
          icon={<CalendarDots size={`28`} color="#000000" />}
          placeholder={"25/01/2004"}
          nome={"dtNasc"}
          value={formData.dtNasc}
          onChangeFunction={handleChange}
          inputType={"date"}
          valid={!isIdadeValid}
          invalidMessage={idadeErroList}
        />

        <AltInput
          labelContent={"Senha"}
          icon={<Lock size={`28`} color="#000000" />}
          placeholder={"◦◦◦◦◦◦"}
          nome={"senha"}
          value={formData.senha}
          onChangeFunction={handleChange}
          inputType={"password"}
          valid={!isSenhaValid}
          invalidMessage={senhaErroList}
        />

        <AltInput
          labelContent={"Confirmar senha"}
          icon={<Lock size={`28`} color="#000000" />}
          placeholder={"◦◦◦◦◦◦"}
          nome={"confSenha"}
          value={formData.confSenha}
          onChangeFunction={handleChange}
          inputType={"password"}
          valid={!isConfSenhaValid}
          invalidMessage={confSenhaErroList}
        />

        <AltInput
          labelContent={"CPF"}
          icon={<Hash size={`28`} color="#000000" />}
          placeholder={"123.123.123-10"}
          nome={"CPF"}
          value={formData.CPF}
          onChangeFunction={handleChange}
          inputType={"text"}
          valid={!isCPFValid}
          invalidMessage={CPFErrorList}
        />

        <Select
          options={["Masculino", "Feminino"]}
          labelContent="Sexo"
          labelStyle={
            "group-focus-within:text-alt-purple300 text-lg font-bold pl-[8%]"
          }
          selectStyle={
            "group-focus-within:!ring-alt-purple300  h-16 p-3  relative flex w-full  bg-gray100 border-gray100 border-2 rounded-full outline-none ring-1 ring-gray500"
          }
          onChangeFunction={handleChange}
          id="sexo"
          nome="sexo"
          valid={!isSexoSelecionado}
          placeholder={"Selecione um sexo"}
        />

        <fieldset className="col-span-2 grid justify-center items-center">
          <Button
            content={"Continuar"}
            type={"submit"}
            buttonStyle={
              "text-gray100 bg-alt-purple300 rounded-full font-bold px-5 py-4 hover:bg-alt-purple400 transition-all flex items-center gap-1 flex-row-reverse justify-center w-[16rem]"
            }
            icon={<ArrowRight />}
          />
        </fieldset>
      </form>

      <form
        onSubmit={handleSecondSubmit}
        className={`lg:gap-y-10 lg:h-full lg:flex-col lg:overflow-auto
        xl:gap-x-16 xl:gap-y-0 xl:h-full xl:grid-cols-2 xl:grid-rows-5 xl:overflow-auto ${formStep == 2 ? "lg:flex  xl:grid" : "hidden"}`}
      >

        <AltInput
          labelContent={"CEP"}
          icon={<MapPinArea size={`28`} color="#000000" />}
          placeholder={"0451845"}
          nome={"cep"}
          value={formData.cep}
          onChangeFunction={handleChange}
          onBlurFunction={buscaCep}
          inputType={"text"}
          valid={!isCepValid}
          invalidMessage={CEPErrorList}
        />

        <AltInput
          labelContent={"Rua/Logradouro"}
          icon={<MapPinArea size={`28`} color="#000000" />}
          placeholder={"Hadock Lobo"}
          nome={"rua"}
          value={formData.rua}
          onChangeFunction={handleChange}
          disabled={true}
        />

        <AltInput
          labelContent={"Estado"}
          icon={<MapPinArea size={`28`} color="#000000" />}
          placeholder={"São Paulo"}
          nome={"estado"}
          value={formData.estado}
          onChangeFunction={handleChange}
          disabled={true}
        />

        <AltInput
          labelContent={"Bairro"}
          icon={<MapPinArea size={`28`} color="#000000" />}
          placeholder={"Guaianases"}
          nome={"bairro"}
          value={formData.bairro}
          onChangeFunction={handleChange}
          disabled={true}
        />

        <AltInput
          labelContent={"Número"}
          icon={<MapPinArea size={`28`} color="#000000" />}
          placeholder={"1313"}
          nome={"numero"}
          value={formData.numero}
          onChangeFunction={handleChange}
          valid={!isNumeroValid}
          invalidMessage={numeroErrorList}
        />

        <AltInput
          labelContent={"Cidade"}
          icon={<MapPinArea size={`28`} color="#000000" />}
          placeholder={"SP"}
          nome={"cidade"}
          value={formData.cidade}
          onChangeFunction={handleChange}
        />

        <fieldset className=" grid justify-end items-start">
          <Button
            content={"Voltar"}
            type={"button"}
            onClick={formPreviusStep}
            buttonStyle={
              "text-gray100 bg-gray300 rounded-full font-bold px-5 py-4 hover:bg-gray400 transition-all flex items-center gap-1 w-[16rem] justify-center"
            }
            icon={<ArrowLeft />}
          />
        </fieldset>

        <fieldset className=" grid justify-start items-start">
          <Button
            content={"Criar conta"}
            type={"submit"}
            buttonStyle={
              "text-gray100 bg-alt-purple300 rounded-full font-bold px-5 py-4 hover:bg-alt-purple400 transition-all flex items-center gap-1 w-[16rem] justify-center"
            }
          />
        </fieldset>
      </form>

    </>
  );
}

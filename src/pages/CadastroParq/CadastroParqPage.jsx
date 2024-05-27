import { Select } from "@components/Select/select";
import Button from "@components/Button/button.jsx";
import { DisplayInput, Input } from "@components/Input/input";
import { api } from "@apis/api";
import { toast } from "react-toastify";
import { useState } from "react";


import {Checkbox} from "@components/Checkbox/checkbox.jsx"

import {
  validatePeso,
  validateAltura
} from "@utils/validacoes";

import {
  Ruler,
  Barbell 
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export function CadastroParqPage() {
  const navigate = useNavigate();
   const redirecionarLogin = () => {
     navigate("/login");
   };

 


  const [isMetaSelecionado, setIsMetaSelecionado] = useState(true);
  const [isPesoValid, setIsPesoValid] = useState(true);
  const [isAlturaValid, setIsAlturaValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formData, setFormData] = useState({
    peso : "",
    altura: "",
    meta: "",
  });

  const handleFirstSubmit = (event) => {
    event.preventDefault();

    if (isFormValid) {
      console.log(formData);
      formNextStep();
    }
  };

  const handleSecondSubmit = (event) => {
    event.preventDefault();

    const isPesoValid = validatePeso(formData.peso);
    const isAlturaValid = validateAltura(formData.altura);


    const isForm2Valid =
          isPesoValid &&
          isAlturaValid; 

    setIsForm2Valid(isForm2Valid);

    if (isForm2Valid) {

    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
    }
  };

  const pesoErrorList = () => {
    return (
      <ul>
        <li>Insira um peso válido!</li>
      </ul>
    );
  };
  const alturaErrorList = () => {
    return (
      <ul>
        <li>Insira um peso válido!</li>
      </ul>
    );
  };

  return (
  <>


<div className="flex">
      <div className="w-1/2 h-screen bg-gray500 py-16 px-11 flex flex-col text-white overflow-auto">

          <div className={`flex flex-col gap-3`}>
            <span
              className={`text-7xl font-bold text-primary-green300`} 
            >
              Estamos quase lá
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-lg font-normal">
                Antes de você acessar nosso sistema, informe algumas informações sobre você e sua saúde.
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSecondSubmit}
            className={`lg:gap-y-10 lg:h-full lg:flex-col lg:overflow-auto lg:flex
                        xl:gap-x-16 xl:gap-y-10 xl:h-fit xl:grid-cols-2 xl:grid-flow-row xl:overflow-auto xl:grid xl:auto-rows-auto`}
          >
          <fieldset className="h-fit">
            <Input
              labelContent={"Peso em kg"}
              icon={<Barbell size={28} color="#000000" />}
              placeholder={"74kg"}
              nome={"peso"}
              value={formData.peso}
              onChangeFunction={handleChange}
              inputType={"number"}
              valid={!isPesoValid}
              invalidMessage={pesoErrorList}
            />
          </fieldset>
          <fieldset className="h-fit">
            <Input
              labelContent={"Altura em CM"}
              icon={<Ruler size={28} color="#000000" />}
              placeholder={"190"}
              nome={"altura"}
              value={formData.altura}
              onChangeFunction={handleChange}
              inputType={"number"}
              valid={!isAlturaValid}
              invalidMessage={alturaErrorList}
            />
          </fieldset>
          <fieldset className="col-span-2 h-fit">
            <Select
              options={["socorro"]}
              labelContent="Meta"
              onChangeFunction={handleChange}
              id="meta"
              nome="meta"
              valid={!isMetaSelecionado}
              placeholder={"Selecione uma meta"}
            />
          </fieldset>

          <fieldset className="col-span-2 grid auto-rows-auto grid-flow-row gap-y-3 h-full overflow-auto scrollbar-thin" >
            <Checkbox Id={"problemaCardiaco"}  labelcontent={"Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?"}/>
            <Checkbox Id={"dorPeitoAtividade"} labelcontent={"Você sente dores no peito quando pratica atividade física?"}/>
            <Checkbox Id={"dorPeitoUltimoMes"} labelcontent={"No último mês, você sentiu dores no peito quando praticou atividade física?"}/>
            <Checkbox Id={"problemaOsseoArticular"} labelcontent={"Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?"}/>
            <Checkbox Id={"medicamentoPressaoCoracao"} labelcontent={"Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?"}/>
            <Checkbox Id={"ImpedimentoAtividade"} labelcontent={"Sabe de alguma outra razão pela qual você não deve praticar atividade física?"}/>
          </fieldset>


          </form>

      </div>

      <div className="w-1/2 h-screen bg-white py-16 px-11 flex flex-col text-white overflow-auto">

        <form action="" className="grid grid-cols-6 gap-y-3 gap-x-6 p-5  grid-flow-row auto-rows-auto bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.30)] w-full h-full">
            <fieldset className="col-span-6">
              <DisplayInput
                labelContent={"Nome completo"}
                placeholder={"Nome completo do usuário"}
                nome={"nomeCompletoUsuario"}
                onChangeFunction={""}
                inputType={"text"}

                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-2">
              <DisplayInput
                labelContent={"CPF"}
                placeholder={"CPF do usuário"}
                nome={"cpfUsuario"}
                onChangeFunction={""}
                inputType={"text"}
                disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-2">
              <DisplayInput
                  labelContent={"Dt. Nascimento"}
                  placeholder={"--/--/----"}
                  nome={"dtNascimentoUsuario"}
                  onChangeFunction={""}
                  inputType={"text"}
                  disabled={true}
                />
            </fieldset>

            <fieldset className="col-span-2">
              <DisplayInput
                  labelContent={"Sexo"}
                  placeholder={"Sexo do usuário"}
                  nome={"sexo"}
                  onChangeFunction={""}
                  inputType={"text"}
                  disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-6">
              <DisplayInput
                  labelContent={"Email"}
                  placeholder={"Email do usuário"}
                  nome={"emailUsuario"}
                  onChangeFunction={""}
                  inputType={"Email"}
                  disabled={true}
              />
            </fieldset>


            <fieldset className="col-span-4">
              <DisplayInput
                  labelContent={"Meta"}
                  placeholder={"Meta do usuário"}
                  nome={"metaUsuario"}
                  onChangeFunction={""}
                  inputType={"text"}
                  disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-1">
              <DisplayInput
                  labelContent={"Peso"}
                  placeholder={"Peso"}
                  nome={"pesoUsuario"}
                  onChangeFunction={""}
                  inputType={"text"}
                  disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-1">
              <DisplayInput
                  labelContent={"Altura"}
                  placeholder={"Altura"}
                  nome={"AlturaUsuario"}
                  onChangeFunction={""}
                  inputType={"text"}
                  disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-6 grid auto-rows-auto grid-flow-row gap-y-2 h-full overflow-auto scrollbar-thin" >
              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"} 
                  Id={"displayProblemaCardiaco"} 
                  labelcontent={"Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?"}
                  />

              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"} 
                  Id={"displayDorPeitoAtividade"} 
                  labelcontent={"Você sente dores no peito quando pratica atividade física?"}
                  />

              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"} 
                  Id={"displayDorPeitoUltimoMes"} 
                  labelcontent={"No último mês, você sentiu dores no peito quando praticou atividade física?"}
                  />

              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"}               
                  Id={"displayProblemaOsseoArticular"} 
                  labelcontent={"Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?"}
                  />

              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"}               
                  Id={"displayMedicamentoPressaoCoracao"} 
                  labelcontent={"Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?"}
                  />
              
              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"}               
                  Id={"displayImpedimentoAtividade"} 
                  labelcontent={"Sabe de alguma outra razão pela qual você não deve praticar atividade física?"}
                  />
            </fieldset>

            <fieldset className="col-span-6 grid place-items-center">
            <Button
              content={"Concluir cadastro"}
              
              variant={"accept"}
              buttonStyle={"text-gray100 bg-primary-green300 rounded-full font-bold px-10 py-4 hover:bg-primary-green400 transition-all flex items-center gap-1"}
              
            />
            </fieldset>

        </form>

      </div>

  </div>
    </>
  );
}

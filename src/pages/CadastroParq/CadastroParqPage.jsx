import { Select } from "@components/Select/select";
import Button from "@components/Button/button.jsx";
import { Input } from "@components/Input/input";
import { api } from "@apis/api";
import { toast } from "react-toastify";
import { useState } from "react";

import * as Checkbox from '@radix-ui/react-checkbox';


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
  // const redirecionarLogin = () => {
  //   navigate("/login");
  // };

 


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



  <div className="w-1/2 h-screen bg-gray500 py-16 px-11 flex flex-col text-white">

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
        className={`lg:gap-y-10 lg:h-full lg:flex-col lg:overflow-auto
        xl:gap-x-16 xl:gap-y-0 xl:h-full xl:grid-cols-2 xl:grid-rows-5 xl:overflow-auto lg:flex xl:grid`}
      >

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
      
      <fieldset className="col-span-2">
        <Select
          options={["socorro"]}
          labelContent="Meta"
          onChangeFunction={handleChange}
          id="meta"
          nome="meta"
          valid={!isMetaSelecionado}
        />
      </fieldset>

      <div className="flex items-center">
        <Checkbox.Root
          className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
          defaultChecked
          id="c1"
        >
          <Checkbox.Indicator className="text-violet11">
           <Checkbox.Indicator />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="pl-[15px] text-[15px] leading-none text-white" htmlFor="c1">
          Accept terms and conditions.
        </label>
      </div>

      </form>

  </div>
    </>
  );
}

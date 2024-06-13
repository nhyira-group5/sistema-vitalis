import { Select } from "@components/Select/select";
import Button from "@components/Button/button.jsx";
import { DisplayInput, Input } from "@components/Input/input";
import { api } from "@apis/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import {getLoginResponse, formatarCPF, converterDataFormato} from "@utils/globalFunc"

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


function fichaDtoCriacao(userFormInfo) {
  const fichaDto = {
    problemasCardiacos: userFormInfo.problemasCardiacos,
    dorPeitoAtividade: userFormInfo.dorPeitoAtividade,
    dorPeitoUltimoMes: userFormInfo.dorPeitoUltimoMes,
    problemaOsseoArticular: userFormInfo.problemaOsseoArticular,
    medicamentoPressaoCoracao: userFormInfo.medicamentoPressaoCoracao,
    impedimentoAtividade: userFormInfo.impedimentoAtividade,
    altura: userFormInfo.altura,
    peso: userFormInfo.peso,
    usuarioId: userFormInfo.idUsuario,
    rotinaUsuarioId: null
  };

  return fichaDto;
}




function rotinaUsuarioDtoCriacao(userFormInfo) {
  const rotinaUsuarioDto = {
    metaId: userFormInfo.metaId,
    usuarioId: userFormInfo.idUsuario
  };

  return rotinaUsuarioDto;
}

export function CadastroParqPage() {
  const navigate = useNavigate();

   const redirecionarLogin = () => {
     navigate("/login");
   };

 


  const [metas, setMetas] = useState([]);
  const [usuarioData, setUsuarioData] = useState({});

  const [isMetaSelecionado, setIsMetaSelecionado] = useState(true);

  const [isPesoValid, setIsPesoValid] = useState(true);
  const [isAlturaValid, setIsAlturaValid] = useState(true);


  const [isFormValid, setIsFormValid] = useState(true);
  const [formData, setFormData] = useState({
    peso : "",
    altura: "",
    metaId: null,
    metaNome: null,
    idUsuario: null,

    problemasCardiacos: 0,
    dorPeitoAtividade: 0,
    dorPeitoUltimoMes: 0,
    problemaOsseoArticular: 0,
    medicamentoPressaoCoracao : 0,
    impedimentoAtividade : 0
  });

  useEffect(()=>{
    console.log(formData)
  },[formData])


  
  function getMetas(){
    const metasResponse = [{
      id: 1,
      nome: "Sexo de ladinho"
      }, 
      {
        id: 2,
        nome: "Boquete parafuso"
      }
  ]

    setMetas([...metas,...metasResponse])
    // api.get(`/metas`)
    // .then((response) =>{

    //   setMetas([...metas,...response.data])
    // })      
    // .catch((error) => {
    //   error.response.data.errors.forEach((erroMsg) => {
    //     console.log(erroMsg.defaultMessage)
    //   })
    // });
}

function getUsuarioResponse(id){
    api.get(`/usuarios/${id}`)
    .then((response) =>{

      setUsuarioData(response.data)
    })      
    .catch((error) => {
      error.response.data.errors.forEach((erroMsg) => {
        console.log(erroMsg.defaultMessage)
      })
    });
}

const encontrarMetaPeloId = (id, lista) => {
  const metaEncontrada = lista.find(meta => meta.id === id);
  return metaEncontrada? metaEncontrada.nome : 'Meta não encontrada';
};


  useEffect(()=>{
    const loginResponse = getLoginResponse();

    setFormData((prevState) => ({
      ...prevState,
      idUsuario: loginResponse.id,
    }));

    getUsuarioResponse(loginResponse.id);
    getMetas();
  },[])





  const handleSubmit = async (event) => {
    event.preventDefault();

    const isPesoValid = validatePeso(formData.peso);
    const isAlturaValid = validateAltura(formData.altura);
    const isMetaSelecionado = formData.metaId && formData.metaId.trim() !== "";

    setIsPesoValid(isPesoValid);
    setIsAlturaValid(isAlturaValid);
    setIsMetaSelecionado(isMetaSelecionado)

    const isFormValid =
          isPesoValid &&
          isAlturaValid &&
          isMetaSelecionado; 

    setIsFormValid(isFormValid);

    if (isFormValid) {
      try {
        const fichaDto = fichaDtoCriacao(formData);
        
        const rotinaUsuarioDto = rotinaUsuarioDtoCriacao(formData);
        // const rotinaUsuariosResponse = await api.post(`/rotinaUsuarios`, rotinaUsuarioDto);
        
        // fichaDto.rotinaUsuarioId = rotinaUsuariosResponse.data.id
        await api.post(`/fichas`, fichaDto);
       

        navigate("/home");

        } catch (error) {
          console.log(error)
          error.response.data.errors.forEach((erroMsg) => {
            toast.error(
              erroMsg.defaultMessage
            );
          })
  }
    }

  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
 
    
    if(type === "checkbox"){
      const value = checked == true ? 1 : 0;

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  
    }
    switch (name) {
        case "metaId":
          const metaEncontrada = metas.find(meta => meta.id === parseInt(value, 10)); 
          
          if (metaEncontrada) {
            setFormData((prevState) => ({
              ...prevState,
              metaNome: metaEncontrada.nome,
            }));
          } 
          break;
        case "peso":
          setIsPesoValid(true);
          break;
        case "altura":
          setIsAlturaValid(true);
          break;

      default:
        break;
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
        <li>Insira uma altura válida!</li>
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
              placeholder={"190cm"}
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
              options={metas}
              labelContent="Meta"
              onChangeFunction={handleChange}
              id="metaId"
              nome="metaId"
              valid={!isMetaSelecionado}
              placeholder={"Selecione uma meta"}
            />
          </fieldset>

          <fieldset className="col-span-2 grid auto-rows-auto grid-flow-row gap-y-3 h-full overflow-auto scrollbar-thin" >
            <Checkbox onChangeFunction={handleChange} name={'problemasCardiacos'} Id={"problemasCardiacos"}  labelcontent={"Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?"}/>
            <Checkbox onChangeFunction={handleChange} name={'dorPeitoAtividade'} Id={"dorPeitoAtividade"} labelcontent={"Você sente dores no peito quando pratica atividade física?"}/>
            <Checkbox onChangeFunction={handleChange} name={'dorPeitoUltimoMes'} Id={"dorPeitoUltimoMes"} labelcontent={"No último mês, você sentiu dores no peito quando praticou atividade física?"}/>
            <Checkbox onChangeFunction={handleChange} name={'problemaOsseoArticular'} Id={"problemaOsseoArticular"} labelcontent={"Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?"}/>
            <Checkbox onChangeFunction={handleChange} name={'medicamentoPressaoCoracao'} Id={"medicamentoPressaoCoracao"} labelcontent={"Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?"}/>
            <Checkbox onChangeFunction={handleChange} name={'impedimentoAtividade'} Id={"ImpedimentoAtividade"} labelcontent={"Sabe de alguma outra razão pela qual você não deve praticar atividade física?"}/>
          </fieldset>


          </form>

      </div>

      <div className="w-1/2 h-screen bg-white py-16 px-11 flex flex-col text-white overflow-auto">

        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-y-3 gap-x-6 p-5  grid-flow-row auto-rows-auto bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.30)] w-full h-full">
            <fieldset className="col-span-6">
              <DisplayInput
                labelContent={"Nome completo"}
                placeholder={"Nome completo do usuário"}
                nome={"nomeCompletoUsuario"}
                onChangeFunction={""}
                inputType={"text"}
                value={usuarioData.nome?? ""}
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
                value={formatarCPF(usuarioData.cpf)?? ""}
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
                  value={converterDataFormato(usuarioData.dtNasc)?? ""}
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
                  value={usuarioData.sexo === "M" ? "Mulher" : usuarioData.sexo === "H" ? "Homem" : ""}
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
                  value={usuarioData.email?? ""}
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
                  value={formData.metaNome?? ""}
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
                  value={formData.peso? `${formData.peso}kg` : ""}
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
                  value={formData.altura? `${formData.altura}cm` : ""}
                  disabled={true}
              />
            </fieldset>

            <fieldset className="col-span-6 grid auto-rows-auto grid-flow-row gap-y-2 h-full overflow-auto scrollbar-thin" >
              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"} 
                  Id={"displayproblemasCardiacos"} 
                  checked={formData.problemasCardiacos == 1 ? true : false}
                  labelcontent={"Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?"}
                  />

              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"} 
                  Id={"displayDorPeitoAtividade"} 
                  checked={formData.dorPeitoAtividade == 1 ? true : false}
                  labelcontent={"Você sente dores no peito quando pratica atividade física?"}
                  />

              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"} 
                  Id={"displayDorPeitoUltimoMes"} 
                  checked={formData.dorPeitoUltimoMes == 1 ? true : false}
                  labelcontent={"No último mês, você sentiu dores no peito quando praticou atividade física?"}
                  />

              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"}               
                  Id={"displayProblemaOsseoArticular"} 
                  checked={formData.problemaOsseoArticular == 1 ? true : false}
                  labelcontent={"Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?"}
                  />

              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"}               
                  Id={"displayMedicamentoPressaoCoracao"} 
                  checked={formData.medicamentoPressaoCoracao == 1 ? true : false}
                  labelcontent={"Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?"}
                  />
              
              <Checkbox 
                  disabled={true} 
                  labelStyle={"text-gray500 text-lg"}               
                  Id={"displayImpedimentoAtividade"} 
                  checked={formData.impedimentoAtividade == 1 ? true : false}
                  labelcontent={"Sabe de alguma outra razão pela qual você não deve praticar atividade física?"}
                  />
            </fieldset>

            <fieldset className="col-span-6 grid place-items-center">
            <Button
              content={"Concluir cadastro"}
              
              variant={"accept"}
              buttonStyle={"text-gray100 bg-primary-green300 rounded-full font-bold px-10 py-4 hover:bg-primary-green400 transition-all flex items-center gap-1"}
              type={"submit"}
            />
            </fieldset>

        </form>

      </div>

  </div>
    </>
  );
}

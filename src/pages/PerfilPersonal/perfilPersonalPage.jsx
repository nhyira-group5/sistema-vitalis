import { useEffect, useState, useContext} from "react";
import { InfoPerfil } from "../../components/InfoPerfil/infoPerfil";
import { SideBarPersonal } from "../../components/SideBar/sideBar";
import axios from "axios";

import defaultIcon from "@assets/defaultIcon.png"

import { validateLogin, validatePersonal} from "@utils/globalFunc"
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../user-context'; 
import {
  formatarCPF,
  converterDataFormato,
} from '@utils/globalFunc';

export function PerfilPersonalPage() {
  const { user, loading, error} = useContext(UserContext);
  const [speciality, setSpeciality] = useState(null);
  const [items, setItems] = useState([]);
  
  const [endereco, setEndereco] = useState(user.userData.academiaId);
  const navigate = useNavigate();

  //USUARIO
  useEffect(() => {
    const validarLoginEUsuario = async () =>{
      await validateLogin(navigate, user);
      await validatePersonal(navigate, user);
  }

  validarLoginEUsuario();

  }, []);

  useEffect(() => {
    const url = `http://localhost:8080/especialidadesPersonais/${user.userData.id}`;
    axios
    .get(url)
    .then((response) => {
      setSpeciality(response.data)
    })
  }, [user])

  useEffect(() => {
    console.log(user)
    obterEspecialdiades()
  }, [speciality])

  //ENDEREÇO
  // useEffect(() => {
  //   const url = `http://localhost:8080/enderecos/${user.userData.academiaId.id}`
  //   axios
  //   .get(url)
  //   .then((response) => {
  //     setEndereco(response.data)
  //   })
  // })

  function transformaData(data) {
    let dataObj = new Date(data);
    let dia = String(dataObj.getDate() + 1).padStart(2, "0");
    let mes = String(dataObj.getMonth() + 1).padStart(2, "0"); // Os meses são de 0 a 11, então adicionamos 1
    let ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function obterEspecialdiades() {
    console.log(speciality)
    if (speciality !== null) {
      let vetorAux = []
      for (let i = 0; i < speciality.length; i++) {
        const element = speciality[i];
        vetorAux.push(element.especialidadeId.nome)
      }
      console.log(vetorAux)
      setItems(vetorAux)
    }
  }

  // function transformaEmAsteriscos(str) {
  //   if (str.length < 4) {
  //     return "A string precisa ter pelo menos 4 caracteres";
  //   }
  //   let inicio = str.slice(0, 2);
  //   let fim = str.slice(-2);
  //   return inicio + "*".repeat(str.length - 4) + fim;
  // }

  if (user == null || speciality == null || endereco == null) return null;
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBarPersonal />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#503465] font-semibold text-2xl">Perfil</h1>
        <div className="w-full h-[88%] flex justify-between items-center">
        
        <div className="w-[48%] h-full bg-white rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-[#2B6E36]">Informações pessoais</h2>
            <div className="w-36 h-36 mx-auto relative rounded-full overflow-hidden">
              <img
                className=" object-cover  h-full"
                src={user && user.userData.midia ? user.userData.midia.caminho : defaultIcon}
                alt=""
              />
              {/* <CloudinaryButtonPerfil uploadFunction={insertImage} /> */}
            </div>
            <div className="grid grid-cols-4">
              <div className="px-2 py-2 col-span-2 border-r border-b">
                <h3 className="font-semibold text-sm">Nome Completo</h3>
                <p>{user && user.userData.nome ? user.userData.nome : 'xtop'}</p>
              </div>
              <div className="px-2 py-2 col-span-2 border-b">
                <h3 className="font-semibold text-sm">E-mail</h3>
                <p>{user && user.userData.email ? user.userData.email : 'caue@gmail.com'}</p>
              </div>
              <div className="px-2 py-2 col-span-2 border-r border-b">
                <h3 className="font-semibold text-sm">CPF</h3>
                <p>{user && user.userData.cpf ? formatarCPF(user.userData.cpf) : '000.000.000-00'}</p>
              </div>
              <div className="px-2 py-2 border-b border-r">
                <h3 className="font-semibold text-sm">Data de Nasc.</h3>
                <p>{user && user.userData.dtNasc ? converterDataFormato(user.userData.dtNasc) : '25/01/2004'}</p>
              </div>
              <div className="px-2 py-2 border-b">
                <h3 className="font-semibold text-sm">Sexo</h3>
                <p>{user && user.userData.sexo ? user.userData.sexo === 'F' ? 'Feminino' : user.userData.sexo === 'M' ? 'Masculino' : '' : ''}</p>
              </div>
              <div className="px-2 py-2 border-b col-span-full">
                <h3 className="font-semibold text-sm">Especialidades</h3>
                <p>{items.length > 0 ? items.join(', ') : null}</p>
              </div>
          </div>
        </div>


        <div className="w-[48%] h-fit bg-white drop-shadow-lg rounded-xl p-5 flex flex-col gap-10">
            <h1 className="font-medium text-xl text-[#503465]">
              Informações do endereço da sua academia
            </h1>
            <div className="w-full h-fit flex justify-between">
              <InfoPerfil
                width="w-[50%]"
                title="Logradouro"
                text={endereco.logradouro}
              />
              <InfoPerfil width="w-[30%]" title="Número" text={endereco.numero} />
              <InfoPerfil width="w-1/6" title="CEP" text={endereco.cep} />
            </div>
            <div className="w-full h-fit flex justify-between">
              <InfoPerfil
                width="w-[50%]"
                title="Bairro"
                text={endereco.bairro}
              />
              <InfoPerfil width="w-[30%]" title="Cidade" text={endereco.cidade} />
              <InfoPerfil width="w-1/6" title="Estado" text={endereco.estado} />
            </div>
            {/* <div className="w-full h-[58%] flex flex-col justify-center items-center border">
              <span>Endereço não encontrado :(</span>
              <span>Tente mais tarde </span>
            </div> */}
          </div>
      </div>
    </div>
  </div>
  );
}

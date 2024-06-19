import { useEffect, useState } from "react";
import { InfoPerfil } from "../../components/InfoPerfil/infoPerfil";
import { SideBarPersonal } from "../../components/SideBar/sideBar";
import axios from "axios";

import { validateLogin, validatePersonal, getLoginResponse} from "@utils/globalFunc"
import { useNavigate } from "react-router-dom";

export function PerfilPersonalPage() {
  const [user, setUser] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [items, setItems] = useState(null);
  
  const [endereco, setEndereco] = useState(null);
  const navigate = useNavigate();

  //USUARIO
  useEffect(() => {
    const loginResponse = getLoginResponse();
    const url = `http://localhost:8080/usuarios/${loginResponse.id}`;

    const validarLoginEUsuario = async () =>{

      await validateLogin(navigate);
      await validatePersonal(navigate);

      axios
      .get(url)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  validarLoginEUsuario();

  }, []);

  useEffect(() => {
    const url = "http://localhost:8080/especialidadesPersonais/2";
    axios
    .get(url)
    .then((response) => {
      setSpeciality(response.data)
    })
  }, [user])

  useEffect(() => {
    obterEspecialdiades()
  }, [speciality])

  //ENDEREÇO
  useEffect(() => {
    const url = "http://localhost:8080/enderecos/1"
    axios
    .get(url)
    .then((response) => {
      setEndereco(response.data)
    })
  })

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
          <div className="w-[48%] h-full bg-white drop-shadow-lg rounded-xl p-5 flex flex-col justify-between">
            <h1 className="font-medium text-xl text-[#503465]">
              Informações Pessoais
            </h1>
            <div className="w-full h-2/6 flex justify-between">
              <div className="w-[45%] h-full flex items-center justify-center">
                <img
                  className="size-32 border rounded-full self-center object-cover"
                  src="https://png.pngtree.com/png-clipart/20230928/original/pngtree-salad-with-vegetables-png-image_13008901.png"
                  alt=""
                />
              </div>
              <div className="w-[42%] h-full flex flex-col justify-center gap-10">
                <InfoPerfil width="w-[50%]" title="Nome" text={user.nome} />
                <InfoPerfil width="w-[50%]" title="Email" text={user.email} />
              </div>
            </div>
            <div className="w-full h-3/6 flex flex-col justify-between pb-2">
              <div className="w-full h-fit flex justify-between">
                <InfoPerfil
                  width="w-[50%]"
                  title="Nickname"
                  text={user.nickname}
                />
                <InfoPerfil
                  width="w-[42%]"
                  title="Data de nascimento"
                  text={transformaData(user.dtNasc)}
                />
              </div>
              <div className="w-full h-fit flex justify-between">
                <InfoPerfil
                  width="w-[50%]"
                  title="Sexo"
                  text={user.sexo === "M" ? "Masculino" : "Feminino"}
                />
                <InfoPerfil width="w-[42%]" title="Senha" text="********" />
              </div>
              <div className="w-full h-fit flex justify-between">
                <InfoPerfil
                  width="w-[50%]"
                  title="Especialidades"
                  text={items !== null && items.join(', ')}
                />
                {/* <InfoPerfil
                  width="w-[42%]"
                  title="Data formação"
                  text="17/01/05"
                /> */}
              </div>
            </div>
          </div>

          <div className="w-[48%] h-full bg-white drop-shadow-lg rounded-xl p-5 flex flex-col justify-between">
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
            <div className="w-full h-[58%] bg-pink-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

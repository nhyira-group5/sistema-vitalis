import { useEffect, useState } from "react";
import { InfoPerfil } from "../../components/InfoPerfil/infoPerfil";
import { SideBarPersonal } from "../../components/SideBar/sideBar";
import axios from "axios";

export function PerfilPersonalPage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const url = "http://localhost:8080/usuarios/3"
    axios
    .get(url)
    .then((response) => {
      setUser(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  if (user == null) return null
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
                <InfoPerfil width="w-[50%]" title="Nickname" text={user.nickname} />
                <InfoPerfil
                  width="w-[42%]"
                  title="Data de nascimento"
                  text="17/01/1999"
                />
              </div>
              <div className="w-full h-fit flex justify-between">
                <InfoPerfil width="w-[50%]" title="Sexo" text={user.sexo === "M" ? "Masculino" : "Feminino"} />
                <InfoPerfil width="w-[42%]" title="Senha" text="bananinha123" />
              </div>
              <div className="w-full h-fit flex justify-between">
                <InfoPerfil
                  width="w-[50%]"
                  title="Especialidades"
                  text="Emagrecimento"
                />
                <InfoPerfil
                  width="w-[42%]"
                  title="Data formação"
                  text="17/01/05"
                />
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
                text="Rua Doutor Benedito Arruda Vianna"
              />
              <InfoPerfil width="w-[30%]" title="Número" text="219" />
              <InfoPerfil width="w-1/6" title="CEP" text="05815-095" />
            </div>
            <div className="w-full h-fit  flex justify-between">
              <InfoPerfil
                width="w-[50%]"
                title="Bairro"
                text="Jardim São Francisco de Assis"
              />
              <InfoPerfil width="w-[30%]" title="Cidade" text="São Paulo" />
              <InfoPerfil width="w-1/6" title="Estado" text="SP" />
            </div>
            <div className="w-full h-[58%] bg-pink-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

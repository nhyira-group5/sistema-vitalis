import { SideBarPersonal } from "../../components/SideBar/sideBar";
import { CardUsuario } from "../../components/CardUsuario/cardUsuario";
import {validateLogin, validatePersonal, getLoginResponse} from "@utils/globalFunc"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@apis/api";
export function HomePersonalPage() {
const navigate = useNavigate();
const [usuario, setUsuario] = useState({});
const [usuariosFiliados, setUsuariosFiliados] = useState([]);
const [contratosUsuarios, setContratosUsuarios] = useState([]);

  function getUsuario(){
    const loginResponse = getLoginResponse();
    console.log("entrou")
    try{
      api.get(`/usuarios/${loginResponse.id}`)
      .then((response)=>{
        setUsuario(response.data)
      })
    } catch (error){
      console.log(error);
    }
  }

  function getContratos(){
    const loginResponse = getLoginResponse();
    console.log("entrou")
    try{
      api.get(`/usuarios/${loginResponse.id}`)
      .then((response)=>{
        setUsuario(response.data)
      })
    } catch (error){
      console.log(error);
    }
  }



  useEffect(()=>{
    const validarLoginEUsuario = async () =>{

        await validateLogin(navigate);
        await validatePersonal(navigate);
  
        getUsuario();
    }
  
    validarLoginEUsuario();
}, [])

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBarPersonal />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#503465] font-semibold text-2xl">Home</h1>
        <h1 className="w-full h-[5%] font-semibold text-xl flex rounded-xl">
          Bem-vindo(a), {usuario.nome}
        </h1>
        <div className="w-full h-[82%] flex justify-between items-center">
          <div className="w-[73%] h-full bg-white flex flex-col justify-between items-center rounded-xl shadow-lg p-4">
            <h2 className="w-full">Usuarios afiliados</h2>
            <div className="w-full h-[92%] max-h-[92%] flex flex-wrap justify-between content-start gap-4 overflow-auto p-1">

              <CardUsuario />

            </div>
          </div>

          <div className="w-[25%] h-full bg-[#1A1A1A] flex flex-col justify-between items-center rounded-xl shadow-lg p-4">
            <h1 className="w-full text-white text-lg font-semibold flex items-center justify-center">
              Solicitação de afiliação
            </h1>
            <div className="w-full h-5/6  flex flex-col gap-2 overflow-hidden overflow-y-scroll">
              
              {false ? (
                <span> lista msg </span>
              ) : (
                <div className="w-full h-full flex justify-center items-center text-white text-sm font-small ">
                  Nenhuma solicitação pendente.
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

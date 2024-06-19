import { SideBarPersonal } from "../../components/SideBar/sideBar";
import { CardUsuario } from "../../components/CardUsuario/cardUsuario";
import {validateLogin, validatePersonal, getLoginResponse} from "@utils/globalFunc"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@apis/api";
import {Splash} from "@components/Splash/splash"

import { ContratoCard } from "@components/ContratoCard/contradoCard";

import {converterDataFormato} from "@utils/globalFunc"

export function HomePersonalPage() {
const navigate = useNavigate();
const [usuario, setUsuario] = useState({});
const [usuariosFiliados, setUsuariosFiliados] = useState([]);
const [contratosUsuarios, setContratosUsuarios] = useState([]);

  function getUsuario(){
    const loginResponse = getLoginResponse();
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
    
    try{
      api.get(`/contratos/Por-Personal/${loginResponse.id}`)
      .then((response)=>{
        setContratosUsuarios(response.data)
      })
    } catch (error){
      console.log(error);
    }
  }

  function getFiliados(){
    const loginResponse = getLoginResponse();
    try{
    api.get(`/usuarios/usuario-afiliado/${loginResponse.id}`)
    .then((response)=>{
      setUsuariosFiliados(response.data)
    })
      } catch(error){
        console.log(error)
      }
  }

  // function aceitarContrato(contrato){
  //   const today = new Date();
  //   today.setMonth(today.getMonth() + 1);


  //   const reqBody = {
  //     fimContrato: converterDataFormato(today),
  //     afiliado: 1
  //   };


  //   try{
  //     api.put(`/contratos/${contrato.idContrato}`, reqBody)
  //     .then((response)=>{
  //       setTreino(response.data);
  //     })
  //     } catch (error) {
  //       console.log(error)
  //     }

  // }

  // function negarContrato(contrato){

  // }

  useEffect(()=>{
    const validarLoginEUsuario = async () =>{

        await validateLogin(navigate);
        await validatePersonal(navigate);
  
        getUsuario();
        getFiliados();
        getContratos();
    }
    
  
    validarLoginEUsuario();
}, [])

  return (
    <div className="flex items-center justify-center  w-screen h-screen px-10 py-10 gap-5">
      <SideBarPersonal />
      <div className="w-[90vw] h-full flex flex-col justify-between">
        <h1 className="text-[#503465] font-semibold text-2xl">Home</h1>

        <h1 className="w-full h-[5%] font-semibold text-xl flex rounded-xl">
          Bem-vindo(a), {usuario.nome}
        </h1>

        <div className="w-full h-[82%] flex justify-between items-center">
          <div className="w-[73%] h-full bg-white flex flex-col justify-between items-center rounded-xl shadow-lg p-4">
            <h2 className="w-full">Usuarios afiliados</h2>
            <div className="w-full h-full max-h-full flex flex-wrap justify-center content-start gap-4 overflow-auto p-1">

              {usuariosFiliados ? (
                usuariosFiliados.map((filiado, index)=>{
                  return(
                    <CardUsuario key={index} filiado={filiado}/>
                  )
                })
              ):(<Splash/>)}
              

            </div>
          </div>

          <div className="w-[25%] h-full bg-[#1A1A1A] flex flex-col justify-between items-center rounded-xl shadow-lg p-4">
            <h1 className="w-full text-white text-lg font-semibold flex items-center justify-center">
              Solicitação de afiliação
            </h1>
            <div className="w-full h-5/6  flex flex-col gap-2 overflow-hidden overflow-y-auto">


              {contratosUsuarios ? (
                contratosUsuarios.length > 0 ? (
                  contratosUsuarios.map((contrato, index)=>{
                    return(
                      <ContratoCard
                      key={index}
                      contrato={contrato}
                      />
                    )
                  })
                  ):(
                                  <div className="w-full h-full flex justify-center items-center text-white text-sm font-small ">
                                    Nenhuma solicitação pendente.
                                  </div>
                  )
              ):(<Splash/>)}


              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

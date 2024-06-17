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

  // function getUsuario(){
  //   const loginResponse = getLoginResponse();
  //   try{
  //     api.get(`/usuarios/${loginResponse.id}`)
  //     .them((response)=>{
  //       setUsuario(response.data)
  //     })
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }

  // function getFiliados(){
  //   const loginResponse = getLoginResponse();
  //   try{
  //     api.get(`/usuarios/${loginResponse.id}`)
  //     .them((response)=>{
  //       setUsuario(response.data)
  //     })
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }

//   useEffect(()=>{
//     const validarLoginEUsuario = async () =>{

//         await validateLogin(navigate);
//         await validateUsuario(navigate);
  
//         getUsuario();
//     }
  
//     validarLoginEUsuario();
// }, [])

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      
    </div>
  );
}

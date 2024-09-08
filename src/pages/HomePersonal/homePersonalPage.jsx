import { SideBarPersonal } from '../../components/SideBar/sideBar';
import { CardUsuario } from '../../components/CardUsuario/cardUsuario';
import {
  validateLogin,
  validatePersonal,
} from '@utils/globalFunc';
import { useEffect, useState, useContext} from 'react';
import { UserContext } from '../../user-context'; 
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

import { SplashPersonal } from '@components/Splash/splash';

import { ContratoCard } from '@components/ContratoCard/contradoCard';

import { converterDataFormato } from '@utils/globalFunc';

import { toast } from 'react-toastify';

export function HomePersonalPage() {
  const navigate = useNavigate();

  const { user, loading, error} = useContext(UserContext);

  const [usuariosFiliados, setUsuariosFiliados] = useState([]);
  const [contratosUsuarios, setContratosUsuarios] = useState([]);

  const [usuariosFiliadosLoading, setUsuariosFiliadosLoading] = useState(false);
  const [contratosLoading, setContratosLoading] = useState(false);

  const [aceitarContratoLoading, setAceitarContratoLoading] = useState(false);
  const [negarContratoLoading, setNegarContratoLoading] = useState(false);

  // function getUsuario() {
  //   const loginResponse = getLoginResponse();
  //   try {
  //     api.get(`/usuarios/${loginResponse.id}`).then((response) => {
  //       setUsuario(response.data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function getContratos() {
    setContratosLoading(true);

    try {
      api
        .get(`/contratos/por-personal/${user.userData.id}`)
        .then((response) => {
          setContratosUsuarios(response.data);
         
        });
    } catch (error) {
      console.log(error);
    } finally {
      setContratosLoading(false);
    }
  }

  function getFiliados() {
    setUsuariosFiliadosLoading(true);
    
    try {
      api
        .get(`/usuarios/usuario-afiliado/${user.userData.id}`)
        .then((response) => {
          setUsuariosFiliados(response.data);
          
        });
    } catch (error) {
      console.log(error);

    } finally {
      setUsuariosFiliadosLoading(false);
    }

  }

  function aceitarContrato(contrato) {
    setAceitarContratoLoading(true);

    const today = new Date();
    today.setMonth(today.getMonth() + 1);

    const dateString = today.toISOString().split('T')[0];

    console.log(dateString);

    const reqBody = {
      fimContrato: dateString,
      afiliado: 1,
    };

    try {
      api.put(`/contratos/${contrato.idContrato}`, reqBody).then((response) => {
        toast.success('Usuario filiado com sucesso!');
        

        setContratosUsuarios((prevContratos) =>
          prevContratos.filter(
            (contratoItem) => contratoItem.idContrato !== contrato.idContrato,
          ),
        );
        setUsuariosFiliados((prevItems) => [
          ...prevItems,
          response.data.usuarioId,
        ]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAceitarContratoLoading(false);
    }
  }

  function negarContrato(contrato) {
    setNegarContratoLoading(true);

    const reqBody = {
      afiliado: 2,
    };

    try {
      api.put(`/contratos/${contrato.idContrato}`, reqBody).then((response) => {
        toast.success('Usuário negado com sucesso!');
        

        setContratosUsuarios((prevContratos) =>
          prevContratos.filter(
            (contratoItem) => contratoItem.idContrato !== contrato.idContrato,
          ),
        );
      });
    } catch (error) {
      console.log(error);
      
    } finally {
      setAceitarContratoLoading(false);
    }
  }

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate, user);
      await validatePersonal(navigate, user);

      getFiliados();
      getContratos();
    };

    validarLoginEUsuario();
  }, []);



  return (
    <div className="flex items-center justify-center  w-screen h-screen px-10 py-10 gap-5">
      <SideBarPersonal />
      <div className="w-[90vw] h-full flex flex-col justify-between">
        <h1 className="text-[#503465] font-semibold text-2xl">Home</h1>

        <h1 className="w-full h-[5%] font-semibold text-xl flex rounded-xl">
          Bem-vindo(a), {user.userData.nome}
        </h1>

        <div className="w-full h-[82%] flex justify-between items-center">
          <div className="w-[73%] h-full bg-white flex flex-col justify-between items-center rounded-xl shadow-lg p-4">
            <h2 className="w-full">Usuarios afiliados</h2>

            <div className="w-full h-full max-h-full flex flex-wrap justify-start content-start gap-4 overflow-auto p-1">
              {usuariosFiliadosLoading ? (
                <SplashPersonal />
              ) : usuariosFiliados ? (
                usuariosFiliados.map((filiado, index) => {
                  return <CardUsuario key={index} filiado={filiado} />;
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  Nenhum filiado ainda :(
                </div>
              )}
            </div>
          </div>

          <div className="w-[25%] h-full bg-[#1A1A1A] flex flex-col gap-5 items-center rounded-xl shadow-lg p-4">
            <h1 className="w-full text-white text-lg font-semibold flex items-center justify-center">
              Solicitação de afiliação
            </h1>
            <div className="w-full h-5/6  flex flex-col gap-2 overflow-hidden overflow-y-auto">
              {contratosLoading ? (
                <SplashPersonal />
              ) : contratosUsuarios && contratosUsuarios.length > 0 ? (
                contratosUsuarios.map((contrato, index) => {
                  return (
                    <ContratoCard
                      key={index}
                      contrato={contrato}
                      functions={[aceitarContrato, negarContrato]}
                      loadingStates={[
                        aceitarContratoLoading,
                        negarContratoLoading,
                      ]}
                    />
                  );
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center text-white text-sm font-small ">
                  Nenhuma solicitação pendente!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

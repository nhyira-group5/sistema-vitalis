import { CardPersonal } from '../../components/CardPersonal/cardPersonal';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { InputAcad } from '../../components/InputAcad/inputAcad';
import { CardAcad } from '../../components/CardAcad/cardAcad';
import { SideBar } from '../../components/SideBar/sideBar';
import { Mapa } from '../../components/Mapa/mapa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { QuestionMark } from '@phosphor-icons/react/dist/ssr';
import defaultIcon from '@assets/defaultIcon.png';

import {
  validateLogin,
  validateUsuario,
  getLoginResponse,
} from '@utils/globalFunc';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Splash } from '@components/Splash/splash';
import { twMerge } from 'tailwind-merge';

export function BuscarPersonalPage() {
  const [carregando, setCarregando] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const [cep, setCep] = useState('');
  const [infoEndereco, setInfoEndereco] = useState(null);
  const [academias, setAcademias] = useState(null);
  const [infoDistance, setInfoDistance] = useState(null);

  const [personais, setPersonais] = useState([]);
  const [usuario, setUsuario] = useState({});

  const [isUsuarioLoading, setIsUsuarioLoading] = useState(false);

  const navigate = useNavigate();

  function getUsuario() {
    setIsUsuarioLoading(true);

    const loginResponse = getLoginResponse();
    try {
      api.get(`usuarios/${loginResponse.id}`).then((response) => {
        // response.data.pagamentoAtivo = true;
        setUsuario(response.data);

        setIsUsuarioLoading(false);
      });

      setLoadingPage(false);
    } catch (error) {
      console.log(error);
      setIsUsuarioLoading(false);
    }
  }

  useEffect(() => {
    const url = `http://localhost:8080/usuarios/personais`;
    axios.get(url).then((response) => {
      response.data;
    });
  }, []);

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate);
      await validateUsuario(navigate);

      getUsuario();

      try {
        api.get(`/usuarios/personais`).then((response) => {
          setPersonais(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    validarLoginEUsuario();
  }, []);

  function handleInputCep(e) {
    setCep(e.target.value);
  }

  function handleClickSearch() {
    setInfoEndereco(null);
    setCarregando(true);
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    axios
      .get(url)
      .then((response) => {
        setInfoEndereco(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleClickCard(e) {
    console.log(e);
  }

  if (loadingPage) return null;
  return (
    <div className="flex items-center justify-center  w-screen h-screen px-10 py-10 gap-5">
      <SideBar />

      {!usuario.pagamentoAtivo && !loadingPage && (
        <div className="absolute bg-white mx-auto my-0 max-w-prose p-4 rounded-xl z-10 grid grid-cols-[1fr_auto] place-content-start items-center gap-x-8 gap-y-4">
          <h3 className="font-medium text-xl col-span-full">
            Acesso Exclusivo para Usuários Premium
          </h3>
          <p className="text-base">
            Esta funcionalidade está disponível apenas para assinantes premium.
            Para continuar e aproveitar todos os recursos do nosso site, você
            precisará atualizar sua assinatura.
          </p>

          <a
            className="block py-2 px-4 max-w-max rounded-md bg-[#2B6E36] uppercase font-medium text-lg text-white mx-auto my-0 place-self-center"
            href=""
          >
            Ver Planos
          </a>
        </div>
      )}

      <div
        className={twMerge(
          'w-[90vw] h-full flex justify-between',
          !usuario.pagamentoAtivo && 'blur-sm',
        )}
      >
        <div className="w-3/5 h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
          <h1 className="text-[#2B6E36] font-semibold text-2xl">
            Encontre uma academia
          </h1>

          <div className="w-full flex justify-between  text-sm">
            <InputAcad
              label="CEP"
              placeholder="00000-000"
              type="text"
              width={'w-1/5'}
              valueOption={cep}
              onChangeFunction={handleInputCep}
            />
            {/* <InputAcad
              label="Logradouro"
              placeholder="Ex: Rua das Araras"
              type="text"
              width={"w-3/6"}
              // valueFunction={}
              // onChangeFunction={}
            />
            <InputAcad
              label="Número"
              placeholder="Ex: 1234"
              type="text"
              width={"w-1/6"}
              // valueFunction={}
              // onChangeFunction={}
            /> */}
            <button
              className="h-fit px-2.5 py-2.5 rounded-full shadow-lg text-white bg-[#48B75A] flex gap-2 items-center self-end"
              onClick={handleClickSearch}
            >
              <MagnifyingGlass color="white" />
            </button>
          </div>

          <div className="w-full h-[55%] bg-gray-500/20 flex items-center justify-center">
            {carregando && <span>Carregando...</span>}
            <Mapa
              infoEndereco={infoEndereco}
              setAcademias={setAcademias}
              setCarregando={setCarregando}
            />
          </div>

          <div className="h-[22%] flex justify-between">
            {!academias ? (
              <div className="w-[48%] h-full rounded-xl shadow-xl p-4 flex items-center justify-center cursor-pointer">
                <QuestionMark size={30} color="black" />
              </div>
            ) : (
              <CardAcad
                title={academias[0].nome}
                rating={academias[0].classificacao}
                address={academias[0].endereco}
                cep={cep}
                lat={academias[0].latitude}
                lon={academias[0].longitude}
                onClickFunction={handleClickCard}
              />
            )}
            {!academias ? (
              <div className="w-[48%] h-full rounded-xl shadow-xl p-4 flex items-center justify-center cursor-pointer">
                <QuestionMark size={30} color="black" />
              </div>
            ) : (
              <CardAcad
                title={academias[1].nome}
                rating={academias[1].classificacao}
                address={academias[1].endereco}
                cep={cep}
                lat={academias[1].latitude}
                lon={academias[1].longitude}
                onClickFunction={handleClickCard}
              />
            )}
          </div>
        </div>
        <div className="w-[38%] h-full bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between">
          <h1 className="text-[#2B6E36] font-semibold text-2xl">
            Encontre um personal
          </h1>

          {isUsuarioLoading ? (
            <Splash />
          ) : (
            <div className="m-auto w-full h-5/6 flex flex-col gap-2.5 overflow-y-auto items-center">
              {personais.length > 0 ? (
                personais.map((personal, index) => {
                  return (
                    <CardPersonal
                      key={index}
                      haveDots
                      haveShadow
                      personal={personal}
                      usuario={usuario}
                    />
                  );
                })
              ) : (
                <div>Nenhum personal encontrado</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

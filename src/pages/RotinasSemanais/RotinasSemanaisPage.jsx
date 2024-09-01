import { SideBar } from '@components/SideBar/sideBar';

import { useEffect, useState } from 'react';
import {
  RotinaCard,
  RotinaDiariaCard,
} from '@components/HorizontalCard/horizontalCard';
import { Splash } from '@components/Splash/splash';

import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import {
  getLoginResponse,
  validateLogin,
  validateUsuario,
} from '@utils/globalFunc';

export function RotinasSemanaisPage() {
  const [rotinas, setRotinas] = useState([]);
  const [treinosRotina, setTreinosRotina] = useState([]);

  const [rotinasDiariasSplash, setRotinasDiariasSplash] = useState(false);
  const [rotinasSemanaisSplash, setRotinasSemanaisSplash] = useState(false);

  const [rotinaSelecionada, setRotinaSelecionada] = useState(null);
  const [userData, setUserData] = useState(getLoginResponse());

  const navigate = useNavigate();

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      setRotinasSemanaisSplash(true);

      await validateLogin(navigate);
      await validateUsuario(navigate);

      api
        .get(`/rotinaSemanais/buscarUsuario/${userData.id}`)
        .then((response) => {
          setRotinas([...rotinas, ...response.data]);
          setRotinasSemanaisSplash(false);
        })
        .catch((error) => {
          error.response.data.errors.forEach((erroMsg) => {
            console.log(erroMsg.defaultMessage);
          });
          setRotinasSemanaisSplash(false);
        });
    };

    validarLoginEUsuario();
  }, []);

  function handleClick(rotinaId) {
    if (rotinaId == rotinaSelecionada) {
      return;
    }

    setRotinasDiariasSplash(true);
    setRotinaSelecionada(rotinaId);

    api
      .get(`/rotinaDiarias/por-semana/${rotinaId}`)
      .then((response) => {
        setTreinosRotina(response.data);
        setRotinasDiariasSplash(false);
      })
      .catch((error) => {
        error.response.data.errors.forEach((erroMsg) => {
          console.log(erroMsg.defaultMessage);
        });
        setRotinasDiariasSplash(false);
      });
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
      <SideBar />

      <div className="w-[90vw] h-full flex flex-col">
        <div className="flex flex-col gap-3 p-5">
          <span className="text-[#2B6E36] font-semibold text-2xl">
            Rotinas semanais
          </span>
        </div>
        <div className="flex h-full overflow-hidden">
          <div className="w-1/2 h-full flex flex-col gap-5 p-5 overflow-auto">
            {rotinasSemanaisSplash ? (
              <Splash />
            ) : rotinas ? (
              rotinas.map((rotina) => (
                <RotinaCard
                  key={rotina.id}
                  rotina={rotina}
                  onClickFunction={() => {
                    handleClick(rotina.id);
                  }}
                  rotinaSelecionada={rotinaSelecionada}
                />
              ))
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <span>Sem rotinas :(</span>
              </div>
            )}
          </div>

          <div
            className={`relative w-1/2 h-full overflow-auto flex flex-col gap-5 p-5 rounded-xl`}
          >
            {!rotinaSelecionada ? (
              <div className="h-full w-full flex items-center justify-center">
                {!rotinasSemanaisSplash ? (
                  <span>Selecione uma rotina!</span>
                ) : null}
              </div>
            ) : rotinasDiariasSplash ? (
              <Splash />
            ) : treinosRotina && treinosRotina.length > 0 ? (
              treinosRotina.map((treino) => (
                <RotinaDiariaCard
                  key={treino.idRotinaDiaria}
                  rotinaDiaria={treino}
                />
              ))
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <span>Nenhuma rotina diaria aqui :( Tente outra semana!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

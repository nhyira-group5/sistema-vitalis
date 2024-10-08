import { SideBar } from "@components/SideBar/sideBar";

import { useEffect, useState, useContext } from "react";
import {
  RotinaCard,
  RotinaDiariaCard,
} from "@components/HorizontalCard/horizontalCard";
import { Splash } from "@components/Splash/splash";

import { useNavigate } from "react-router-dom";

import { api } from "../../api";

import { UserContext } from "../../user-context";
import { Template } from "../template";

export function RotinasSemanaisPage() {
  const { user } = useContext(UserContext);
  const [rotinas, setRotinas] = useState([]);
  const [treinosRotina, setTreinosRotina] = useState([]);

  const [rotinasDiariasSplash, setRotinasDiariasSplash] = useState(false);
  const [rotinasSemanaisSplash, setRotinasSemanaisSplash] = useState(false);

  const [rotinaSelecionada, setRotinaSelecionada] = useState(null);
  const [userData, setUserData] = useState(user);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCore = async () => {
      setRotinasSemanaisSplash(true);

      try {
        const response = await api.get(
          `/rotinaSemanais/buscarUsuario/${user.userData.id}`
        );
        console.log(response.data);
        setRotinas([...rotinas, ...response.data]);
      } catch (error) {
        console.log(error);
      } finally {
        setRotinasSemanaisSplash(false);
      }
    };

    fetchCore();
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
    <Template name="Rotinas Semanais">
      <div className="flex h-full overflow-hidden">
        <div className="w-1/2 h-full flex flex-col gap-5 p-5 overflow-auto">
          {rotinasSemanaisSplash ? (
            <Splash />
          ) : rotinas.length > 0 ? (
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
              {!rotinasSemanaisSplash && rotinas.length > 0 ? (
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
    </Template>
  );
}

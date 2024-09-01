import { SideBar } from '@components/SideBar/sideBar';
import { useEffect, useState } from 'react';

import { ExercicioImageCard } from '@components/ImageCard/imageCard';
import { useParams, useNavigate } from 'react-router-dom';

import { validateLogin, validateUsuario } from '@utils/globalFunc';
import { Splash } from '@components/Splash/splash';

import { api } from '../../api';

export function TreinoPage() {
  const [treinosRotinaDiaria, setTreinosRotinaDiaria] = useState([]);

  const [isTreinosRotinaDiariaLoading, setIsTreinosRotinaDiariaLoading] =
    useState(false);

  const { idRotinaDiaria } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate);
      await validateUsuario(navigate);

      setIsTreinosRotinaDiariaLoading(true);
      try {
        api.get(`/treinos/por-dia/${idRotinaDiaria}`).then((response) => {
          setTreinosRotinaDiaria([...treinosRotinaDiaria, ...response.data]);
          setIsTreinosRotinaDiariaLoading(false);
        });
      } catch (error) {
        console.log(error);
        setIsTreinosRotinaDiariaLoading(false);
      }
    };

    validarLoginEUsuario();
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
      <SideBar />

      <div className="w-[90vw] h-full flex flex-col overflow-hidden">
        <div className="flex flex-col gap-3 p-5">
          <span className="text-[#2B6E36] font-semibold text-2xl">
            Rotina diaria - Exercicios
          </span>
        </div>

        <div className="flex gap-5 items-center h-full w-full overflow-auto p-5">
          {isTreinosRotinaDiariaLoading ? (
            <Splash />
          ) : treinosRotinaDiaria && treinosRotinaDiaria.length > 0 ? (
            treinosRotinaDiaria.map((treino) => (
              <ExercicioImageCard
                key={treino.key}
                exercicio={treino}
                URI={`/rotinas_semanais/diaria/${idRotinaDiaria}/exercicio/${treino.idTreino}`}
              />
            ))
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span>
                Parece que não há nenhum treino aqui :( Tente outra rotina
                diaria!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

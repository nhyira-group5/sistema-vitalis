import { SideBar } from '@components/SideBar/sideBar';
import { Input } from '@components/Input/input';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { RefeicaoCard } from '@components/RefeicaoCard/refeicaoCard';
import { Splash } from '@components/Splash/splash';

import { api } from '../../Api';

import { validateLogin, validateUsuario } from '@utils/globalFunc';
import { useNavigate } from 'react-router-dom';

export function RefeicoesPage() {
  const [refeicoes, setRefeicoes] = useState([]);
  const [refeicoesIsLoading, setRefeicoesIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate);
      await validateUsuario(navigate);

      try {
        setRefeicoesIsLoading(true);
        api.get(`/refeicoes`).then((response) => {
          setRefeicoes([...refeicoes, ...response.data]);
          setRefeicoesIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        setRefeicoesIsLoading(false);
      }
    };

    validarLoginEUsuario();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
        <SideBar />

        <div className="w-[90vw] h-full flex flex-col">
          <div className="flex flex-col gap-3 p-5">
            <span className="text-[#2B6E36] font-semibold text-2xl">
              Refeições
            </span>
            <div className="w-1/3">
              <Input
                labelStyle={'none'}
                icon={<MagnifyingGlass size={24} />}
                placeholder={'Pesquise uma refeição'}
                inputStyle={
                  'group-focus-within:!ring-primary-green300 h-13 px-5 relative flex w-full border-gray100 border-2 rounded-full outline-none ring-1 ring-gray500'
                }
                contentStyle={
                  'appearance-none font-mavenPro text-xl outline-none w-full rounded-e-full text-gray500 placeholder:text-[1rem] text-[1rem] placeholder:font-medium'
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-5  auto-rows-min gap-x-7 gap-y-7 h-full overflow-auto p-5">
            {refeicoesIsLoading ? (
              <div className="w-full h-full col-span-5">
                <Splash />
              </div>
            ) : refeicoes && refeicoes.length > 0 ? (
              refeicoes.map((refeicao) => (
                <RefeicaoCard key={refeicao.idRefeicao} refeicao={refeicao} />
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <span>Nenhuma refeição aqui D:</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

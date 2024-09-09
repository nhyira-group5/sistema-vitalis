import { SideBar } from '@components/SideBar/sideBar';
import { Input } from '@components/Input/input';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../user-context'; 
import { RefeicaoCard } from '@components/RefeicaoCard/refeicaoCard';
import { Splash } from '@components/Splash/splash';

import { api } from '../../api';

import { validateLogin, validateUsuario } from '@utils/globalFunc';
import { useNavigate } from 'react-router-dom';
import { fi } from 'date-fns/locale';

export function RefeicoesPage() {
  const [refeicoes, setRefeicoes] = useState([]);
  const [refeicoesIsLoading, setRefeicoesIsLoading] = useState(false);
  const navigate = useNavigate();
  const {updateUser, user, loading, error} = useContext(UserContext);

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate, user);
      await validateUsuario(navigate, user);

      try {
        setRefeicoesIsLoading(true);
        api.get(`/refeicoes`).then((response) => {
          setRefeicoes([...refeicoes, ...response.data]);
          console.log("nois come bossta", response) 
        });
      } catch (error) {
        console.log(error);
        
      } finally {
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

          <div className="grid grid-cols-5 auto-rows-min gap-x-7 gap-y-7 h-full overflow-auto p-5">
              {refeicoesIsLoading ? (
                <div className="w-full h-full col-span-5">
                  <Splash />
                </div>
              ) : (
                refeicoes.map((refeicao) => {
                  return (
                    <RefeicaoCard
                      key={refeicao.idRefeicao}
                      refeicao={refeicao}
                    />
                  );
                })
              )}
            </div>
        </div>
      </div>
    </>
  );
}

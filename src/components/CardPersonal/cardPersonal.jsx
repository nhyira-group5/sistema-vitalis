import { DotsThree, X } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';
import { api } from '../../api';
import {  getDataAtual } from '@utils/globalFunc';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Checkbox } from '@components/Checkbox/checkbox';
import { Button } from '@components/Button/button';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import defaultIcon from '@assets/defaultIcon.png';
import { UserContext } from '../../user-context'; 

export function CardPersonal({
  size,
  haveDots,
  haveShadow,
  isUser,
  personal,
  usuario,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading, error} = useContext(UserContext);

  function modalInteract() {
    setIsModalOpen(!isModalOpen);
  }

  function postContact() {
    const contratoDto = {
      usuarioId: user.userData.id,
      personalId: personal.idPersonal,
      inicioContrato: getDataAtual(),
    };

    try {
      api.post(`/contratos`, contratoDto).then((response) => {
        modalInteract();
        toast.success('Solicitação enviada!');
      });
    } catch (error) {
      console.log(error);
      toast.error('Erro ao enviar solicitação!');
    }
  }

  8;

  function isUserFiliado() {
    if (usuario == undefined || personal == undefined) return false;

    return usuario.personalId == personal.idPersonal;
  }

  useEffect(() => {
    isUserFiliado();
  }, []);

  return (
    <>
      <div
        className={twMerge(
          'w-full h-[20%] rounded-2xl p-4 flex gap-4 justify-between',
          haveShadow ? 'drop-shadow-lg' : '',
          isUserFiliado() ? 'bg-primary-green100' : 'bg-white ',
        )}
      >
        <div className="flex gap-5 w-full">
          <img
            className={twMerge(
              'size-10 rounded-full object-cover self-center',
              size,
            )}
            src={defaultIcon}
            alt=""
          />

          <div className="h-full w-full flex flex-col justify-between self-center ">
            <h2
              className={twMerge(
                'font-semibold text-[#2B6E36]',
                !isUser ? 'text-[#2B6E36]' : 'text-[#503465]',
              )}
            >
              {personal.nome || 'Xpto'}
            </h2>

            <span className="text-sm">
              {!isUser
                ? `Especialista em ${personal.exibitonDto[0].especialidadeId.nome}`
                : `Meta em ${usuario.meta.nome}`}
              <span className="font-semibold"> {''}</span>
            </span>


            {haveDots && isUserFiliado ? (
            <button
                to="/buscar-personal"
                className="place-self-end bg-[#2B6E36] text-white py-1 px-2 rounded-md font-medium hover:bg-[#1E6129]"
                onClick={modalInteract}
              >
                  Afiliar-se!
              </button>
        ) : (
          <></>
        )}
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div className="absolute w-screen h-screen top-0 left-0 z-50 bg-gray500/20 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-sombra-padrao p-5 w-[30rem]  flex flex-col gap-7">
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl font-semibold text-primary-green300">
                Solicitando parceria
              </span>
              <button onClick={modalInteract}>
                <X size={30} />
              </button>
            </div>

            <span className="font-semibold text-lg">
              Para ter o acompanhamento integral, mudanças de rotina, conversas
              e interações com alguém especializado, você deve mandar um termo
              de compromisso para o profissional escolhido.
            </span>

            <CardPersonal personal={personal} usuario={usuario} />

            <span className="font-semibold text-lg">
              Ao solicitar a parceria, será enviado um e-mail para o personal. A
              resposta dele será enviada via e-mail.
            </span>

            <div className="w-full flex justify-end items-center">
              <Button
                content={'Solicitar'}
                iconVisibility={false}
                onClick={postContact}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

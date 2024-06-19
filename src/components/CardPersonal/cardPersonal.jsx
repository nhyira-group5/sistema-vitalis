import { DotsThree, X } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import { api } from "@apis/api";
import { getLoginResponse, getDataAtual } from "@utils/globalFunc";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "@components/Checkbox/checkbox";
import { Button } from "@components/Button/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function CardPersonal({
  size,
  haveDots,
  haveShadow,
  isUser,

  personal,
  usuario,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function modalInteract() {
    setIsModalOpen(!isModalOpen);
  }

  function postContact() {
    const loginResponse = getLoginResponse();

    const contratoDto = {
      usuarioId: loginResponse.id,
      personalId: personal.id,
      inicioContrato: getDataAtual(),
    };

    try {
      api.post(`/contratos`, contratoDto).then((response) => {
        modalInteract();
        toast.success("Solicitação enviada!");
      });
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar solicitação!");
    }
  }

  function isUserFiliado() {
    return usuario.personalId == personal.idPersonal;
  }

  useEffect(() => {
    isUserFiliado();
  }, []);

  return (
    <>
      <div
        className={twMerge(
          "w-full h-[20%] rounded-2xl p-4 flex gap-4 justify-between",
          haveShadow ? "drop-shadow-lg" : "",
          isUserFiliado() ? "bg-primary-green100" : "bg-white "
        )}
      >
        <div className="flex gap-5">
          <img
            className={twMerge(
              "size-10 rounded-full object-cover self-center",
              size
            )}
            src={""}
            alt=""
          />

          <div className="h-full flex flex-col justify-between self-center ">
            <h2
              className={twMerge(
                "font-semibold text-[#2B6E36]",
                !isUser ? "text-[#2B6E36]" : "text-[#503465]"
              )}
            >
              {personal.nome}
            </h2>

            <span className="text-sm">
              {!isUser
                ? `Especialista em ${personal.exibitonDto[0].especialidadeId.nome}`
                : `Meta em ${usuario.meta.nome}`}
              <span className="font-semibold"> {""}</span>
            </span>

            {/* {personal.academiaId.cidade != null && personal.academiaId.estado != null ? (
            <span className="text-sm font-semibold">
              {personal.academiaId.cidade}, {personal.academiaId.estado}
            </span>
          ) : (
            <span className="text-sm font-semibold text-transparent">sas</span>
          )} */}
          </div>
        </div>

        {haveDots && isUserFiliado ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="absolute right-2 top-0 outline-none">
                <DotsThree size={32} color={"#000000"} />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
                side={"left"}
              >
                <DropdownMenu.Item
                  onClick={modalInteract}
                  className=" group text-[13px] leading-none text-primary-green300 rounded-[3px] flex pl-5  h-[25px] px-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-green200 data-[highlighted]:text-white"
                >
                  <button className="w-full flex justify-start items-center">
                    Se afiliar ao personal
                  </button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <></>
        )}
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
                content={"Solicitar"}
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

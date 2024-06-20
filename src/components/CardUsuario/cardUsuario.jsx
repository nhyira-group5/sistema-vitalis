import { DotsThree } from "@phosphor-icons/react";
import defaultIcon from "@assets/defaultIcon.png"

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {Button} from "@components/Button/button"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export function CardUsuario({filiado}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function modalInteract(){
    setIsModalOpen(!isModalOpen);
  }



  return (
    <div
      className={`w-1/3 h-fit bg-white rounded-2xl drop-shadow-lg p-4 flex gap-4 justify-between`}
    >
      <div className="flex gap-5">
        <img
          className="size-10 rounded-full object-cover self-center"
          src={filiado && filiado.midia? filiado.midia.caminho : defaultIcon}
          alt=""
        />
        <div className="h-full flex flex-col justify-between self-center ">
          <h2 className="font-semibold text-[#2B6E36]">{filiado && filiado.nome}</h2>
          <span className="text-sm font-semibold">
          
            <span className="font-semibold"> {filiado && filiado.meta ? "Meta: " + filiado.meta.nome : "Ainda sem meta!"}</span>
          </span>
        </div>
      </div>
      
      

            <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              {/* <Link to="/chat-personal" className="absolute right-2 top-0 outline-none"> 
                    <DotsThree size={32} color={"#000000"}/>
               </Link> */}
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
            <DropdownMenu.Content
            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={2}
            side={"top"}
            >
              

              <DropdownMenu.Item
              onClick={modalInteract} 
              className=" group text-[13px] leading-none text-primary-green300 rounded-[3px] flex pl-5  h-[25px] px-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-green200 data-[highlighted]:text-white">
                      <button className="w-full flex justify-start items-center">Abrir chat</button>
              </DropdownMenu.Item>
              




            </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>



            {isModalOpen ? (
                <div className="absolute w-screen h-screen top-0 left-0 z-50 bg-gray500/20 flex justify-center items-center">
                  <div className="bg-white rounded-lg shadow-sombra-padrao p-5 w-[30rem]  flex flex-col gap-7">
                    
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl font-semibold text-primary-green300">Solicitando parceria</span>
                      <button onClick={modalInteract}>
                        <X size={30}/>
                      </button>
                    </div>

                    <span className="font-semibold text-lg">Para ter o acompanhamento integral, mudanças de rotina, conversas e interações com alguém especializado, você deve mandar um termo de compromisso para o profissional escolhido.</span>
                  
                    <CardPersonal personal={personal} usuario={usuario}/>

                    <span className="font-semibold text-lg">Ao solicitar a parceria, será enviado um e-mail para o personal. A resposta dele será enviada via e-mail.</span>


                    <div className="w-full flex justify-end items-center">
                    <Button content={"Solicitar"} iconVisibility={false} onClick={postContact}/>
                    </div>
                  </div>
                </div>
            ):(
              null
            )}
      
    </div>
  );
}

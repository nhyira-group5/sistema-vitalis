import muralPin from "@assets/app/muralPin.png"; 
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    DotsThree
  } from "@phosphor-icons/react";

  import {formatarData} from "@utils/globalFunc"
import { useEffect } from "react";

export function MuralItem({muralItem, onDelete}){

    return(
    <div className="flex flex-col p-5 pt-7 rounded-xl items-center w-80 h-96 bg-white shadow-sombra-padrao gap-5 relative">


            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="absolute right-2 top-0 outline-none">
                        <DotsThree size={32} color={"#000000"}/>
                   </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                <DropdownMenu.Content
                className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
                >
                  
                  <DropdownMenu.Item 
                  onClick={() => onDelete(muralItem.idMural)}
                  className=" group text-[13px] leading-none text-errorRed rounded-[3px] flex pl-5  h-[25px] px-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-red-200 data-[highlighted]:text-errorRed">
                    <button className="w-full flex justify-start items-center">Excluir</button>
                  </DropdownMenu.Item>




                </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>

         <img className="absolute" src={muralPin} alt="" />

          <img className="w-full h-full object-cover " src={muralItem.midia.caminho} alt="" />

        
        <span className="font-semibold">{formatarData(muralItem.dtPostagem)}</span>
    </div>
    )
}
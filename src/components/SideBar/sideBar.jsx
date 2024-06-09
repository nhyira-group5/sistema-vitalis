import { SideBarItem } from "@components/SideBar/sideBarItem";
import {
  UserCircle,
  HouseLine,
  Barbell,
  CookingPot,
  Notepad,
  Users,
  Chat,
  Images,
} from "@phosphor-icons/react";

import * as Separator from "@radix-ui/react-separator";

export function SideBar() {
  // const location = useLocation();
  // const path = location.pathname;
  // if(path = "/home") {

  // }
  return (

    <nav className="h-fit rounded-xl border-1 bg-[#48B75A] flex flex-col w-fit items-center justify-center overflow-hidden">
      <SideBarItem URI={"/perfil"} Icon={<UserCircle size={40} />} />

      <div className="w-full px-2 my-3">
        <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full " />
      </div>

      <SideBarItem URI={"/home"} Icon={<HouseLine size={28} />} />

      <SideBarItem URI={"/rotinas"} Icon={<Barbell size={28} />} />


      <SideBarItem URI={"/refeicoes"} Icon={<CookingPot size={28} />} />

      <SideBarItem URI={"/relatorio"} Icon={<Notepad size={28} />} />

      <SideBarItem URI={"/buscar-personal"} Icon={<Users size={28} />} />

      <SideBarItem URI={"/chat"} Icon={<Chat size={28} />} />

      <SideBarItem URI={"/mural"} Icon={<Images size={28} />} />
    </nav>
  );
}

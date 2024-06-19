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
  SignOut 
} from "@phosphor-icons/react";
import * as Separator from "@radix-ui/react-separator";
import { space } from "postcss/lib/list";
import { SideBarItemPersonal } from "./sideBarItem";


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

      <SideBarItem URI={"/rotinas_semanais"} Icon={<Barbell size={28} />} />

      <SideBarItem URI={"/refeicoes"} Icon={<CookingPot size={28} />} />

      <SideBarItem URI={"/relatorio"} Icon={<Notepad size={28} />} />

      <SideBarItem URI={"/buscar-personal"} Icon={<Users size={28} />} />

      <SideBarItem URI={"/chat"} Icon={<Chat size={28} />} />

      <SideBarItem URI={"/mural"} Icon={<Images size={28} />} />

      <SideBarItem URI={"/login"} Icon={<SignOut  size={28} color="#CA1B1B"/>} />
    </nav>
  );
}

export function SideBarPersonal() {
  return(
    <nav className="h-fit rounded-xl border-1 bg-[#8656A9] flex flex-col w-fit items-center justify-center overflow-hidden">
      <SideBarItemPersonal URI={"/perfil-personal"} Icon={<UserCircle size={40} />} />

      <div className="w-full px-2 my-3">
        <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full " />
      </div>

      <SideBarItemPersonal URI={"/home-personal"} Icon={<HouseLine size={28} />} />

      <SideBarItemPersonal URI={"/chat-personal"} Icon={<Chat size={28} />} />

      <SideBarItem URI={"/login"} Icon={<SignOut  size={28} color="#CA1B1B"/>} />
    </nav>
  )
}
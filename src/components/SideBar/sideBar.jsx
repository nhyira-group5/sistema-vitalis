import imgUsuario from "@assets/app/usuario.svg";
import imgCaderno from "@assets/app/caderno.svg";
import imgCalendario from "@assets/app/calendario.svg";
import imgCasa from "@assets/app/casa.svg";
import imgChat from "@assets/app/chat.svg";
import imgHalter from "@assets/app/halter.svg";
import imgPanela from "@assets/app/panela.svg";
import imgUsuarios from "@assets/app/usuarios.svg";
import imgQuadro from "@assets/app/quadro.svg";
import { IconHome } from "../../components/SideBar/iconHome";

export function SideBar() {
  return (
    <div className="w-fit h-fit rounded-xl border-1 bg-[#48B75A] flex flex-col">
      <IconHome img={imgUsuario} />
      <hr />
      <IconHome img={imgCasa} />
      <IconHome img={imgHalter} />
      <IconHome img={imgPanela} selected={true} />
      <IconHome img={imgCaderno} />
      <IconHome img={imgUsuarios} />
      <IconHome img={imgCalendario} />
      <IconHome img={imgChat} />
      <IconHome img={imgQuadro} />
    </div>
  );
}
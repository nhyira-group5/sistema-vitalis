import { PaperPlaneRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function Message({ menssagem, time, user }) {
  const [align, setAlign] = useState("");
  const [colorBg, setColorBg] = useState("");
  const [colorIcon, setColorIcon] = useState("");
 
  // const [destinario, setDestinatario] = useState(menssagem.destinatario_id ? menssagem.destinatario_id : null)
  const [remetente, setRemetente] = useState(menssagem.remetente_id ? menssagem.remetente_id : null)
  const [assunto, setAssunto] = useState(menssagem.assunto ? menssagem.assunto : null)


  useEffect(() => {
    console.log(user)

    if (user.tipo === "USUARIO") {
      if(menssagem.remetente_id === user.id){
        setAlign("self-end");
        setColorBg("bg-[#64C273]");
      } else {
        setAlign("self-start");
        setColorBg("bg-[#8656A9]"); // Cor padrão para mensagens recebidas
      }
    } 

    if (user.tipo === "PERSONAL") {
      if(menssagem.remetente_id === user.id){
        setAlign("self-end");
        setColorBg("bg-[#8656A9]");
      } else {
        setAlign("self-start");
        setColorBg("bg-[#64C273]"); // Cor padrão para mensagens recebidas
      }
    } 


    setColorIcon("white");


  }, [remetente]);

  return (
    <div
      className={twMerge(
        "w-fit max-w-full text-wrap px-3 py-2 gap-1 rounded-xl flex flex-col",
        align,
        colorBg
      )}
    >
      {/* <span className="text-xs text-gray-200">{user.nome}</span> */}
      <span className="text-sm text-wrap overflow-hidden text-white">{assunto}</span>
      <span className="text-[10px] flex gap-1 items-center self-end">
        <PaperPlaneRight color={colorIcon} />
        {time}
      </span>
         
    </div>
  );
}

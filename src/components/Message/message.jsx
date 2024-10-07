import { PaperPlaneRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { format } from 'date-fns';

export function Message({ mensagem, user }) {
  const [align, setAlign] = useState("");
  const [colorBg, setColorBg] = useState("");
  const [colorIcon, setColorIcon] = useState("");

  const [remetente, setRemetente] = useState(
    mensagem.remetente_id ? mensagem.remetente_id : null
  );
  const [assunto, setAssunto] = useState(
    mensagem.assunto ? mensagem.assunto : null
  );
  console.log(mensagem.data_hora)
  const formattedTime = format(new Date(mensagem.data_hora), 'HH:mm');

  useEffect(() => {
    console.log(user);

    if (user.tipo === "USUARIO") {
      if (mensagem.remetente_id === user.id) {
        setAlign("self-end");
        setColorBg("bg-[#64C273]");
      } else {
        setAlign("self-start");
        setColorBg("bg-[#8656A9]");
      }
    }

    if (user.tipo === "PERSONAL") {
      if (mensagem.remetente_id === user.id) {
        setAlign("self-end");
        setColorBg("bg-[#8656A9]");
      } else {
        setAlign("self-start");
        setColorBg("bg-[#64C273]");
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
      <span className="text-sm text-wrap overflow-hidden text-white">
        {assunto}
      </span>
      <span className="text-[10px] flex gap-2 items-center self-end text-white">
        <PaperPlaneRight color={colorIcon} size={6} />
        {formattedTime}
      </span>
    </div>
  );
}

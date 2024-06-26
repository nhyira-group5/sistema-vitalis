import { PaperPlaneRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
export function Message({ destinatario, remetente, message, time, user }) {
  const [colorText, setColorText] = useState("");
  const [align, setAlign] = useState("");
  const [colorBg, setColorBg] = useState("");
  const [colorIcon, setColorIcon] = useState("");
  useEffect(() => {
    defineRecipientAndSender();
    defineTypeUser();
  }, []);
  function defineRecipientAndSender() {
    const usuario = JSON.parse(sessionStorage.getItem("loginResponse"));
    if (destinatario === usuario.id) {
      setAlign("self-end");
      setColorIcon("white");
    } else {
      setColorBg("bg-[#8656A9]");
      setColorIcon("white");
    }
  }
  function defineTypeUser() {
    const usuario = JSON.parse(sessionStorage.getItem("loginResponse"));
    if (remetente === usuario.id) {
      setColorBg("bg-[#64C273]");
      setColorIcon("white");
    } else {
      setColorBg("bg-[#8656A9]");
      setColorIcon("white");
    }
  }
  return (
    <div className={twMerge("w-fit max-w-lg py-2 pl-2 pr-3 rounded-xl flex flex-col", align, colorBg)}>
      <span className="text-xs text-gray-200">{user}</span>
      <span className="pl-1 pr-12 text-sm text-wrap text-white">
        {message}
      </span>
      <span className={twMerge("text-[10px] flex gap-1 items-center self-end", colorText)}>
        <PaperPlaneRight color={colorIcon} />
        {time}
      </span>
    </div>
  );
}
import { PaperPlaneRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function Message({ user, message, time }) {
  const [colorText, setColorText] = useState("")
  const [align, setAlign] = useState("")
  const [colorBg, setColorBg] = useState("")
  const [colorIcon, setColorIcon] = useState("")

  useEffect(() => {
    defineUser()
  }, [])

  function defineUser() {
    if (user === "sender") {
        setColorText("text-white")
        setAlign("self-end")
        setColorBg("bg-[#64C273]")
        setColorIcon("white")
    } else {
        setColorText("text-black")
        setColorBg("bg-[#F0ABF0]")
        setColorIcon("blue")
    }
  }

  return (
    <div className={twMerge("w-fit max-w-lg py-2 pl-2 pr-3 bg-white rounded-xl flex flex-col", align, colorBg)}>
      <span className={twMerge("pl-1 pr-12 text-sm text-wrap", colorText)}>
        {message}
      </span>
      <span className={twMerge("text-[10px] flex gap-1 items-center self-end", colorText)}>
        <PaperPlaneRight color={colorIcon} />
        {time}
      </span>
    </div>
  );
}

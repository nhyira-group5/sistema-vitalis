import { CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function AtividadeOption({ icon, activity, nameActivity, done, onClickFunction }) {
  const [colorBg, setColorBg] = useState("[#2B6E36]");
  const [colorText, setColorText] = useState("[#FFFFFF]");

  //   useEffect(() => {
  //     console.log(`Done mudou para ${done}`);
  //     changeColor()
  //   }, [done]);

  //   function changeColor() {
  //     if (done) {
  //         let temp = colorBg;
  //         setColorBg(colorText);
  //         setColorText(temp);
  //       }
  //   }


  return (
    <div
      className={`h-20 w-full flex items-center justify-between pl-4 bg-[${colorText}] rounded-xl shadow-md cursor-pointer`}
      onClick={onClickFunction}
    >
      <div className="flex gap-2 py-4">
        {icon}
        <span className={`text-${colorBg} font-semibold`}>
          {activity}:
        </span>
        <span className="font-medium">{nameActivity}</span>
      </div>
      <div className="h-full flex items-center bg-[#91D49C] p-1 rounded-xl rounded-ss-none rounded-es-none">
        <CaretRight size={20} color="white"/>
      </div>
    </div>
  );
}

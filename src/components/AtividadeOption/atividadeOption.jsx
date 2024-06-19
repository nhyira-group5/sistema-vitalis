import { Barbell, CaretRight, CookingPot } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function AtividadeOption({
  activity,
  nameActivity,
  done,
  onClickFunction,
  option
}) {
  const [colorText, setColorText] = useState("");
  const [colorIcon, setColorIcon] = useState("");

  useEffect(() => {
    changeColor();
  }, [done]);

  function changeColor() {
    if (done !== 0) {
      setColorIcon("#FFFFFF");
      setColorText("[#FFFFFF]");
    } else {
      setColorIcon("#2B6E36");
      setColorText("[#2B6E36]");
    }
  }

  return (
    <div
      className={`h-20 w-full flex items-center justify-between pl-4 bg-${
        done !== 0 ? "[#48B75A]" : "[#FFFFFF]"
      } rounded-xl shadow-md cursor-pointer`}
      onClick={onClickFunction}
    >
      <div className="flex gap-2 py-4">
        {activity == "Exercício" ? (
          <Barbell size={28} color={colorIcon} />
        ) : (
          <CookingPot size={28} color={colorIcon} />
        )}
        <span className={`text-${colorText} font-semibold`}>{activity}:</span>
        <span
          className={`font-medium text-${colorText} ${done !== 0 && "line-through"}`}
        >
          {nameActivity}
        </span>
      </div>
      {option && 
      <div className="h-full flex items-center bg-[#91D49C] p-1 rounded-xl rounded-ss-none rounded-es-none">
        <CaretRight size={20} color="white" />
      </div>
      }
    </div>
  );
}

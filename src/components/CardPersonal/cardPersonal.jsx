import { DotsThree } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

export function CardPersonal({
  name,
  specialty,
  city,
  state,
  size,
  media,
  haveDots,
  haveShadow,
  isUser,
}) {
  return (
    <div
      className={twMerge(
        "w-[98%] h-[20%] bg-white rounded-2xl p-4 flex gap-4 justify-between",
        haveShadow ? "drop-shadow-lg" : ""
      )}
    >
      <div className="flex gap-5">
        <img
          className={twMerge(
            "size-10 rounded-full object-cover self-center",
            size
          )}
          src={media}
          alt=""
        />
        <div className="h-full flex flex-col justify-between self-center ">
          <h2
            className={twMerge(
              "font-semibold text-[#2B6E36]",
              !isUser ? "text-[#2B6E36]" : "text-[#503465]"
            )}
          >
            {name}
          </h2>
          <span className="text-sm">
            {!isUser ? "Especialista em" : "Meta em"}
            <span className="font-semibold"> {specialty}</span>
          </span>
          {city != null && state != null ? (
            <span className="text-sm font-semibold">
              {city}, {state}
            </span>
          ) : (
            <span className="text-sm font-semibold text-transparent">sas</span>
          )}
        </div>
      </div>
      {haveDots ? (
        <button className="h-fit font-bold align-text-top">
          <DotsThree size={24} />
        </button>
      ) : (
        <div className="flex items-center gap-5 self-start">
          <span className="flex items-center gap-2">
            {" "}
            Status: <span className="font-semibold">Não afiliado </span>{" "}
            <div className="size-3 rounded-full bg-[#CA1B1B]"></div>{" "}
          </span>
        </div>
      )}
    </div>
  );
}

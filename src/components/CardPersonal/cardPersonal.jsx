import { DotsThree } from "@phosphor-icons/react";

export function CardPersonal({ name, specialty, city, state, media}) {
  return (
    <div className="w-full h-[20%] bg-white rounded-2xl shadow-xl p-4 flex gap-4 justify-between">
      <div className="flex gap-5">
        <img
          className="size-16 rounded-full object-cover"
          src={media}
          alt=""
        />
        <div className="h-full flex flex-col justify-between self-center">
          <h2 className="font-semibold text-[#2B6E36]">{name}</h2>
          <span className="text-sm">
            Especialista em
            <span className="font-semibold"> {specialty}</span>
          </span>
          <span className="text-sm font-semibold">{city}, {state}</span>
        </div>
      </div>
      <button className="h-fit font-bold align-text-top">
        <DotsThree size={24} />
      </button>
    </div>
  );
}

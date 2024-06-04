import { Star } from "@phosphor-icons/react";

export function CardAcad({ title, rating, distance, address }) {
  return (
    <div className="w-[48%] h-full rounded-xl shadow-xl p-4 flex flex-col justify-between">
      <div className="w-full flex justify-between">
        <h2 className="text-[#48B75A] font-semibold ">{title}</h2>
        <div className="flex items-center gap-1">
          <span className="text-[#F6D920] font-semibold">{rating}</span>
          <Star color="#F6D920" weight="fill" />
        </div>
      </div>
      <div className="w-full flex justify-between text-xs">
        <div className="w-5/6 text-xs flex flex-col gap-1">
          <h3 className="font-semibold">Horário de funcionamento</h3>
          <span>Seg. a Sex. 06h30 ás 23h30</span>
          <span>Sab. e Dom. 09h30 ás 23h30</span>
        </div>
        <div className="w-[65%] flex flex-col justify-between text-right">
          <span className="font-semibold">{distance} min de distância</span>
          <span className="text-nowrap">{address}</span>
        </div>
      </div>
    </div>
  );
}

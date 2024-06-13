import { Check } from "@phosphor-icons/react";

export function ItemCheck({text}) {
  return (
    <div className="w-full flex justify-between items-center">
      <Check color="#5EAF6B" size={22} />
      <span className="w-5/6 text-sm">
        {text}
      </span>
    </div>
  );
}

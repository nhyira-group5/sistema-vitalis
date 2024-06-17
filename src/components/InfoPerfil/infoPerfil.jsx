import { twMerge } from "tailwind-merge"

export function InfoPerfil({title, text, width}) {
  return (
    <div className={twMerge("w-[30%] h-fit flex flex-col", width)}>
      <h3 className="w-full font-medium text-lg">{title}</h3>
      <span className="w-full text-sm text-nowrap">{text}</span>
    </div>
  );
}

import { CaretLineDown } from "@phosphor-icons/react";
import * as Label from "@radix-ui/react-label";
import { useState } from "react";

export function Select({
  options,
  selectStyle,
  labelContent,
  labelStyle,
  placeholder,
  onChangeFunction,
  id,
  nome,
  valid,
}) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  return (
    <div className="group">
      <Label.Root
        className={`${
          labelStyle
            ? labelStyle
            : " group-focus-within:text-primary-green300 text-lg font-bold pl-[8%]"
        } ${valid ? "text-errorRed" : ""}`}
        htmlFor={id}
      >
        {labelContent}
      </Label.Root>

      <div
        className={`${valid ? "  !ring-errorRed " : ""}${
          selectStyle
            ? ` ${selectStyle}`
            : " animate-bounce group-focus-within:!ring-primary-green300"
        } h-16 p-3 relative flex w-full bg-gray100 border-gray100 border-2 rounded-full outline-none ring-1 ring-gray500`}
      >
        <select
          className="outline-none appearance-none w-full text-gray500 font-mavenPro text-lg"
          name={nome}
          id={id}
          placeholder={placeholder}
          onChange={onChangeFunction}
          onFocus={() => setIsSelectOpen(true)}
          onBlur={() => setIsSelectOpen(false)}
        >
          <option value="" selected disabled>
            Selecione um sexo
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <CaretLineDown size={32} color="#000000" />
      </div>
    </div>
  );
}
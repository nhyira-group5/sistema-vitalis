import * as Label from "@radix-ui/react-label";

export function Input({isColum, inputStyle, labelContent, labelStyle, placeholder, onChangeFunction, value, id, inputType, nome, ref}) {
  return (
      <Label.Root
        className={`${labelStyle ? labelStyle : 'text-sm font-sm font-semibold focus-within:text-primary-green300 flex '} ${isColum ? 'flex-col gap-1' : 'flex-row items-center gap-2'}`}
        htmlFor={id}
      >
        {labelContent}

        <input
        className={`${inputStyle ? inputStyle : 'peer w-full font-inter  p-3 bg-white border-white border-2 rounded-xl outline-none focus:ring focus:ring-primary-green300 text-black500 invalid:ring-red-500'}`}
        placeholder={placeholder}
        onChange={onChangeFunction}
        value={value}
        id={id}
        name={nome}
        type={inputType}
        ref={ref}
      />

      </Label.Root>
  );
}

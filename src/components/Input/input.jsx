import * as Label from "@radix-ui/react-label";

export function Input({isColum, inputStyle, labelContent, labelStyle, placeholder, onChangeFunction, value, id, inputType, nome}) {
  return (
      <Label.Root
        className={`${labelStyle ? labelStyle : 'text-sm font-sm font-semibold focus-within:text-primary-green300 flex '} ${isColum ? 'flex-col gap-1' : 'flex-row '}`}
        htmlFor={id}
      >
        {labelContent}

        <input
        className={`${inputStyle ? inputStyle : 'peer w-full px-3 font-inter  py-3 bg-white border-white border-2 rounded-xl outline-none focus:ring focus:ring-primary-green300 text-black500'}`}
        placeholder={placeholder}
        onChange={onChangeFunction}
        value={value}
        id={id}
        name={nome}
        type={inputType}
      />

      </Label.Root>
  );
}

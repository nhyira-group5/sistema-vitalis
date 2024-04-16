import * as Label from "@radix-ui/react-label";

export function Input({isColum, inputStyle, labelContent, labelStyle, placeholder, onChangeFunction, value, id, inputType,  }) {
  return (

    <div className={`flex ${isColum ? 'flex-col' : 'flex-row'}`}>
      <Label.Root
        className={`${labelStyle ? labelStyle : 'text-[15px] font-sm leading-[35px] text-black'}`}
        htmlFor={id}
      >
        {labelContent}
      </Label.Root>
      <input
        className={`${inputStyle ? inputStyle : 'w-full px-2  py-3 bg-white rounded-xl flex-1 outline-none text-black100'}`}
        placeholder={placeholder}
        onChange={onChangeFunction}
        value={value}
        id={id}
        name={name}
        type={inputType}
       
      />
    </div>
  );
}

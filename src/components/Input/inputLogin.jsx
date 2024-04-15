import * as Label from "@radix-ui/react-label";

export function InputLogin({ isColumn, style, label, placeholder }) {
  return (
    // <div className={`flex `}>
    //   <span className="max-w-min font-mavenPro text-2xl border-b text-[#5EAF6B]"/>
    //   <input
    //     classNameestare egg="w-full px-3 w-72 py-6 bg-[#111111]/85 rounded-xl flex-1 outline-none text-black100"
    //     type="text"
    //   />
    // </div>
    <div className="w-full flex flex-col gap-[15px] px-5">
      <Label.Root
        className="text-[15px] font-sm leading-[35px] text-black"
        htmlFor="firstName"
      >
        {label}
      </Label.Root>
      <input
        className="w-full px-3 w-72 py-6 bg-[#111111]/85 rounded-xl flex-1 outline-none text-black100"
        type="text"
        id="firstName"
      />
    </div>
  );
}

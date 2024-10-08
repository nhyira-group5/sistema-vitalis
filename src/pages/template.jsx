import { SideBar } from "../components/SideBar/sideBar";

export function Template({ name, children }) {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#2B6E36] font-semibold text-2xl">{name}</h1>
        {children}
      </div>
    </div>
  );
}

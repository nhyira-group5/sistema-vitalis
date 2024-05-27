import { SideBar } from "../../components/SideBar/sideBar";

export function HomePage() {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between rounded-md">
        {/* CODIGO DA TELA */}
      </div>
    </div>
  );
}

import { SideBar } from "../../components/SideBar/sideBar";

export function PerfilPage() {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#2B6E36] font-semibold text-2xl">Perfil</h1>
        <div className="flex w-full h-[88%] justify-between">
          <div className="w-[48%] h-full bg-white rounded-xl p-5 shadow-lg flex flex-col gap-5">
            <h2 className="text-lg font-medium text-[#48B75A]">
              Informações pessoais
            </h2>
            <div className="w-full h-1/4 flex gap-40">
              <img
                className="size-30 rounded-full object-contain bg-red-700"
                src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                alt=""
              />
              <div className="h-full w-full font-medium text-lg flex flex-col gap-5">
                <div className="h-1/3 w-full flex flex-col text-lg font-semibold tracking-wider">
                  Data de Nascimento
                  <span className="w-full text-base">Marcos da Silva</span>
                </div>

                <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                  Data de Nascimento
                  <span className="text-base">Marcos da Silva</span>
                </div>
              </div>
              <div className="font-medium flex flex-col gap-2"></div>
            </div>

            <div className="w-2/5 flex flex-col gap-5">
              <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                Data de Nascimento
                <span className="text-base">Marcos da Silva</span>
              </div>
              <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                Data de Nascimento
                <span className="text-base">Marcos da Silva</span>
              </div>
              <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                Data de Nascimento
                <span className="text-base">Marcos da Silva</span>
              </div>
              <div className="h-1/3 flex flex-col text-lg font-semibold tracking-wider">
                Data de Nascimento
                <span className="text-base">Marcos da Silva</span>
              </div>
            </div>
          </div>
          <div className="w-[48%] h-full bg-green-200"></div>
        </div>
      </div>
    </div>
  );
}

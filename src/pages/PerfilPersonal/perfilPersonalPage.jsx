import { SideBarPersonal } from "../../components/SideBar/sideBar";

export function PerfilPersonalPage() {
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBarPersonal />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#503465] font-semibold text-2xl">Perfil</h1>
        <div className="w-full h-[88%] flex justify-between items-center">
          <div className="w-[48%] h-full bg-red-400 p-4 flex flex-col justify-between">
            <h1 className="font-medium text-lg text-[#503465]">
              Informações Pessoais
            </h1>
            <img
              className="h-24 w-fit border rounded-full"
              src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
              alt=""
            />
          </div>

          <div className="w-[48%] h-full bg-white drop-shadow-lg rounded-xl p-5 flex flex-col justify-between">
            <h1 className="font-medium text-xl text-[#503465]">
              Informações do endereço da sua academia
            </h1>
            <div className="w-full h-fit flex justify-between">
              <div className="w-[50%] flex flex-col">
                <h3 className="font-medium text-lg">Logradouro</h3>
                <span className="text-sm">
                  Rua Doutor Benedito Arruda Vianna
                </span>
              </div>
              <div className="w-[30%] flex flex-col">
                <h3 className="font-medium text-lg">Número</h3>
                <span className="text-sm">219</span>
              </div>
              <div className="w-1/6 flex flex-col">
                <h3 className="font-medium text-lg">CEP</h3>
                <span className="text-sm">05815-095</span>
              </div>
            </div>
            <div className="w-full h-fit  flex justify-between">
              <div className="w-[50%] h-fit flex flex-col">
                <h3 className="font-medium text-lg">Bairro</h3>
                <span className="text-sm">Jardim São Francisco de Assis</span>
              </div>
              <div className="w-[30%] h-fit flex flex-col">
                <h3 className="font-medium text-lg">Cidade</h3>
                <span className="text-sm">São Paulo</span>
              </div>
              <div className="w-1/6 h-fit flex flex-col">
                <h3 className="font-medium text-lg">Estado</h3>
                <span className="text-sm">SP</span>
              </div>
            </div>
            <div className="w-full h-[58%] bg-pink-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { DotsThree } from "@phosphor-icons/react";

export function CardUsuario() {
  return (
    <div
      className={`w-[48%] h-fit bg-white rounded-2xl drop-shadow-lg p-4 flex gap-4 justify-between`}
    >
      <div className="flex gap-5">
        <img
          className="size-10 rounded-full object-cover self-center"
          src="https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
          alt=""
        />
        <div className="h-full flex flex-col justify-between self-center ">
          <h2 className="font-semibold text-[#2B6E36]">Rogerinho</h2>
          <span className="text-sm">
            Especialista em
            <span className="font-semibold"> Sexo</span>
          </span>
          <span className="text-sm font-semibold">Pirituba, SP</span>
        </div>
      </div>
      {true ? (
        <button className="h-fit font-bold align-text-top">
          <DotsThree size={24} />
        </button>
      ) : (
        <div className="flex items-center gap-5 self-start">
          <span className="flex items-center gap-2">
            {" "}
            Status: <span className="font-semibold">Não afiliado </span>{" "}
            <div className="size-3 rounded-full bg-[#CA1B1B]"></div>{" "}
          </span>
        </div>
      )}
    </div>
  );
}

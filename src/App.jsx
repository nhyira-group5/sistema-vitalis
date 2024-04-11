export function App() {
  return (
    <div className="max-w-min mx-auto h- py-8 flex flex-col flex-1 gap-5 justify-center bg-[FF00FF} text-nowrap">
      <h1 className="font-mavenPro font-bold text-[90px] text-center text-[#519747]">
        Bem-vindo(a) de volta!
      </h1>

      <div className="text-2xl text-right flex flex-col gap-5">
        <p>Bem-vindo de volta! Estamos felizes em tê-lo conosco novamente.</p>
        <p className="text-wrap">
          Faça login para acessar sua conta e explorar todas as novidades que
          preparamos para você.
        </p>
      </div>

      <div className="w-full py-8 flex flex-col gap-8 ">
        <div className="flex flex-col gap-4">
          <span className="max-w-min font-mavenPro text-2xl border-b text-[#5EAF6B]">
            E-MAIL OU NICKNAME:
          </span>
          <input
            className="w-full px-3 w-72 py-6 bg-[#111111]/85 rounded-xl flex-1 outline-none border-0 p-0 ring-0 focus:ring-0 text-black100"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="max-w-min font-mavenPro text-2xl border-b text-[#5EAF6B]">
            SENHA:
          </span>
          <input
            className="w-full px-3 w-72 py-6 bg-[#111111]/85 rounded-xl flex-1 outline-none border-0 p-0 text-sm ring-0 focus:ring-0"
            type="text"
          />
        </div>
        
        <div className="flex justify-between text-xl tracking-wider">
          <div className="flex gap-4 items-center">
            <input
              className="size-4 bg-black//20 rounded border-4 border-white/50"
              type="checkbox"
            />
            <span>Deseja se manter conectado?</span>
          </div>
          <div>
            <span>
              Esqueceu a senha? <a href="#">Clique aqui!</a>
            </span>
          </div>
        </div>
        <div className="w-full pt-14 flex justify-around">
          <div className="w-1/3">
            <button className="w-full p-6 rounded-2xl text-black500 text-2xl border-4 ">
              Entrar com o Google G
            </button>
          </div>
          <div className="w-1/3">
            <button className="w-full p-6 rounded-2xl bg-[#5EAF6B] text-white text-2xl">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

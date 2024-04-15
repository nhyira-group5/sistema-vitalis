import { InputLogin } from "../../components/Input/inputLogin";

export function LoginPage() {
  // const [userType, setUserType] = useState(true);

  return (
    <div className="max-w-min mx-auto h-screen py-8 flex flex-col flex-1 gap-5 justify-center bg-[FF00FF} text-nowrap">
      <h1 className="font-mavenPro font-bold text-5xl text-center text-[#519747]">
        Bem-vindo(a) de volta!
      </h1>

      <div className="text-sm text-right flex flex-col gap-5">
        <p className="text-wrap min-w-min">Bem-vindo de volta! Estamos felizes em tê-lo conosco novamente.</p>
        <p className="text-wrap">
          Faça login para acessar sua conta e explorar todas as novidades que
          preparamos para você.
        </p>
      </div>

      <div className="w-full py-8 flex flex-col gap-8 ">
        <InputLogin label={"E-MAIL OU NICKNAME"}></InputLogin>
        <InputLogin label={"E-MAIL OU NICKNAME"}>SENHA</InputLogin>

        <div className="flex justify-between text-xs tracking-wider">
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

        <div className="w-full pt-2 flex justify-around">
          <div className="w-1/3">
            <button className="w-full p-6 rounded-2xl text-black500 text-sm border-4 ">
              Entrar com o Google G
            </button>
          </div>
          <div className="w-1/3">
            <button className="w-full p-6 rounded-2xl bg-[#5EAF6B] text-white text-sm">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

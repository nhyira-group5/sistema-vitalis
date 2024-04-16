
import { InputLogin } from "../../components/Input/inputLogin";
import myImage from "../../assets/icon-google.svg";
import myLogo from "../../assets/logos/lilasNormalSizeblackColor.svg";


export function LoginPage() {
  // const [userType, setUserType] = useState(true);

  return (
    // <div className="max-w-min mx-auto h-screen py-8 flex flex-col flex-1 gap-5 justify-center bg-[FF00FF} text-nowrap">
    //   <h1 className="font-mavenPro font-bold text-5xl text-center text-[#519747]">
    //     Bem-vindo(a) de volta!
    //   </h1>

    //   <div className="text-sm text-right flex flex-col gap-5">
    //     <p className="text-wrap min-w-min">Bem-vindo de volta! Estamos felizes em tê-lo conosco novamente.</p>
    //     <p className="text-wrap">
    //       Faça login para acessar sua conta e explorar todas as novidades que
    //       preparamos para você.
    //     </p>
    //   </div>

    //   <div className="w-full py-8 flex flex-col gap-8 ">
    //     <InputLogin label={"E-MAIL OU NICKNAME"}></InputLogin>
    //     <InputLogin label={"E-MAIL OU NICKNAME"}>SENHA</InputLogin>

    //     <div className="flex justify-between text-xs tracking-wider">
    //       <div className="flex gap-4 items-center">
    //         <input
    //           className="size-4 bg-black//20 rounded border-4 border-white/50"
    //           type="checkbox"
    //         />
    //         <span>Deseja se manter conectado?</span>
    //       </div>
    //       <div>
    //         <span>
    //           Esqueceu a senha? <a href="#">Clique aqui!</a>
    //         </span>
    //       </div>
    //     </div>

    //     <div className="w-full pt-2 flex justify-around">
    //       <div className="w-1/3">
    //         <button className="w-full p-6 rounded-2xl text-black500 text-sm border-4 ">
    //           Entrar com o Google G
    //         </button>
    //       </div>
    //       <div className="w-1/3">
    //         <button className="w-full p-6 rounded-2xl bg-[#5EAF6B] text-white text-sm">
    //           Entrar
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="flex justify-around h-screen p-12">
      <div><img className="w-36" src={myLogo} alt="img logo" /></div>
      <div className="max-w-min w-fit mx-auto flex flex-col gap-10 justify-between bg-[FF00FF} text-nowrap">
        {/* CABEÇALHO/TITULO  */}
        <div className="font-mavenPro text-center flex flex-col gap-7">
          <div className="font-bold text-6xl text-center text-[#519747]">
            Bem vindo(a) de volta!

          </div>
          <div className="text-base flex flex-col gap-5">
            <p className="">
              Bem-vindo de volta! Estamos felizes em tê-lo conosco novamente.
            </p>
            <p className=" text-wrap">
              Faça login para acessar sua conta e explorar todas as novidades
              que preparamos para você.
            </p>
          </div>
        </div>

        {/* FORMS COM INPUT */}
        <div>
          {/* <form action="#">
        <InputLogin label="Email"/>
        <InputLogin label="Senha"/>
      </form> */}

          {/* CHECKBOX CONECTADO E ESQUECEU A SENHA */}
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <input
                id="conectado"
                type="checkbox"
                className="border-3 rounded-md border-black100 size-3"
              />
              <label htmlFor="conectado" className="tracking-wider">
                Lembre de mim
              </label>
            </div>
            <div>
              <a href="#" className="text-[#0070d2]">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
        </div>

        {/* BOTÕES GOOGLE E ENTRAR */}
        <div className="flex justify-around">
          <button className="w-64 flex justify-around gap-3 py-4 px-7 rounded-2xl border-[3px] bg-[#ebebeb]/80">
            Entrar com Google
            <img className="size-5" src={myImage} alt="vai da nao" />
          </button>
          <button className="w-64 flex justify-around py-4 px-7 rounded-2xl text-white bg-[#5EAF6B]/80">
            Entrar
          </button>
        </div>

        {/* RODAPÉ */}
        <span className="w-full text-center">
          © 2024 nhyira. All Rights reserved
        </span>
      </div>
      <div className="w-36"></div>
    </div>
  );
}

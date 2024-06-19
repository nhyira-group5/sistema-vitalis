import { ItemCheck } from "../../components/ItemCheck/itemCheck";
import { SideBar } from "../../components/SideBar/sideBar";
import { Link, useNavigate } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import axios from "axios";

import { validateLogin, validateUsuario} from "@utils/globalFunc"

export function PlanosPage() {
  const [qrCode, setQRCode] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");
  
  const [carregando, setCarregando] = useState(false);
  
  const navigate = useNavigate();

  useEffect(()=>{

    const validarLoginEUsuario = async () =>{

      await validateLogin(navigate);
      await validateUsuario(navigate);

  }

  validarLoginEUsuario();
    

  },[])

  function pagamentoDto() {
    const body = {
      usuarioId: 19, // PEGAR O ID DO USUARIO QUE VER POR LOCALSTORAGE
      tipo: "PIX", // SEMPRE SERA PIX
      assinaturaId: 2, // VAI SER UM ID FIXO E MOCKADO, PROVAVELMENTE O VALOR SERÁ 1
    };

    return body;
  }

  function handlePayment() {
    const requestBody = pagamentoDto();
    axios
      .post("http://localhost:8080/pagamentos/criar", requestBody)
      .then((response) => {
        console.log(
          response.data.point_of_interaction.transaction_data.ticket_url
        );
        // window.location.href = response.data.point_of_interaction.transaction_data.ticket_url;
        setQRCode(
          response.data.point_of_interaction.transaction_data.qr_code_base64
        );
        generateDateExpiration(response.data.date_of_expiration);
      });
  }

  function generateDateExpiration(data) {
    // let data = "2024-06-11T21:35:37.042-04:00";
    let dataParseada = parseISO(data);
    let dataFormatada = format(
      dataParseada,
      "'dia' dd 'de' MMMM 'às' HH:mm 'h.'",
      { locale: ptBR }
    );

    setDateExpiration(dataFormatada)
  }

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#2B6E36] font-semibold text-2xl">Planos</h1>
        <div className="w-full h-[93%] flex justify-evenly items-center">
          <div className="bg-white w-[25%] h-5/6 rounded-2xl flex flex-col justify-between items-center p-6 shadow-xl">
            <h1 className="h-fit font-semibold text-[#5EAF6B] text-xl">
              Plano Gratuito
            </h1>
            <div className="w-full h-fit flex flex-col items-center gap-6 ">
              <h2 className="font-medium">Beneficios atuais</h2>
              <ItemCheck text="Plano de exercícios de acordo com seu objetivo" />
              <ItemCheck text="Mural - Espaço para você registrar seu avanço corporal" />
              <ItemCheck text="Acesso a sua rotina (calendário, guia de alimentação, e seus exercícios do dia)" />
              <ItemCheck text="Guia de Alimentação" />
              <ItemCheck text="Personais e Academias perto de você" />
            </div>
            <Link to="../home" className="bg-[#64C273] px-4 py-1.5 rounded-xl text-white text-sm">
              Estou satisfeito
            </Link>
          </div>
          {!qrCode ? (
            <div className="bg-white w-[25%] h-5/6 rounded-2xl flex flex-col justify-between items-center p-6 shadow-xl">
              <h1 className="h-fit font-semibold text-[#5EAF6B] text-xl">
                Plano Viva Vitalis
              </h1>
              <div className="w-full h-fit flex flex-col items-center gap-6">
                <h2 className="w-4/5 font-medium text-center mt-[-45px]">
                  Além dos benefícios atuais, você terá acesso à:
                </h2>
                <ItemCheck text="Chat com Personal Trainer de sua escolha" />
                <ItemCheck text="Acompanhamento personalisado com o personal para chegar mais perto de seu ojetivo!" />
              </div>

              <div className="h-fit w-full flex justify-center items-center gap-2 ">
                <span className="font-medium text-[#5EAF6B] self-start text-sm">
                  Por:
                </span>
                <span className="text-5xl font-medium text-[#5EAF6B]">
                  49,99
                </span>
                <span className="text-sm font-medium text-[#5EAF6B] self-end">
                  Por mês
                </span>
              </div>
              <button
                className="bg-[#64C273] px-7 py-1.5 rounded-xl text-white text-lg font-semibold"
                onClick={handlePayment}
              >
                Adquirir plano
              </button>
            </div>
          ) : (
            <div className="bg-white w-[25%] h-5/6 rounded-2xl flex flex-col justify-between items-center p-6 shadow-xl">
              <h1 className="h-fit font-semibold text-[#5EAF6B] text-xl">
                Plano Viva Vitalis
              </h1>
              <span className="text-sm">Vencimento: {dateExpiration}</span>
              <span className="text-sm">Pague R$ 49,99 via Pix</span>
              <img
                className="w-44"
                src={
                  "data:image/jpeg;base64," +
                  "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"
                }
                alt="SEM IMAGEM AINDA"
              />
              <span className="text-xs text-center">
                Assim que o pagamento for efetuado você será redirecionado para
                "Home"
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

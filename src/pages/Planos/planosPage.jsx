import { ItemCheck } from "../../components/ItemCheck/itemCheck";
import { SideBar } from "../../components/SideBar/sideBar";
import { Link, useNavigate } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { id, ptBR } from "date-fns/locale";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { api } from "../../api";
import { toast } from 'react-toastify';


import { UserContext } from "../../user-context";

import { validateLogin, validateUsuario } from "@utils/globalFunc";

export function PlanosPage() {
  const [qrCode, setQRCode] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");
  const [assinatura, setAssinatura] = useState({});
  const [paymentId, setPaymentId] = useState(null);
  const [situacao, setSituacao] = useState("pending");
  const { user, updatePagamento, updateUser } = useContext(UserContext);

  const [loadingPage, setLoadingPage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchAssinaturas();
  }, [user]);

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate, user);
      await validateUsuario(navigate, user);
    };

    validarLoginEUsuario();
  }, []);

  useEffect(() => {
    const verificarStatus = async () => {
      if (!paymentId) return;
      console.log(paymentId);
      try {
        const response = await api.get(`/pagamentos/${paymentId}`);
        console.log(response)
        const { status } = response.data;
        setSituacao(status);
        console.log(status)
        if (status === "approved") {
          
          let updatedUser = JSON.parse(JSON.stringify(user))

          updatedUser.userData.pagamentoAtivo = true;
          updateUser(updatedUser)
          toast.success('Pagamento efetuado com sucesso!');

          console.log('redirecionando...')
          clearInterval(intervalId);
          navigate('/home');
        }
      } catch (error) {
        console.error("Erro ao verificar o status do pagamento:", error);
      }
    };

    const intervalId = setInterval(verificarStatus, 2000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [paymentId]);

  const fetchAssinaturas = async () => {
    try {
      const response = await api.get(`/assinaturas/2`);
      setAssinatura(response.data);
    } catch (e) {
      console.error("Error in GET request:", e);
    }
  };

  // VERIFICAR SE O STATUS DE PAGAMENTO MUDA PARA APROVADO
  // useEffect(() => {
  //   // Função para verificar o status do pagamento
  //   const verificarStatus = async () => {
  //     if (!paymentId) return;

  //     try {
  //       const response = await axios.get(`/api/mercado-pago/status/${paymentId}`);
  //       const { status } = response.data;
  //       setStatus(status);

  //       if (status === 'approved') {
  //         clearInterval(intervalId);
  //       }
  //     } catch (error) {
  //       console.error('Erro ao verificar o status do pagamento:', error);
  //     }
  //   };

  //   // Verifica o status a cada 10 segundos
  //   const intervalId = setInterval(verificarStatus, 10000);

  //   // Limpa o intervalo quando o componente for desmontado
  //   return () => clearInterval(intervalId);
  // }, [paymentId]);

  const handlePayment = async () => {
    const requestBody = {
      usuarioId: user.userData.id,
      tipo: "PIX",
      assinaturaId: 2,
    };

    try {
      const response = await api.post(`/pagamentos/criar`, requestBody);
      console.log(response);
      console.log(
        response.data.point_of_interaction.transaction_data.ticket_url
      );
      setQRCode(
        response.data.point_of_interaction.transaction_data.qr_code_base64
      );
      generateDateExpiration(response.data.date_of_expiration);
      setPaymentId(response.data.id);
      updatePagamento();
    } catch (e) {
      console.error("Error in POST request:", e);
    }
  };

  function generateDateExpiration(data) {
    // let data = "2024-06-11T21:35:37.042-04:00";
    let dataParseada = parseISO(data);
    let dataFormatada = format(
      dataParseada,
      "'dia' dd 'de' MMMM 'às' HH:mm 'h.'",
      { locale: ptBR }
    );

    setDateExpiration(dataFormatada);
  }

  if (loadingPage == false) return null;
  if (user && user.userData.pagamentoAtivo)
    return (
      <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
        <SideBar />

        <div className="w-[88%] h-[90%] flex flex-col justify-between">
          <h1 className="text-[#2B6E36] font-semibold text-2xl">Planos</h1>
          <div className="w-full h-[93%] flex justify-evenly items-center">
            <div className="bg-white rounded-2xl p-4 shadow-xl grid grid-cols-1 gap-5 place-items-center conts">
              <h2 className="font-semibold text-xl">
                VOCÊ JÁ POSSUI UM PLANO ATIVO!
              </h2>

              <Link
                to="../home"
                className="bg-[#2B6E36] py-2 px-4 rounded-md text-white font-medium self-center"
              >
                VOLTAR PARA A PÁGINA PRINCIPAL
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
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
            <Link
              to="../home"
              className="bg-[#64C273] px-4 py-1.5 rounded-xl text-white text-sm cursor-pointer"
            >
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
                className="bg-[#64C273] px-7 py-1.5 rounded-xl text-white text-lg font-semibold cursor-pointer"
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
              <span className="text-sm">
                Pague R$ {assinatura.valor.toFixed(2) || ""} via Pix
              </span>
              <img
                className="w-44"
                src={"data:image/jpeg;base64," + qrCode}
                alt="SEM IMAGEM AINDA"
              />
              <span className="text-xs text-center">
                Após realizar o pagamento, volte para o página inicial
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

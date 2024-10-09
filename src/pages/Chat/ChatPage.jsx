import { useEffect, useState, useRef, useContext } from "react";
import { Message } from "../../components/Message/message";
import { SideBar } from "../../components/SideBar/sideBar";
import { twMerge } from "tailwind-merge";
import defaultIcon from "@assets/defaultIcon.png";
import { UserContext } from "../../user-context";
import { Link, useNavigate } from "react-router-dom";
import { apiChat } from "../../api";
import { io } from "socket.io-client";

export function ChatPage() {
  const { user } = useContext(UserContext);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [personal, setPersonal] = useState(null);
  const [personalAtivo, setPersonalAtivo] = useState(null);
  const [chatId, setChatId] = useState(1);
  const messagesContainerRef = useRef(null);
  const navigate = useNavigate();
  const socket = useRef(null);

  useEffect(() => {
    if (user) {
      console.log(user.userData.personalId)
      console.log("setando o persoanl")
      setPersonal(user.userData.personalId)
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    
    // socket.current = io("http://localhost:3001");
    socket.current = io("http://44.223.87.21:3001");

    socket.current.on("receive_message", (data) => {
      handleMessageReceived(data);
    });

    return () => {
      console.log("desmontando socket...");
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchIdChat = async () => {
    if (user) {
      const json = await apiChat.get(`/messages/usuario/${user.userData.id}`);
      console.log(json.data[0].chat_id);
      setChatId(json.data[0].chat_id);
    }
  };

  const fetchMessages = async () => {
    if (user) {
      const json = await apiChat.get(`/messages/chat/${chatId}`);
      console.log(json.data);
      setMessages(json.data);
    }
  };

  useEffect(() => {
    fetchIdChat();
    fetchMessages();
  }, []);

  const handleMessageReceived = (m) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        assunto: m.assunto,
        remetente_id: m.remetente_id,
        data_hora: m.data_hora,
      },
    ]);
  };

  function selecionarPersonal(event) {
    setPersonalAtivo(personal);
  }

  const sendMessage = () => {
    if (inputValue === "") return;

    console.log(chatId, user.userData.id, personal.idUsuario, inputValue);

    if (!socket.current) return console.error("Socket não está definido");

    socket.current.emit("send_message", {
      chat_id: chatId,
      remetente_id: user.userData.id,
      destinatario_id: personal.iadUsuario,
      assunto: inputValue,
      data_hora: new Date(),
    });

    handleMessageReceived({
      remetente_id: user.userData.id,
      assunto: inputValue,
      data_hora: new Date(),
    });

    setInputValue("");
  };

  if (!user || !personal) return <div>Loading...</div>;
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      {!user.userData.pagamentoAtivo && (
        <div className="absolute bg-white mx-auto my-0 max-w-prose p-4 rounded-xl z-10 grid grid-cols-[1fr_auto] place-content-start items-center gap-x-8 gap-y-4">
          <h3 className="font-medium text-xl col-span-full">
            Acesso Exclusivo para Usuários Premium
          </h3>
          <p className="text-base">
            Esta funcionalidade está disponível apenas para assinantes premium.
            Para continuar e aproveitar todos os recursos do nosso site, você
            precisará atualizar sua assinatura.
          </p>

          <Link
            className="block py-2 px-4 max-w-max rounded-md bg-[#2B6E36] uppercase font-medium text-lg text-white mx-auto my-0 place-self-center"
            to="/planos"
          >
            Ver Planos
          </Link>
        </div>
      )}
      <div
        className={twMerge(
          "w-[88%] h-[90%] flex flex-col justify-between",
          !user.userData.pagamentoAtivo && "blur-sm"
        )}
      >
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-[#737673] font-semibold text-2xl">Chat</h1>
        </div>

        <div className="w-full h-[90%] flex justify-between items-center">
          <div className="w-1/4 h-full bg-[#48B75A] rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <h1 className="text-white text-base font-medium text-center">
              Personal
            </h1>
            <hr className="border" />
            {(!user.userData.personalId && (
              <div className="w-full flex-col  bg-white rounded-2xl shadow-xl p-4 flex justify-between">
                <span className="font-semibold text-base text-[#2B6E36]">
                  Personal não encontrado!
                </span>
                <span className="font-semibold text-sm">
                  Parece que você ainda não é filiado a um personal!
                </span>

                <Link
                  to="/buscar-personal"
                  className="place-self-end bg-[#2B6E36] text-white py-1 px-2 rounded-md font-medium hover:bg-[#1E6129]"
                >
                  Buscar personal
                </Link>
              </div>
            )) || (
              <div
                className={twMerge(
                  "bg-white rounded-md flex gap-4 w-full p-4 items-center cursor-pointer",
                  personalAtivo && personalAtivo.id === personal.id
                    ? "ring-2 ring-offset-2 ring-primary-green200"
                    : ""
                )}
                // data-personal-id={personal.idUsuario}
                onClick={(event) => {
                  selecionarPersonal(event);
                }}
              >
                {(!personal.midia && (
                  <img
                    src={defaultIcon}
                    alt=""
                    className="rounded-full w-10 h-10 ring-1 ring-black"
                  />
                )) || <img src={personal.midia[0].caminho} alt="" />}

                <div className="flex flex-col">
                  <span className="font-semibold">{personal.nome}</span>
                  <span className=" text-sm">@{personal.nickname}</span>
                </div>
              </div>
            )}
          </div>

          {!personalAtivo ? (
            <></>
          ) : (
            <div className="w-[70%] h-full flex flex-col justify-between">
              <div className="w-full h-[80%] max-h-min p-6 flex flex-col justify-between items-center bg-white rounded-2xl shadow-lg">
                <div
                  className="w-full h-full scroll-auto p-4 flex flex-col gap-3 overflow-y-auto "
                  ref={messagesContainerRef}
                >
                  {messages.length > 0 ? (
                    messages.map((m, index) => (
                      <Message key={index} mensagem={m} user={user.userData} />
                    ))
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      Sem mensagens...
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full h-1/6 flex items-center justify-between py-6">
                <input
                  className="w-[88%] border-[1.5px] border-gray-200 focus:outline-gray-400 rounded-lg rounded-es-none rounded-se-none px-3 py-1.5 text-base"
                  type="text"
                  placeholder="Envie sua mensagem"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  className="px-5 py-2 rounded-2xl shadow-lg text-white bg-[#48B75A]"
                  onClick={sendMessage}
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

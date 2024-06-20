import { useEffect, useState } from "react";
import { Message } from "../../components/Message/message";
import { SideBar } from "../../components/SideBar/sideBar";
import { Siren } from "@phosphor-icons/react";
import axios from "axios";
import { socket } from "../../utils/Socket";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns"; 

export function ChatPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [personal, setPersonal] = useState(null);
  const [personalId, setPersonalId] = useState(null);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(sessionStorage.getItem("loginResponse"));
    let chatIdRes;

    const fetchData = async () => {
      try {
        const chatRes = await axios.get(`http://localhost:3001/messages/usuario/${usuario.id}`);
        const personalRes = await axios.get(`http://localhost:8080/usuarios/personal/${usuario.id}`);
        
        chatIdRes = chatRes.data.recordset[0].id_chat;

        const messagesRes = await axios.get(`http://localhost:3001/messages/chat/${chatIdRes}`);

        setMessages(messagesRes.data.recordset);
        setChatId(chatIdRes);
        setPersonalId(personalRes.data.id);
        setPersonal(personalRes.data.nickname);

        if (!socket.connected) {
          socket.auth = {
            chats: [chatIdRes],
            user: {
              id: usuario.id
            }
          };

          socket.on("ttm", handleMessageReceived);
          socket.connect();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      socket.off("ttm", handleMessageReceived);
    };
  }, []);

  const handleMessageReceived = (m) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        assunto: m.assunto,
        destinatarioId: m.destinatarioId,
        remetenteId: m.remetenteId,
        data_hora: m.dataHora
      }
    ]);
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    const text = inputValue.trim();
    if (text === "") return;

    const usuario = JSON.parse(sessionStorage.getItem("loginResponse"));

    socket.emit("ttm", {
      chatId,
      remetenteId: usuario.id,
      destinatarioId: personalId,
      assunto: text
    });

    setInputValue("");
  };

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className={twMerge("w-[88%] h-[90%] flex flex-col justify-between")}>
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-[#2B6E36] font-semibold text-2xl">Chat</h1>
          <button className="p-1.5 bg-[#CA1B1B] rounded-md">
            <Siren size={20} color="white" />
          </button>
        </div>
        <div className="w-full h-[90%] flex justify-between items-center">
          <div className="w-1/4 h-full bg-[#48B75A] rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <h1 className="text-white text-base font-medium">
            Personal afiliado
            </h1>

            <div className="w-full h-[20%] bg-white rounded-2xl shadow-xl p-4 flex gap-4 justify-between">
              <div className="w-full flex gap-5">
                <img
                  className="size-[50px] rounded-full object-cover flex self-center"
                  src="https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
                  alt=""
                />
                <div className="w-[65%] h-full flex flex-col justify-center self-center">
                  <h2 className="font-semibold text-sm text-[#2B6E36]">
                    {personal !== null ? personal : 'Personal não encontrado'}
                  </h2>
                </div>
              </div>
            </div>

            <hr className="border" />
          </div>

          <div className="w-[70%] h-full  flex flex-col justify-between">
            <div className="w-full h-[80%] min-h-max p-6 flex flex-col justify-between items-center bg-white rounded-2xl shadow-lg">
              <hr className="w-full border border-black" />
              <div className="w-full h-5/6 p-4 flex flex-col gap-3 overflow-y-auto scrollbar-thin">
                {messages.length > 0 ? (
                  messages.map((m, index) => (
                    <Message
                      key={index}
                      message={m.assunto}
                      time={format(new Date(m.data_hora), "dd/MM/yyyy HH:mm:ss")} // Formatação da data aqui
                      remetente={m.remetenteId}
                      destinatario={m.remetenteId}
                    />
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
                className="w-[88%] border-[1.5px] border-black rounded-lg rounded-es-none rounded-se-none px-3 py-1.5 text-base"
                type="text"
                placeholder="Envie sua mensagem"
                value={inputValue}
                onChange={handleChangeInput}
              />
              <button
                className="px-5 py-2 rounded-2xl shadow-lg text-white bg-[#48B75A]"
                onClick={sendMessage}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

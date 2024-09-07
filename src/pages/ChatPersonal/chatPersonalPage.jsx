import { useEffect, useState } from "react";
import axios from "axios";
import { Siren } from "@phosphor-icons/react";
import { socket } from "../../utils/Socket";
import { format } from "date-fns";
import { SideBarPersonal } from "../../components/SideBar/sideBar";
import { Message } from "../../components/Message/message";

export function ChatPersonalPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const usuario = JSON.parse(sessionStorage.getItem("loginResponse"));

        const usuarioResponse = await axios.get(
          `http://localhost:8080/usuarios/personal/${usuario.id}`
        );
        setUsuario(usuarioResponse.data);
        setUsuarioId(usuarioResponse.data.id);

        const chatResponse = await axios.get(
          `http://localhost:3001/messages/usuario/${usuario.id}`
        );
        const chatId = chatResponse.data[0].id_chat;
        setChatId(chatId);

        const messagesResponse = await axios.get(
          `http://localhost:3001/messages/chat/${chatId}`
        );
        setMessages(messagesResponse.data);

        // Configurar o socket
        if (!socket.connected) {
          socket.auth = {
            chats: [chatId],
            user: {
              id: usuario.id,
            },
          };

          socket.on("ttm", handleMessageReceived);
          socket.on("typing", handleTypingReceived);
          socket.connect();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPersonalData();

    return () => {
      socket.off("ttm", handleMessageReceived);
      socket.off("typing", handleTypingReceived);
    };
  }, []);

  const handleMessageReceived = (m) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        assunto: m.assunto,
        destinatarioId: m.destinatarioId,
        remetenteId: m.remetenteId,
        data_hora: m.dataHora,
      },
    ]);
  };

  const handleTypingReceived = (username) => {
    setTypingUser(username);
    setTimeout(() => setTypingUser(""), 3000);
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
    const usuario = JSON.parse(sessionStorage.getItem("loginResponse"));
    socket.emit("typing", { username: usuario.username });
  };

  const sendMessage = () => {
    const text = inputValue.trim();
    if (text === "") return;

    const usuario = JSON.parse(sessionStorage.getItem("loginResponse"));

    socket.emit("ttm", {
      chatId,
      remetenteId: usuario.id,
      destinatarioId: usuarioId,
      assunto: text,
    });

    setInputValue("");
  };

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBarPersonal />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[#503465] font-semibold text-2xl">Chat</h1>
          {/* <button className="p-1.5 bg-[#CA1B1B] rounded-md">
            <Siren size={20} color="white" />
          </button> */}
        </div>
        <div className="w-full h-[90%] flex justify-between items-center">
          <div className="w-1/4 h-full bg-[#8656A9] rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <h1 className="text-white text-base font-medium">
              Usuários afiliados
            </h1>
            <div className="w-full h-[20%] bg-white rounded-2xl shadow-xl p-4 flex gap-4 justify-between">
              <div className="w-full flex gap-5">
                <img
                  className="w-[50px] h-[50px] rounded-full object-cover flex self-center"
                  src="https://sportsjob.com.br/wp-content/uploads/2018/06/Mauricio-Rossi-foto-para-site-3.jpg"
                  alt=""
                />
                <div className="w-[65%] h-full flex flex-col justify-center self-center">
                  <h2 className="font-semibold text-sm text-black">
                    w1llSal4d@
                  </h2>
                </div>
              </div>
            </div>
            <hr className="border" />
          </div>
          <div className="w-[70%] h-full flex flex-col justify-between">
            <div className="w-full h-[80%] min-h-max p-6 flex flex-col justify-between items-center bg-white rounded-2xl shadow-lg">
              <hr className="w-full border border-black" />
              <div className="w-full h-5/6 p-4 flex flex-col gap-3 overflow-y-auto scrollbar-thin">
                {messages.length > 0 ? (
                  messages.map((m, index) => (
                    <Message
                      key={index}
                      message={m.assunto}
                      time={format(
                        new Date(m.data_hora),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                      remetente={m.remetenteId}
                      destinatario={m.destinatarioId}
                      user={m.user}
                    />
                  ))
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    Ainda sem mensagens...
                  </div>
                )}
                {typingUser && (
                  <div className="w-full h-6 flex justify-start items-center text-sm text-gray-500">
                    {typingUser} está digitando...
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-1/6 flex items-center justify-between py-6">
              <input
                className="w-[88%] border-[1.5px] border-black rounded-lg rounded-es-none rounded-se-none px-3 py-1.5 text-base"
                type="text"
                placeholder="Digite sua mensagem"
                value={inputValue}
                onChange={handleChangeInput}
              />
              <button
                className="px-5 py-2 rounded-2xl shadow-lg text-white bg-[#8656A9]"
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

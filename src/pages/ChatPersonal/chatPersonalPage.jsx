import { useEffect, useState, useRef, useContext } from "react";
import { Message } from "../../components/Message/message";
import { SideBarPersonal } from "../../components/SideBar/sideBar";
import { twMerge } from "tailwind-merge";
import defaultIcon from "@assets/defaultIcon.png";
import { UserContext } from "../../user-context";
import { api, apiChat } from "../../api";
import { io } from "socket.io-client";

export function ChatPersonalPage() {
  const { user } = useContext(UserContext);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [alunosFiliados, setAlunosFiliados] = useState([]);
  const [alunoAtivo, setAlunoAtivo] = useState(null);
  const [chatId, setChatId] = useState(null);
  const messagesContainerRef = useRef(null);

  const socket = useRef(null);

  const getFiliados = async () => {
    const json = await api.get(
      `/usuarios/usuario-afiliado/${user.userData.id}`
    );
    console.log(json.data[0].id);
    setAlunosFiliados(json.data);
  };

  useEffect(() => {
    getFiliados();
  }, []);

  useEffect(() => {
    // socket.current = io("http://localhost:3001");
    socket.current = io("http://3.226.245.89:3001");

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

  const fetchIdChat = async () => {
    const json = await apiChat.get(`/messages/usuario/${user.userData.id}`);
    console.log(json.data[0].chat_id);
    setChatId(json.data[0].chat_id);
  };

  const fetchMessages = async () => {
    const json = await apiChat.get(`/messages/chat/${chatId}`);
    console.log(json.data);
    setMessages(json.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchIdChat();
      console.log(user.userData.id, chatId);
      if (chatId) {
        await fetchMessages(chatId);
      }
    };

    fetchData();
  }, [chatId, user.userData.id]);

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

  function selecionarAluno(event) {
    // const alunoId = Number(event.currentTarget.dataset.alunoId);
    // const alunoSelecionado = alunosFiliados.find(
    //   (aluno) => aluno.id === alunoId
    // );
    setAlunoAtivo(alunosFiliados);
  }

  // pegar chats dos alunos do personal (fazer a lógica)
  const sendMessage = () => {
    if (inputValue === "") return;

    console.log(chatId, user.userData.id, alunosFiliados[0].id, inputValue);

    if (!socket.current) return console.error("Socket não está definido");

    socket.current.emit("send_message", {
      chat_id: chatId,
      remetente_id: user.userData.id,
      destinatario_id: alunosFiliados[0].id,
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

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!user || !user.userData) return <div>Loading...</div>;
  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBarPersonal />
      <div className={twMerge("w-[88%] h-[90%] flex flex-col justify-between")}>
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-[#737673] font-semibold text-2xl">Chat</h1>
        </div>

        <div className="w-full h-[90%] flex justify-between items-center">
          <div className="w-1/4 h-full bg-[#8656A9] rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <h1 className="text-white text-base font-medium text-center">
              Alunos
            </h1>
            <hr className="border" />
            {alunosFiliados.length === 0 ? (
              <div className="w-full flex-col bg-white rounded-2xl shadow-xl p-4 flex justify-between">
                <span className="font-semibold text-base text-[#2B6E36]">
                  Nenhum aluno afiliado ainda! :(
                </span>
                <span className="font-semibold text-sm">
                  Parece que você ainda não possui nenhum filiado ainda...!
                </span>
              </div>
            ) : (
              alunosFiliados.map((aluno, index) => (
                <div
                  key={index}
                  className={twMerge(
                    "bg-white rounded-md flex gap-4 w-full p-4 items-center cursor-pointer",
                    alunoAtivo && alunoAtivo.id === aluno.id
                      ? "ring-2 ring-offset-2 ring-primary-green200"
                      : ""
                  )}
                  data-aluno-id={aluno.id}
                  onClick={(event) => {
                    selecionarAluno(event);
                  }}
                >
                  {aluno.midia ? (
                    <img
                      src={aluno.midia.caminho}
                      alt=""
                      className="rounded-full w-10 h-10 ring-1 ring-black"
                    />
                  ) : (
                    <img
                      src={defaultIcon}
                      alt=""
                      className="rounded-full w-10 h-10 ring-1 ring-black"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold">{aluno.nome}</span>
                    <span className="text-sm">@{aluno.nickname}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {alunoAtivo ? (
            <div className="w-[70%] h-full flex flex-col justify-between">
              <div className="w-full h-[80%] max-h-min p-6 flex flex-col justify-between items-center bg-white rounded-2xl shadow-lg">
                <div
                  className="w-full h-full scroll-auto p-4 flex flex-col gap-3 overflow-y-auto"
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
                  className="px-5 py-2 rounded-2xl shadow-lg text-white bg-[#8656A9]"
                  onClick={sendMessage}
                >
                  Enviar
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

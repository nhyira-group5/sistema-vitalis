import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { socket } from "../../utils/Socket";
import { format } from "date-fns";
import { SideBarPersonal } from "../../components/SideBar/sideBar";
import { Message } from "../../components/Message/message";
import { UserContext } from '../../user-context'; 
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import defaultIcon from '@assets/defaultIcon.png';
import { api } from '../../api';

export function ChatPersonalPage() {

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const { user, loading, error} = useContext(UserContext);
  const [alunosFiliados, setAlunosFiliados] = useState([]);

  const [alunoAtivo, setAlunoAtivo] = useState(null);

  const [chatId, setChatId] = useState(null);

  const [typingUser, setTypingUser] = useState("");



useEffect(()=>{
  getFiliados()
}, [])

  function getFiliados() {
    try {
      api
        .get(`/usuarios/usuario-afiliado/${user.userData.id}`)
        .then((response) => {
          console.log(response.data)
          setAlunosFiliados(response.data);
          
        });
    } catch (error) {
      console.log(error)
    } 

  }


  const handleMessageReceived = (m) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        assunto: m.assunto,
        destinatario_id: m.destinatario_id,
        remetente_id: m.remetente_id,
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

  function selecionarAluno(event){
    const alunoId = Number(event.currentTarget.dataset.alunoId);
    let alunoSelecionado = alunosFiliados.find(aluno => aluno.id === alunoId);
    
    setAlunoAtivo(alunoSelecionado)
  }

  useEffect(()=>{
    setChat();
  }, [alunoAtivo])

  function setChat(){
    let chatIdRes;
    const fetchData = async () => {
      try {
        const chatRes = await axios.get(
          `http://localhost:3001/messages/usuario/${user.userData.id}`,
        );


        chatIdRes = chatRes.data.find(chat => chat.usuario_id === alunoAtivo.id);


        const messagesRes = await axios.get(
          `http://localhost:3001/messages/chat/${chatIdRes.id_chat}`,
        );

        console.log(messagesRes.data)
        setMessages(messagesRes.data);
        setChatId(chatIdRes.id_chat);

        if (!socket.connected) {
          socket.auth = {
            chats: [chatIdRes],
            user: {
              id: user.userData.id,
            },
          };
          socket.connect();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Inscrição ao evento de recebimento de mensagens
    socket.on('ttm', handleMessageReceived);

    return () => {
      socket.off('ttm', handleMessageReceived); // Remover a inscrição no evento ao desmontar o componente
    };
  }


  const sendMessage = () => {
    const text = inputValue.trim();
    if (text === "") return;

    socket.emit("ttm", {
      chatId,
      remetente_id: user.userData.id,
      destinatario_id: alunoAtivo.id,
      assunto: text,
    });

    setInputValue("");
  };

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBarPersonal />


      <div
        className={twMerge(
          'w-[88%] h-[90%] flex flex-col justify-between'
        )}
      >
        
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
                  className={twMerge(
                    'bg-white rounded-md flex gap-4 w-full p-4 items-center cursor-pointer',
                    alunoAtivo && alunoAtivo.id === aluno.id ? 'ring-2 ring-offset-2 ring-primary-green200' : ''
                  )}
                    data-aluno-id={aluno.id}
                    onClick={(event)=>{selecionarAluno(event)}}
                  >
                    {aluno.midia && aluno.midia ? (
                      <img src={aluno.midia.caminho} alt="" className='rounded-full w-10 h-10 ring-1 ring-black'/>
                    ) : (
                      <img src={defaultIcon} alt="" className='rounded-full w-10 h-10 ring-1 ring-black'/>
                    )}
                    
                    <div className='flex flex-col'>
                      <span className='font-semibold'>{aluno.nome}</span>
                      <span className='text-sm'>@{aluno.nickname}</span>
                    </div>
                  </div>
                ))
              )}

          </div>

          {!alunoAtivo ? (
            <></> 
          ) : (
            <div className="w-[70%] h-full flex flex-col justify-between">
              <div className="w-full h-[80%] min-h-max p-6 flex flex-col justify-between items-center bg-white rounded-2xl shadow-lg">
                <div className="w-full h-5/6 p-4 flex flex-col gap-3 overflow-y-auto scrollbar-thin">
                  {messages.length > 0 ? (
                    messages.map((m, index) => (
                      
                      <Message
                        key={index}
                        menssagem={m}
                        time={format(
                          new Date(m.data_hora),
                          'dd/MM/yyyy HH:mm:ss',
                        )}
                        user={user.userData}
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
                  className="w-[88%] border-[1.5px] border-gray-200 focus:outline-gray-400 rounded-lg rounded-es-none rounded-se-none px-3 py-1.5 text-base"
                  type="text"
                  placeholder="Envie sua mensagem"
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
          )}

        </div>
        </div>
      </div>
  );
}

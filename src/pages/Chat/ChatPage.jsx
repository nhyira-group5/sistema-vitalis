import { useEffect, useState, useRef, useContext} from 'react';
import { Message } from '../../components/Message/message';
import { SideBar } from '../../components/SideBar/sideBar';
import { Siren } from '@phosphor-icons/react';
import axios from 'axios';
import { socket } from '../../utils/Socket';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import defaultIcon from '@assets/defaultIcon.png';
import {
  validateLogin,
  validateUsuario,
} from '@utils/globalFunc';
import { UserContext } from '../../user-context'; 
import { Link, useNavigate } from 'react-router-dom';
import { CardPersonal } from '../../components/CardPersonal/cardPersonal';

export function ChatPage() {
  const { user, loading, error} = useContext(UserContext);

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const [personal, setPersonal] = useState(user.userData.personalId ? user.userData.personalId : null);

  const [personalAtivo, setPersonalAtivo] = useState(null);
  const [chatId, setChatId] = useState(null);
  

  
  const navigate = useNavigate();

  const isInitialRender = useRef(true);

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate, user);
      await validateUsuario(navigate, user);
    };

    validarLoginEUsuario();
  }, []);

  useEffect(() => {
    // Certificar-se de que as mensagens não são duplicadas na inicialização
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    // Lógica adicional para impedir duplicação se necessário
  }, [messages]);

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

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  function selecionarPersonal(event){
    // const idPersonal = event.currentTarget.dataset.personalId
    setPersonalAtivo(personal)

    setChat();
  }

  function setChat(){
    let chatIdRes;
    const fetchData = async () => {
      try {
        const chatRes = await axios.get(
          `http://localhost:3001/messages/usuario/${user.userData.id}`,
        );

        chatIdRes = chatRes.data[0].id_chat;

        const messagesRes = await axios.get(
          `http://localhost:3001/messages/chat/${chatIdRes}`,
        );

        setMessages(messagesRes.data);
        setChatId(chatIdRes);

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
    if (text === '') return;

    console.log(user.userData.id, personal.idUsuario  , text, chatId)
    
    socket.emit('ttm', {
      chatId,
      remetente_id: user.userData.id,
      destinatario_id: personal.idUsuario,
      assunto: text,
    });
    setInputValue('');
  };

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
          'w-[88%] h-[90%] flex flex-col justify-between',
          !user.userData.pagamentoAtivo && 'blur-sm',
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
            {!user.userData.personalId && (
                          <div className="w-full flex-col  bg-white rounded-2xl shadow-xl p-4 flex justify-between">
                              <span className="font-semibold text-base text-[#2B6E36]">
                                Personal não encontrado!
                              </span>
                              <span className="font-semibold text-sm">Parece que você ainda não é filiado a um personal!</span>
                              
                              <Link
                                to="/buscar-personal"
                                className="place-self-end bg-[#2B6E36] text-white py-1 px-2 rounded-md font-medium hover:bg-[#1E6129]"
                              >
                                Buscar personal
                              </Link>
                        </div>
            ) || (
              <div                   
              className={twMerge(
                'bg-white rounded-md flex gap-4 w-full p-4 items-center cursor-pointer',
                personalAtivo && personalAtivo.id === personal.id ? 'ring-2 ring-offset-2 ring-primary-green200' : ''
              )} data-personal-id={personal.idUsuario} onClick={(event)=>{selecionarPersonal(event)}}>
                {!personal.midia && (
                  <img src={defaultIcon} alt="" className='rounded-full w-10 h-10 ring-1 ring-black'/>
                ) || (
                  <img src={personal.midia[0].caminho} alt="" />
                )}

                <div className='flex flex-col'>
                  <span className='font-semibold'>{personal.nome}</span>
                  <span className=' text-sm'>@{personal.nickname}</span>
                </div>
              </div>
            )}

           
          </div>

          {!personalAtivo ? (
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

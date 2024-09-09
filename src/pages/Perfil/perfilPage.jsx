import { MagnifyingGlass } from '@phosphor-icons/react';
import { SideBar } from '../../components/SideBar/sideBar';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CloudinaryButtonPerfil } from '@components/Button/button';
import defaultIcon from '@assets/defaultIcon.png';
import { api } from '../../api';
import {
  validateLogin,
  validateUsuario,
  formatarCPF,
  converterDataFormato,
} from '@utils/globalFunc';
import { UserContext } from '../../user-context';

export function PerfilPage() {
  const { user, loading, error } = useContext(UserContext);
  const [personal, setPersonal] = useState(null);
  const [fichaUsuario, setFichaUsuario] = useState(user.userFicha);
  const [rotinaUsuario, setRotinaUsuario] = useState({ usuarioId: user.userData.id, metaId: user.userData.meta.id });
  const [fichaIsLoading, setFichaIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate, user);
      await validateUsuario(navigate, user);
    };

    validarLoginEUsuario();
  }, [navigate, user]);

function insertImage(cloudObject) {
    const { url, original_filename, format } = cloudObject;

    const midiaDto = {
      nome: original_filename,
      caminho: url,
      extensao: format,
      tipo: "Imagem"
    };

    console.log(midiaDto)
    // try {
    //   api.post('/midias/salvarMidia', midiaDto).then((response) => {
    //     muralItemDto.midiaId = response.data.idMidia;

    //     api.post(/murais, muralItemDto).then((response) => {
    //       toast.success('Imagem carregada com sucesso!');

    //       setMuralItens((prevItems) => [...prevItems, response.data]);
    //     });
    //   });
    // } catch (error) {
    //   toast.error('Falha no envio da imagem!');
    // }
  }

  useEffect(() => {
    if (user && user.userData.pagamentoAtivo === true && user.userData.personalId) {
      setPersonal(user.userData.personalId);
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBar />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#2B6E36] font-semibold text-2xl">Perfil</h1>
        <div className="flex w-full h-[88%] justify-between">
          <div className="w-[48%] bg-white rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-[#2B6E36]">Informações pessoais</h2>
            <div className="max-w-40 rounded my-0 mx-auto relative">
              <img
                className="object-cover h-full py-4 rounded-full block"
                src={personal && personal.midia ? personal.midia.caminho : defaultIcon}
                alt=""
              />
              <CloudinaryButtonPerfil uploadFunction={insertImage} />
            </div>
            <div className="grid grid-cols-4">
              <div className="px-2 py-2 col-span-2 border-r border-b">
                <h3 className="font-semibold text-sm">Nome Completo</h3>
                <p>{fichaUsuario && fichaUsuario.usuarioId ? fichaUsuario.usuarioId.nome : 'xtop'}</p>
              </div>
              <div className="px-2 py-2 col-span-2 border-b">
                <h3 className="font-semibold text-sm">E-mail</h3>
                <p>{fichaUsuario && fichaUsuario.usuarioId ? fichaUsuario.usuarioId.email : 'caue@gmail.com'}</p>
              </div>
              <div className="px-2 py-2 col-span-2 border-r border-b">
                <h3 className="font-semibold text-sm">CPF</h3>
                <p>{fichaUsuario && fichaUsuario.usuarioId ? formatarCPF(fichaUsuario.usuarioId.cpf) : '000.000.000-00'}</p>
              </div>
              <div className="px-2 py-2 border-b border-r">
                <h3 className="font-semibold text-sm">Data de Nasc.</h3>
                <p>{fichaUsuario && fichaUsuario.usuarioId ? converterDataFormato(fichaUsuario.usuarioId.dtNasc) : '25/01/2004'}</p>
              </div>
              <div className="px-2 py-2 border-b">
                <h3 className="font-semibold text-sm">Sexo</h3>
                <p>{fichaUsuario && fichaUsuario.usuarioId ? fichaUsuario.usuarioId.sexo === 'F' ? 'Feminino' : fichaUsuario.usuarioId.sexo === 'M' ? 'Masculino' : '' : ''}</p>
              </div>
              <div className="px-2 py-2 col-span-2 border-r">
                <h3 className="font-semibold text-sm">Meta</h3>
                <p>{user && user.userData.meta.nome}</p>
              </div>
              <div className="px-2 py-2">
                <h3 className="font-semibold text-sm">Peso</h3>
                <p>{fichaUsuario.peso ? `${fichaUsuario.peso}kg` : ''}</p>
              </div>
              <div className="px-2 py-2">
                <h3 className="font-semibold text-sm">Altura</h3>
                <p>{fichaUsuario.altura ? `${fichaUsuario.altura}cm` : ''}</p>
              </div>
            </div>
          </div>
          <div className="w-[48%] flex justify-center items-center">
            {user && user.userData.pagamentoAtivo ? (
              personal ? (
                <div className="bg-[#1A1A1A] rounded-xl p-5 shadow-lg flex flex-col justify-between">
                  <h2 className="text-lg font-semibold text-white">Personal Afiliado</h2>
                  <div className="max-w-40 rounded-3xl my-0 mx-auto">
                    <img
                      className="py-4 rounded-full block max-w-full"
                      src={personal.midia ? personal.midia.caminho : defaultIcon}
                      alt=""
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 bg-white p-2 rounded-xl">
                    <div className="px-2 py-2 col-span-2 border">
                      <h3 className="font-semibold text-sm">Nome Completo</h3>
                      <p>{personal.nome ? personal.nome : 'xtop'}</p>
                    </div>
                    <div className="px-2 py-2 col-span-2">
                      <h3 className="font-semibold text-sm">E-mail</h3>
                      <p>{personal.email ? personal.email : 'caue@gmail.com'}</p>
                    </div>
                    <div className="px-2 py-2 col-span-2 border">
                      <h3 className="font-semibold text-sm">Meta</h3>
                      <p>{personal.especialidade ? personal.especialidade.nome : ''}</p>
                    </div>
                    <div className="px-2 py-2">
                      <h3 className="font-semibold text-sm">Data de Nasc.</h3>
                      <p>{personal.dtNasc ? converterDataFormato(personal.dtNasc) : '25/01/2004'}</p>
                    </div>
                    <div className="px-2 py-2">
                      <h3 className="font-semibold text-sm">Sexo</h3>
                      <p>{personal.sexo ? (personal.sexo === 'F' ? 'Feminino' : personal.sexo === 'M' ? 'Masculino' : '') : ''}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-white shadow-lg rounded-lg grid grid-cols-[1fr_auto] p-4 place-content-start items-center gap-2">
                  <h2 className="text-xl font-semibold text-[#2B6E36] mb-4">Personal Afiliado</h2>
                  <MagnifyingGlass className="place-self-center row-span-2" size={44} />
                  <strong className="mb-2">Parece que você não se afilou a nenhum personal ainda!</strong>
                  <p className="max-w-96 text-sm">Para se afiliar a um personal, va para a pagina de busca de personais e escolha um para você</p>
                  <Link
                    to="/buscar-personal"
                    className="place-self-end bg-[#2B6E36] text-white py-2 px-4 rounded-lg font-medium uppercase hover:bg-[#1E6129]"
                  >
                    Buscar personal
                  </Link>
                </div>
              )
            ) : (
              <div className="w-full bg-white shadow-lg rounded-lg grid grid-cols-[1fr_auto] p-4 place-content-start items-center gap-2">
                <h2 className="text-xl font-semibold text-[#2B6E36] mb-4">Personal Afiliado</h2>
                <MagnifyingGlass className="place-self-center row-span-2" size={44} />
                <strong className="mb-2">Este é um recurso <span className="font-semibold text-[#2B6E36]">PAGO</span>!</strong>
                <p className="max-w-96 text-sm">Para acessá-lo, é necessário participar do plano premium. Contribua para sua experiência premium como usuário e se mantenha melhor do que nunca!</p>
                <Link
                  to="/planos"
                  className="place-self-end bg-[#2B6E36] text-white py-2 px-4 rounded-lg font-medium uppercase hover:bg-[#1E6129]"
                >
                  Ser Premium
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

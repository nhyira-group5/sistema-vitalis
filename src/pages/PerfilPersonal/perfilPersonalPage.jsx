import { useEffect, useState, useContext } from "react";
import { InfoPerfil } from "../../components/InfoPerfil/infoPerfil";
import { SideBarPersonal } from "../../components/SideBar/sideBar";
import axios from "axios";
import defaultIcon from "@assets/defaultIcon.png";
import { validateLogin, validatePersonal } from "@utils/globalFunc";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../user-context";
import { formatarCPF, converterDataFormato } from "@utils/globalFunc";
import { api } from "../../api";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const API_KEY = "AIzaSyBphGlydquijmtQMo5u8VTCI-pM45XUwpE"; // Chave da API do Google Maps

export function PerfilPersonalPage() {
  const { user, loading, error } = useContext(UserContext);
  const [speciality, setSpeciality] = useState(null);
  const [items, setItems] = useState([]);
  const [endereco, setEndereco] = useState(user.userData.academiaId);
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState({ lat: -23.55052, lng: -46.633308 }); // Posição padrão em São Paulo

  // Função para obter coordenadas a partir do endereço
  const obterCoordenadas = async (endereco) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${endereco.logradouro},${endereco.numero},${endereco.bairro},${endereco.cidade},${endereco.estado}&key=${API_KEY}`
      );
      const { lat, lng } = response.data.results[0].geometry.location; // Obtém a latitude e longitude
      setMapCenter({ lat, lng }); // Atualiza a posição do mapa
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
    }
  };

  // Verifica login e dados do usuário
  useEffect(() => {
    const validarLoginEUsuario = async () => {
      await validateLogin(navigate, user);
      await validatePersonal(navigate, user);
    };

    validarLoginEUsuario();
  }, []);

  // Obtém especialidades do usuário
  useEffect(() => {
    const fetchCore = async () => {
      const response = await api.get(`/especialidadesPersonais/${user.userData.id}`);
      setSpeciality(response.data);
    };
    fetchCore();
  }, [user]);

  // Atualiza as especialidades
  useEffect(() => {
    console.log(user);
    obterEspecialdiades();
  }, [speciality]);

  // Chama a função para obter as coordenadas do endereço quando o endereço é atualizado
  useEffect(() => {
    if (endereco) {
      obterCoordenadas(endereco);
    }
  }, [endereco]);

  function transformaData(data) {
    let dataObj = new Date(data);
    let dia = String(dataObj.getDate() + 1).padStart(2, "0");
    let mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    let ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function obterEspecialdiades() {
    console.log(speciality);
    if (speciality !== null) {
      let vetorAux = [];
      for (let i = 0; i < speciality.length; i++) {
        const element = speciality[i];
        vetorAux.push(element.especialidadeId.nome);
      }
      console.log(vetorAux);
      setItems(vetorAux);
    }
  }

  if (user == null || speciality == null || endereco == null) return null;

  return (
    <div className="w-full h-screen flex justify-evenly items-center bg-[#F7FBFC]">
      <SideBarPersonal />
      <div className="w-[88%] h-[90%] flex flex-col justify-between">
        <h1 className="text-[#503465] font-semibold text-2xl">Perfil</h1>
        <div className="w-full h-[88%] flex justify-between items-center">
          <div className="w-[48%] h-full bg-white rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-[#2B6E36]">Informações pessoais</h2>
            <div className="w-36 h-36 mx-auto relative rounded-full overflow-hidden">
              <img
                className="object-cover h-full"
                src={user && user.userData.midia ? user.userData.midia.caminho : defaultIcon}
                alt=""
              />
            </div>
            <div className="grid grid-cols-4">
              <div className="px-2 py-2 col-span-2 border-r border-b">
                <h3 className="font-semibold text-sm">Nome Completo</h3>
                <p>{user && user.userData.nome ? user.userData.nome : "xtop"}</p>
              </div>
              <div className="px-2 py-2 col-span-2 border-b">
                <h3 className="font-semibold text-sm">E-mail</h3>
                <p>{user && user.userData.email ? user.userData.email : "caue@gmail.com"}</p>
              </div>
              <div className="px-2 py-2 col-span-2 border-r border-b">
                <h3 className="font-semibold text-sm">CPF</h3>
                <p>{user && user.userData.cpf ? formatarCPF(user.userData.cpf) : "000.000.000-00"}</p>
              </div>
              <div className="px-2 py-2 border-b border-r">
                <h3 className="font-semibold text-sm">Data de Nasc.</h3>
                <p>{user && user.userData.dtNasc ? converterDataFormato(user.userData.dtNasc) : "25/01/2004"}</p>
              </div>
              <div className="px-2 py-2 border-b">
                <h3 className="font-semibold text-sm">Sexo</h3>
                <p>{user && user.userData.sexo ? user.userData.sexo === "F" ? "Feminino" : "Masculino" : ""}</p>
              </div>
              <div className="px-2 py-2 border-b col-span-full">
                <h3 className="font-semibold text-sm">Especialidades</h3>
                <p>{items.length > 0 ? items.join(", ") : null}</p>
              </div>
            </div>
          </div>

          <div className="w-[48%] h-fit bg-white drop-shadow-lg rounded-xl p-5 flex flex-col gap-10">
            <h1 className="font-medium text-xl text-[#503465]">Informações do endereço da sua academia</h1>
            <div className="w-full h-fit flex justify-between">
              <InfoPerfil width="w-[50%]" title="Logradouro" text={endereco.logradouro} />
              <InfoPerfil width="w-[30%]" title="Número" text={endereco.numero} />
              <InfoPerfil width="w-1/6" title="CEP" text={endereco.cep} />
            </div>
            <div className="w-full h-fit flex justify-between">
              <InfoPerfil width="w-[50%]" title="Bairro" text={endereco.bairro} />
              <InfoPerfil width="w-[30%]" title="Cidade" text={endereco.cidade} />
              <InfoPerfil width="w-1/6" title="Estado" text={endereco.estado} />
            </div>

            {/* Adiciona o Google Maps aqui */}
            <div className="w-full h-64">
              <LoadScript googleMapsApiKey={API_KEY}>
                <GoogleMap
                  mapContainerStyle={{ height: "100%", width: "100%" }}
                  center={mapCenter}
                  zoom={15}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

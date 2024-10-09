import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { api } from "../../api";

export function Mapa({ infoEndereco, setAcademias, setCarregando }) {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const fetchCore = async () => {
      if (infoEndereco !== null) {
        console.log(infoEndereco);

        const logradouro = infoEndereco.logradouro.replaceAll(" ", "%20");
        console.log(`Logradouro: ${logradouro}`);

        const cep = infoEndereco.cep.replaceAll("-", "");
        console.log(`CEP: ${cep}`);

        const response = await api(
          `/enderecos/api/academias/proximas?logradouro=${logradouro}&numero=null&bairro=null&cidade=null&estado=null&cep=${cep}`
        );

        console.log(response.data);
        console.log(response.data[0].latitude);
        console.log(response.data[0].longitude);
        setAcademias(response.data);
        setCarregando(false);
        setDados(response.data[0]);
      } else {
        setDados(null);
      }
    };

    fetchCore();
  }, [infoEndereco]);

  if (dados === null) return null;
  return (
    <APIProvider apiKey="AIzaSyBoSledzM_6LdnLqTwEFxCVbskfjqtZz2c">
      <Map
        className="w-full h-full"
        defaultCenter={{ lat: dados.latitude, lng: dados.longitude }}
        // defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={18}
        gestureHandling={"geedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
}

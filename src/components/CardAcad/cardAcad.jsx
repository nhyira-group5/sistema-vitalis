import { Star } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function CardAcad({ title, rating, address, cep, lat, lon, onClickFunction }) {
  const [lat1, setLat1] = useState(null);
  const [lon1, setLon1] = useState(null);
  const [lat2, setLat2] = useState(null);
  const [lon2, setLon2] = useState(null);
  const speed = 3.6; // velocidade média a pé em km/h

  const [distance, setDistance] = useState(null); 
  const [time, setTime] = useState(null); 

  useEffect(() => {
    console.log(`CEP: ${cep}`);
    if (cep.length === 8) {
      setLat2(lat);
      setLon2(lon);
      getLocationActual();
      setDistance(getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2).toFixed(2));
      setTime((getEstimatedTime(distance, speed) * 60).toFixed(0));

      console.log(`Distância: ${distance} km`);
      console.log(`Tempo estimado: ${time} horas`);
    }
  }, [cep]);

  function getLocationActual() {
    const currentCep = cep; // Substitua pelo seu CEP
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${currentCep}&key=AIzaSyBoSledzM_6LdnLqTwEFxCVbskfjqtZz2c`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLat1(data.results[0].geometry.location.lat);
        setLon1(data.results[0].geometry.location.lng);
        // const latitude = data.results[0].geometry.location.lat;
        // const longitude = data.results[0].geometry.location.lng;
        console.log(`Latitude: ${lat1}, Longitude: ${lon1}`);
      })
      .catch((error) => console.error(error));
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Raio da Terra em Km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distância em km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getEstimatedTime(distance, speed) {
    return distance / speed;
  }

  return (
    <div 
     className="w-[48%] h-full rounded-xl shadow-xl p-4 flex flex-col justify-between cursor-pointer"
     onClick={onClickFunction}>
      <div className="w-full flex justify-between">
        <h2 className="text-[#48B75A] font-semibold ">{title}</h2>
        <div className="flex items-center gap-1">
          <span className="text-[#F6D920] font-semibold">{rating.toFixed(1)}</span>
          <Star color="#F6D920" weight="fill" />
        </div>
      </div>
      <div className="w-full flex justify-between text-xs">
        <div className="w-5/6 text-xs flex flex-col gap-1">
          <h3 className="font-semibold">Horário de funcionamento</h3>
          <span>Seg. a Sex. 06h30 ás 23h30</span>
          <span>Sab. e Dom. 09h30 ás 23h30</span>
        </div>
        <div className="w-[65%] flex flex-col justify-between text-right self-end leading-10">
          {/* <span className="font-semibold">{time} min de distância</span> */}
          <span className="text-xs text-wrap">{address}</span>
        </div>
      </div>
    </div>
  );
}

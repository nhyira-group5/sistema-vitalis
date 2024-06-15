import { SideBar } from "@components/SideBar/sideBar";

import { useEffect, useState } from "react";
import { RotinaCard, TreinoCard } from "@components/HorizontalCard/horizontalCard";

import {validateLogin} from "@utils/globalFunc"

import { useNavigate } from "react-router-dom";

import { api } from "@apis/api";
import {getLoginResponse} from "@utils/globalFunc"

export function RotinasSemanaisPage() {
    const [rotinas, setRotinas] = useState([]);
    const [treinosRotina, setTreinosRotina] = useState([]);
    

    const [rotinaSelecionada, setRotinaSelecionada] = useState(null); 
    const [userData, setUserData] = useState(getLoginResponse())
    const navigate = useNavigate();

    function getRotinas(){
        api.get(`/rotinaSemanais/buscarUsuario/${userData.id}`)
        .then((response) =>{
    
          setRotinas([...rotinas,...response.data])
        })      
        .catch((error) => {
          error.response.data.errors.forEach((erroMsg) => {
            console.log(erroMsg.defaultMessage)
          })
        });
        
}

    useEffect(()=>{
        validateLogin(navigate);
        
        getRotinas();
    }, [])

    function handleClick(rotinaId) {
        
        api.get(`/rotinaSemanais/${rotinaId}`)
        .then((response)=>{
            console.log(response.data.rotinaDiariaDtos);

            setTreinosRotina(response.data.rotinaDiariaDtos);
        }).catch((error) => {
            error.response.data.errors.forEach((erroMsg) => {
              console.log(erroMsg.defaultMessage)
            })
          });

            setRotinaSelecionada(rotinaId);
        
    }


        useEffect(()=>{
        console.log(treinosRotina)
        },[treinosRotina])



    return(
        <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
                <SideBar />

                <div className="w-[90vw] h-full flex flex-col">
                    <div className="flex flex-col gap-3 p-5">
                        <span className="text-[#2B6E36] font-semibold text-2xl">Rotinas semanais</span>
                    </div>
                    <div className="flex h-full overflow-hidden">
                        <div className="w-1/2 h-full flex flex-col gap-5 p-5 overflow-auto">
                            
                            {rotinas.map(rotina => (
                                <RotinaCard key={rotina.id}
                                            rotina={rotina}
                                            onClickFunction={() => {handleClick(rotina.id)}}
                                            rotinaSelecionada={rotinaSelecionada}
                                           />
                            ))}

                        </div>

                        <div className={`relative w-1/2 h-full overflow-auto flex flex-col gap-5 p-5 rounded-xl`}>
                        {!rotinaSelecionada && (
                            <div className="h-full w-full flex items-center justify-center">
                                <span>Selecione uma rotina!</span>
                            </div>
                        )}

                        {treinosRotina.map(treino => (
                            <TreinoCard key={treino.idRotinaDiaria} rotinaDiaria={treino}/>
                        ))}


                         </div>
                    </div>
                </div>
        </div>
        )
}
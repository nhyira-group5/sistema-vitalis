
import { SideBar } from "@components/SideBar/sideBar";
import { useEffect, useState } from "react";
import {Input} from "@components/Input/input";
import {MuralItem} from "@components/MuralItem/muralItem";
import {CloudinaryButton} from "@components/Button/button";


import { toast } from "react-toastify";
import {api} from "@apis/api"; 
import { getLoginResponse, validateLogin, validateUsuario} from "@utils/globalFunc";
import { useNavigate } from "react-router-dom";

import {
    CalendarDots,
    X,
    Images
  } from "@phosphor-icons/react";

export function MuralPage() {
    
    const navigate = useNavigate();

    const [muralItens, setmuralItens] = useState([]);
    const [tempFile, setTempFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const deleteMuralItem = (itemId) => {
        try{
        api.delete(`/murais/${itemId}`)
            .then(()=>{
                toast.success('Imagem excluida com sucesso')
            })
        } catch(error){
            toast.error("Erro ao excluir imagem.")
        }

    };



    


    useEffect(()=>{
        const validarLoginEUsuario = async () =>{

            await validateLogin(navigate);
            await validateUsuario(navigate);
      
            const loginResponse = getLoginResponse();
            try{
                api.get(`/murais/por-usuario/${loginResponse.id}`)
                .then((response)=>{
                    setmuralItens([...muralItens,  response.data]);
                    setIsLoading(false)
                })
              
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
      
        validarLoginEUsuario();
    }, [])

    return(
        <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
                <SideBar />

                <div className="w-[90vw] h-full flex flex-col relative">
                    <div className="flex gap-3 p-5 justify-between">
                        <div className="flex flex-col gap-2">
                            <span className="text-[#2B6E36] font-semibold text-2xl">Mural de imagens</span>
                            <span>Poste aqui sua evolução durante a sua jordana para uma vida mais saudável!</span>
                        </div>

                        <Input 
                        inputType={'Date'}
                        labelContent={'Data de pesquisa'}
                        id={'dataPesquisaMural'}
                        name={'dataPesquisaMural'}
                        icon={<CalendarDots size={32} />}/>
                    </div>

                    <div className=" flex flex-wrap h-full gap-y-10 gap-x-14 p-5 overflow-auto justify-center">

            {isLoading? (
                                <div className="flex h-full w-full items-center justify-center">
                                    <div className="animate-bounce rounded-full w-5 h-5 bg-primary-green300"></div> 
                                </div>
            ):(
                muralItens.length === 0? (
                    <div className="text-center w-full h-full flex items-center justify-center">
                        <span className="font-semibold text-xl">Você ainda não possui imagens salvas :(</span>
                    </div>
                ) : (
                    muralItens[0].map(muralItem => (
                        muralItem.midiaId && muralItem.midiaId.caminho? ( 
                            <MuralItem key={muralItem.idMural} muralItem={muralItem} onDelete={deleteMuralItem} />
                        ) : (
                            <div className="flex flex-col p-5 pt-7 rounded-xl items-center w-80 h-96 bg-white shadow-sombra-padrao gap-5 relative">
                                <div className="flex h-full w-full items-center justify-center">
                                    <div className="animate-bounce rounded-full w-5 h-5 bg-primary-green300"></div> 
                                </div>
                            </div>
                        )
                    ))
                )
            )}




                    </div>

                    <CloudinaryButton />

                </div>
        </div>
        )
}

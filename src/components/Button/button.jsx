import { X, Plus, Check, Images } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {api} from "@apis/api";

import {getLoginResponse} from "@utils/globalFunc"
  
export function Button ({ onClick, buttonStyle, content, type, disabled, variant, icon, iconVisibility = true }) {

  const variant1 = {buttonStyle: "text-gray100 bg-primary-green300 rounded-full font-bold px-5 py-4 hover:bg-primary-green400 transition-all flex items-center gap-1",
                    icon: <Plus/>};
                    
  const variant2 = {buttonStyle: "text-gray100 bg-errorRed rounded-full font-bold px-5 py-4 hover:bg-errorRed/75 transition-all flex items-center gap-1",
                    icon: <X/>};
                    
  const variant3 = {buttonStyle: "text-gray100 bg-successBlue rounded-full font-bold px-5 py-4 hover:bg-successBlue/90 transition-all flex items-center gap-1",
                    icon: <Check/>};

  const selectedVariant = variant === "create" ? variant1 : variant === "decline" ? variant2 : variant === "accept" ? variant3 : variant1;

    return (
      <button onClick={onClick} type={type} className={buttonStyle || selectedVariant.buttonStyle } disabled={disabled}>      
          {iconVisibility && (icon || selectedVariant.icon)}
          {content}
      </button>

    );
  };
  
   
  export function CloudinaryButton({uploadFunction}){
    const cloudinaryRef = useRef();
    const widgetRef = useRef();



    useEffect(()=>{
      cloudinaryRef.current = window.cloudinary;

      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName:'dpzjmq6x5',
        uploadPreset: 'twcqkk8d',
        sources: [ 'local'],
        preBatch: (cb, data) => {
          
          const tiposPermitidos = ["jpeg", "jpg","png", 'webpg']
          
          data.files.map((arquivo) => {

            const partesNomeArquivo = arquivo.name.split('.');
            const nomeSemPontos = partesNomeArquivo.join('.');
            const extensaoArquivo = nomeSemPontos.split('.').pop();
          

            if (!tiposPermitidos.includes(extensaoArquivo)) {
              toast.error('Tipo de arquivo inválido!')
              cb({cancel: true}); 
            } else {
              cb(); 
            }
          });


        },
        styles:{
          frame: {
            background: "#00000010"
          }
        }

      }, function(error, result){
        
        if (!error && result.event === "success") {
          uploadFunction(result.info);
        }

      })
    },[])

    return(
      <Button 
      buttonStyle = {'text-gray100 bg-primary-green300 rounded-full font-bold p-6 hover:bg-primary-green400 transition-all flex items-center gap-1 absolute right-10 bottom-0'} 
      icon={<Images size={32} />}
      onClick={()=>widgetRef.current.open()}/>
    )
  }

import React, {useState, useRef} from "react";
import {
    UploadSimple
  } from "@phosphor-icons/react";
  import { toast } from "react-toastify";

export function  ImageDropzone({ onFileAdd, tempFile, setTempFile })  {

    const fileInput = useRef(null);
    const[image, setImage] = useState(null);
    const[previewUrl, setPreviewUrl] = useState(""); 



    const handleFile = file => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Tipo de arquivo inválido!");
            return;
        }
        URL.revokeObjectURL(previewUrl);

        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setTempFile(file); 

        if (onFileAdd) {
            onFileAdd(file);
        }
    }

    const handleOnDragOver = event => {
        event.preventDefault();
    }

    const handleOnDrop = event => {
        event.preventDefault();
        event.stopPropagation();

        let imageFile = event.dataTransfer.files[0];
        
        handleFile(imageFile);
    }
    return(
        <div className={`${!previewUrl ? 'border-gray500 border-dashed border-2' : ''} group relative  *:transition-all *:duration-100 *:ease-in-out  rounded-md flex justify-center items-center h-full w-full cursor-pointer bg-white  hover:border-primary-green200 overflow-hidden`}>
            <div onDragOver={handleOnDragOver} onDrop = {handleOnDrop} onClick = { () => fileInput.current.click()} className={`${!previewUrl ? ' group-hover:bg-primary-green200/50' : 'group-hover:bg-gray500/50'}  z-20 w-full h-full flex justify-center items-center relative bg-transparent `}>
               
                <div className=" w-full flex flex-col items-center justify-center absolute">
                   <UploadSimple size={32} className={`${previewUrl ? 'hidden group-hover:block' : ''}  font-semibold text-xl group-hover:text-primary-green300 `}/>
                   <p className={`${previewUrl ? 'hidden group-hover:block' : ''}  font-medium text-md group-hover:text-primary-green300 `}>Selecione ou arraste uma imagem</p>
                </div>
                <input 
                type="file" 
                accept='image/*' 
                ref={fileInput} hidden 
                onChange={e => handleFile(e.target.files[0])}
            />
            </div>

            { previewUrl && <div>
                             <img src={previewUrl} alt='image' className="absolute top-0 left-0 object-cover w-full h-full"/> 
                            </div> }
        </div>
    )
}

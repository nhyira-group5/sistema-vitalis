import { ImageDropzone } from "@components/Dropzone/dropzone";
import {MuralItem} from "@components/MuralItem/muralItem";
import { SideBar } from "@components/SideBar/sideBar";
import * as Dialog from '@radix-ui/react-dialog';
import Button from "@components/Button/button";
import {Input} from "@components/Input/input";
import { useEffect, useState } from "react";


import {
    CalendarDots,
    X,
    Images
  } from "@phosphor-icons/react";

export function MuralPage() {
    
    const [muralItens, setmuralItens] = useState([]);
    const [tempFile, setTempFile] = useState(null);


    const deleteMuralItem = (itemId) => {
        setmuralItens(prevItems => prevItems.filter(item => item.id!== itemId));
    };

    const addMuralItem = (file) => {
        const formattedDate = new Date().toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const newItem = {
            id: Date.now(), 
            sourceUrl: URL.createObjectURL(file), 
            date: formattedDate, 
        };
        setmuralItens(prevItems => [...prevItems, newItem]);
    };
    


    function getMuralItens(){
        //blablablaReq

        // const muralItensResponse = [
        //     {id: 1,
        //     sourceUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png',
        //     date: '25/01/2004'},
        //     {id: 2,
        //     sourceUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png',
        //     date: '26/02/2004'},
        //     {id: 3,
        //     sourceUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png',
        //     date: '27/03/2004'},
        //     {id: 4,
        //     sourceUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png',
        //     date: '28/04/2004'},   
        //     {id: 5,
        //         sourceUrl: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png',
        //         date: '29/05/2004'},                
        // ];

        
        // setmuralItens([...muralItens,...muralItensResponse])
    };

    useEffect(()=>{
        getMuralItens();
    }, [])

    return(
        <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
                <SideBar />

                <div className="w-full h-full flex flex-col relative">
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



                    {muralItens.length === 0? (
                        <div className="text-center w-full h-full flex items-center justify-center">
                            <span className="font-semibold text-xl">Você ainda não possui imagens salvas :(</span>
                        </div>
                    ) : (
                        muralItens.map(muralItem => (
                            <MuralItem key={muralItem.id} muralItem={muralItem} onDelete={deleteMuralItem} />
                        ))
                    )}


                    </div>


                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button buttonStyle = {'text-gray100 bg-primary-green300 rounded-full font-bold p-6 hover:bg-primary-green400 transition-all flex items-center gap-1 absolute right-10 bottom-0'} 
                                        icon={<Images size={32} />}/>
                            </Dialog.Trigger>

                            <Dialog.Portal>
                            <Dialog.Overlay className="bg-gray500/50 fixed inset-0" />
                            <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                    Vamos registrar um momento seu!
                                </Dialog.Title>
                                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                                  Arraste uma imagem ou clique para selecionar.
                                </Dialog.Description>

                                <div className="flex justify-center items-center">
                                    <fieldset className=" h-96 w-72 ">
                                    <ImageDropzone onFileAdd={() => addMuralItem(tempFile)} tempFile={tempFile} setTempFile={setTempFile} />
                                    </fieldset>
                                </div>
  
                                <div className="mt-[25px] flex justify-center">
                                <Dialog.Close asChild>
                                    <Button buttonStyle = {'text-gray100 bg-primary-green300 rounded-full font-bold px-10 py-4 hover:bg-primary-green400 transition-all flex items-center gap-1 '} 
                                            iconVisibility={false} 
                                            content={'Usar imagem'}
                                            onClick={() => {
                                                if (tempFile) {
                                                    addMuralItem(tempFile);
                                                    setTempFile(null); 
                                                }
                                            }}/>
                                </Dialog.Close>
                                </div>

                                <Dialog.Close asChild>
                                <button
                                    className="text-gray500 hover:bg-gray200/50 focus:shadow-gray100 absolute top-[10px] right-[10px] inline-flex appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] p-2 focus:outline-none"
                                    aria-label="Close"
                                >
                                <X size={20}/>
                                    
                                </button>
                                </Dialog.Close>

                            </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                </div>
        </div>
        )
}

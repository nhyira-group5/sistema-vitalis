import { SideBar } from "@components/SideBar/sideBar";
import { Input } from "@components/Input/input"
import {
    MagnifyingGlass
  } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { RefeicaoCard } from "../../components/RefeicaoCard/refeicaoCard";

export function RefeicoesPage() {
    const [refeicoes, setRefeicoes] = useState([]);



    function getRefeicoes(){
        //blablablarequisicao
        setRefeicoes([...refeicoes,...refeicoesResponse]);
    }
    
      const refeicoesResponse =[
        {id: 1,
         nome: "Boquete tornado",
         img:"https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png"
        },
        {id: 2,
         nome: "Garganta Profunda (Deep Throat)",
         img:"https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png"
        },
        {id: 3,
         nome: "Boquete parafuso",
         img:"https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png"
        }
      ];
    
      useEffect(()=>{
        getRefeicoes();
      }, [])

    return(
        <>
        <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
            <SideBar />

            <div className="w-full h-full flex flex-col">
                
                <div className="flex flex-col gap-3 p-5">
                    <span className="text-[#2B6E36] font-semibold text-2xl">Refeições</span>
                    <div className="w-1/3">
                        <Input 
                        labelStyle={'none'}
                        icon={<MagnifyingGlass size={24} />}
                        placeholder={'Pesquise uma refeição'}
                        inputStyle={'group-focus-within:!ring-primary-green300 h-13 px-5 relative flex w-full bg-gray100 border-gray100 border-2 rounded-full outline-none ring-1 ring-gray500'}
                        contentStyle={'appearance-none font-mavenPro text-xl outline-none w-full rounded-e-full text-gray500 placeholder:text-[1rem] text-[1rem] placeholder:font-medium'}
                        />
                        
                        </div>
                </div>

                <div className="grid grid-cols-5 auto-rows-min gap-x-7 gap-y-7 h-full overflow-auto p-5">

                {refeicoes.map(refeicao => (
                    <RefeicaoCard key={refeicao.id} refeicao={refeicao} />
                ))}

                </div>
            </div>

        </div>
        </>
    )
}
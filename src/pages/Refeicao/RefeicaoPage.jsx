import { SideBar } from "@components/SideBar/sideBar";
import { IngredienteCard } from "@components/IngredienteCard/ingredienteCard"
import Button from "@components/Button/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function RefeicaoPage() {
    const [refeicao, setRefeicao] = useState({});

    function getRefeicao() {
        const refeicaoResponse = {
            id: 1,
            nome: 'Torta de frango',
            img: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png',
            receita: [
                "500 g de peito de frango sem pele",
                "1/2 litro de caldo de galinha",
                "4 colheres (sopa) de óleo",
                "1 dente de alho amassado",
                "1 cebola picada",
                "3 tomates sem pele e sem sementes",
                "1 xícara (chá) de ervilhas",
                "sal a gosto",
                "pimenta-do-reino a gosto",
                "250 ml de leite",
                "3/4 de xícara (chá) de óleo",
                "2 ovos",
                "1 e 1/2 xícara (chá) de farinha de trigo",
                "sal a gosto",
                "1 colher (sopa) de fermento em pó",
                "queijo ralado a gosto"
            ],
            ingredientes: [
                {
                    id: 1,
                    nome: "Peito de Frango",
                    categoria: 'Carne',
                    img:'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png'
                },
                {
                    id: 2,
                    nome: "Tomate",
                    categoria: 'Fruta',
                    img:'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png'
                },
                {
                    id: 3,
                    nome: "Alho",
                    categoria: 'Tempero',
                    img:'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png'
                },
                {
                    id: 4,
                    nome: "Ervilha",
                    categoria: 'Legume',
                    img:'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png'
                },
                {
                    id: 5,
                    nome: "Orégano",
                    categoria: 'Tempero',
                    img:'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png'
                },
                {
                    id: 6,
                    nome: "Pimenta",
                    categoria: 'Condimento',
                    img:'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/980.png'
                },
            ],
            modoDePreparo: [
                "Cozinhe o peito de frango no caldo até ficar macio.",
                "Separe 1 xícara (chá) de caldo do cozimento e reserve.",
                "Refogue os demais ingredientes e acrescente as ervilhas por último.",
                "Desfie o frango, misture ao caldo e deixe cozinhar até secar."
            ]
        };

        setRefeicao(refeicaoResponse);
    }
    useEffect(() => {
        getRefeicao();
    }, []);


    return (
        <>
            <div className="flex items-center justify-center w-screen h-screen px-10 py-10 gap-5">
                <SideBar />

                <div className="w-full h-full flex flex-col">
                    <div className="flex flex-col gap-2">
                        <span className="text-[#2B6E36] font-semibold text-2xl">{refeicao.nome}</span>
                        <div className="flex gap-1">
                            <Link to={'/refeicoes'} className="text-primary-green400 font-bold">Refeições</Link>
                            <span className="text-primary-green400 font-extrabold">></span>
                            <span className="text-primary-green400 font-bold">{refeicao.nome}</span>
                        </div>
                    </div>

                    <div className="flex w-full h-3/5 max-h-3/5 py-5 gap-10">
                        <div className="w-3/5 p-5 bg-white shadow-sombra-padrao rounded-xl">
                            <div className="h-full w-full rounded-lg flex items-center justify-center">
                                <img className="w-full h-full bg-gray500 object-contain rounded-lg" src={refeicao.img} alt={refeicao.nome} />
                            </div>
                        </div>

                        <div className="w-2/5 h-full shadow-sombra-padrao flex flex-col items-center rounded-xl py-5 gap-5">
                            <span className="text-2xl font-semibold">Ingredientes</span>

                            <div className="flex gap-10 w-full h-full overflow-auto">
                                <ul className="list-disc flex flex-col gap-1 w-full px-10">
                                    {refeicao.receita?.map((ingrediente, index) => (
                                        <li key={index}>{ingrediente}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full h-2/5 max-h-2/5 py-5 gap-10">
                        <div className="w-3/5 max-w-3/5 overflow-auto scrollbar-thin flex gap-5">
                             {refeicao.ingredientes?.map((ingrediente, index) => (
                                    <IngredienteCard key={index} ingrediente={ingrediente}/>
                                       
                             ))}
                        </div>

                        <div className="w-2/5 h-full shadow-sombra-padrao flex flex-col items-center rounded-xl py-5 gap-5">
                            <span className="text-2xl font-semibold">Modo de preparo</span>

                            <div className="flex gap-10 w-full h-full overflow-auto">
                                <ul className="list-disc flex flex-col gap-2 w-full px-10">
                                    {refeicao.modoDePreparo?.map((passo, index) => (
                                        <li key={index}>{passo}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
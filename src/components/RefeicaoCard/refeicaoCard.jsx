import { Link } from "react-router-dom"


export function RefeicaoCard({ refeicao }){
    
    return(
        <Link to={`/refeicoes/${refeicao.idRefeicao}`}>
            <div className=" group flex flex-col px-3 py-4  h-fit gap-2 rounded-xl  transition-all duration-100 ease-in-out hover:bg-gray200/70">
                <div className="w-full h-36  bg-gray500 rounded-lg overflow-hidden">
                    {refeicao.midia && refeicao.midia.caminho? (
                        <img className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-100 ease-in-out" src={refeicao.midia.caminho} />
                    ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="animate-bounce rounded-full w-5 h-5 bg-primary-green300"></div>
                        <p className="text-gray-700 ">Carregando...</p>
                    </div>
                    )}
                    
                </div>
                <span className="text-primary-green500 font-semibold text-lg truncate-multiline">{refeicao.nome}</span>
            </div>
        </Link>
    )
}
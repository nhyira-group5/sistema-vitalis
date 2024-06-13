import { Link } from "react-router-dom"


export function RefeicaoCard({ refeicao }){
    {console.log(refeicao)}
    return(
        <Link to={`/refeicoes/${refeicao.id}`}>
            <div className="flex flex-col px-3 py-4  h-fit gap-2 ">
                <div className="w-full h-36  bg-gray500 rounded-lg">
                    <img className="w-full h-full object-contain rounded-md" src={refeicao.img} />
                </div>
                <span className="text-primary-green500 font-semibold text-lg truncate-multiline">{refeicao.nome}</span>
            </div>
        </Link>
    )
}
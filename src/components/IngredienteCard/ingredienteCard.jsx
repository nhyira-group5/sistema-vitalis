import Button from "@components/Button/button";
export function IngredienteCard({ingrediente}){
    return(
    <div className="group p-5 flex flex-col justify-end items-center bg-gray500 rounded-xl h-full min-w-48 overflow-hidden gap-2 relative">
        <img className="transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:brightness-[.4] absolute w-full h-full object-contain rounded-lg top-0 left-0 brightness-[.3] bg-gray500" src={ingrediente.img} alt={ingrediente.nome} />

        <div className="flex flex-col gap-1 z-10 text-center">
            <span className="text-primary-green300 font-semibold">{ingrediente.nome}</span>
            <span className="text-white text-sm">{ingrediente.categoria}</span>
        </div>

        <Button buttonStyle={'z-10 text-gray100 bg-primary-green300 rounded-full font-semibold text-sm px-3 py-2 hover:bg-primary-green400 transition-all flex items-center gap-1'} content={'Ver ingrediente'} iconVisibility={false} />
    </div>
    )
} 
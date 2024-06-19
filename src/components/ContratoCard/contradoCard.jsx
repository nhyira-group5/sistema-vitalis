import {Button} from "@components/Button/button"

export function ContratoCard({contrato, aceitarFunction, recusarFunction}){
    <div  className="bg-white rounded-lg p-3 w-full  flex flex-col justify-start items-start gap-3">
    <div className="flex flex-col ">
      <span className="font-semibold text-lg text-alt-purple300 "> {contrato.usuarioId.nickname}</span>
      <span className="font-semibold text-sm">{contrato.usuarioId.nome}</span>
      <span className="font-semibold text-sm">{contrato.usuarioId.meta.nome}</span>
      
    </div>

    <div className="flex px-2 justify-between w-full">
      
      <Button 
      iconVisibility={false}
      content={"Aceitar"}
      buttonStyle={"text-gray100 bg-successBlue rounded-full font-bold w-[45%] text-sm h-fit py-3 justify-center hover:bg-successBlue/90 transition-all flex items-center gap-1"}
      
      />
      <Button
      iconVisibility={false}
      buttonStyle={"text-gray100 bg-errorRed rounded-full font-bold w-[45%] text-sm h-fit py-3 justify-center hover:bg-errorRed/75 transition-all flex items-center gap-1"}
      content={"Negar"}
      />
    </div>

  </div>
}
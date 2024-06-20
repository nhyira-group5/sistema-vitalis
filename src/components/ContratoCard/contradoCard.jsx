import {Button} from "@components/Button/button"

export function ContratoCard({contrato, functions, loadingStates}){

  const [aceitarContratoLoading, negarContratoLoading] = loadingStates;
  const [aceitarContrato, negarContrato] = functions;

  return(
    <div  className="bg-white rounded-lg p-3 w-full  flex flex-col justify-start items-start gap-3">
    <div className="flex flex-col ">

      <span className="text-sm flex gap-1 items-end">
        Nickname: 
          <span className="font-semibold text-lg text-alt-purple300 ">
          {contrato.usuarioId.nickname}
          </span>
      </span>

      <span className="text-sm flex gap-1 items-end">
        Nome: 
          <span className="text-base font-semibold">
          {contrato.usuarioId.nome}
          </span>
      </span>

      <span className="text-sm flex gap-1 items-end">
        Meta: 
          <span className="text-base font-semibold">
          {contrato.usuarioId.meta.nome}
          </span>
      </span>
      
    </div>

    <div className="flex px-2 justify-between w-full">
      
      <Button 
      iconVisibility={false}

      content={aceitarContratoLoading ? (
      <div>
        <div className="animate-pulse rounded-full w-5 h-5 bg-white"></div>
      </div>
      ): "Aceitar"}
      buttonStyle={"text-gray100 bg-successBlue rounded-full font-bold w-[45%] text-sm h-fit py-3 justify-center hover:bg-successBlue/90 transition-all flex items-center gap-1"}
      onClick={()=> aceitarContrato(contrato)}
      />

      <Button
      iconVisibility={false}
      content={negarContratoLoading ? (
        <div>
          <div className="animate-pulse rounded-full w-5 h-5 bg-white"></div>
        </div>
        ): "Negar"}
        buttonStyle={"text-gray100 bg-errorRed rounded-full font-bold w-[45%] text-sm h-fit py-3 justify-center hover:bg-errorRed/75 transition-all flex items-center gap-1"}
        onClick={() => negarContrato(contrato)}
        />

    </div>

  </div>
  )
}
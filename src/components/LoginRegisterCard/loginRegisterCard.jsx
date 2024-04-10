import logoNormalSize from "@assets/logos/greenNormalSize.svg"

const LoginRegisterCard = ({tittle, contentText, buttonContent, userType, type}) =>{
    return(
        <div className="flex flex-col p-4 bg-black500 text-white justify-center items-center text-center w-1/3">
            <img className="w-2/4" src={logoNormalSize} alt="Logo vitalis"/>

            <div className="">
                
            </div>
        </div>
    )
}

export default LoginRegisterCard;
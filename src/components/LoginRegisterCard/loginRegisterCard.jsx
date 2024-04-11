import LogoGreenBlackNormalSize from "@assets/logos/greenNormalSizeBlackColor.svg"

const LoginRegisterCard = ({tittle, contentText, buttonContent, userType, type}) =>{
    return(
        <div className="flex flex-col p-4 bg-white text-black500 justify-center items-center text-center w-1/3 h-full">

            <div className="flex flex-col items-center justify-center   ">
                <img className="w-2/4" src={LogoGreenBlackNormalSize} alt="Logo vitalis"/>
                <h1>{tittle}</h1>
                <h4>{contentText}</h4>
            </div>

            <button>{buttonContent}</button>

            <h5>
            © 2024 nhyira. All Rights reserved
            </h5>
            but
        </div>
    )
}

export default LoginRegisterCard;
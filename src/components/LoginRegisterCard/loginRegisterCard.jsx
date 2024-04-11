import LogoGreenBlackNormalSize from "@assets/logos/greenNormalSizeBlackColor.svg"
import LogoLilasBlackNormalSize from "@assets/logos/lilasNormalSizeblackColor.svg"

const LoginRegisterCard = ({tittle, contentText, userType, Button}) =>{
    return(
        <div className="flex flex-col p-14 bg-white text-black500  items-center text-center w-1/3 h-full justify-between">
            <div className="flex flex-col items-center justify-center  gap-16">
                {userType ? 
                (<img className="w-4/5" src={LogoGreenBlackNormalSize} alt="Logo vitalis"/>) 
                : (<img className="w-4/5" src={LogoLilasBlackNormalSize} alt="Logo vitalis"/>)}
                
                <span className="text-2xl font-bold tracking-widest">{tittle}</span>
                <span className="text-sm">{contentText}</span>
            </div>

            {Button}

            <span className="text-xs">
            © 2024 nhyira. All Rights reserved
            </span>
            
        </div>
    )
}

export default LoginRegisterCard;
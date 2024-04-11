import LogoGreenBlackNormalSize from "@assets/logos/greenNormalSizeBlackColor.svg"
import LogoLilasBlackNormalSize from "@assets/logos/lilasNormalSizeblackColor.svg"

const LoginRegisterCard = ({tittle, contentText, userType, Button}) =>{
    return(
        <div className="flex flex-col p-14 bg-white text-black500  items-center text-center w-1/3 h-full gap-36">
            <div className="flex flex-col items-center justify-center  gap-16">
                {userType ? 
                (<img className="w-3/5" src={LogoGreenBlackNormalSize} alt="Logo vitalis"/>) 
                : (<img className="w-3/5" src={LogoLilasBlackNormalSize} alt="Logo vitalis"/>)}
                
                <span className="text-4xl font-bold tracking-widest">{tittle}</span>
                <span className="text-lg">{contentText}</span>
            </div>

            {Button}

            <h5>
            © 2024 nhyira. All Rights reserved
            </h5>
            
        </div>
    )
}

export default LoginRegisterCard;
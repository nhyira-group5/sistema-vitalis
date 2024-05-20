import LogoGreenBlackNormalSize from "@assets/logos/greenNormalSizeBlackColor.svg"
import LogoLilasBlackNormalSize from "@assets/logos/lilasNormalSizeblackColor.svg"
import { Link } from "react-router-dom";

export function SideCard ({tittle, contentText, userType, Button, style}){
    return(
        <div className={`flex flex-col p-14 bg-gray100 text-gray500  items-center text-center w-1/3 h-screen justify-around ${style}`}>
            <div className="flex flex-col items-center justify-center  gap-16">
                {userType ? 
                (<img className="w-4/5" src={LogoGreenBlackNormalSize} alt="Logo vitalis"/>) 
                : (<img className="w-4/5" src={LogoLilasBlackNormalSize} alt="Logo vitalis"/>)}
                
                <span className="text-2xl font-bold tracking-widest">{tittle}</span>
                <span className="text-sm">{contentText}</span>
            </div>

    <div className="flex flex-col items-center gap-4">
            {Button}
            <span className=" flex gap-2 lg:flex-col xl:flex-row">
                Já possuí uma conta?
                <Link to={"/Login"} className={`font-bold ${userType ? 'text-primary-green300' : 'text-alt-purple300'}`}>
                    Clique aqui!
                </Link> 
            </span>
    </div>
            <span className="text-xs">
            © 2024 nhyira. All Rights reserved
            </span>
            
        </div>
    )
}

import LoginRegisterCard from "@components/LoginRegisterCard/loginRegisterCard";
import { useState } from "react";
import Button from "@components/Button/button.jsx"

const CadastroPage = () =>{
const [contentTexto] = useState("Já tem uma conta? Se sim, vamos lá! Se não, que tal criar uma agora? É fácil e rápido. Vamos nessa?");
const [tittle] = useState("Já tem uma conta?");
const [buttonContent] = useState("Entrar");
const [userType, setUserType] = useState(true)


const handleUserTypeChange = () => {
    setUserType(!userType);
    console.log("Novo valor de userType: ", !userType);
  };


return(
<>
    <div className="flex h-screen w-screen bg-black500 ">
        <LoginRegisterCard tittle={tittle} 
                           contentText={contentTexto} 
                           userType = {userType} 
                           Button={<Button onClick={handleUserTypeChange} style={`text-lg px-8 py-3 rounded-xl tracking-[.3rem] text-white font-bold ${userType ? 'bg-primary-green300' : 'bg-alt-purple300'}`} content={buttonContent} />}/>
    </div>
</>
)
}

export default CadastroPage;
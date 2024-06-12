import { api } from "@apis/api";

export function getLoginResponse(){
    const storedResponse = JSON.parse(sessionStorage.getItem('loginResponse'));
    

    return storedResponse;
}




export  function getFicha(navigate){
    const usuarioLogado = getLoginResponse();

    try{
        const fichaResponse =   api.get(`/fichas/${usuarioLogado.id}`);
        
        return(fichaResponse);
    }catch(error) {
        if(error.response.data.status == 404){
            navigate("/cadastroParq");
        }
        
    }
};

export function validateLogin(navigate) {
    const usuarioLogado = getLoginResponse();
    
    if (usuarioLogado && Object.keys(usuarioLogado).length < 0) {
        navigate("/login");
      } 
  };


  export function formatarCPF(cpf) {
    if(cpf == undefined){
        return;
    }


    if (cpf.length!== 11) {
      return 'CPF inválido';
    }
  
    // Insere pontos e traço no CPF
    const cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  
    return cpfFormatado;
  }

  export function converterDataFormato(data) {
    if(data == undefined){
        return;
    }

    const dataConvertida = data.replace(/-/g, '/');
    return dataConvertida;
  }
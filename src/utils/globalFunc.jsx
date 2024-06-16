
export function getLoginResponse(){
    const storedResponse = JSON.parse(sessionStorage.getItem('loginResponse'));
    
    return storedResponse;
}

export function validateLogin(navigate) {
    const usuarioLogado = getLoginResponse();

    if (!usuarioLogado) {
        navigate("/login");
        console.log("er pra ter redirecionado. não?")
      } 
  };

  export function validatePersonal(navigate){
    const usuarioLogado = getLoginResponse();

    if (usuarioLogado && usuarioLogado.tipo != "PERSONAL") {
      navigate("/home");
    } 
  }

  export function validateUsuario(navigate){
    const usuarioLogado = getLoginResponse();

    if (usuarioLogado && usuarioLogado.tipo != "USUARIO") {
      navigate("/home-personal");
    } 
  }



  export function formatarCPF(cpf) {
    if(cpf == undefined){
        return;
    }


    if (cpf.length!== 11) {
      return 'CPF inválido';
    }
  
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

  export function formatarData(date) {
    const parts = date.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
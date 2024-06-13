export const validateNome = (nome) => {

    if (!nome) return false;
    if (nome.length < 3) return false;

    const regex = /^[\p{L}\s~^`]*$/u;
    if (!regex.test(nome)) return false;

    return true;
   };

export const validateSenha = (senha) => {
    const hasNumber = /\d/.test(senha);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/g.test(senha);
    return senha.length >= 5 && hasNumber && hasSpecialChar;
}

export const validateUsername = (username) => {
    return username.length >= 5;
};

export const validateConfSenha = (confSenha, senha) => {
    return confSenha === senha;
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateIdade = (dataNascimento) => {
    const dataAtual = new Date();
    const dataNasc = new Date(dataNascimento);
    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    const m = dataAtual.getMonth() - dataNasc.getMonth();
    if (m < 0 || (m === 0 && dataAtual.getDate() < dataNasc.getDate())) {
       idade--;
    }
    return idade > 18;
};




export const validateCPF = (cpf) =>{
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
   
    if (cpf === Array(12).join('0')) return false;
   
    let soma = 0;
    for (let i = 0; i < 9; i++) {
       soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(cpf.charAt(9))) return false;
   
    soma = 0;
    for (let i = 0; i < 10; i++) {
       soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(cpf.charAt(10))) return false;
   
    return true;
}

export const validateCEP = (CEP) => {
    const cepRegex = /^\d{8}$/;
    return cepRegex.test(CEP);
};

export const validatePeso = (peso) => {
    const pesoRegex = /^\d+$/;
    return peso > 0 && pesoRegex.test(peso.toString());
};

export const validateAltura = (altura) => {
    const alturaRegex = /^\d+$/;
    return altura > 20 && alturaRegex.test(altura.toString());
};

export const validateFormDate = (dataFornecida) => {
    const dataAtual = new Date();
    const data = new Date(dataFornecida);
    let diferencaAnos = dataAtual.getFullYear() - data.getFullYear();

    if (data.getMonth() > dataAtual.getMonth() ||
        data.getMonth() + 12 < dataAtual.getMonth()){
        diferencaAnos--;
    }

    return diferencaAnos > 0;
};
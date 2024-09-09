export function validateLogin(navigate, user) {
  if (!user) {
    navigate('/login');
  }
}

export function validatePersonal(navigate, user) {

  if (user && user.userData.tipo != 'PERSONAL') {
    navigate('/home');
  }
}

export function validateUsuario(navigate, user) {
  if (user && user.userData.tipo != 'USUARIO') {
    navigate('/home-personal');
  }
}

export function formatarCPF(cpf) {
  if (cpf == undefined) {
    return;
  }

  if (cpf.length !== 11) {
    return 'CPF inválido';
  }

  const cpfFormatado = cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4',
  );

  return cpfFormatado;
}

export function converterDataFormato(data) {
  if (typeof data !== 'string') {
    console.error('A entrada precisa ser uma string.');
    return;
  }

  const dataConvertida = data.replace(/-/g, '/');
  return dataConvertida;
}

export function formatarData(date) {
  const parts = date.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function getDataAtual() {
  const dataHojeISO = new Date().toISOString();
  const dataFormatada = dataHojeISO.split('T')[0];
  return dataFormatada;
}

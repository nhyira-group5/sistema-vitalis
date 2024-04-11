// import { toast } from "react-toastify";



// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

// export const validateEmail = (email) => {
//   return emailRegex.test(email) && email.includes(".com");
// };

// export const validateUsername = (username) => {
//   return (
//     username.length >= 3 &&
//     /[A-Z]/.test(username) &&
//     /\d/.test(username) &&
//     /[!@#$%^&*(),.?":{}|<>]/.test(username)
//   );
// };

// export const handleChangeInput = (e) => {
//   const inputValue = e.target.value;
//   setUsername(inputValue);

//   if (!inputValue) {
//     setShowError(true);
//     setErrorUsername("Campo obrigatório");
//   } else {
//     setShowError(false);
//     setErrorUsername("");

//     if (validateEmail(inputValue)) {
//       if (!validateEmail(inputValue)) {
//         setErrorUsername(
//           "Email inválido. Certifique-se de inserir um email válido no formato exemplo@dominio.com."
//         );
//       }
//     } else {
//       if (!validateUsername(inputValue)) {
//         setErrorUsername(
//           "Nome de usuário inválido. Deve ter pelo menos 3 caracteres, uma letra maiúscula, um número e um caractere especial, como '!', '#', '$', etc."
//         );
//       }
//     }
//   }
// };



// export const handleChangeSenha = (e) => {
//   const inputValue = e.target.value;
//   setSenha(inputValue);

//   if (!inputValue) {
//     setShowError(true);
//     setErrorSenha("Campo obrigatório");
//   } else {
//     setShowError(false);
//     setErrorSenha("");

//     if (
//       inputValue.length < 8 ||
//       !/[a-z]/.test(inputValue) ||
//       !/\d/.test(inputValue) ||
//       !/[!@#$%^&*(),.?":{}|<>]/.test(inputValue)
//     ) {
//       setErrorSenha(
//         "Senha inválida. Deve conter pelo menos 8 caracteres, uma letra minúscula, um número e um caractere especial."
//       );
//     }
//   }
// };

// export const handleLogin = () => {
//   if (!username || !senha || errorUsername || errorSenha) {
//     setShowError(true);
//     toast.warn("Por favor, preencha todos os campos corretamente.");
//   } else {
//     toast.success("Login realizado com sucesso!");
//     setUsername("");
//     setSenha("");
//   }
// };

// export const handleSubmit = (e) => {
//   e.preventDefault();

//   if (!username || !senha || errorUsername || errorSenha) {
//     toast.warn("Por favor, preencha todos os campos corretamente.");
//     return;
//   }

//   const backendError = false;
//   if (backendError) {
//     toast.error(
//       "Erro ao fazer login. Por favor, tente novamente mais tarde."
//     );
//     return;
//   }
// };

// export const handleCreate = () => {
//   setShowModal(true);
// };

// export const closeModal = () => {
//   setShowModal(false);
// };
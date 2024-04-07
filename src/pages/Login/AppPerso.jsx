//usar props para transformar esse componente em uma variante do componente Login

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "./LoginPerso.css";

function Login() {
  const [inputValue, setInputValue] = useState("");
  const [senha, setSenha] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [errorSenha, setErrorSenha] = useState("");
  const [showModal, setShowModal] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
    setSenha("");
    if (emailRegex.test(e.target.value)) {
      if (!validateEmail(e.target.value)) {
        setErrorInput(
          "Email inválido. Certifique-se de inserir um email válido no formato exemplo@dominio.com."
        );
      } else {
        setErrorInput("");
      }
    } else if (cpfRegex.test(e.target.value)) {
      setErrorInput("");
    } else {
      setErrorInput("Entrada inválida. Deve ser um email ou CPF válido.");
    }
  };

  const validateEmail = (email) => {
    return email.includes(".com");
  };

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
    if (
      e.target.value.length < 8 ||
      !/[a-z]/.test(e.target.value) ||
      !/\d/.test(e.target.value) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(e.target.value)
    ) {
      setErrorSenha(
        "Senha inválida. Deve conter pelo menos 8 caracteres, uma letra minúscula, um número e um caractere especial."
      );
    } else {
      setErrorSenha("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue || !senha || errorInput || errorSenha) {
      toast.warn("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const backendError = false;
    if (backendError) {
      toast.error(
        "Erro ao fazer login. Por favor, tente novamente mais tarde."
      );
      return;
    }

    toast.success("Login realizado com sucesso!");
    setInputValue("");
    setSenha("");
  };

  const handleCreate = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="login-container">
      <ToastContainer autoClose={4000} />
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            background: "#5EAF6B",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <p style={{ marginBottom: "20px", fontSize: "18px" }}>
            Redirecionando para a tela de cadastro...
          </p>
          <img
            src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
            alt="Loading..."
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      </Modal>

      <div className="login-left">
        <div className="form">
          <h1 className="welcome-text">Bem-vindo(a) de volta!</h1>
          <p className="welcome-message login-message">
            Bem-vindo de volta! Estamos felizes em tê-lo conosco novamente.
            <br />
            <br />
            <span className="login-text">
              Faça login para acessar sua conta
            </span>{" "}
            e explorar todas as novidades que preparamos para você.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="username-container">
                <label className="email-label select-disable" htmlFor="email">
                  Email ou CPF:
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email ou CPF"
                  value={inputValue}
                  onChange={handleChangeInput}
                  className={`input ${
                    errorInput ? "error" : inputValue ? "success" : ""
                  }`}
                />
                {errorInput && (
                  <div className="error-message">{errorInput}</div>
                )}
              </div>

              <div className="senha-container">
                <label className="senha-label select-disable" htmlFor="senha">
                  Senha:
                </label>
                <input
                  type="password"
                  id="senha"
                  placeholder="***********"
                  value={senha}
                  onChange={handleChangeSenha}
                  className={`input ${
                    errorSenha ? "error" : senha ? "success" : ""
                  }`}
                />
                {errorSenha && (
                  <div className="error-message">{errorSenha}</div>
                )}
              </div>
            </div>
            <div className="google-login">
              <button className="google-button">
                Entrar com o Google
              </button>
            </div>
            <div className="btn-container">
              <button className="botao select-disable" onClick={handleSubmit}>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="login-right">
        <div className="content">
          <div className="img-vitalis">
            <img
              src="https://via.placeholder.com/200"
              alt="Imagem"
              className="vitalis-image"
            />
          </div>

          <p className="text-count">Não tem uma conta?</p>
          <p className="text-info criar-conta">
            Ainda não tem uma conta por aqui? Sem problemas! <br />
            Vamos criar uma rapidinho? É fácil e você terá acesso a um monte de
            coisas legais. <br />
            Vamos nessa?
          </p>

          <div className="btn-criar-container">
            <button className="botao select-disable" onClick={handleCreate}>
              Criar
            </button>
          </div>

          <p className="rights-reserved">© 2024 nhyira. All Rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

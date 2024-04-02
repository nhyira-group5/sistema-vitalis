import React from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useParams} from "react-router-dom";
import ErrorPage from "../../error-page";




    function Login() {
      const {tipo} = useParams();

      console.log({tipo});
      
      if(tipo === "aluno"){
      return (<div className="login-container">

      <div className="login-right">
        <div className="content">
          <div className="img-vitalis">
            <img src="https://via.placeholder.com/200" alt="Imagem" className="vitalis-image" />
          </div>

          <p className="text-count">Não tem uma conta?</p>
          <p className="text-info criar-conta">
            Ainda não tem uma conta por aqui? Sem problemas! <br />
            Vamos criar uma rapidinho? É fácil e você terá acesso a um monte de
            coisas legais. <br />
            Vamos nessa?
          </p>

          <div className="btn-criar-container">
            <button className="botao select-disable">
              Criar
            </button>
          </div>

          <p className="rights-reserved">© 2024 nhyira. All Rights reserved</p>
        </div>
      </div>

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

          <form>
            <div className="input-container">
              <div className="email-container">
                <label className="email-label select-disable" htmlFor="email">
                  Email ou username:
                </label>
                <input type="text" id="email" placeholder="Email ou username" />

              </div>

              <div className="senha-container">
                <label className="senha-label select-disable" htmlFor="senha">
                  Senha:
                </label>
                <input type="password" id="senha" placeholder="***********" />

              </div>
            </div>
            <div className="google-login">
              <button className="google-button">
                Entrar com o Google
              </button>
            </div>

            <div className="btn-container">
              <button className="botao select-disable" type="button">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>);
      }

      else if(tipo === "instrutor"){
        return (<div>socorro jesus</div>)
      } 
    }
  export default Login;
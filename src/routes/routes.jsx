import SiteInstitucional from "@pages/Site-institucional/site-institucional.jsx";
import { CadastroPage } from "@pages/Cadastro/cadastroPage.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouteError } from "react-router-dom";
import { LoginPage } from "@pages/Login/loginPage.jsx";
import { Pagamento } from "@pages/Pagamento/pagamento";
import { RelatorioPage } from "../pages/Relatorio/relatorioPage";
import { HomePage } from "../pages/Home/homePage";

export function CadastroRoute() {
  return (
    <>
      <CadastroPage />
    </>
  );
}

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export function LoginRoute() {
  return (
    <>
      {/* <GoogleOAuthProvider clientId="660667748113-750qm7ibstd5nn13ruah3ro9riqrm43u.apps.googleusercontent.com"> */}
      <LoginPage />
      {/* </GoogleOAuthProvider> */}
    </>
  );
}

export function Root() {
  return (
    <>
      <SiteInstitucional />
    </>
  );
}

export function PagamentoRoute() {
  return (
    <>
      <Pagamento />
    </>
  );
}

export function RelatorioRoute() {
  return (
    <>
      <RelatorioPage />
    </>
  );
}

export function HomeRoute() {
  return (
    <>
      <HomePage />
    </>
  );
}
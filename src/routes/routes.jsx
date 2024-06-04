import SiteInstitucional from "@pages/Site-institucional/site-institucional.jsx";
import { CadastroPage } from "@pages/Cadastro/cadastroPage.jsx";
import { CadastroParqPage } from "@pages/CadastroParq/CadastroParqPage.jsx";
import { useRouteError } from "react-router-dom";
import { LoginPage } from "@pages/Login/loginPage.jsx";

import { Pagamento } from "@pages/Pagamento/pagamento";

import { RelatorioPage } from "@pages/Relatorio/relatorioPage";

import { HomePage } from "@pages/Home/homePage";

import { RotinasPage } from "@pages/Rotinas/RotinasPage";

import { RefeicoesPage } from "@pages/Refeicoes/RefeicoesPage";

import { AcharPersonalAcademiaPage } from "@pages/AcharPersonalAcademia/AcharPersonalAcademiaPage";

import { ChatPage } from "@pages/Chat/ChatPage";

import { MuralPage } from "@pages/Mural/MuralPage"

import { PerfilPage } from "../pages/Perfil/perfilPage";


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
      <LoginPage />
    </>
  );
}

export function AcharPersonalAcademiaRoute() {
  return (
    <>
      <AcharPersonalAcademiaPage />
    </>
  );
}

export function ChatRoute() {
  return (
    <>
      <ChatPage />
    </>
  );
}

export function MuralRoute() {
  return (
    <>
      <MuralPage />
    </>
  );
}

export function RotinasRoute() {
  return (
    <>
      <RotinasPage />
    </>
  );
}

export function RefeicoesRoute() {
  return (
    <>
      <RefeicoesPage />
    </>
  );
}

export function CadastroParqRoute() {
  return (
    <>
      <CadastroParqPage />
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

export function PerfilRoute() {
  return (
    <>
      <PerfilPage />
    </>
  );
}
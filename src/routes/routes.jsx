import SiteInstitucional from "@pages/Site-institucional/site-institucional.jsx";
import { CadastroPage } from "@pages/Cadastro/cadastroPage.jsx";
import { useRouteError } from "react-router-dom";
import { LoginPage } from "@pages/Login/loginPage.jsx";
import { RelatorioPage } from "@pages/Relatorio/RelatorioPage";
import { HomePage } from "@pages/Home/homePage";

import { CadastroParqPage } from "@pages/CadastroParq/CadastroParqPage";

import { RotinasSemanaisPage } from "@pages/RotinasSemanais/RotinasSemanaisPage";
import { TreinoPage } from "@pages/Treino/TreinoPage";
import { RefeicoesPage } from "@pages/Refeicoes/RefeicoesPage";
import { ChatPage } from "@pages/Chat/ChatPage";
import { MuralPage } from "@pages/Mural/MuralPage"

import { RefeicaoPage } from "@pages/Refeicao/RefeicaoPage";
import { ExercicioPage } from "@pages/Exercicio/ExercicioPage";


import { PerfilPage } from "../pages/Perfil/perfilPage";
import { BuscarPersonalPage } from "../pages/BuscarPersonal/buscarPersonalPage";
import { PlanosPage } from "../pages/Planos/planosPage";
import { HomePersonalPage } from "../pages/HomePersonal/homePersonalPage";
import { PerfilPersonalPage } from "../pages/PerfilPersonal/perfilPersonalPage";
import { ChatPersonalPage } from "../pages/ChatPersonal/chatPersonalPage";

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

export function BuscarPersonalRoute() {
  return (
    <>
      <BuscarPersonalPage />
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

export function RotinasSemanaisRoute() {
  return (
    <>
      <RotinasSemanaisPage />
    </>
  );
}

export function TreinoRoute() {
  return (
    <>
      <TreinoPage />
    </>
  );
}

export function ExercicioRoute() {
  return (
    <>
      <ExercicioPage />
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

export function RefeicaoRoute() {
  return (
    <>
      <RefeicaoPage />
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

export function PlanosRoute() {
  return (
    <>
      <PlanosPage />
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

export function HomePersonalRoute() {
  return (
    <>
      <HomePersonalPage />
    </>
  );
}

export function PerfilPersonalRoute() {
  return (
    <>
      <PerfilPersonalPage />
    </>
  );
}

export function ChatPersonalRoute() {
  return (
    <>
      <ChatPersonalPage />
    </>
  );
}

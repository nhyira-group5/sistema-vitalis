import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import WebFont from "webfontloader";
import React from "react";
import "./index.css";

import {
  RelatorioRoute,
  CadastroRoute,
  LoginRoute,
  Root,
  ErrorPage,
  CadastroParqRoute,
  HomeRoute,
  RotinasSemanaisRoute,
  TreinoRoute,
  RefeicoesRoute,
  ChatRoute,
  MuralRoute,
  RefeicaoRoute,
  ExercicioRoute,
  PerfilRoute,
  BuscarPersonalRoute,
  PlanosRoute
} from "@routes/routes";
import { ChatPersonalRoute, HomePersonalRoute } from "./routes/routes";
import { PerfilPersonalPage } from "./pages/PerfilPersonal/perfilPersonalPage";

WebFont.load({
  google: {
    families: [
      "Inter:100,200,300,400,500,600,700,800,900",
      "Maven Pro:400,500,600,700,800,900",
      "Megrim",
    ],
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <LoginRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "cadastro",
    element: <CadastroRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "cadastroParq",
    element: <CadastroParqRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "relatorio",
    element: <RelatorioRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "home",
    element: <HomeRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "rotinas_semanais",
    element: <RotinasSemanaisRoute />,
    errorElement: <ErrorPage />,
  },
  {
  path: "rotinas_semanais/diaria/:idRotinaDiaria",
  element: <TreinoRoute />,
  errorElement: <ErrorPage />,
  },
  {
    path: "rotinas_semanais/diaria/:idRotinaDiaria/exercicio/:idTreino",
    element: <ExercicioRoute />,
    errorElement: <ErrorPage />,
    },
  {
    path: "refeicoes/:idRefeicao",
    element: <RefeicaoRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "refeicoes",
    element: <RefeicoesRoute/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "buscar-personal",
    element: <BuscarPersonalRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "chat",
    element: <ChatRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "mural",
    element: <MuralRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "perfil",
    element: <PerfilRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "planos",
    element: <PlanosRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "home-personal",
    element: <HomePersonalRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "perfil-personal",
    element: <PerfilPersonalPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "chat-personal",
    element: <ChatPersonalRoute />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="font-inter font-normal m-0 min-w-80 min-h-screen">
      <RouterProvider router={router} />
      <ToastContainer className={"absolute"}/>
    </div>
  </React.StrictMode>
);
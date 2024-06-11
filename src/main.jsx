import "./index.css";
import React from "react";
import WebFont from "webfontloader";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    path: "rotinas",
    element: <RotinasSemanaisRoute />,
    errorElement: <ErrorPage />,
  },
  {
  path: "rotinas/treino/:idTreino",
  element: <TreinoRoute />,
  errorElement: <ErrorPage />,
  },
  {
    path: "rotinas/treino/:idTreino/exercicio/:idExercicio",
    element: <ExercicioRoute />,
    errorElement: <ErrorPage />,
    },
  {
    path: "refeicoes/:refeicaoId",
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="font-inter font-normal m-0 min-w-80 min-h-screen">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  </React.StrictMode>
);
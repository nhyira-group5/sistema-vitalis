import React from "react";
import ReactDOM from "react-dom/client";
import WebFont from "webfontloader";

import "./index.css";
import { LoginPage } from "./pages/Login/loginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

// import Root from "@routes/Root";
// import ErrorPage from "@routes/errorPage";

import { CadastroPage } from "@pages/Cadastro/cadastroPage";

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

WebFont.load({
  google: {
    families: [
      "Inter:100,200,300,400,500,600,700,800,900",
      "Maven-pro:400,500,600,700,800,900",
      "Megrim",
    ],
  },
});

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: "login",
//     element: <LoginRoute />,
//     errorElement: <ErrorPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="660667748113-750qm7ibstd5nn13ruah3ro9riqrm43u.apps.googleusercontent.com">
      <div className="font-inter font-normal m-0 min-w-80 min-h-screen">
        <LoginPage />
      </div>
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);

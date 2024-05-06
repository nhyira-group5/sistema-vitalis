import React from "react";
import ReactDOM from "react-dom/client";
import WebFont from "webfontloader";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import {CadastroRoute, LoginRoute, Root, ErrorPage} from "@routes/routes" 

import {createBrowserRouter, RouterProvider} from "react-router-dom";

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
    errorElement: <ErrorPage />
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
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <div className="font-inter font-normal m-0 min-w-80 min-h-screen">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
  </React.StrictMode>
);

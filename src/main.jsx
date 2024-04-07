import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import WebFont from 'webfontloader';

import Root from "@routes/root";
import ErrorPage from "@routes/errorPage";
import LoginRoute from "@routes/loginRoute" 

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

WebFont.load({
  google: {
     families: [
     'Inter:100,200,300,400,500,600,700,800,900', 
     'Maven-pro:400,500,600,700,800,900',
     'Megrim',
    ]
  }
})


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login/:tipo",
    element: <LoginRoute />,
    errorElement: <ErrorPage />,
  }, 


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

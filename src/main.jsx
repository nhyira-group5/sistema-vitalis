import React from 'react'
import ReactDOM from 'react-dom/client'
import WebFont from 'webfontloader';

import "./index.css"
import { LoginPage } from './pages/Login/loginPage';



// import Root from "@routes/Root";
// import ErrorPage from "@routes/errorPage";
// import LoginRoute from "@routes/LoginRoute" 

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

WebFont.load({
  google: {
     families: [
     'Inter:100,200,300,400,500,600,700,800,900', 
     'Maven-pro:400,500,600,700,800,900',
     'Megrim',
    ]
  }
})


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
    <div className='font-inter font-normal m-0 min-w-80 min-h-screen'>
    <LoginPage />
    </div>
  </React.StrictMode>
);

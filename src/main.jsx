import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import { App } from './App';
import { LoginPage } from './pages/Login/LoginPage';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
);

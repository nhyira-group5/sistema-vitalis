import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './app';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <App />
    <ToastContainer />
  </>,
  // </React.StrictMode>,
);

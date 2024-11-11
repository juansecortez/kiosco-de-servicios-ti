import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot desde react-dom/client
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootswatch/dist/cosmo/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';

// Selecciona el contenedor donde se va a renderizar la app
const container = document.getElementById('root');

// Crea el root usando createRoot en lugar de ReactDOM.render
const root = ReactDOM.createRoot(container);

// Renderiza la app usando el nuevo método
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

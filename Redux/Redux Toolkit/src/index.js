import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Importando 'Store' y el proveedor
import { store } from './store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Envolver a la App con el Provider para conectarla con el 'store' y Redux en sí */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



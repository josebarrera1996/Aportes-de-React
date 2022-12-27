import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// React Query
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Creando el cliente para Query
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    {/* Envolviendo a la App con el proveedor de React-Query */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Herramientas enfocadas en React-Query (solo se verán cuando estamos en modo de desarrollo) */}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>
);



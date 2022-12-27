import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Importaciones para proveer los slice a nuestra API
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { apiSlice } from './features/api/apiSlice'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolviendo a la app con el ApiProvider */}
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {GoogleOAuthProvider} from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./services/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID}>
                    <App />
                </GoogleOAuthProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);

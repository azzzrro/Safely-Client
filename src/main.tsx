import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { store } from "./services/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { store, persistor } from "./services/redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            {/* <Provider store={store}> */}
                 <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID}>
                            <App />
                        </GoogleOAuthProvider>
                     </PersistGate>
                </Provider>
            {/* </Provider> */}
        </ThemeProvider>
    </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./theme.min.css";
import { Provider } from "react-redux";
import { store } from "./store";
/* import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = import.meta.env.VITE_CLIENT_ID; */

/* wrapp with  GoogleOAuthProvider and pass clientId if re-active oauth  and uncomment on login page */
ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <App />
    </Provider>

);

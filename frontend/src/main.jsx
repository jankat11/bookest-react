import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./theme.min.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={"567487559274-4kmrb337m167lvpsc9j7ja89lm1rkek9.apps.googleusercontent.com"} redirectUri={"http://localhost:5173/"}>
  <Provider store={store}>
    <App />
  </Provider>
  </GoogleOAuthProvider>
);

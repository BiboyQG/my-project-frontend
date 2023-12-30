import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import AuthRoute from "./utils/AuthRoute.jsx";

axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <PrimeReactProvider>
          <AuthRoute>
            <App />
          </AuthRoute>
        </PrimeReactProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);

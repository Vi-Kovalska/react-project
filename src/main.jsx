import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "modern-normalize";
import { Toaster } from "react-hot-toast";
import {AuthentProvider} from "./components/Provider/AuthentProvider/AuthentProvider";
import { ThemeProvider } from "./components/Provider/ThemeProvider/ThemeProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
  <AuthentProvider>
      <App />
      </AuthentProvider>
      </ThemeProvider>
    <Toaster/>
  </React.StrictMode>
);
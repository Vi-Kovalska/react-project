import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "modern-normalize";
import { Toaster } from "react-hot-toast";
import {AuthentProvider} from "./components/Provider/AuthentProvider/AuthentProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <AuthentProvider>
      <App />
  </AuthentProvider>
    <Toaster/>
  </React.StrictMode>
);
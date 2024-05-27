import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Providers from "./redux/Providers";
import NavBar from "./components/navBar.jsx";
import { BrowserRouter, Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Providers>
        {/* <NavBar /> */}
        <App />
      </Providers>
    </BrowserRouter>
);

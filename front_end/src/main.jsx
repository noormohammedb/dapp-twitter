import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

import { StatesProvider } from "./StatesContext";

ReactDOM.render(
  <React.StrictMode>
    <StatesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StatesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

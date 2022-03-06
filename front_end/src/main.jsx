import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./routes/Dashboard";
import Singup from "./routes/Singup";

import { StatesProvider } from "./StatesContext";

ReactDOM.render(
  <React.StrictMode>
    <StatesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
      </BrowserRouter>
    </StatesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

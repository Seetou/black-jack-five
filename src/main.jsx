import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./components/AppContext";
import App from "./App";
import "../src/styles/index.css";
import GameContext from "./components/GameContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContext>
      <GameContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GameContext>
    </AppContext>
  </React.StrictMode>
);

/**
 * main.jsx - Point d'entrée de l'application React
 * 
 * Initialise l'application React en :
 * - Montant le composant App dans le DOM
 * - Configurant React en mode strict (StrictMode)
 * - Appliquant les styles globaux
 * 
 * Utilisé par : Vite (configuration de build)
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

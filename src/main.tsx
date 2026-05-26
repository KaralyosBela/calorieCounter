import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toast } from "@heroui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toast.Provider />
    <App />
  </StrictMode>,
);

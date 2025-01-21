import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container); // Create a root using createRoot API
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

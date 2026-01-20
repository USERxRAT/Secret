import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

// Safety check (prevents silent failures)
if (!rootElement) {
  throw new Error("Root element not found");
}

// Reveal AFTER React is mounted
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Force layout stabilization before showing
requestAnimationFrame(() => {
  rootElement.style.opacity = "1";
});

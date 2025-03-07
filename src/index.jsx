import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Expose to global
window.DamperPreview = {
  updateParameters: () => {},
};

const element = document.getElementsByTagName("DamperPreview")[0];

if (element) {
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

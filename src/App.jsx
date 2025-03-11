import "./App.css";
import DamperVisualizationWindow from "./components/DamperVisualizationWindow";
import React from "react";
import GlobalProvider from "./context/GlobalProvider";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

function App() {
  return (
    <GlobalProvider>
      <DamperVisualizationWindow />
    </GlobalProvider>
  );
}

export default App;

import "./App.css";
import DamperVisualizationWindow from "./components/DamperVisualizationWindow";
import React from "react";
import GlobalProvider from "./context/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <DamperVisualizationWindow />
    </GlobalProvider>
  );
}

export default App;

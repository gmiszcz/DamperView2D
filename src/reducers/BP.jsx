import React, { createContext, useReducer, useContext } from "react";
import { getInitialState, genericReducer, createAnnotation } from "./genericReducer";

// Initial state for Base Plate
let geometryBP = getInitialState({
  BP_Customized: false,
  BP_PartNo: "",
  BP_TH: 0,
  BP_H: 0,
  BP_PD: 0,
});

// Initial state with annotations
let initialState = getInitialState(geometryBP, [
  createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Base plate thickness: " }),
  createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextBP = createContext();

// Provider
export const ProviderBP = ({ children }) => {
  const [state, dispatch] = useReducer(genericReducer, initialState);

  return <ContextBP.Provider value={{ state, dispatch }}>{children}</ContextBP.Provider>;
};

// Custom hook to use context
export const useBP = () => {
  const context = useContext(ContextBP);
  if (!context) {
    throw new Error("useBP must be used within a ProviderBP");
  }
  return context;
};

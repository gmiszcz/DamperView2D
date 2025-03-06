import React, { createContext, useReducer, useContext } from "react";
import { getInitialState, genericReducer, createAnnotation } from "./genericReducer";

// set reserve tube geometry
const geometryRT = {
  OD: 25,
  ID: 20,
  L: 400,
  TH: 3,
};

// Initial state
let initialState = getInitialState(geometryRT);

initialState = {
  ...initialState,
  annotations: [
    createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Reserve tube length: " }),
    createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
  ],
};

// Create Context
const ContextRT = createContext();

// Provider
export const ProviderRT = ({ children }) => {
  const [state, dispatch] = useReducer(genericReducer, initialState);

  return <ContextRT.Provider value={{ state, dispatch }}>{children}</ContextRT.Provider>;
};

// Custom hook to use context
export const useRT = () => {
  const context = useContext(ContextRT);
  if (!context) {
    throw new Error("useRT must be used within a ContextRTProvider");
  }
  return context;
};

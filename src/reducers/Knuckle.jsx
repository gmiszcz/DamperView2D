import React, { createContext, useReducer, useContext } from "react";
import { getInitialState, genericReducer, createAnnotation } from "./genericReducer";

// Initial state for Knuckle
let geometryKnuckle = getInitialState({
  Knuckle_Customized: false,
  Knuckle_Length: 0,
  Knuckle_ThreadDiam: 0,
  Knuckle_ThreadDiam2: 0,
  Knuckle_ThreadPitch: 0,
  Knuckle_TH: 0,
  Knuckle_R: 0,
  Knuckle_Spread: 0,
  Knuckle_BoltHeight: 0,
});

// Initial state with annotations
let initialState = getInitialState(geometryKnuckle, [
  createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Knuckle length: " }),
  createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextKnuckle = createContext();

// Provider
export const ProviderKnuckle = ({ children }) => {
  const [state, dispatch] = useReducer(genericReducer, initialState);

  return <ContextKnuckle.Provider value={{ state, dispatch }}>{children}</ContextKnuckle.Provider>;
};

// Custom hook to use context
export const useKnuckle = () => {
  const context = useContext(ContextKnuckle);
  if (!context) {
    throw new Error("useKnuckle must be used within a ProviderKnuckle");
  }
  return context;
};

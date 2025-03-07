import React, { createContext, useReducer, useContext } from "react";
import { getInitialState, genericReducer, createAnnotation } from "../reducers/genericReducer";

// Initial state for Third Tube
let geometryTT = getInitialState({
  TT_Customized: false,
  TT_PartNo: "",
  TT_Length: 0,
  TT_OuterDiam: 0,
  TT_TH: 0,
  TT_HolePosition: 0,
});

// Initial state with annotations
let initialState = getInitialState(geometryTT, [
  createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Third tube length: " }),
  createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextTT = createContext();

// Provider
export const ProviderTT = ({ children }) => {
  const [state, dispatch] = useReducer(genericReducer, initialState);

  return <ContextTT.Provider value={{ state, dispatch }}>{children}</ContextTT.Provider>;
};

// Custom hook to use context
export const useTT = () => {
  const context = useContext(ContextTT);
  if (!context) {
    throw new Error("useTT must be used within a ProviderTT");
  }
  return context;
};

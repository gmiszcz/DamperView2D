import React, { createContext, useReducer, useContext } from "react";
import { genericReducer } from "../../reducers/genericReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";

// Initial state for Pressure Tube
let geometryPT = getInitialState({
  PT_Customized: false,
  PT_PartNo: "",
  PT_ShowInReport: true,
  PT_Length: 0,
  PT_ID: 0,
  PT_TH: 0,
});

// Initial state with annotations
let initialState = getInitialState(geometryPT, [
  // createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Pressure tube length: " }),
  // createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextPT = createContext();

// Provider
export const ProviderPT = ({ children }) => {
  const [state, dispatch] = useReducer(genericReducer, initialState);

  return <ContextPT.Provider value={{ state, dispatch }}>{children}</ContextPT.Provider>;
};

// Custom hook to use context
export const usePT = () => {
  const context = useContext(ContextPT);
  if (!context) {
    throw new Error("usePT must be used within a ProviderPT");
  }
  return context;
};

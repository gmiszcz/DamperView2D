import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";

// Initial state for Pressure Tube
let geometryPT = {
  PT_Customized: false,
  PT_PartNo: "",
  PT_ShowInReport: true,
  PT_Length: 250,
  PT_ID: 32,
  PT_TH: 1.13,
};

// Initial state with annotations
let initialState = getInitialState(geometryPT, [
  // createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Pressure tube length: " }),
  // createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: "#d08309",
  },
};

// Create Context
const ContextPT = createContext();

// Provider
export const ProviderPT = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

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

import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";

// Initial state for Base Plate
let geometryBP = {
  BP_Customized: false,
  BP_PartNo: "",
  BP_TH: 3,
  BP_H: 5,
  BP_PD: 5,
};

// Initial state with annotations
let initialState = getInitialState(geometryBP, [
  // createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Base plate thickness: " }),
  // createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextBP = createContext();

// Provider
export const ProviderBP = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

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

import React, { createContext, useReducer, useContext } from "react";
import { getInitialState, genericReducer, createAnnotation } from "./genericReducer";

// Initial state for Rod Guide
let geometryRG = getInitialState({
  RG_Customized: false,
  RG_PartNo: "",
  RG_Height: 0,
  RG_RT_VDist: 0,
  RG_RT_HDist: 0,
  RG_bH: 0,
  RG_topShelf: false,
  RG_topShelfClearance: 0,
  RG_topShelfPosition: 0,
  RG_topShelfLength: 0,
});

// Initial state with annotations
let initialState = getInitialState(geometryRG, [
  createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Rod guide height: " }),
  createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextRG = createContext();

// Provider
export const ProviderRG = ({ children }) => {
  const [state, dispatch] = useReducer(genericReducer, initialState);

  return <ContextRG.Provider value={{ state, dispatch }}>{children}</ContextRG.Provider>;
};

// Custom hook to use context
export const useRG = () => {
  const context = useContext(ContextRG);
  if (!context) {
    throw new Error("useRG must be used within a ProviderRG");
  }
  return context;
};

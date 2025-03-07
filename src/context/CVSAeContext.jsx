import React, { createContext, useReducer, useContext } from "react";
import { getInitialState, genericReducer, createAnnotation } from "../reducers/genericReducer";

// Initial state for CVSAe
let geometryCVSAe = getInitialState({
  CVSAe_ValvePosition: 0,
  CVSAe_ValveOrient: "",
  CVSAe_WeldSize: 0,
  CVSAe_HousingTH: 0,
  CVSAe_HousingDiam: 0,
  CVSAe_HousingHeight: 0,
  CVSAe_HoleMajorDiam: 0,
  CVSAe_HoleMinorDiam: 0,
  CVSAe_HoleCutDist: 0,
  CVSAe_StepTH: 0,
  CVSAe_StepHeight: 0,
});

// Initial state with annotations
let initialState = getInitialState(geometryCVSAe, [
  createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "CVSAe valve position: " }),
  createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextCVSAe = createContext();

// Provider
export const ProviderCVSAe = ({ children }) => {
  const [state, dispatch] = useReducer(genericReducer, initialState);

  return <ContextCVSAe.Provider value={{ state, dispatch }}>{children}</ContextCVSAe.Provider>;
};

// Custom hook to use context
export const useCVSAe = () => {
  const context = useContext(ContextCVSAe);
  if (!context) {
    throw new Error("useCVSAe must be used within a ProviderCVSAe");
  }
  return context;
};

import React, { createContext, useReducer, useContext } from "react";
import { getInitialState, genericReducer, createAnnotation } from "./genericReducer";

// Initial state for Piston Post
let geometryPP = getInitialState({
  PP_Customized: false,
  PistonPost: "",
  P_Length: 0,
  PP_Type: "",
  PP_Diameter: 0,
  PP_Radius: 0,
  PP_ChamferDiameter: 0,
  PP_ChamferAngle: 0,
  PP_ThreadDiam: 0,
  PP_ThreadPitch: 0,
  PP_InnerDiameter: 0,
});

// Initial state with annotations
let initialState = getInitialState(geometryPP, [
  createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Piston post length: " }),
  createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextPP = createContext();

// Provider
export const ProviderPP = ({ children }) => {
  const [state, dispatch] = useReducer(genericReducer, initialState);

  return <ContextPP.Provider value={{ state, dispatch }}>{children}</ContextPP.Provider>;
};

// Custom hook to use context
export const usePP = () => {
  const context = useContext(ContextPP);
  if (!context) {
    throw new Error("usePP must be used within a ProviderPP");
  }
  return context;
};

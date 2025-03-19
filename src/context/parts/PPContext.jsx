import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Piston Post
let geometryPP = {
  PP_Customized: false,
  PistonPost: "",
  P_Length: 10,
  PP_Type: "",
  PP_Diameter: 0,
  PP_Radius: 0,
  PP_ChamferDiameter: 0,
  PP_ChamferAngle: 0,
  PP_ThreadDiam: 0,
  PP_ThreadPitch: 0,
  PP_InnerDiameter: 0,
};

// Initial state with annotations
let initialState = getInitialState(geometryPP)

// Create Context
const ContextPP = createContext();

// Provider
export const ProviderPP = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

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

import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Piston Post
let geometryPP = {
  PP_Customized: false,
  PistonPost: "Included",
  P_Length: 10,
  PP_Type: "3/8",
  PP_Diameter: 9.43,
  PP_Radius: 0.45,
  PP_ChamferDiameter: 14.5,
  PP_ChamferAngle: 45,
  PP_ThreadDiam: 8.84,
  PP_ThreadPitch: 1.0,
  PP_InnerDiameter: 0,
};

// Initial state with annotations
let initialState = getInitialState(geometryPP)

// Add color
initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.PP,
  },
};

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

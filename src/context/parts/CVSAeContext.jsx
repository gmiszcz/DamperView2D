import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for CVSAe
let geometryCVSAe = {
  CVSAe_ValveOrient: "-80",
  CVSAe_WeldSize: 3,
  CVSAe_HousingTH: 5.75,
  CVSAe_HousingDiam: 40,
  CVSAe_HousingHeight: 26.4,
  CVSAe_HoleMajorDiam: 27.8,
  CVSAe_HoleMinorDiam: 25.8,
  CVSAe_HoleCutDist: 25.8,
  CVSAe_StepTH: 1.5,
  CVSAe_StepHeight: 2,
};

// Initial state with annotations
let initialState = getInitialState(geometryCVSAe)
initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.RT,
  },
};

// Create Context
const ContextCVSAe = createContext();

// Provider
export const ProviderCVSAe = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

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

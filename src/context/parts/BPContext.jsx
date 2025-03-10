import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Base Plate
let geometryBP = {
  BP_Customized: false,
  BP_PartNo: "",
  BP_TH: 3,
  BP_H: 3,
  BP_PD: 20,
};

// Initial state with annotations
let initialState = getInitialState(geometryBP, []);

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.BP,
  },
};

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

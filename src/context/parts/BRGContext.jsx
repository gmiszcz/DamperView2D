import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Bearing
let geometryBearing = {
  Bearing_PartNo: "",
  Bearing_TH: 1.5,
  Bearing_H: 12,
};

// Initial state with annotations
let initialState = getInitialState(geometryBearing);

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.BRG,
  },
};

// Create Context
const ContextBearing = createContext();

// Provider
export const ProviderBearing = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

  return <ContextBearing.Provider value={{ state, dispatch }}>{children}</ContextBearing.Provider>;
};

// Custom hook to use context
export const useBRG = () => {
  const context = useContext(ContextBearing);
  if (!context) {
    throw new Error("useBRG must be used within a ProviderBearing");
  }
  return context;
};

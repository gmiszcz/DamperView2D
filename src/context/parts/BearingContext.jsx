import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Bearing
let geometryBearing = {
  Bearing_PartNo: "",
  Bearing_TH: 0,
  Bearing_H: 0,
};

// Initial state with annotations
let initialState = getInitialState(geometryBearing);

// Create Context
const ContextBearing = createContext();

// Provider
export const ProviderBearing = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

  return <ContextBearing.Provider value={{ state, dispatch }}>{children}</ContextBearing.Provider>;
};

// Custom hook to use context
export const useBearing = () => {
  const context = useContext(ContextBearing);
  if (!context) {
    throw new Error("useBearing must be used within a ProviderBearing");
  }
  return context;
};

import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";

// Initial state for Bearing
let geometryBearing = getInitialState({
  Bearing_PartNo: "",
  Bearing_TH: 0,
  Bearing_H: 0,
});

// Initial state with annotations
let initialState = getInitialState(geometryBearing, [
  // createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Bearing thickness: " }),
  // createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

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

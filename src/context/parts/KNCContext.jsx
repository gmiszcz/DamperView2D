import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Knuckle
let geometryKnuckle = {
  Knuckle_Customized: false,
  Knuckle_Length: 90,
  Knuckle_ThreadDiam: 14,
  Knuckle_ThreadDiam2: 0,
  Knuckle_ThreadPitch: 1.5,
  Knuckle_TH: 10,
  Knuckle_R: 0,
  Knuckle_Spread: 0,
  Knuckle_BoltHeight: 0,
};

// Initial state with annotations
let initialState = getInitialState(geometryKnuckle);

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.KNC,
  },
};

// Create Context
const ContextKnuckle = createContext();

// Provider
export const ProviderKnuckle = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

  return <ContextKnuckle.Provider value={{ state, dispatch }}>{children}</ContextKnuckle.Provider>;
};

// Custom hook to use context
export const useKNC = () => {
  const context = useContext(ContextKnuckle);
  if (!context) {
    throw new Error("useKNC must be used within a ProviderKnuckle");
  }
  return context;
};

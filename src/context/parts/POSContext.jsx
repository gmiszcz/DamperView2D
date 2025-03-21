import React, { createContext, useReducer, useContext, useState } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";
import { useRod } from "./RodContext";

// Initial state for Positions
let geometryPositions = {
  DL: 500,
  CL: 450,
  EL: 600,
  PT_Position: 9.2,
  P_Position: 5.4,
  FB_Position: 121,
  BP_Position: 0,
  Bearing_Position: 0.75,
  Knuckle_Position: 90,
};

// Initial state with annotations
let initialState = getInitialState(geometryPositions);

// Create Context
const ContextPositions = createContext();

// Provider
export const ProviderPositions = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);
  
  return <ContextPositions.Provider value={{ state, dispatch }}>{children}</ContextPositions.Provider>;
};

// Custom hook to use context
export const usePOS = () => {
  const context = useContext(ContextPositions);
  if (!context) {
    throw new Error("usePOS must be used within a ProviderPositions");
  }
  return context;
};

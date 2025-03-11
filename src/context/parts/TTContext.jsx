import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";

// Initial state for Third Tube
let geometryTT = {
  TT_Customized: false,
  TT_PartNo: "",
  TT_Length: 0,
  TT_OuterDiam: 0,
  TT_TH: 0,
  TT_HolePosition: 0,
};

// Initial state with annotations
let initialState = getInitialState(geometryTT)

// Create Context
const ContextTT = createContext();

// Provider
export const ProviderTT = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

  return <ContextTT.Provider value={{ state, dispatch }}>{children}</ContextTT.Provider>;
};

// Custom hook to use context
export const useTT = () => {
  const context = useContext(ContextTT);
  if (!context) {
    throw new Error("useTT must be used within a ProviderTT");
  }
  return context;
};

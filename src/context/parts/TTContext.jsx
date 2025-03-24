import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Third Tube
let geometryTT = {
  TT_Customized: false,
  TT_PartNo: "",
  TT_Length: 244,
  TT_OuterDiam: 40,
  TT_TH: 1.5,
};

// Initial state with annotations
let initialState = getInitialState(geometryTT)

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.TT,
  },
};

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

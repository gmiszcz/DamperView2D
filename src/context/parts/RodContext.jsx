import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Rod
let geometryRod = {
  Rod_Customized: false,
  Rod_PartNo: "",
  Rod_ShowInReport: true,
  Rod_SolidHollow: "",
  Rod_OD: 22,
  Rod_Length: 300,
  Rod_HD: 2,
  Rod_HDLength: 0,
  Rod_Hollow_TH: 0,
  Rod_isGroove: true,
  Rod_collarType: "",
  Rod_grooveRadius: 1.0,
  Rod_grooveMidDiameter: 18.0,
  Rod_groovePosition: 40,
  Rod_grooveWidth: 2,
  Rod_CurrentPosition: "DL",
};

// Initial state with annotations
let initialState = getInitialState(geometryRod);

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.ROD,
  },
};

// Create Context
const ContextRod = createContext();

// Provider
export const ProviderRod = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

  return <ContextRod.Provider value={{ state, dispatch }}>{children}</ContextRod.Provider>;
};

// Custom hook to use context
export const useRod = () => {
  const context = useContext(ContextRod);
  if (!context) {
    throw new Error("useRod must be used within a ProviderRod");
  }
  return context;
};

import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Rod Guide
let geometryRG = {
  RG_Customized: false,
  RG_PartNo: "",
  RG_Height: 25,
  RG_RT_VDist: 5,
  RG_RT_HDist: 3,
  RG_bH: 0,
  RG_topShelf: false,
  RG_topShelfClearance: 0.325,
  RG_topShelfPosition: 15.2,
  RG_topShelfLength: 2.35,
};

// Initial state with annotations
let initialState = getInitialState(geometryRG);

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.RG,
  },
};

// Create Context
const ContextRG = createContext();

// Provider
export const ProviderRG = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

  return <ContextRG.Provider value={{ state, dispatch }}>{children}</ContextRG.Provider>;
};

// Custom hook to use context
export const useRG = () => {
  const context = useContext(ContextRG);
  if (!context) {
    throw new Error("useRG must be used within a ProviderRG");
  }
  return context;
};

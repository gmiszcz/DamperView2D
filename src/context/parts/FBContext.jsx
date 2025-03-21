import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state for Foot Bracket
let geometryFB = {
  FB_Customized: false,
  FB_PartNo: "",
  FB_ShowInReport: true,
  FB_Length: 130,
  FB_FrontHolePosition: 20,
  FB_FrontHoleAxisOffset: 52,
  FB_HoleSpan: 65,
  FB_RearHoleOffset: 0,
  FB_InnerWidth: 0,
  FB_OB_TH: 3,
  FB_IB_TH: 3,
  FB_ThreadDiam: 12,
  FB_ThreadPitch: 1.75,
  FB_BoltsHeadDiam: 26.6,
  FB_KnuckleTH_Gap: 0,
};

// Initial state with annotations
let initialState = getInitialState(geometryFB)

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.FB,
  },
};

// Create Context
const ContextFB = createContext();

// Provider
export const ProviderFB = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

  return <ContextFB.Provider value={{ state, dispatch }}>{children}</ContextFB.Provider>;
};

// Custom hook to use context
export const useFB = () => {
  const context = useContext(ContextFB);
  if (!context) {
    throw new Error("useFB must be used within a ProviderFB");
  }
  return context;
};

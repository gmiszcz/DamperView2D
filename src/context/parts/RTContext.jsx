import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";
import { PARTS_COLORS } from "../../utils/constants";

// Initial state with nested ReserveTube fields
let geometryRT = {
  RT_Customized: false,
  RT_PartNo: "",
  RT_ShowInReport: true,
  RT_VWT: false,
  RT_Length: 400,
  RT_TH: 2,
  RT_OD1: 55,
  RT_NumberOfSwages: 1,
  RT_Swage_List: [
    [150, 50, 15],
    [350, 40, 10],
  ], // [RT_Position, RT_OD, RT_Distance]
  // ReserveTube_swages: [],
  ReserveTube_VWT: [],
};

// Initial state
let initialState = getInitialState(geometryRT)

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: PARTS_COLORS.RT,
  },
};

// Create Context
const ContextRT = createContext();

// Provider
export const ProviderRT = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

  return <ContextRT.Provider value={{ state, dispatch }}>{children}</ContextRT.Provider>;
};

// Custom hook to use context
export const useRT = () => {
  const context = useContext(ContextRT);
  if (!context) {
    throw new Error("useRT must be used within a ContextRTProvider");
  }
  return context;
};

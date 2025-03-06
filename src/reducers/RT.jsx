import React, { createContext, useReducer, useContext } from "react";
import { getInitialState, genericReducer, createAnnotation } from "./genericReducer";

// Initial state with nested ReserveTube fields
let geometryRT = getInitialState({
  RT_Customized: false,
  RT_PartNo: "",
  RT_ShowInReport: true,
  RT_VWT: false,
  RT_Length: 400,
  RT_TH: 3,
  RT_OD1: 25,
  RT_NumberOfSwages: 0,
  RT_Swage_List: [],
  ReserveTube_swages: [],
  ReserveTube_VWT: [],
});

// Initial state
let initialState = getInitialState(geometryRT, [
  createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Reserve tube length: " }),
  createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextRT = createContext();

// Provider
export const ProviderRT = ({ children }) => {
  const [state, dispatch] = useReducer(genericReducer, initialState);

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

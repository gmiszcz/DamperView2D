import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";

// Initial state for Spring Seat
let geometrySS = getInitialState({
  SS_Customized: false,
  SpringSeat: "",
  SS_PartNo: "",
  SS_LoadZpos: 0,
  SS_LoadYpos: 0,
  SS_Angle: 0,
});

// Initial state with annotations
let initialState = getInitialState(geometrySS, [
  // createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Spring seat load position: " }),
  // createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

// Create Context
const ContextSS = createContext();

// Provider
export const ProviderSS = ({ children }) => {
  const [state, dispatch] = useReducer(partsReducer, initialState);

  return <ContextSS.Provider value={{ state, dispatch }}>{children}</ContextSS.Provider>;
};

// Custom hook to use context
export const useSS = () => {
  const context = useContext(ContextSS);
  if (!context) {
    throw new Error("useSS must be used within a ProviderSS");
  }
  return context;
};

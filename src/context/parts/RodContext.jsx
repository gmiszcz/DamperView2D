import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";
import { createAnnotation, getInitialState } from "../../utils/helpers";

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
  Rod_isGroove: false,
  Rod_collarType: "",
  Rod_grooveRadius: 0,
  Rod_grooveMidDiameter: 0,
  Rod_groovePosition: 0,
  Rod_grooveWidth: 0,
};

// Initial state with annotations
let initialState = getInitialState(geometryRod, [
  // createAnnotation("an1", { x1: 0, y1: 0, x2: 200, y2: 0 }, { label: "Rod length: " }),
  // createAnnotation("an2", { x1: 100, y1: 0, x2: 200, y2: 0 }),
]);

initialState = {
  ...initialState,
  properties: {
    ...initialState.properties,
    color: "#e03535",
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

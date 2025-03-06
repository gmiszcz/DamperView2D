import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  geometry: {
    OD: 25,
    ID: 20,
  },
  properties: {
    display: true,
    active: true,
    color: "grey",
  },
  dimensions: {
    active: true,
    scale: 1.0,
    dim_1: {
      active: true,
      color: "black",
      label: "",
      value: 100,
      position: {
        x1: 0,
        y1: 0,
        x2: 10,
        y2: 0,
      },
    },
  },
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "setDimensions":
      return { ...state, geometry: action.payload };
    case "setVisibility":
      return { ...state, properties: { ...state.properties, display: action.payload } };
    case "setOD":
      return { ...state, geometry: { ...state.geometry, OD: action.payload } };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create Context
const ContextRT = createContext();

// Provider
export const ProviderRT = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

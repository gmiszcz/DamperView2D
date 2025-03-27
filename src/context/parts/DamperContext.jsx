import React, { createContext, useReducer, useContext, useState } from "react";

import { partsReducer } from "../../reducers/partsReducer";
import { getInitialState } from "../../utils/helpers";

let damperDetails = {
    StrutMountingMethod: "Foot Bracket",
    StrutType: "Passive"
};
  
// Initial state with annotations
let initialState = getInitialState(damperDetails);

// Create Context
const ContextDamper = createContext();

// Provider
export const ProviderDamper = ({ children }) => {
    const [state, dispatch] = useReducer(partsReducer, initialState);

    return <ContextDamper.Provider value={{ state, dispatch }}>{children}</ContextDamper.Provider>
}


// Custom hook to use context
export const useDamper = () => {
    const context = useContext(ContextDamper);
    if (!context) {
        throw new Error("useDamper must be used within a ProviderDamper")
    }
    return context;
}
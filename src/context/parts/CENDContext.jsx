import React, { createContext, useReducer, useContext } from "react";
import { partsReducer } from "../../reducers/partsReducer";

import { PARTS_COLORS } from "../../utils/constants";
import { getInitialState } from "../../utils/helpers";

// Initial state for Cylinder End

let geometryCylinderEnd = {
    CylinderEnd_PartNo: "",
    CylinderEnd_clampThickness: 4.5,
    CylinderEnd_PTContactArea: 3.14,
    CylinderEnd_Hole: 4.5,
    
};
  
// Initial state with annotations
let initialState = getInitialState(geometryCylinderEnd);

// Add proper color

initialState = {
    ...initialState,
    properties: {
        ...initialState.properties,
        color: PARTS_COLORS.CEND,
    },
}

// Create Context
const ContextCylinderEnd = createContext();

// Provider
export const ProviderCylinderEnd = ({ children }) => {
    const [state, dispatch] = useReducer(partsReducer, initialState);

    return <ContextCylinderEnd.Provider value={{ state, dispatch }}>{children}</ContextCylinderEnd.Provider>;
}

// Custom hook to use context
export const useCEND = () => {
    const context = useContext(ContextCylinderEnd);
    if (!context) {
        throw new Error("useCEND must be used within a ProviderCylinderEnd");
    }
    return context;
}
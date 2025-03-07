import React, { createContext, useReducer, useContext, useEffect, useRef } from "react";
import { GLOBAL_OFFSET } from "../utils/constants";

// Initial state for size
const initialState = {
  width: GLOBAL_OFFSET.x,
  height: GLOBAL_OFFSET.y,
};

// Reducer function
const sizeReducer = (state, action) => {
  switch (action.type) {
    case "SET_SIZE":
      return { ...state, width: action.payload.width, height: action.payload.height };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Context creation
const SizeContext = createContext();

// Provider component
export const SizeProvider = ({ children }) => {
  const segmentRef = useRef(null); // Reference to the container
  const [state, dispatch] = useReducer(sizeReducer, initialState);

  useEffect(() => {
    const updateSize = () => {
      if (segmentRef.current) {
        dispatch({
          type: "SET_SIZE",
          payload: {
            width: segmentRef.current.offsetWidth || GLOBAL_OFFSET.x,
            height: segmentRef.current.offsetHeight || GLOBAL_OFFSET.y,
          },
        });
      }
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <SizeContext.Provider value={{ state, segmentRef }}>
      <div ref={segmentRef} className="damper-2d-vis-container">
        {children}
      </div>
    </SizeContext.Provider>
  );
};

// Custom hook for easier usage
export const useSize = () => {
  const context = useContext(SizeContext);
  if (!context) {
    throw new Error("useSize must be used within a SizeProvider");
  }
  return context;
};

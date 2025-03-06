import React, { useEffect, useRef } from "react";
import "./DamperVisualizationWindow.css";
import DamperModelBuilder from "./DamperModelBuilder";
import { useRT } from "../reducers/RT";

export default function DamperVisualizationWindow() {
  const { state: rtState, dispatch: rtDispatch } = useRT();
  const controlRef = useRef({}); // Ensures `current` always exists

  useEffect(() => {
    // Assign `controlRef` globally if not already assigned
    if (!window.controlRef) window.controlRef = controlRef;

    // Ensure `current` exists before assigning functions
    if (!window.controlRef.current) window.controlRef.current = {};

    // Ensure `RT` namespace exists inside `current`
    if (!window.controlRef.current.RT) window.controlRef.current.RT = {};

    // Assign RT functions
    window.controlRef.current.RT.setProperty = (payload) => {
      rtDispatch({ type: "SET_PROPERTY", payload });
    };
    window.controlRef.current.RT.setGeometry = (payload) => {
      rtDispatch({ type: "SET_GEOMETRY", payload });
    };
    window.controlRef.current.RT.addAnnotation = (payload) => {
      rtDispatch({ type: "ADD_ANNOTATION", payload });
    };
    window.controlRef.current.RT.deleteAnnotation = (id) => {
      rtDispatch({ type: "DELETE_ANNOTATION", id });
    };
    window.controlRef.current.RT.updateAnnotation = (id, payload) => {
      rtDispatch({ type: "UPDATE_ANNOTATION_BY_ID", id, payload });
    };
    window.controlRef.current.RT.showState = () => {
      console.log("Damper data", rtState);
    };
  }, [rtState, rtDispatch]); // Re-run effect when state changes

  return (
    <div className="damper-visualization-window">
      <h3>Damper Visualization Window</h3>
      <DamperModelBuilder />
    </div>
  );
}

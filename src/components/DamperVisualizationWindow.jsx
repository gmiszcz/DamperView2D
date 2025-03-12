import React, { useEffect, useState, useRef } from "react";
import "./DamperVisualizationWindow.css";
import DamperModelBuilder from "./DamperModelBuilder";
import { usePartsContext } from "../context/PartsContext";
import { SizeProvider } from "../context/SizeContext";
import HoverMenu from "./HoverMenu";

export default function DamperVisualizationWindow() {
  const partsContext = usePartsContext();
  const [menuVisible, setMenuVisible] = useState(false);
  const controlRef = useRef({});
  const modelRef = useRef({});

  useEffect(() => {
    if (!window.controlRef) window.controlRef = controlRef;
    if (!window.controlRef.current) window.controlRef.current = {};

    Object.keys(partsContext).forEach((key) => {
      if (!window.controlRef.current[key]) window.controlRef.current[key] = {};

      window.controlRef.current[key].setProperty = (payload) => {
        partsContext[key].dispatch({ type: "SET_PROPERTY", payload });
      };
      window.controlRef.current[key].setGeometry = (payload) => {
        partsContext[key].dispatch({ type: "SET_GEOMETRY", payload });
      };
      window.controlRef.current[key].addAnnotation = (payload) => {
        partsContext[key].dispatch({ type: "ADD_ANNOTATION", payload });
      };
      window.controlRef.current[key].deleteAnnotation = (id) => {
        partsContext[key].dispatch({ type: "DELETE_ANNOTATION", id });
      };
      window.controlRef.current[key].updateAnnotation = (id, payload) => {
        partsContext[key].dispatch({ type: "UPDATE_ANNOTATION_BY_ID", id, payload });
      };
      window.controlRef.current[key].showState = () => {
        console.log(`${key} data`, partsContext[key].state);
      };
    });

    // Show global context after update
    // console.log("🔄 partsContext updated:", partsContext);
  }, [partsContext]);

  return (
    <div className="damper-visualization-window" onMouseEnter={() => setMenuVisible(true)} onMouseLeave={() => setMenuVisible(false)}>
      <h3>Damper Visualization Window</h3>
      <SizeProvider>
        <HoverMenu visible={menuVisible} onFitView={() => modelRef.current?.resetView()} />
        <DamperModelBuilder ref={modelRef} />
      </SizeProvider>
    </div>
  );
}

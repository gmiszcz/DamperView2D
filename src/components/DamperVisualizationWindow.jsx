import React, { useEffect, useState, useRef } from "react";
import "./DamperVisualizationWindow.css";
import DamperModelBuilder from "./DamperModelBuilder";
import { useGlobalContext } from "../context/GlobalContext";
import { SizeProvider } from "../context/SizeContext";
import HoverMenu from "./HoverMenu";

export default function DamperVisualizationWindow() {
  const globalContext = useGlobalContext();
  const [menuVisible, setMenuVisible] = useState(false);
  const controlRef = useRef({});
  const modelRef = useRef({});

  useEffect(() => {
    if (!window.controlRef) window.controlRef = controlRef;
    if (!window.controlRef.current) window.controlRef.current = {};

    Object.keys(globalContext).forEach((key) => {
      if (!window.controlRef.current[key]) window.controlRef.current[key] = {};

      window.controlRef.current[key].setProperty = (payload) => {
        globalContext[key].dispatch({ type: "SET_PROPERTY", payload });
      };
      window.controlRef.current[key].setGeometry = (payload) => {
        globalContext[key].dispatch({ type: "SET_GEOMETRY", payload });
      };
      window.controlRef.current[key].addAnnotation = (payload) => {
        globalContext[key].dispatch({ type: "ADD_ANNOTATION", payload });
      };
      window.controlRef.current[key].deleteAnnotation = (id) => {
        globalContext[key].dispatch({ type: "DELETE_ANNOTATION", id });
      };
      window.controlRef.current[key].updateAnnotation = (id, payload) => {
        globalContext[key].dispatch({ type: "UPDATE_ANNOTATION_BY_ID", id, payload });
      };
      window.controlRef.current[key].showState = () => {
        console.log(`${key} data`, globalContext[key].state);
      };
    });

    // Show global context after update
    // console.log("🔄 GlobalContext updated:", globalContext);
  }, [globalContext]);

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

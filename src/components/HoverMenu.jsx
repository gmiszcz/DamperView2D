import React, { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { usePartsContext } from "../context/PartsContext";
import { Tooltip } from "primereact/tooltip";
import "./HoverMenu.css";
import { useRod } from "../context/parts/RodContext";

const HoverMenu = ({ visible, onFitView, openModal, isMaximized }) => {
  const parts = usePartsContext();
  const { Rod, Positions } = usePartsContext()
  

  // const { Rod } = usePartsContext();
  
  const {Rod_Length} = Rod.state.geometry

  const options = ["CL", "DL", "EL"];
  const [value, setValue] = useState(options[1]);

  const annotationOptions = [
    { value: "all", icon: "pi pi-eye", label: "Show All" },
    { value: "important", icon: "pi pi-exclamation-circle", label: "Important Only" },
    { value: "none", icon: "pi pi-eye-slash", label: "Hide" },
  ];
  const [annotationIndex, setAnnotationIndex] = useState(0);

  // const handleChangePosition = (position) => {
  //   parts.Rod.dispatch({
  //     type: "SET_GEOMETRY",
  //     payload: { Rod_CurrentPosition: position },
  //   });

  //   setValue(position);
  // };

  const handleChangePosition = (position) => {
    
    // console.log("PRessed position button", position)
    // If user clicks two times the same button it takes null value. 
    // To prevent function from moving rod at null (which make no sense) function ends when position is null
    if (position === null) {
      return; 
    }
    // In the other case, move rod 
    else {
      setValue(position);
      // Calculate rod position based on the selected button. 
      // Use data from Positions Provider, stored in the geometry object.
      const selectedPosition = Positions.state.geometry[position]
      
    parts.Positions.dispatch({
      type: "SET_ROD_POSITION",
      payload: { rodPosition: selectedPosition, rodLength: Rod_Length},
    });
    }
    
  };

  // Set the annotation visibility for all parts depending on the current index
  const handleToggleAnnotations = () => {
    const nextIndex = (annotationIndex + 1) % annotationOptions.length;
    setAnnotationIndex(nextIndex);
    const nextVisibility = annotationOptions[nextIndex].value;

    Object.entries(parts).forEach(([key, part]) => {
      // Omit the "Positions", because it doesn't contain any annotation to show
      if (key !== "Positions") {
        part?.dispatch({ type: "SET_ANNOTATIONS_VISIBILITY", payload: nextVisibility });
      }
    });
  };

  return (
    visible && (
      <div className="hover-menu">
        <div className="button-container">
          <SelectButton value={value} onChange={(e) => handleChangePosition(e.value)} options={options} />

          <Button label="Fit View" icon="pi pi-arrows-alt" onClick={onFitView} />

          {/* Toggle button for annotation visibility */}
          <Button
            icon={annotationOptions[annotationIndex].icon}
            aria-label={annotationOptions[annotationIndex].label}
            onClick={handleToggleAnnotations}
            className="icon-only"
          />

          {!isMaximized && <Button icon="pi pi-external-link" className="right-button icon-only" onClick={openModal} />}
        </div>
      </div>
    )
  );
};

export default HoverMenu;

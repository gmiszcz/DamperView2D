import React, { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { usePartsContext } from "../context/PartsContext";
import { Tooltip } from "primereact/tooltip";
import "./HoverMenu.css";

const HoverMenu = ({ visible, onFitView, openModal }) => {
  const parts = usePartsContext();

  const options = ["CL", "DL", "EL"];
  const [value, setValue] = useState(options[1]);

  const annotationOptions = [
    { value: "all", icon: "pi pi-eye", label: "Show All" },
    { value: "important", icon: "pi pi-exclamation-circle", label: "Important Only" },
    { value: "none", icon: "pi pi-eye-slash", label: "Hide" },
  ];
  const [annotationIndex, setAnnotationIndex] = useState(0);

  const handleChangePosition = (position) => {
    parts.Rod.dispatch({
      type: "SET_GEOMETRY",
      payload: { Rod_CurrentPosition: position },
    });

    setValue(position);
  };

  // Set the annotation visibility for all parts depending on the current index
  const handleToggleAnnotations = () => {
    const nextIndex = (annotationIndex + 1) % annotationOptions.length;
    setAnnotationIndex(nextIndex);
    const nextVisibility = annotationOptions[nextIndex].value;

    Object.values(parts).forEach((part) => part.dispatch({ type: "SET_ANNOTATIONS_VISIBILITY", payload: nextVisibility }));
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

          <Button icon="pi pi-external-link" className="right-button icon-only" onClick={openModal} />
        </div>
      </div>
    )
  );
};

export default HoverMenu;

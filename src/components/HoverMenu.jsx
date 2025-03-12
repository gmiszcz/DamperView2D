import React, { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";
import { usePartsContext } from "../context/PartsContext";
import "./HoverMenu.css";

const HoverMenu = ({ visible, onFitView, openModal }) => {
  const parts = usePartsContext();

  const options = ["CL", "DL", "EL"];
  const [value, setValue] = useState(options[1]);

  const annotationOptions = [
    { value: "all", icon: "pi pi-eye" },
    { value: "important", icon: "pi pi-exclamation-circle" },
    { value: "none", icon: "pi pi-eye-slash" }
  ];
  const [annotationVisibility, setAnnotationVisibility] = useState("all");

  const handleChangePosition = (position) => {
    parts.Rod.dispatch({
      type: "SET_GEOMETRY",
      payload: { Rod_CurrentPosition: position },
    });

    setValue(position);
  };


  const handleToggleAnnotations = (visibility) => {
    setAnnotationVisibility(visibility);

    Object.values(parts).forEach(part => part.dispatch({ type: "SET_ANNOTATIONS_VISIBILITY", payload: visibility }));
  };

  return (
    visible && (
      <div className="hover-menu">
        <div className="button-container">
          <SelectButton value={value} onChange={(e) => handleChangePosition(e.value)} options={options} />

          <Button label="Fit View" icon="pi pi-arrows-alt" onClick={onFitView} />

          {/* MultiStateCheckbox for Annotations Visibility */}
          <MultiStateCheckbox
            value={annotationVisibility}
            onChange={(e) => handleToggleAnnotations(e.value)}
            options={annotationOptions}
            optionValue="value"
            empty={false}
          />
          <span>{annotationVisibility || 'no value'}</span>

          <Button icon="pi pi-external-link" className="right-button icon-only" onClick={openModal} />
        </div>
      </div>
    )
  );
};

export default HoverMenu;

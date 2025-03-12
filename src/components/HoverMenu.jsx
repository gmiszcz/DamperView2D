import React, { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { MultiStateCheckbox } from "primereact/multistatecheckbox";
import { useGlobalContext } from "../context/GlobalContext";
import "./HoverMenu.css";

const HoverMenu = ({ visible, onFitView, openModal }) => {
  const { PT } = useGlobalContext();

  const options = ["CL", "DL", "EL"];
  const [value, setValue] = useState(options[1]);

  const annotationOptions = [
    { value: "all", icon: "pi pi-eye" },
    { value: "important", icon: "pi pi-star" },
    { value: "none", icon: "pi pi-eye-slash" }
  ];
  const [annotationVisibility, setAnnotationVisibility] = useState("all");

  const handleChangePosition = (position) => {
    PT.dispatch({
      type: "SET_GEOMETRY",
      payload: { PT_CurrentPosition: position },
    });
    setValue(position);
  };

  const handleToggleAnnotations = (visibility) => {
    setAnnotationVisibility(visibility);
    PT.dispatch({ type: "SET_ANNOTATIONS_VISIBILITY", payload: visibility });
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
          />

          <Button icon="pi pi-external-link" className="right-button icon-only" onClick={openModal} />
        </div>
      </div>
    )
  );
};

export default HoverMenu;

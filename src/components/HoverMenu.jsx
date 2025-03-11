import React, { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { useGlobalContext } from "../context/GlobalContext";
import "./HoverMenu.css";

const HoverMenu = ({ visible, onFitView, openModal, closeModal }) => {
  const { Rod } = useGlobalContext();

  const options = ['CL', 'DL', 'EL'];
  const [value, setValue] = useState(options[1]);

  const handleChangePosition = (position) => {
    Rod.dispatch({
      type: "SET_GEOMETRY",
      payload: { Rod_CurrentPosition: position },
    });

    setValue(position);
  };

  const onExpand = () => {
    openModal();
  };

  const onToggleAnnotations = () => {
    console.log("Toggle Annotations");
  };

  return (
    visible && (
      <div className="hover-menu">
        <div className="button-container">
          <SelectButton value={value} onChange={(e) => handleChangePosition(e.value)} options={options} />

          {/* Fit View */}
          <Button
            label="Fit View"
            icon="pi pi-arrows-alt"
            onClick={onFitView}
          />

          <Button
            label="Toggle Annotations"
            icon="pi pi-eye"
            onClick={onToggleAnnotations}
          />

          {/* Expand View (Only Icon, Positioned Right) */}
          <Button
            icon="pi pi-external-link"
            className="right-button icon-only"
            onClick={onExpand}
          />

        </div>
      </div>
    )
  );
};

export default HoverMenu;

import React from "react";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { useGlobalContext } from "../context/GlobalContext";

import "./HoverMenu.css";

const HoverMenu = ({ visible }) => {
  const { Rod } = useGlobalContext();
  const handleChangePosition = (position) => {
    Rod.dispatch({
      type: "SET_GEOMETRY",
      payload: { Rod_CurrentPosition: position },
    });
  };
  return (
    visible && (
      <div className="hover-menu">
        <div className="button-container">
          <ButtonGroup>
            <Button
              //   label="Compression length"
              label="CL"
              //   severity="secondary"
              outlined={Rod.state.geometry.Rod_CurrentPosition !== "CL"}
              onClick={() => handleChangePosition("CL")}
            />
            <Button
              //   label="Design length"
              label="DL"
              //   severity="secondary"
              outlined={Rod.state.geometry.Rod_CurrentPosition !== "DL"}
              onClick={() => handleChangePosition("DL")}
            />
            <Button
              //   label="Extended length"
              label="EL"
              //   severity="secondary"
              outlined={Rod.state.geometry.Rod_CurrentPosition !== "EL"}
              onClick={() => handleChangePosition("EL")}
            />
          </ButtonGroup>
          <Button label="Clear selection" icon="pi pi-eraser" severity="secondary" onClick={() => console.log("Selection cleared")} />
        </div>
      </div>
    )
  );
};

export default HoverMenu;

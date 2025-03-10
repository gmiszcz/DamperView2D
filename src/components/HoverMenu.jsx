import React from "react";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./HoverMenu.css";

const HoverMenu = ({ visible }) => {
  return (
    visible && (
      <div className="hover-menu">
        <Button
          label="Clear selection"
          icon="pi pi-eraser"
          className="cbutton p-button"
          style={{ padding: "10px 20px", display: "flex", justifyContent: "space-around", gap: "10px", alignItems: "center" }}
          onClick={() => console.log("Selection cleared")}
        />
      </div>
    )
  );
};

export default HoverMenu;

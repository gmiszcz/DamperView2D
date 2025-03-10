import React from "react";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "./HoverMenu.css";

const HoverMenu = ({ visible }) => {
  return (
    visible && (
      <div className="hover-menu-container">
        <div className="hover-menu">
          <Button label="Click Me" onClick={() => console.log("ka3ka")} />
        </div>
      </div>
    )
  );
};

export default HoverMenu;

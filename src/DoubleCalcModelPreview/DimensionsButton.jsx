import { Button } from "primereact/Button";
import React, { useEffect, useRef, useState } from "react";

export default function DimensionButton({ areDimensionLinesVisible, setAreDimensionLinesVisible }) {
  return (
    <Button
      onClick={() => setAreDimensionLinesVisible((currentState) => !currentState)}
      style={{
        backgroundColor: areDimensionLinesVisible ? "red" : "green",
      }}
    >
      {areDimensionLinesVisible ? "Turn OFF Dimensions" : "Turn ON Dimensions"}
    </Button>
  );
}

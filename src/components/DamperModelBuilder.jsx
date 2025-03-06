import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import ReserveTube from "./parts/ReserveTube";
import { useRT } from "../reducers/RT";
import Annotations from "./Annotations";
import "./DamperModelBuilder.css";

export default function DamperModelBuilder(props) {
  const segmentRef = useRef(null);
  const [size, setSize] = useState({ width: 1000, height: 350 });

  // Optional scale handling here

  return (
    <div ref={segmentRef} className="damper-2d-vis-container">
      <Stage width={size.width} height={size.height}>
        <Layer>
          <ReserveTube />
          {/* <Annotations /> */}
        </Layer>
      </Stage>
    </div>
  );
}

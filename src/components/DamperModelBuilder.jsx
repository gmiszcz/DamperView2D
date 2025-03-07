import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Circle, Group } from "react-konva";
import Annotations from "./annotations/Annotations";
import { useGlobalContext } from "../context/GlobalContext";
import { GLOBAL_OFFSET } from "../utils/constants";
// import ReserveTube from "./parts/ReserveTube";
// import PistonPost from "./parts/PistonPost";
// import BasePlate from "./parts/BasePlate";
// import PressureTube from "./parts/PressureTube";
// import FootBracket from "./parts/FootBracket";
// import ThirdTube from "./parts/ThirdTube";
// import SpringSeat from "./parts/SpringSeat";
// import RodGuide from "./parts/RodGuide";
// import Knuckle from "./parts/Knuckle";
// import Bearing from "./parts/Bearing";
// import CVSAe from "./parts/CVSAe";
// import Positions from "./parts/Positions";
import "./DamperVisualizationWindow.css";

export default function DamperModelBuilder() {
  const segmentRef = useRef(null);
  const globalContext = useGlobalContext();
  const [size, setSize] = useState({ width: GLOBAL_OFFSET.x, height: GLOBAL_OFFSET.y });
  const [groupPosition, setGroupPosition] = useState({ x: 0, y: 0 });

  // Handle dynamic resizing
  useEffect(() => {
    window.testPosition = setGroupPosition;
    const updateSize = () => {
      if (segmentRef.current) {
        setSize({
          width: segmentRef.current.offsetWidth || GLOBAL_OFFSET.x,
          height: segmentRef.current.offsetHeight || GLOBAL_OFFSET.y,
        });
      }
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div ref={segmentRef} className="damper-2d-vis-container">
      <Stage width={size.width} height={size.height}>
        <Layer>
          <Group
            draggable
            x={groupPosition.x}
            y={groupPosition.y}
            onDragMove={(e) => {
              setGroupPosition({ x: e.target.x(), y: e.target.y() });
            }}
          >
            <Circle x={size.width / 2} y={size.height / 2} radius={5} fill="blue" />
            <Circle x={GLOBAL_OFFSET.x} y={GLOBAL_OFFSET.y} radius={10} fill="red" />
            {/* <ReserveTube /> */}
            {/* <PistonPost /> */}
            {/* <BasePlate /> */}
            {/* <PressureTube /> */}
            {/* <FootBracket /> */}
            {/* <ThirdTube /> */}
            {/* <SpringSeat /> */}
            {/* <RodGuide /> */}
            {/* <Knuckle /> */}
            {/* <Bearing /> */}
            {/* <CVSAe /> */}
            {/* <Positions /> */}
            <Annotations />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

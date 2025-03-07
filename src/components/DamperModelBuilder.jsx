import React, { useState, useRef } from "react";
import { Stage, Layer, Group, Circle } from "react-konva";
import Annotations from "./annotations/Annotations";
import { useGlobalContext } from "../context/GlobalContext";
import { useSize } from "../context/SizeContext";
import ReserveTube from "./parts/ReserveTube";
import PressureTube from "./parts/PressureTube";
import Rod from "./parts/Rod";
import BasePlate from "./parts/BasePlate";
// import PistonPost from "./parts/PistonPost";
// import FootBracket from "./parts/FootBracket";
// import ThirdTube from "./parts/ThirdTube";
// import SpringSeat from "./parts/SpringSeat";
// import RodGuide from "./parts/RodGuide";
// import Knuckle from "./parts/Knuckle";
// import Bearing from "./parts/Bearing";
// import CVSAe from "./parts/CVSAe";
// import Positions from "./parts/Positions";
import { GLOBAL_OFFSET, DEFAULT_SCALE, DEFAULT_POSITION } from "../utils/constants";
import { calculateNewScale } from "../utils/helpers";
import "./DamperVisualizationWindow.css";

export default function DamperModelBuilder() {
  const { state: size, segmentRef } = useSize();
  const stageRef = useRef(null);
  const globalContext = useGlobalContext();
  const [groupPosition, setGroupPosition] = useState(DEFAULT_POSITION);
  const [scale, setScale] = useState(DEFAULT_SCALE);

  const handleWheel = (e) => {
    const stage = stageRef.current;
    const scaleBy = 1.05;
    const { scale: newScale, newPosition } = calculateNewScale(e, stage, scaleBy);

    setScale(newScale);
    stage.scale({ x: newScale, y: newScale });
    stage.position(newPosition);
  };

  const handleDoubleClick = () => {
    const stage = stageRef.current;
    setScale(DEFAULT_SCALE);
    setGroupPosition(DEFAULT_POSITION);
    stage.scale({ x: DEFAULT_SCALE, y: DEFAULT_SCALE });
    stage.position(DEFAULT_POSITION);
  };

  const handleRightClick = (e) => {
    e.evt.preventDefault(); // Prevent context menu from appearing
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    console.log("Right-clicked at: ", pointerPosition);
  };

  return (
    <Stage
      ref={stageRef}
      width={size.width}
      height={size.height}
      onWheel={handleWheel}
      onDblClick={handleDoubleClick}
      //   onContextMenu={(e) => e.evt.preventDefault()} // Disable right-click
      onContextMenu={handleRightClick}
    >
      <Layer>
        <Group
          draggable
          x={groupPosition.x}
          y={groupPosition.y}
          onDragMove={(e) => {
            setGroupPosition({ x: e.target.x(), y: e.target.y() });
          }}
        >
          {/* <Circle x={size.width / 2} y={size.height / 2} radius={5} fill="blue" /> */}
          {/* <Circle x={size.width - GLOBAL_OFFSET.x} y={size.height - GLOBAL_OFFSET.y} radius={10} fill="red" /> */}
          <ReserveTube />
          <PressureTube />
          <Rod />
          <BasePlate />
          {/* <PistonPost /> */}
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
  );
}

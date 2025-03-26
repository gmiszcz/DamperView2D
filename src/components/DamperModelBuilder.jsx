import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import { Stage, Layer, Group } from "react-konva";
import Annotations from "./annotations/Annotations";
import { usePartsContext } from "../context/PartsContext";
import { useSize } from "../context/SizeContext";
import ReserveTube from "./parts/ReserveTube";
import PressureTube from "./parts/PressureTube";
import Rod from "./parts/Rod";
import BasePlate from "./parts/BasePlate";
import Bearing from "./parts/Bearing";
import RodGuide from "./parts/RodGuide";
// import PistonPost from "./parts/PistonPost";
// import FootBracket from "./parts/FootBracket";
// import ThirdTube from "./parts/ThirdTube";
// import SpringSeat from "./parts/SpringSeat";
// import Knuckle from "./parts/Knuckle";
// import CVSAe from "./parts/CVSAe";
// import Positions from "./parts/Positions";
import Piston from "./parts/Piston";
import { GLOBAL_OFFSET, DEFAULT_SCALE, DEFAULT_POSITION } from "../utils/constants";
import { calculateNewScale } from "../utils/helpers";
import { fitViewToCenter } from "../utils/helpers";
import "./DamperVisualizationWindow.css";
import CylinderEnd from "./parts/CylinderEnd";
import FootBracket from "./parts/FootBracket";
import Knuckle from "./parts/Knuckle";
import CES from "./parts/CES";
import ThirdTube from "./parts/ThirdTube";
import PistonPost from "./parts/PistonPost";

const DamperModelBuilder = forwardRef((props, ref) => {

  const parts = usePartsContext();

  const { state: size } = useSize();
  const stageRef = useRef({});
  const groupRef = useRef({}); // Reference to the MASTER GROUP for setting positions
  const [groupPosition, setGroupPosition] = useState(DEFAULT_POSITION);
  const [scale, setScale] = useState(DEFAULT_SCALE);

  useEffect(() => {
    resetView();
  }, [size]);


  const handleWheel = (e) => {
    const stage = stageRef.current;
    const scaleBy = 1.05;
    const { scale: newScale, newPosition } = calculateNewScale(e, stage, scaleBy);

    setScale(newScale);
    stage.scale({ x: newScale, y: newScale });
    stage.position(newPosition);
  };

  const resetView = () => {
    if (!stageRef.current) return;
    if (!groupRef.current) return;

    const stage = stageRef.current;
    const group = groupRef.current;

    fitViewToCenter(stage, group);
  };

  const handleRightClick = (e) => {
    e.evt.preventDefault(); // Prevent context menu from appearing
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    console.log("Right-clicked at: ", pointerPosition);
  };

  useImperativeHandle(ref, () => ({ resetView }));

    // Set rod to default position "DL"
    useEffect(function () {
      parts.Positions.dispatch({
        type: "SET_ROD_POSITION_BY_BUTTON",
        payload: { pressedButtonName: "DL", rodLength: parts.Rod.state.geometry.Rod_Length},
      });
    },[])

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth ? window.innerWidth : size.width}
      height={window.innerHeight ? window.innerHeight : size.height}
      onWheel={handleWheel}
      onDblClick={resetView}
      //   onContextMenu={(e) => e.evt.preventDefault()} // Disable right-click
      onContextMenu={handleRightClick}
    >
      <Layer>
        <Group
          draggable
          // x={groupPosition.x}
          // y={groupPosition.y}
          // scale={{ x: 1.0, y: 1.0 }}
          onDragMove={(e) => {
            setGroupPosition({ x: e.target.x(), y: e.target.y() });
          }}
          ref={groupRef}
        >
          <Knuckle />
          {/* <FootBracket /> */}
          <CES/>
          <ReserveTube />
          <ThirdTube /> 
          <PressureTube />
          <BasePlate />
          <Bearing />
          <RodGuide />
          <CylinderEnd />
          <BasePlate outerOrInnerShape={"outer"}/>
          <Rod />
          <Piston/>
          <PistonPost />
          {/* <SpringSeat /> */}
          {/* <Positions /> */}
          <Annotations />
        </Group>
      </Layer>
    </Stage>
  );
});

export default DamperModelBuilder;

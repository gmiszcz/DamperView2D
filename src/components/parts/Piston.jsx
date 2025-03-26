import React, { useEffect, useState } from "react";
import { Line, Group, Rect } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Piston = () => {
  const { PP, Rod, PT, Positions } = usePartsContext();
  const { state: size } = useSize();

  // Piston Length
  const { P_Length, } = PP.state.geometry;
  // Pressure Tube Inner Diameter
  const { PT_ID } = PT.state.geometry;
  // Rod Length and Current Position
  const { Rod_Length } = Rod.state.geometry
  // Positions
  const { Rod_CurrentPosition, P_Position } = Positions.state.geometry;
  const { color, opacity, display } = PP.state.properties;

  // const [pistonPosition, setPistonPosition] = useState((DL -Rod_Length))

  const outerRadius = PT_ID / 2;
  // const innerRadius = Piston_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  //   useEffect(() => {
  //     const position = Rod.state.geometry.Rod_CurrentPosition;
  //     if (position === "DL") {
  //       setPistonPosition(DL - Rod_Length - P_Position);
  //     } else if (position === "CL") {
  //       setPistonPosition(CL - Rod_Length - P_Position);
  //     } else if (position === "EL") {
  //       setPistonPosition(EL - Rod_Length - P_Position);
  //     }
  // }, [Rod.state.geometry.Rod_CurrentPosition, DL, CL, EL, Rod_Length]);
  
  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Rect x={-Rod_CurrentPosition + P_Position} y = {-outerRadius} width={P_Length} height={PT_ID} fill={"#808080"} />
    </Group>
  );
};

export default Piston;

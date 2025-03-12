import React from "react";
import { Line, Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Piston = () => {
  const { Piston, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { Piston_OD, Piston_ID, Piston_Height } = Piston.state.geometry;
  const { Piston_Position } = Positions.state.geometry;
  const { color, opacity, display } = Piston.state.properties;

  const outerRadius = Piston_OD / 2;
  const innerRadius = Piston_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generatePistonShapePoints = () => {
    return [
      [-Piston_Position, outerRadius],
      [-Piston_Position - Piston_Height, outerRadius],
      [-Piston_Position - Piston_Height, -outerRadius],
      [-Piston_Position, -outerRadius],
    ].flat();
  };

  const generatePistonInnerShapePoints = () => {
    return [
      [-Piston_Position, innerRadius],
      [-Piston_Position - Piston_Height, innerRadius],
      [-Piston_Position - Piston_Height, -innerRadius],
      [-Piston_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generatePistonShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generatePistonInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default Piston;

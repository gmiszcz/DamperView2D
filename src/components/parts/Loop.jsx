import React from "react";
import { Line, Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Loop = ({ positionOffset, scaleFactor }) => {
  const { Loop, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { Loop_OD, Loop_ID, Loop_Height } = Loop.state.geometry;
  const { Loop_Position } = Positions.state.geometry;
  const { color, opacity, display } = Loop.state.properties;

  const outerRadius = Loop_OD / 2;
  const innerRadius = Loop_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateLoopShapePoints = () => {
    return [
      [-Loop_Position, outerRadius],
      [-Loop_Position - Loop_Height, outerRadius],
      [-Loop_Position - Loop_Height, -outerRadius],
      [-Loop_Position, -outerRadius],
    ].flat();
  };

  const generateLoopInnerShapePoints = () => {
    return [
      [-Loop_Position, innerRadius],
      [-Loop_Position - Loop_Height, innerRadius],
      [-Loop_Position - Loop_Height, -innerRadius],
      [-Loop_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateLoopShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateLoopInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default Loop;

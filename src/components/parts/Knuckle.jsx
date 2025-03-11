import React from "react";
import { Line, Group } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Knuckle = ({ positionOffset, scaleFactor }) => {
  const { Knuckle, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { Knuckle_OD, Knuckle_ID, Knuckle_Height } = Knuckle.state.geometry;
  const { Knuckle_Position } = Positions.state.geometry;
  const { color, opacity, display } = Knuckle.state.properties;

  const outerRadius = Knuckle_OD / 2;
  const innerRadius = Knuckle_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateKnuckleShapePoints = () => {
    return [
      [-Knuckle_Position, outerRadius],
      [-Knuckle_Position - Knuckle_Height, outerRadius],
      [-Knuckle_Position - Knuckle_Height, -outerRadius],
      [-Knuckle_Position, -outerRadius],
    ].flat();
  };

  const generateKnuckleInnerShapePoints = () => {
    return [
      [-Knuckle_Position, innerRadius],
      [-Knuckle_Position - Knuckle_Height, innerRadius],
      [-Knuckle_Position - Knuckle_Height, -innerRadius],
      [-Knuckle_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateKnuckleShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateKnuckleInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default Knuckle;

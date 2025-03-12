import React from "react";
import { Line, Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Seal = () => {
  const { Seal, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { Seal_OD, Seal_ID, Seal_Height } = Seal.state.geometry;
  const { Seal_Position } = Positions.state.geometry;
  const { color, opacity, display } = Seal.state.properties;

  const outerRadius = Seal_OD / 2;
  const innerRadius = Seal_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateSealShapePoints = () => {
    return [
      [-Seal_Position, outerRadius],
      [-Seal_Position - Seal_Height, outerRadius],
      [-Seal_Position - Seal_Height, -outerRadius],
      [-Seal_Position, -outerRadius],
    ].flat();
  };

  const generateSealInnerShapePoints = () => {
    return [
      [-Seal_Position, innerRadius],
      [-Seal_Position - Seal_Height, innerRadius],
      [-Seal_Position - Seal_Height, -innerRadius],
      [-Seal_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateSealShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateSealInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default Seal;

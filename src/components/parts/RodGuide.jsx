import React from "react";
import { Line, Group } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const RodGuide = () => {
  const { RodGuide, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { RG_OD, RG_ID, RG_Height } = RodGuide.state.geometry;
  const { RG_Position } = Positions.state.geometry;
  const { color, opacity, display } = RodGuide.state.properties;

  const outerRadius = RG_OD / 2;
  const innerRadius = RG_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateRodGuideShapePoints = () => {
    return [
      [-RG_Position, outerRadius],
      [-RG_Position - RG_Height, outerRadius],
      [-RG_Position - RG_Height, -outerRadius],
      [-RG_Position, -outerRadius],
    ].flat();
  };

  const generateRodGuideInnerShapePoints = () => {
    return [
      [-RG_Position, innerRadius],
      [-RG_Position - RG_Height, innerRadius],
      [-RG_Position - RG_Height, -innerRadius],
      [-RG_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateRodGuideShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateRodGuideInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default RodGuide;

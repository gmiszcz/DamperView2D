import React from "react";
import { Line, Group } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const CylinderEnd = () => {
  const { CylinderEnd, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { BE_OD, BE_ID, BE_Height } = CylinderEnd.state.geometry;
  const { BE_Position } = Positions.state.geometry;
  const { color, opacity, display } = CylinderEnd.state.properties;

  const outerRadius = BE_OD / 2;
  const innerRadius = BE_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateCylinderEndShapePoints = () => {
    return [
      [-BE_Position, outerRadius],
      [-BE_Position - BE_Height, outerRadius],
      [-BE_Position - BE_Height, -outerRadius],
      [-BE_Position, -outerRadius],
    ].flat();
  };

  const generateCylinderEndInnerShapePoints = () => {
    return [
      [-BE_Position, innerRadius],
      [-BE_Position - BE_Height, innerRadius],
      [-BE_Position - BE_Height, -innerRadius],
      [-BE_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateCylinderEndShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateCylinderEndInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default CylinderEnd;

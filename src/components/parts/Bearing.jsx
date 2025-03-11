import React from "react";
import { Line, Group } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Bearing = () => {
  const { Bearing, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { Bearing_OD, Bearing_ID, Bearing_Height } = Bearing.state.geometry;
  const { Bearing_Position } = Positions.state.geometry;
  const { color, opacity, display } = Bearing.state.properties;

  const outerRadius = Bearing_OD / 2;
  const innerRadius = Bearing_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateBearingShapePoints = () => {
    return [
      [-Bearing_Position, outerRadius],
      [-Bearing_Position - Bearing_Height, outerRadius],
      [-Bearing_Position - Bearing_Height, -outerRadius],
      [-Bearing_Position, -outerRadius],
    ].flat();
  };

  const generateBearingInnerShapePoints = () => {
    return [
      [-Bearing_Position, innerRadius],
      [-Bearing_Position - Bearing_Height, innerRadius],
      [-Bearing_Position - Bearing_Height, -innerRadius],
      [-Bearing_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateBearingShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateBearingInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default Bearing;

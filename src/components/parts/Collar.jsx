import React from "react";
import { Line, Group } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Collar = () => {
  const { Collar, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { Collar_OD, Collar_ID, Collar_Height } = Collar.state.geometry;
  const { Collar_Position } = Positions.state.geometry;
  const { color, opacity, display } = Collar.state.properties;

  const outerRadius = Collar_OD / 2;
  const innerRadius = Collar_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateCollarShapePoints = () => {
    return [
      [-Collar_Position, outerRadius],
      [-Collar_Position - Collar_Height, outerRadius],
      [-Collar_Position - Collar_Height, -outerRadius],
      [-Collar_Position, -outerRadius],
    ].flat();
  };

  const generateCollarInnerShapePoints = () => {
    return [
      [-Collar_Position, innerRadius],
      [-Collar_Position - Collar_Height, innerRadius],
      [-Collar_Position - Collar_Height, -innerRadius],
      [-Collar_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateCollarShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateCollarInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default Collar;

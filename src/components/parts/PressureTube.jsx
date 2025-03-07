import React from "react";
import { Line, Rect, Group, Circle } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const PressureTube = ({ positionOffset, scaleFactor }) => {
  const { PT, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { PT_Length, PT_ID, PT_TH } = PT.state.geometry;
  const { PT_Position } = Positions.state.geometry;
  const { color, opacity, display } = PT.state.properties;

  const outerRadius = PT_ID / 2 + PT_TH;
  const innerRadius = PT_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateOuterShapePoints = () => {
    return [
      [-PT_Position, outerRadius],
      [-PT_Length, outerRadius],
      [-PT_Length, -outerRadius],
      [-PT_Position, -outerRadius],
    ].flat();
  };

  const generateInnerShapePoints = () => {
    return [
      [-PT_Position, innerRadius],
      [-PT_Length, innerRadius],
      [-PT_Length, -innerRadius],
      [-PT_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateOuterShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default PressureTube;

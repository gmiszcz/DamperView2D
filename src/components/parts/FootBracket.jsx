import React from "react";
import { Line, Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const FootBracket = () => {
  const { FootBracket, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { FB_OD, FB_ID, FB_Height } = FootBracket.state.geometry;
  const { FB_Position } = Positions.state.geometry;
  const { color, opacity, display } = FootBracket.state.properties;

  const outerRadius = FB_OD / 2;
  const innerRadius = FB_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateFootBracketShapePoints = () => {
    return [
      [-FB_Position, outerRadius],
      [-FB_Position - FB_Height, outerRadius],
      [-FB_Position - FB_Height, -outerRadius],
      [-FB_Position, -outerRadius],
    ].flat();
  };

  const generateFootBracketInnerShapePoints = () => {
    return [
      [-FB_Position, innerRadius],
      [-FB_Position - FB_Height, innerRadius],
      [-FB_Position - FB_Height, -innerRadius],
      [-FB_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateFootBracketShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateFootBracketInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default FootBracket;

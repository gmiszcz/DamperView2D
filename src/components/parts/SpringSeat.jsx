import React from "react";
import { Line, Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const SpringSeat = ({ positionOffset, scaleFactor }) => {
  const { SpringSeat, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { SS_OD, SS_ID, SS_Height } = SpringSeat.state.geometry;
  const { SS_Position } = Positions.state.geometry;
  const { color, opacity, display } = SpringSeat.state.properties;

  const outerRadius = SS_OD / 2;
  const innerRadius = SS_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateSpringSeatShapePoints = () => {
    return [
      [-SS_Position, outerRadius],
      [-SS_Position - SS_Height, outerRadius],
      [-SS_Position - SS_Height, -outerRadius],
      [-SS_Position, -outerRadius],
    ].flat();
  };

  const generateSpringSeatInnerShapePoints = () => {
    return [
      [-SS_Position, innerRadius],
      [-SS_Position - SS_Height, innerRadius],
      [-SS_Position - SS_Height, -innerRadius],
      [-SS_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateSpringSeatShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateSpringSeatInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default SpringSeat;

import React from "react";
import { Line, Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const PistonPost = () => {
  const { PistonPost, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { PistonPost_OD, PistonPost_ID, PistonPost_Height } = PistonPost.state.geometry;
  const { PistonPost_Position } = Positions.state.geometry;
  const { color, opacity, display } = PistonPost.state.properties;

  const outerRadius = PistonPost_OD / 2;
  const innerRadius = PistonPost_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generatePistonPostShapePoints = () => {
    return [
      [-PistonPost_Position, outerRadius],
      [-PistonPost_Position - PistonPost_Height, outerRadius],
      [-PistonPost_Position - PistonPost_Height, -outerRadius],
      [-PistonPost_Position, -outerRadius],
    ].flat();
  };

  const generatePistonPostInnerShapePoints = () => {
    return [
      [-PistonPost_Position, innerRadius],
      [-PistonPost_Position - PistonPost_Height, innerRadius],
      [-PistonPost_Position - PistonPost_Height, -innerRadius],
      [-PistonPost_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generatePistonPostShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generatePistonPostInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default PistonPost;

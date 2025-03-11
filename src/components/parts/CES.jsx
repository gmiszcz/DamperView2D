import React from "react";
import { Line, Group } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const CES = ({ positionOffset, scaleFactor }) => {
  const { CES, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { CES_OD, CES_ID, CES_Height } = CES.state.geometry;
  const { CES_Position } = Positions.state.geometry;
  const { color, opacity, display } = CES.state.properties;

  const outerRadius = CES_OD / 2;
  const innerRadius = CES_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateCESShapePoints = () => {
    return [
      [-CES_Position, outerRadius],
      [-CES_Position - CES_Height, outerRadius],
      [-CES_Position - CES_Height, -outerRadius],
      [-CES_Position, -outerRadius],
    ].flat();
  };

  const generateCESInnerShapePoints = () => {
    return [
      [-CES_Position, innerRadius],
      [-CES_Position - CES_Height, innerRadius],
      [-CES_Position - CES_Height, -innerRadius],
      [-CES_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateCESShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateCESInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default CES;

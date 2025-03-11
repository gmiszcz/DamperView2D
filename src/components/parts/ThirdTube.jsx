import React from "react";
import { Line, Group } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const ThirdTube = ({ positionOffset, scaleFactor }) => {
  const { ThirdTube, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { TT_OD, TT_ID, TT_Height } = ThirdTube.state.geometry;
  const { TT_Position } = Positions.state.geometry;
  const { color, opacity, display } = ThirdTube.state.properties;

  const outerRadius = TT_OD / 2;
  const innerRadius = TT_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateThirdTubeShapePoints = () => {
    return [
      [-TT_Position, outerRadius],
      [-TT_Position - TT_Height, outerRadius],
      [-TT_Position - TT_Height, -outerRadius],
      [-TT_Position, -outerRadius],
    ].flat();
  };

  const generateThirdTubeInnerShapePoints = () => {
    return [
      [-TT_Position, innerRadius],
      [-TT_Position - TT_Height, innerRadius],
      [-TT_Position - TT_Height, -innerRadius],
      [-TT_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateThirdTubeShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateThirdTubeInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default ThirdTube;

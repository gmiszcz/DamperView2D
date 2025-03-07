import React from "react";
import { Line, Rect, Group, Circle } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Rod = ({ positionOffset, scaleFactor }) => {
  const { Rod, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { Rod_Length, Rod_OD, Rod_HD } = Rod.state.geometry;
  const { DL } = Positions.state.geometry;
  const { color, opacity, display } = Rod.state.properties;

  const outerRadius = Rod_OD / 2;
  const innerRadius = outerRadius - Rod_HD;
  const leftOffset = DL - Rod_Length;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateRodShapePoints = () => {
    return [
      [-leftOffset, outerRadius],
      [-leftOffset - Rod_Length, outerRadius],
      [-leftOffset - Rod_Length, -outerRadius],
      [-leftOffset, -outerRadius],
    ].flat();
  };

  const generateRodHardenedShapePoints = () => {
    return [
      [-leftOffset, innerRadius],
      [-leftOffset - Rod_Length, innerRadius],
      [-leftOffset - Rod_Length, -innerRadius],
      [-leftOffset, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      <Circle x={0} y={0} radius={5} fill="blue" />
      {/* Rod shape */}
      <Line points={generateRodShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Hardened layer */}
      <Line points={generateRodHardenedShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default Rod;

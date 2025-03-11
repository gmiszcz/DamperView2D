import React, { useEffect, useState } from "react";
import { Line, Rect, Group, Circle } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Rod = () => {
  const { Rod, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { Rod_Length, Rod_OD, Rod_HD } = Rod.state.geometry;
  const { DL, CL, EL } = Positions.state.geometry;
  const [rodPosition, setRodPosition] = useState(DL - Rod_Length);
  const { color, opacity, display } = Rod.state.properties;

  const outerRadius = Rod_OD / 2;
  const innerRadius = outerRadius - Rod_HD;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  useEffect(() => {
    const position = Rod.state.geometry.Rod_CurrentPosition;
    if (position === "DL") {
      setRodPosition(DL - Rod_Length);
    } else if (position === "CL") {
      setRodPosition(CL - Rod_Length);
    } else if (position === "EL") {
      setRodPosition(EL - Rod_Length);
    }
  }, [Rod.state.geometry.Rod_CurrentPosition]);

  const generateRodShapePoints = () => {
    return [
      [-rodPosition, outerRadius],
      [-rodPosition - Rod_Length, outerRadius],
      [-rodPosition - Rod_Length, -outerRadius],
      [-rodPosition, -outerRadius],
    ].flat();
  };

  const generateRodHardenedShapePoints = () => {
    return [
      [-rodPosition, innerRadius],
      [-rodPosition - Rod_Length, innerRadius],
      [-rodPosition - Rod_Length, -innerRadius],
      [-rodPosition, -innerRadius],
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

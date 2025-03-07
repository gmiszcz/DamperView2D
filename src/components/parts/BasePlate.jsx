import React from "react";
import { Line, Group } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const BasePlate = ({ positionOffset, scaleFactor }) => {
  const { BP, RT, Positions } = useGlobalContext();
  const { state: size } = useSize();

  const { BP_TH, BP_H, BP_PD } = BP.state.geometry;
  const { BP_Position } = Positions.state.geometry;
  const { color, opacity, display } = BP.state.properties;

  const { RT_OD1, RT_TH } = RT.state.geometry;

  const outerRadius = RT_OD1 / 2 - RT_TH; // BP takes the inner diameter of RT
  const innerRadius = outerRadius - BP_TH;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateBasePlateOuterPoints = () => {
    return [
      [-BP_Position, outerRadius],
      [-BP_Position - BP_H, outerRadius - BP_H],
      [-BP_Position - BP_H, -(outerRadius - BP_H)],
      [-BP_Position, -outerRadius],
    ].flat();
  };

  const generateBasePlateInnerPoints = () => {
    return [
      [-BP_Position, innerRadius],
      [-BP_Position - BP_H, innerRadius - BP_H],
      [-BP_Position - BP_H, -(innerRadius - BP_H)],
      [-BP_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Base Plate Outer Shape */}
      <Line points={generateBasePlateOuterPoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Base Plate Inner Shape (Concave effect) */}
      <Line points={generateBasePlateInnerPoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default BasePlate;

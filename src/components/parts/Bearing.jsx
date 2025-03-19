import React from "react";
import { Line, Group, Rect } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Bearing = () => {
  const { BRG, Positions, Rod, RT, RG } = usePartsContext();
  const { state: size } = useSize();

  const { Bearing_TH, Bearing_H } = BRG.state.geometry;
  const { Rod_OD } = Rod.state.geometry;
  const { RT_TH, RT_Length } = RT.state.geometry;
  const { RG_Height } = RG.state.geometry;
  const { Bearing_Position } = Positions.state.geometry;
  const { color, opacity, display } = BRG.state.properties;

  const outerRadius = Rod_OD / 2  + Bearing_TH;
  // const innerRadius = Bearing_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Rect x ={-RT_Length + RT_TH + RG_Height-Bearing_H - Bearing_Position } y = {-outerRadius} width={Bearing_H} height = {Rod_OD + 2.0 * Bearing_TH}  fill={color} opacity = {display ? opacity : 0.1} shadowBlur = {1}/>
      {/* <Line points={generateBearingShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} /> */}
    </Group>
  );
};

export default Bearing;

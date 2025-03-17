import React from "react";
import { Line, Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const RodGuide = () => {
  const { RG, RT, Rod, PT, Positions } = usePartsContext();
  const { state: size } = useSize();

  // Reserve tube dimensions
  const { RT_OD1, RT_NumberOfSwages, RT_Swage_List, RT_TH } = RT.state.geometry;

  // Rod dimensions
  const { Rod_OD } = Rod.state.geometry;

  // Pressure tube dimensions
  const { PT_Length } = PT.state.geometry;

  // Rod guide dimensions
  const { RG_Height, RG_RT_VDist, RG_RT_HDist, RG_bH } = RG.state.geometry;
  const { color, opacity, display } = RG.state.properties;

  // Position data
  const { PT_Position } = Positions.state.geometry;

  // Calculations
  const RG_Position = PT_Position + PT_Length - RG_bH;

  let outerRadius = RT_OD1 / 2;

  // If there is at least one swage, override outerRadius using the second to last value
  if (RT_NumberOfSwages > 0) {
    const swageRow = RT_Swage_List[RT_NumberOfSwages];
    const secondToLastValue = swageRow[swageRow.length - 2];
    outerRadius = secondToLastValue / 2;
  }

  // Adjust outer radius by the thickness of the reserve tube
  outerRadius -= RT_TH;

  const innerRadius = Rod_OD / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  const generateRodGuideShapePoints = () => {
    return [
      [-RG_Position, outerRadius],
      [-RG_Position - RG_Height, outerRadius],
      [-RG_Position - RG_Height, -outerRadius],
      [-RG_Position, -outerRadius],
    ].flat();
  };

  const generateRodGuideInnerShapePoints = () => {
    return [
      [-RG_Position, innerRadius],
      [-RG_Position - RG_Height, innerRadius],
      [-RG_Position - RG_Height, -innerRadius],
      [-RG_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generateRodGuideShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateRodGuideInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default RodGuide;

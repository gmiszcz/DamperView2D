import React from "react";
import { Line, Group, Rect } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const RodGuide = () => {
  const { RG, RT, Rod, PT, BRG, Positions } = usePartsContext();
  const { state: size } = useSize();

  // Reserve tube dimensions
  const { RT_OD1, RT_NumberOfSwages, RT_Swage_List, RT_TH, RT_Length } = RT.state.geometry;

  // Rod dimensions
  const { Rod_OD } = Rod.state.geometry;

  // Pressure tube dimensions
  const { PT_Length, PT_ID, PT_TH } = PT.state.geometry;

  // Rod guide dimensions
  const { RG_Height, RG_RT_VDist, RG_RT_HDist, RG_bH } = RG.state.geometry;

  // Rod Guide Top Shelf dimensions
  const {RG_topShelf, RG_topShelfClearance, RG_topShelfPosition,  RG_topShelfLength} = RG.state.geometry;

  // Bearing dimensions
  const { Bearing_TH } = BRG.state.geometry;

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


  function generate_rodGuide_points(outerRadius) {
    //  ROD GUIDE PARAMETERS
    const rodGuideBottomStepSize =
      (outerRadius + RT_TH - Rod_OD / 2.0 + Bearing_TH) / 5;

    // calculate rod guide OUTER RADIUS and check if swages are included
    const calculatedRodGuideOR = outerRadius;

    const rodGuidePTConnectionLength = 5.0;

    const rodGuideStackHeight = RG_Height - rodGuidePTConnectionLength;

    const rodGuidePoints = [
      //  ROD GUIDE - PRESSURE TUBE CONTACT AREA
      [0.0, Rod_OD / 2.0 + Bearing_TH], // 0
      [0.0, PT_ID / 2.0], // 1
      [-rodGuidePTConnectionLength, PT_ID / 2.0], // 2
      [
        -rodGuidePTConnectionLength,
        PT_ID / 2.0 + PT_TH,
      ], // 3
      [
        -(RG_Height - rodGuideStackHeight),
        PT_ID / 2.0 + PT_TH,
      ], // 4
      [
        -(
          RG_Height -
          rodGuideStackHeight +
          rodGuideStackHeight / 2.0
        ),
        calculatedRodGuideOR,
      ], // 5
      [-RG_Height, calculatedRodGuideOR], // 6
      [-RG_Height, calculatedRodGuideOR - rodGuideBottomStepSize], // 7
      [
        -(RG_Height - rodGuideBottomStepSize / 2.0),
        calculatedRodGuideOR - rodGuideBottomStepSize,
      ], // 8
      [
        -(RG_Height - rodGuideBottomStepSize / 2.0),
        calculatedRodGuideOR - 2.0 * rodGuideBottomStepSize,
      ], // 9
      [
        -(RG_Height - (2.0 * rodGuideBottomStepSize) / 2.0),
        calculatedRodGuideOR - 2.0 * rodGuideBottomStepSize,
      ], // 10
      [
        -(RG_Height - (2.0 * rodGuideBottomStepSize) / 2.0),
        calculatedRodGuideOR - 3.0 * rodGuideBottomStepSize,
      ], // 11
      [
        -(RG_Height - (3.0 * rodGuideBottomStepSize) / 2.0),
        calculatedRodGuideOR - 3.0 * rodGuideBottomStepSize,
      ], // 12
      [
        -(RG_Height - (3.0 * rodGuideBottomStepSize) / 2.0),
        Rod_OD / 2.0 + Bearing_TH,
      ], // 13
    ];

    return rodGuidePoints.flat();
  }

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      {/* Draw Top part of the Rod Guide */}
      <Line
        x={-RT_Length + RG_Height+RT_TH}
            points={generate_rodGuide_points(outerRadius).map((point, index) => {
              if (index % 2 === 0) {
                return point;
              }
              return -point;
            })}
            closed
            fill={color} opacity={display ? opacity : 0.1} shadowBlur={1}
      />
      {/* Draw Bottom part of the Rod Guide */}
       <Line
        x={-RT_Length + RG_Height+RT_TH}
            points={generate_rodGuide_points(outerRadius).map((point, index) => {
              if (index % 2 === 0) {
                return point;
              }
              return point;
            })}
            closed
        fill={color} opacity={display ? opacity : 0.1} shadowBlur={1}
      />
      {/* Draw Top Rod Guide Bottom Shelf */}
      {
        RG_topShelf ? (
        <>
        {/* Draw Bottom Rod Guide Top Shelf */}
        <Rect x={-RT_Length + RG_Height + RT_TH - RG_topShelfPosition - RG_topShelfLength} y={-Rod_OD / 2.0 - RG_topShelfClearance} width={RG_topShelfLength} height={-Bearing_TH + RG_topShelfClearance} fill={color} opacity={display ? opacity : 0.1} shadowBlur={0} />
        {/* Draw Top Rod Guide Bottom Shelf */}
        <Rect x={-RT_Length + RG_Height + RT_TH - RG_topShelfPosition - RG_topShelfLength} y={Rod_OD / 2.0 + Bearing_TH} width={RG_topShelfLength} height={-Bearing_TH + RG_topShelfClearance} fill={color} opacity={display ? opacity : 0.1} shadowBlur={0} />
        </>
    ) :""
  }
  
    </Group>
  );
};

export default RodGuide;

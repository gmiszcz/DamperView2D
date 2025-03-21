import React from "react";
import { Line, Group, Rect } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const CylinderEnd = () => {
  const { CEND, BP, PT, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { CylinderEnd_clampThickness, CylinderEnd_PTContactArea } = CEND.state.geometry;
  const { BP_TH } = BP.state.geometry;
  const { BP_Position, PT_Position } = Positions.state.geometry;
  const {PT_ID, PT_TH}= PT.state.geometry;

  const { color, opacity, display } = CEND.state.properties;

  // const outerRadius = BE_OD / 2;
  // const innerRadius = BE_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  // Calculate Cylinder End outer diameter, which is pressure tube inner diameter depend parameter

  const cylinderEndOuterDiameter = PT_ID + 2 * PT_TH;

  // And Cylinder End Height, which is also depends on the another parameter - Pressure Tube Position
  const cylinderEndHeight = PT_Position;

  function generate_cylinderEnd_main_shape_points() {
    const cylinderEndPoints = [
      [-BP_Position, 0.0], // 0
      [BP_TH - BP_Position, CylinderEnd_clampThickness / 2], // 1
      [BP_TH - BP_Position, CylinderEnd_clampThickness], //2
      [
        -(cylinderEndHeight - CylinderEnd_clampThickness),
        CylinderEnd_clampThickness,
      ], //3
      [
        -(cylinderEndHeight - CylinderEnd_clampThickness),
        cylinderEndOuterDiameter - CylinderEnd_clampThickness,
      ], //3
      [
        BP_TH - BP_Position,
        cylinderEndOuterDiameter - CylinderEnd_clampThickness,
      ], //4
      [
        BP_TH - BP_Position,
        cylinderEndOuterDiameter - CylinderEnd_clampThickness / 2.0,
      ], //5
      [-BP_Position, cylinderEndOuterDiameter], //6
      [
        -(cylinderEndHeight - CylinderEnd_PTContactArea),
        cylinderEndOuterDiameter,
      ], //7
      [
        -(cylinderEndHeight - CylinderEnd_PTContactArea),
        cylinderEndOuterDiameter - PT_TH,
      ], //7
      [-cylinderEndHeight, cylinderEndOuterDiameter - PT_TH], //9
      [-cylinderEndHeight, PT_TH], //10
      [-(cylinderEndHeight - CylinderEnd_PTContactArea), PT_TH], //11
      [-(cylinderEndHeight - CylinderEnd_PTContactArea), 0.0], //12
    ];
    return cylinderEndPoints.flat();
  }

  //************* CYLINDER END MIDDLE LEG PARAMETERS ********** */
  // The width of the Cylinder End's middle leg is calculated by following formula (1.0 at the end is added due to the estetique reasons)
  const cylinderEnd_middleLeg_width = cylinderEndHeight - CylinderEnd_clampThickness - BP_Position + 1.0; 
  const cylinderEnd_middleLeg_height = CylinderEnd_clampThickness;

  //************* CYLINDER END MIDDLE HOLE PARAMETERS ********** */
  const cylinderEnd_middleHole_width = CylinderEnd_clampThickness
  // Two mm at the end is added due to the estetique reasons
  const cylinderEnd_middleHole_height = CylinderEnd_clampThickness + 2.0

  return (
    <Group x={positionXOffset} y={positionYOffset}>
       {/* Draw Cylinder End Middle Leg*/}
       <Rect x={-(cylinderEndHeight + CylinderEnd_clampThickness - cylinderEnd_middleLeg_width)} y = {-cylinderEnd_middleLeg_height/2.0} width={cylinderEnd_middleLeg_width} height={cylinderEnd_middleLeg_height} fill={color} opacity={display ? opacity : 0.1} shadowBlur={1}/>
      {/* Draw Cylinder End Main Shape (without Cylinder End middle leg) */}
      <Line y={-PT_ID / 2.0 - PT_TH} x={-CylinderEnd_PTContactArea} points={generate_cylinderEnd_main_shape_points()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Draw Cylinder End Middle Hole*/}
      <Rect x= {-cylinderEndHeight - CylinderEnd_PTContactArea} y ={-cylinderEnd_middleHole_height/2.0} width={cylinderEnd_middleHole_width} height={cylinderEnd_middleHole_height} fill="#ffffffa7" shadowBlur={1}/>
      {/* <Line points={generateCylinderEndInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} /> */}
    </Group>
  );
};

export default CylinderEnd;

import React from "react";
import { Line, Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const PistonPost = () => {
  const { PP, Rod, Positions } = usePartsContext();
  const { state: size } = useSize();
  // Piston Post geometry parameters
  const { PP_Customized, PP_Diameter, PP_Radius, PP_ChamferDiameter, PP_ChamferAngle, PP_ThreadDiam, PP_ThreadPitch, PP_InnerDiameter } = PP.state.geometry;
  // Piston geometry parameters
  const {P_Length} = PP.state.geometry;
  // Rod geometry parameters
  const {Rod_OD} = Rod.state.geometry;
  const { P_Position } = Positions.state.geometry;
  const { color, opacity, display } = PP.state.properties;

  // const outerRadius = Rod_OD / 2;
  // const innerRadius = PistonPost_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  //********* ADDITIONAL PISTON POST GEOMETRY PARAMETERS ******* */
  // Piston Post shaft length (also called as Piston Post Stick) is calculated based on the Piston Position, Piston High and fixed value of 7.0 (for estetique reasons)
  const PP_ShaftLength = P_Position + P_Length + 7.0;

  // Piston Post Length is calculated based on previously calculated Piston Post Shaft Length, by adding to the value fixed 5.0 mm (same as in the Strut Modeler)
  const PP_Length = PP_ShaftLength + 5.0;

  function generate_pistonPost_points() {
    // Calculate piston post chamfer length
    const pistonPostChamferLength =
      (Rod_OD / 2 - PP_ChamferDiameter / 2.0) /
      Math.tan((PP_ChamferAngle * Math.PI) / 180.0);

    const pistonPostPoints_Top = [
      [0.0, Rod_OD / 2.0], //0
      [
        PP_Length - PP_ShaftLength - pistonPostChamferLength,
        Rod_OD / 2.0,
      ], //1
      [
        PP_Length - PP_ShaftLength,
        Rod_OD / 2.0 - pistonPostChamferLength,
      ], //2
      [
        PP_Length - PP_ShaftLength,
        PP_Diameter / 2.0 + PP_Radius,
      ], //3
      [
        PP_Length - PP_ShaftLength + PP_Radius,
        PP_Diameter / 2.0,
      ], //4
      [PP_Length - 1.0, PP_Diameter / 2.0], //5
      [PP_Length, PP_Diameter / 2.0 - 1], //6
    ];

    // Add to the list Piston Post bottom points, based on the previously created Top points, but with reversed Y direction
    const pistonPostPoints_Bottom = pistonPostPoints_Top
      .slice()
      .reverse()
      .map((point) => [point[0], -point[1]]);

    // Create final list, based on the top and bottom points by merging Top and Bottom list
    return [...pistonPostPoints_Top, ...pistonPostPoints_Bottom];
  }

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generate_pistonPost_points()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      {/* <Line points={generatePistonPostInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} /> */}
    </Group>
  );
};

export default PistonPost;

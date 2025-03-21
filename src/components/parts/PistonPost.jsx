import React from "react";
import { Line, Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const PistonPost = () => {
  const { PP, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { PistonPost_OD, PistonPost_ID, PistonPost_Height } = PP.state.geometry;
  const { PistonPost_Position } = Positions.state.geometry;
  const { color, opacity, display } = PP.state.properties;

  const outerRadius = PistonPost_OD / 2;
  const innerRadius = PistonPost_ID / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  function generate_pistonPost_points() {
    // Calculate piston post chamfer length
    const pistonPostChamferLength =
      (pistonPostOuterDiameter / 2 - pistonPostChamferDiameter / 2.0) /
      Math.tan((pistonPostChamferAngle * Math.PI) / 180.0);

    const pistonPostPoints_Top = [
      [0.0, pistonPostOuterDiameter / 2.0], //0
      [
        pistonPostLength - pistonPostShaftLength - pistonPostChamferLength,
        pistonPostOuterDiameter / 2.0,
      ], //1
      [
        pistonPostLength - pistonPostShaftLength,
        pistonPostOuterDiameter / 2.0 - pistonPostChamferLength,
      ], //2
      [
        pistonPostLength - pistonPostShaftLength,
        pistonPostShaftDiameter / 2.0 + pistonPostRadius,
      ], //3
      [
        pistonPostLength - pistonPostShaftLength + pistonPostRadius,
        pistonPostShaftDiameter / 2.0,
      ], //4
      [pistonPostLength - 1.0, pistonPostShaftDiameter / 2.0], //5
      [pistonPostLength, pistonPostShaftDiameter / 2.0 - 1], //6
    ];

    // Add to the list Piston Post bottom points, based on the previously created Top points, but with reversed Y direction
    const pistonPostPoints_Bottom = pistonPostPoints_Top
      .slice()
      .reverse()
      .map((point) => [point[0], -point[1]]);

    // Create final list, based on the top and bottom points by merging Top and Bottom list
    return [...pistonPostPoints_Top, ...pistonPostPoints_Bottom];
  }


  // const generatePistonPostShapePoints = () => {
  //   return [
  //     [-PistonPost_Position, outerRadius],
  //     [-PistonPost_Position - PistonPost_Height, outerRadius],
  //     [-PistonPost_Position - PistonPost_Height, -outerRadius],
  //     [-PistonPost_Position, -outerRadius],
  //   ].flat();
  // };

  // const generatePistonPostInnerShapePoints = () => {
  //   return [
  //     [-PistonPost_Position, innerRadius],
  //     [-PistonPost_Position - PistonPost_Height, innerRadius],
  //     [-PistonPost_Position - PistonPost_Height, -innerRadius],
  //     [-PistonPost_Position, -innerRadius],
  //   ].flat();
  // };

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line points={generatePistonPostShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generatePistonPostInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default PistonPost;

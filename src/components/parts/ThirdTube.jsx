import React from "react";
import { Line, Group, Rect } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const ThirdTube = ({ positionOffset, scaleFactor }) => {
  const { TT, PT, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { TT_OuterDiam, TT_TH, TT_Length } = TT.state.geometry;
  const {PT_ID, PT_TH} = PT.state.geometry;
  const { CVSAe_ValvePosition, TT_HolePosition} = Positions.state.geometry;
  const { color, opacity, display } = TT.state.properties;

  const outerRadius = TT_OuterDiam / 2;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;


  //******************  CALCULATE THIRD TUBE ADDITIONAL PARAMETERS ********* */
  // The Third Tube hole diameter is fixed to the 10 mm
  const thirdTubeHoleDiameter = 10.0;
  // Length of the Pressure Tube containing the Third Tube section is fixed to 5 mm
  const thirdTubeBeginLength = 5.0;
  // Third Tube swage (section where Third Tube is exceed to the Third Tube OD) length is fixed to 2 mm
  const thirdTubeSwageLength = 2.0;

  const PT_OD = PT_ID + 2 * PT_TH;

  const generate_thirdTube_outer_profile_points = () => {
    // This function draws the inner or outer Third Tube profile, depending on the input parameter
    const thirdTubeOuterProfilePoints_Top = [
      [0.0, PT_OD / 2.0 + TT_TH], //0
      [thirdTubeBeginLength, PT_OD / 2.0 + TT_TH], //1
      [
        thirdTubeBeginLength + thirdTubeSwageLength,
        TT_OuterDiam / 2.0,
      ], //2
      [
        TT_Length - thirdTubeBeginLength - thirdTubeSwageLength,
        TT_OuterDiam / 2.0,
      ], //3
      [
        TT_Length - thirdTubeBeginLength,
        PT_OD / 2.0 + TT_TH,
      ], //4
      [TT_Length, PT_OD / 2.0 + TT_TH], //5
    ];

      // Add to the list Third Tube inner profile points, based on the previously created outer profile points, but with reversed Y direction
      const thirdTubeOuterProfilePoints_Bottom = thirdTubeOuterProfilePoints_Top
        .slice()
        .reverse()
        .map((point) => [point[0], -point[1]]);
      // Create final list, based on the outer and inner profile points by merging outer and inner profile list
      return [...thirdTubeOuterProfilePoints_Top, ...thirdTubeOuterProfilePoints_Bottom].flat();
 
  }

  const generate_thirdTube_inner_profile_points = () => {
    // This function draws the inner or outer Third Tube profile, depending on the input parameter
    const thirdTubeInnerProfilePoints_Top = [
      [0.0, PT_OD / 2.0 ], //0
      [thirdTubeBeginLength, PT_OD / 2.0], //1
      [
        thirdTubeBeginLength + thirdTubeSwageLength,
        TT_OuterDiam / 2.0 - TT_TH,
      ], //2
      [
        TT_Length - thirdTubeBeginLength - thirdTubeSwageLength,
        TT_OuterDiam / 2.0 - TT_TH,
      ], //3
      [
        TT_Length - thirdTubeBeginLength,
        PT_OD / 2.0,
      ], //4
      [TT_Length, PT_OD / 2.0], //5
    ];

      // Add to the list Third Tube inner profile points, thirdTubeInnerProfilePoints_Top on the previously created outer profile points, but with reversed Y direction
      const thirdTubeInnerProfilePoints_Bottom = thirdTubeInnerProfilePoints_Top
        .slice()
        .reverse()
        .map((point) => [point[0], -point[1]]);
      // Create final list, based on the outer and inner profile points by merging outer and inner profile list
      return [...thirdTubeInnerProfilePoints_Top, ...thirdTubeInnerProfilePoints_Bottom].flat();
 
  }
  

  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Outer shape */}
      <Line x={ -TT_Length - CVSAe_ValvePosition + TT_HolePosition} points={generate_thirdTube_outer_profile_points()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line x={-TT_Length - CVSAe_ValvePosition + TT_HolePosition} points={generate_thirdTube_inner_profile_points()} closed fill={changeBrightness(color, 1.5)} shadowBlur={0} />
      {/* Add Hole shape */}
<Rect x={-CVSAe_ValvePosition - thirdTubeHoleDiameter/2.0} y={-TT_OuterDiam/2.0} width={thirdTubeHoleDiameter} height={TT_TH} fill="#ffffff80" shadowBlur={10}/>
    </Group>
  );
};

export default ThirdTube;

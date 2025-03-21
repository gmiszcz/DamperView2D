import React from "react";
import { Line, Group, Circle } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const FootBracket = () => {
  const { FB, RT, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { FB_Length, FB_FrontHolePosition, FB_FrontHoleAxisOffset, FB_HoleSpan, FB_RearHoleOffset, FB_ThreadDiam, FB_BoltsHeadDiam, FB_OB_TH, FB_IB_TH } = FB.state.geometry;
  const {RT_OD1} = RT.state.geometry;
  const { FB_Position } = Positions.state.geometry;
  const { color, opacity, display } = FB.state.properties;
 

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;


  //**************  CALCULATE ANOTHER COMPONENTS DEPENDENT DIMENSIONS ****** */

  const footBracketHeight =
  FB_BoltsHeadDiam / 2.0 +
  FB_FrontHoleAxisOffset / 2.0 +
  FB_ThreadDiam / 2.0 +
    FB_RearHoleOffset;
  
  const footBracketThickness = FB_OB_TH + FB_IB_TH;

function generate_footBracket_shape_points() {
  const footBracketPoints = [
    [0.0, -footBracketThickness], //0
    [0.0, RT_OD1 + footBracketHeight], //1
    [
      -(FB_Length - FB_FrontHolePosition + 5.0),
      RT_OD1 + footBracketHeight,
    ], //2
    [-FB_Length, RT_OD1 + footBracketHeight / 2], //3
    [-FB_Length, -footBracketThickness], //4
  ];
  return footBracketPoints.flat();
}


  return (
    <Group x={positionXOffset - FB_Position + FB_Length} y={positionYOffset - RT_OD1/2.0}>
      {/* FootBracket shape */}
      <Line points={generate_footBracket_shape_points()}  closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Draw Front Hole */}
      <Circle x={-FB_Length + FB_FrontHolePosition} y={FB_FrontHoleAxisOffset + RT_OD1 / 2.0} radius={FB_ThreadDiam / 2.0} fill={"#ffffff"} shadowBlur={1} />
      {/* Draw Read Hole */}
      <Circle x={-FB_Length + FB_FrontHolePosition + FB_HoleSpan} y={FB_FrontHoleAxisOffset + RT_OD1 / 2.0 + FB_RearHoleOffset} radius={FB_ThreadDiam / 2.0} fill={"#ffffff"} shadowBlur={1} />
      
    </Group>
  );
};

export default FootBracket;

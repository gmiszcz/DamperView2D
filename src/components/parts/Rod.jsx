import React, { useEffect, useState } from "react";
import { Line, Group, Rect, Arc } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const Rod = () => {
  const { Rod, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { Rod_Length, Rod_OD, Rod_HD, Rod_SolidHollow } = Rod.state.geometry;
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
    }, [Rod.state.geometry.Rod_CurrentPosition, DL, CL, EL, Rod_Length]);


  return (
    <Group x={positionXOffset} y={positionYOffset}>
      {/* Add Grove */}
      {/* <Groove  positionXOffset={positionXOffset} positionYOffset={positionYOffset} rodPosition={rodPosition}/> */}
      {/* Rod shape */}
      <Rect x = {-rodPosition - Rod_Length} y = {-outerRadius} width={Rod_Length} height={outerRadius * 2.0} fill={color} opacity={display ? opacity : 0.1} shadowBlur={1}/>
      {/* Hardened layer */}
      <Rect x = {-rodPosition - Rod_Length} y = {-innerRadius} width={Rod_Length} height={innerRadius * 2.0} fill={changeBrightness(color, 0.5)} shadowBlur={0}/>
    </Group>
  );
};

export default Rod;


const Groove = ({positionXOffset, positionYOffset, rodPosition}) => {

  const { Rod, PT} = usePartsContext();
    
  const { Rod_Length, Rod_OD, Rod_isGroove, Rod_grooveRadius, Rod_grooveMidDiameter, Rod_groovePosition, Rod_grooveWidth } = Rod.state.geometry

  const {color} = PT.state.properties
  
  const rodOuterRadius = Rod_OD/2.0
  
  console.log("Groove x pos", rodPosition + Rod_Length)
  console.log("Groove Y pos", rodOuterRadius)
  return <Group x={positionXOffset} y={positionYOffset}>
    {/* Rod Groove */}
    {
      Rod_isGroove ?
    <Arc x={-rodPosition + Rod_groovePosition - Rod_Length} y={100} innerRadius={0.0} outerRadius={Rod_grooveWidth} color ={changeBrightness(color, 0.5)} shadowBlur={5}/> : ""
    }
  </Group>

  
}
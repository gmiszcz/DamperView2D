import React, { useEffect, useState } from "react";
import { Line, Group, Rect, Arc, Circle } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET, annotationsVerticalPositions } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";
import { handleToggleAnnotations } from "../../utils/helpers";

const Rod = () => {
  const { Rod, PP, Positions, KNC, FB, RT, Damper } = usePartsContext();
  const { state: size } = useSize();

  // Get Rod dimensions
  const { Rod_Length, Rod_OD, Rod_HD, Rod_HDLength, Rod_SolidHollow, Rod_Hollow_TH} = Rod.state.geometry;

  // Rod Load Application Point
  const { Rod_LoadDistance } = Rod.state.geometry;

  // Check if Piston Post should be generated
  const { PistonPost } = PP.state.geometry;

  // Get RT used to generate dimension line
  const { RT_Length } = RT.state.geometry;

  // Get Knuckle data
  const { Knuckle_Length } = KNC.state.geometry;

  // Get FootBracket data
  const { FB_Length } = FB.state.geometry;
  
  // Get information about mount type
  const { StrutMountingMethod } = Damper.state.geometry;

  const { DL, CL, EL, Knuckle_Position, FB_Position } = Positions.state.geometry;
  // Get Rod Position
  const { Rod_CurrentPosition, Strut_Position_Offset } = Positions.state.geometry;
  // const [rodPosition, setRodPosition] = useState(DL - Rod_Length);
  const { color, opacity, display, annotationsVisible } = Rod.state.properties;

  const outerRadius = Rod_OD / 2; 
  const innerRadius = outerRadius - Rod_HD;

  const hollowRodRadius = Rod_OD / 2.0 - Rod_Hollow_TH;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

  //********  ADDITIONAL ROD GEOMETRY PARAMETERS */

  const pistonPostConnectionLength = 5.0

  const stemEndHeight = 20.0;
  const stemEndOD = 10.0;

  const loadApplicationPointRadius = 2.0


    //  useEffect(() => {
    //   const position = Rod.state.geometry.Rod_CurrentPosition;
    //   if (position === "DL") {
    //     setRodPosition(DL - Rod_Length);
    //   } else if (position === "CL") {
    //     setRodPosition(CL - Rod_Length);
    //   } else if (position === "EL") {
    //     setRodPosition(EL - Rod_Length);
    //   }
    //  }, [Rod.state.geometry.Rod_CurrentPosition, DL, CL, EL, Rod_Length]);
  
  //**********  DIMENSION LINES *********/
  
    // Update or create annotation for Reserve Tube
      useEffect(() => {
        const isVisible = Rod.state.properties.annotationsVisible;
        // ROD LENGTH annotation
        Rod.dispatch({
          type: "UPDATE_OR_CREATE_ANNOTATION",
          payload: {
            id: "Rod_Length_Annotation",
            startX: Rod_CurrentPosition,
            startY: annotationsVerticalPositions.mid,
            direction: "horizontal",
            value: Rod_Length,
            label: "Rod Length",
            display: isVisible,
            important: true,
          },
        });
          // ROD ABSOLUTE POSITION annotation
          Rod.dispatch({
            type: "UPDATE_OR_CREATE_ANNOTATION",
            payload: {
              id: "Rod_Absolute_Position_Annotation",
              startX: Strut_Position_Offset,
              startY: StrutMountingMethod.toLowerCase().includes("knuckle") ?
                annotationsVerticalPositions.bottomThirdRow 
              : annotationsVerticalPositions.bottomForthRow,
              direction: "horizontal",
              value: Rod_CurrentPosition + Rod_Length,
              label: "Rod Position",
              display: isVisible,
              important: true,
            },
          });
         // ROD FROM RT TOP POSITION annotation
         Rod.dispatch({
          type: "UPDATE_OR_CREATE_ANNOTATION",
          payload: {
            id: "Rod_RT_Top_Position_Annotation",
            startX: RT_Length,
            startY: StrutMountingMethod.toLowerCase().includes("knuckle") ?
              annotationsVerticalPositions.bottomSecondRow
            :annotationsVerticalPositions.bottomThirdRow,
            direction: "horizontal",
            value: (Rod_CurrentPosition + Rod_Length) - RT_Length ,
            label: "Rod From RT Top Position",
            display: isVisible,
            important: true,
          },
        });
        
        // ROD FROM KNUCKLE POSITION annotation
        StrutMountingMethod.toLowerCase().includes("knuckle") && Rod.dispatch({
          type: "UPDATE_OR_CREATE_ANNOTATION",
          payload: {
            id: "Rod_From_Knuckle_Position_Annotation",
            startX: Knuckle_Position,
            startY: annotationsVerticalPositions.topSecondRow,
            direction: "horizontal",
            value: Rod_CurrentPosition + Rod_Length - Knuckle_Position,
            label: "Rod From Knuckle Position",
            display: isVisible,
            important: true,
          },
        });
         // ROD FROM FOOT Bracket POSITION annotation
         StrutMountingMethod.toLowerCase().includes("foot") && Rod.dispatch({
          type: "UPDATE_OR_CREATE_ANNOTATION",
          payload: {
            id: "Rod_From_FootBracket_Position_Annotation",
            startX: FB_Position,
            startY: annotationsVerticalPositions.topFirstRow,
            direction: "horizontal",
            value: Rod_CurrentPosition + Rod_Length - FB_Position,
            label: "Rod From Foot Bracket Position",
            display: isVisible,
            important: true,
          },
        });
      }, [Rod_Length, Rod_CurrentPosition, Knuckle_Position, Strut_Position_Offset, StrutMountingMethod, annotationsVisible])
  
  
  //**********  GEOMETRY *********/
  

  return (
    <Group x={positionXOffset} y={positionYOffset} onClick={() => handleToggleAnnotations(Rod)}>

       {/* Add Stem End */}
       <Rect x = {-Rod_CurrentPosition - Rod_Length - stemEndHeight} y={-stemEndOD/2.0} width = {stemEndHeight} height={stemEndOD} fill={color} shadowBlur={1} />
     
      {/* Check if Piston Post should be generated. If it is, reduce Rod Length to 5 mm, which is Piston Post and Rod connection length  */}
      {PistonPost.toLowerCase().includes("included") ?
        <>
          {/* Rod shape */}
          <Rect x={-Rod_CurrentPosition - Rod_Length - Strut_Position_Offset} y={-outerRadius} width={Rod_Length-pistonPostConnectionLength} height={outerRadius * 2.0} fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
          {/* Hardened layer Top */}
          <Rect x={-Rod_CurrentPosition - Rod_HDLength - (Rod_Length - Rod_HDLength) - Strut_Position_Offset} y={-outerRadius} width={Rod_HDLength - pistonPostConnectionLength} height={Rod_HD} fill="#800000ff" shadowBlur={0} />
           {/* Hardened layer Bottom */}
           <Rect x={-Rod_CurrentPosition - Rod_HDLength - (Rod_Length - Rod_HDLength) - Strut_Position_Offset} y={outerRadius - Rod_HD} width={Rod_HDLength - pistonPostConnectionLength} height={Rod_HD} fill="#800000ff" shadowBlur={0} />
          {/* Draw Hollow Rod */}
          {Rod_SolidHollow.toLowerCase().includes("hollow") && <Rect x={-Rod_CurrentPosition - Rod_Length - Strut_Position_Offset} y={-hollowRodRadius} width={Rod_Length-pistonPostConnectionLength} height={hollowRodRadius * 2.0} fill="#ffffff80" opacity={display ? opacity : 0.1} shadowBlur={0} />}
        </>
        :
        <>
          {/* Rod shape */}
          <Rect x={-Rod_CurrentPosition - Rod_Length - Strut_Position_Offset} y={-outerRadius} width={Rod_Length} height={outerRadius * 2.0} fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
          {/* Hardened layer Top */}
          <Rect x={-Rod_CurrentPosition - Rod_HDLength - (Rod_Length - Rod_HDLength) - Strut_Position_Offset} y={-outerRadius} width={Rod_HDLength} height={Rod_HD} fill="#800000ff" shadowBlur={0} />
           {/* Hardened layer Bottom */}
           <Rect x={-Rod_CurrentPosition - Rod_HDLength - (Rod_Length - Rod_HDLength) - Strut_Position_Offset} y={outerRadius - Rod_HD} width={Rod_HDLength} height={Rod_HD} fill="#800000ff" shadowBlur={0} />
          {/* Draw Hollow Rod */}
          {Rod_SolidHollow.toLowerCase().includes("hollow") && <Rect x={-Rod_CurrentPosition - Rod_Length - Strut_Position_Offset} y={-hollowRodRadius} width={Rod_Length} height={hollowRodRadius * 2.0} fill="#ffffff80" opacity={display ? opacity : 0.1} shadowBlur={0} />}
        </>
      }

       {/* Add Grove */}
       <Groove  rodPosition={Rod_CurrentPosition}/>
      {/* Add Load Application Point */}
      <Circle x={-Rod_CurrentPosition - Rod_Length - Rod_LoadDistance} y = { 0.0} radius = {loadApplicationPointRadius} fill={"black"}/>
    </Group>
  );
};

export default Rod;


const Groove = ({rodPosition}) => {

  const { Rod, PT} = usePartsContext();
    
  const { Rod_Length, Rod_OD, Rod_isGroove, Rod_grooveRadius, Rod_grooveMidDiameter, Rod_groovePosition, Rod_grooveWidth } = Rod.state.geometry

  const {color} = PT.state.properties
  
  const rodOuterRadius = Rod_OD / 2.0
  
  // Additional Groove parameters
  console.log("Groove x pos", rodPosition)
  console.log("Groove Y pos", rodOuterRadius)

//   if (isGrooveBackground) {
//     return <>

//     <Circle
//    x={-rodPosition - Rod_groovePosition}
//    y={-rodOuterRadius}
//   radius={Rod_grooveWidth}
  
//    fill={changeBrightness(color, 0.5)}
//    shadowBlur={0}
//    />
//  </>
//   }
   
  return <>
   
    {/* Rod Groove */}
    {
      Rod_isGroove &&
      <>
        {/* TOP GROOVE */}
      <Arc
        x={-rodPosition - Rod_groovePosition}
        y={-rodOuterRadius}
        innerRadius={0}
        outerRadius={Rod_grooveWidth}
        angle={180}
        rotation={0}
        fill={changeBrightness(color, 0.5)}
        shadowBlur={0}
        />
        {/* BOTTOM GROOVE */}
      <Arc
        x={-rodPosition - Rod_groovePosition}
        y={rodOuterRadius}
        innerRadius={0}
        outerRadius={Rod_grooveWidth}
        angle={180}
        rotation={180}
        fill={changeBrightness(color, 0.5)}
        shadowBlur={0}
      />
    </>
    }
  </>

  
}
import React, { useEffect, useRef } from "react";
import { Line, Rect, Group, Circle } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET, annotationsVerticalPositions } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";
import { handleToggleAnnotations } from "../../utils/helpers";

const ReserveTube = () => {
  const { RT, CVSAe, Positions, Damper } = usePartsContext();
  const { state: size } = useSize();

  // Reserve Tube geometry details
  const { RT_Length, RT_OD1, RT_TH, RT_NumberOfSwages, RT_Swage_List } = RT.state.geometry;
  const { color, opacity, display, annotationsVisible } = RT.state.properties;

  // CES Hole geometry details
  const { CVSAe_HoleCutDist, CVSAe_HousingHeight } = CVSAe.state.geometry;

  // Get CES position
  const { CVSAe_ValvePosition } = Positions.state.geometry
  
  // Get Damper Details
  const { StrutMountingMethod, StrutType } = Damper.state.geometry;


  const outerRadius = RT_OD1 / 2;
  const innerRadius = outerRadius - RT_TH;

  const RT_OD1_Annotation_Pos = 30.0

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;



  //**********  DIMENSION LINES *********/

  function render_RT_swages_annotations(swagesList, isVisible) {

    const swagesAnnotationPositions = {
      0: 25.0,
      1: 40.0,
      2: 55.0,
    }
    
    let RT_Swage_Begin = 0
    return swagesList.map((swage, id) => {
    
      // Reserve Tube Swage positon  annotation
      RT.dispatch({
        type: "UPDATE_OR_CREATE_ANNOTATION",
        payload: {
          id: `RT_Swage${id+1}_Position_Annotation`,
          startX: 0,
          startY: swagesAnnotationPositions[id],
          direction: "horizontal",
          value: swage[0],
          label: `RT Swage ${id + 1} Pos`,
          display: isVisible,
          important: true,
        },
      });
      // Reserve Tube Swage distance  annotation
      RT.dispatch({
        type: "UPDATE_OR_CREATE_ANNOTATION",
        payload: {
          id: `RT_Swage${id+1}_Distance_Annotation`,
          startX: swage[0],
          startY: swagesAnnotationPositions[id],
          direction: "horizontal",
          value: swage[2],
          label: `RT Swage ${id + 1} Dist`,
          display: isVisible,
          important: true,
        },
      });
      // Reserve Tube Swage Outer Diameter annotation
      RT.dispatch({
        type: "UPDATE_OR_CREATE_ANNOTATION",
        payload: {
          id: `RT_Swage${id+1}_OD_Annotation`,
          startX: swage[0] + 20,
          startY: -swage[1]/2,
          direction: "vertical",
          value: swage[1],
          label: `RT Swage ${id + 1} OD`,
          display: isVisible,
          important: true,
        },
      });
      RT_Swage_Begin = swage[0] 
    })
  }


  // Update or create annotation for Reserve Tube
    useEffect(() => {
      const isVisible = RT.state.properties.annotationsVisible;
      // Reserve Tube LENGTH annotation
      RT.dispatch({
        type: "UPDATE_OR_CREATE_ANNOTATION",
        payload: {
          id: "RT_Length_Annotation",
          startX: 0,
          startY: StrutMountingMethod.toLowerCase().includes("knuckle") ?
            annotationsVerticalPositions.bottomSecondRow
            :annotationsVerticalPositions.bottomThirdRow,
          direction: "horizontal",
          value: RT_Length,
          label: "RT Length",
          display: isVisible,
          important: true,
        },
      });
       // Reserve Tube LENGTH annotation
       RT.dispatch({
        type: "UPDATE_OR_CREATE_ANNOTATION",
        payload: {
          id: "RT_Length_Annotation",
          startX: 0,
          startY: StrutMountingMethod.toLowerCase().includes("knuckle") ?
            annotationsVerticalPositions.bottomSecondRow
            :annotationsVerticalPositions.bottomThirdRow,
          direction: "horizontal",
          value: RT_Length,
          label: "RT Length",
          display: isVisible,
          important: true,
        },
       });
      // Reserve Tube Fist Outer Diameter annotation
      RT.dispatch({
        type: "UPDATE_OR_CREATE_ANNOTATION",
        payload: {
          id: "RT_OD1_Annotation",
          startX: RT_OD1_Annotation_Pos,
          startY: -RT_OD1/2.0 ,
          direction: "vertical",
          value: RT_OD1,
          label: "RT OD",
          display: isVisible,
          important: true,
        },
       });
       render_RT_swages_annotations(RT_Swage_List, isVisible)
    }, [RT_Length, StrutMountingMethod, RT_Swage_List, annotationsVisible])


//**********  GEOMETRY *********/
  
  // Generates the outer swaged shape points using previous swage's final radius as the starting point for the next swage.
  const generateSwagedOuterShapePoints = () => {
    let points = [];
    // Starting with the initial outer radius at position 0.
    points.push([0, outerRadius]);

    // This variable holds the current radius at the end of the previous swage.
    let currentRadius = outerRadius;

    RT_Swage_List.forEach((swage) => {
      const [RT_Position, RT_OD, RT_Distance] = swage;
      // The start point of this swage is at -RT_Position with the current radius.
      const startX = -RT_Position;
      const startY = currentRadius;
      // The end point of the transition is at -(RT_Position + RT_Distance) with radius = RT_OD/2.
      const endX = -(RT_Position + RT_Distance);
      const endY = RT_OD / 2;

      // If there is a gap between the last point and the new swage start, add a line segment.
      const lastPoint = points[points.length - 1];
      if (lastPoint[0] !== startX || lastPoint[1] !== startY) {
        points.push([startX, startY]);
      }

      // Interpolate between start and end points for a smooth transition.
      const steps = 10;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const x = startX + t * (endX - startX);
        const y = startY + t * (endY - startY);
        points.push([x, y]);
      }

      // Update the current radius to the new value for the next swage.
      currentRadius = endY;
    });

    // Add the final point at the end of the tube.
    points.push([-RT_Length, currentRadius]);

    // Create the bottom half of the shape by mirroring the top half over the horizontal axis.
    const bottomPoints = points
      .slice()
      .reverse()
      .map(([x, y]) => [x, -y]);

    return [...points, ...bottomPoints].flat();
  };

  // Generates the inner swaged shape points for the cross-section.
  // The inner shape is built in the same way as the outer shape but with radii reduced by RT_TH.
  const generateSwagedInnerShapePoints = () => {
    let points = [];
    // Start with the initial inner radius.
    const initialInnerRadius = outerRadius - RT_TH;
    points.push([0, initialInnerRadius]);

    let currentInnerRadius = initialInnerRadius;

    RT_Swage_List.forEach((swage) => {
      const [RT_Position, RT_OD, RT_Distance] = swage;
      const startX = -RT_Position;
      const startY = currentInnerRadius;
      // End point for inner shape: target outer swage radius reduced by RT_TH.
      const endX = -(RT_Position + RT_Distance);
      const endY = RT_OD / 2 - RT_TH;

      const lastPoint = points[points.length - 1];
      if (lastPoint[0] !== startX || lastPoint[1] !== startY) {
        points.push([startX, startY]);
      }

      // Interpolate with the same number of steps.
      const steps = 10;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const x = startX + t * (endX - startX);
        const y = startY + t * (endY - startY);
        points.push([x, y]);
      }

      currentInnerRadius = endY;
    });

    // Final inner point at the tube's end.
    points.push([-RT_Length, currentInnerRadius]);

    // Mirror to create the bottom inner shape.
    const bottomPoints = points
      .slice()
      .reverse()
      .map(([x, y]) => [x, -y]);

    return [...points, ...bottomPoints].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset} onClick={() => handleToggleAnnotations(RT)}>
      
      {RT_NumberOfSwages > 0 ? (
        <>
          {/* Outer swaged shape */}
          <Line points={generateSwagedOuterShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
          {/* Inner swaged shape (imitated cross-section) */}
          <Line points={generateSwagedInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
        </>
      ) : (
        <>
          <Rect width={-RT_Length} height={RT_OD1} y={-outerRadius} fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
          <Rect width={-RT_Length} height={RT_OD1 - 2 * RT_TH} y={-innerRadius} fill={changeBrightness(color, 0.5)} shadowBlur={1} />
        </>
      )}
{/*Add Roll Closing by adding two rectangles at the Reserve Tube's Top*/}
      <RollClosing topOrBottom="top" RT_Length={RT_Length} RT_OD1={RT_OD1} RT_Swage_List={RT_Swage_List} RT_TH={RT_TH} color={color} display={display} opacity={opacity} />
      <RollClosing topOrBottom="bottom" RT_Length={RT_Length} RT_OD1={RT_OD1} RT_Swage_List={RT_Swage_List} RT_TH={RT_TH} color={color} display={display} opacity={opacity} />
      {/* Add Hole below the CES */}
      {StrutType.toLowerCase().includes("active") && <Rect width={CVSAe_HoleCutDist} height={CVSAe_HousingHeight} x={-CVSAe_ValvePosition - CVSAe_HoleCutDist / 2.0} y={-RT_OD1 / 2.0 - CVSAe_HousingHeight / 2.0} fill={changeBrightness(color, 0.5)} />}
    </Group>
  );
};

export default ReserveTube;


const RollClosing = ({ topOrBottom, RT_Length, RT_OD1, RT_TH, RT_Swage_List, color, display,  opacity }) => {

  const getRTTopDiameter = (RT_Swage_List) => {
    if (RT_Swage_List.length === 0) {
      return RT_OD1;
    }
    return RT_Swage_List[RT_Swage_List.length - 1][1];

  }
  
 return <Rect width={RT_TH} height={RT_TH} x={-RT_Length} y={topOrBottom === "top" ? -getRTTopDiameter(RT_Swage_List) / 2 + RT_TH : getRTTopDiameter(RT_Swage_List) / 2 - 2.0*RT_TH} fill={color} opacity={display ? opacity : 0.1} shadowBlur={0} /> 
}

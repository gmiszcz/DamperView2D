import React, { useEffect } from "react";
import { Line, Group, Circle } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET, annotationsVerticalPositions } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";
import { handleToggleAnnotations } from "../../utils/helpers";

const Knuckle = () => {
  const { KNC, RT, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { Knuckle_Length, Knuckle_TH, Knuckle_ThreadDiam } = KNC.state.geometry;
  const {RT_OD1} = RT.state.geometry;
  const { Knuckle_Position } = Positions.state.geometry;
  const { color, opacity, display, annotationsVisible } = KNC.state.properties;


  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;


    //**********  DIMENSION LINES *********/
  
    // Update or create annotation for Pressure Tube
      useEffect(() => {
        const isVisible = KNC.state.properties.annotationsVisible;
        // Pressure tube LENGTH annotation
        KNC.dispatch({
          type: "UPDATE_OR_CREATE_ANNOTATION",
          payload: {
            id: "KNC_Length_Annotation",
            startX: -Knuckle_Length + Knuckle_Position,
            startY: annotationsVerticalPositions.topSecondRow,
            direction: "horizontal",
            value: Knuckle_Length,
            label: "Knuckle Length",
            display: isVisible,
            important: true,
          },
        });
      }, [Knuckle_Length, Knuckle_Position, annotationsVisible])


  
  //**********  GEOMETRY *********/
  
  function generate_knuckle_points() {
    const knucklePoints = [
      [0.0, 0.0], //0
      [-Knuckle_Length, 0.0], //1
      [-Knuckle_Length, RT_OD1 + 2 * Knuckle_TH], //2
      [-(Knuckle_Length - 5.0), RT_OD1 + 2 * Knuckle_TH], //3
      [
        -(Knuckle_Length - 5.0 - 20 / Math.sin((30.0 * Math.PI) / 180.0)),
        RT_OD1 + 2 * Knuckle_TH + 20,
      ], //4
      [
        -(-20 * Math.tan((30.0 * Math.PI) / 180.0) + 5),
        RT_OD1 + 2 * Knuckle_TH + 20,
      ], //!5
      [-5.0, RT_OD1 + 2 * Knuckle_TH], //6
      [0.0, RT_OD1 + 2 * Knuckle_TH], //7
    ];
    return knucklePoints.flat();
  }

  return (
    <Group x={positionXOffset - Knuckle_Position + Knuckle_Length} y={positionYOffset - RT_OD1 / 2.0 - Knuckle_TH} onClick={() => handleToggleAnnotations(KNC)}>
      {/* Draw Knuckle main shape */}
      <Line points={generate_knuckle_points()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Add Bolt */}
      <Circle x={-Knuckle_Length / 2.0} y={-Knuckle_ThreadDiam / 2.0} radius={(Knuckle_ThreadDiam + Knuckle_TH) / 2.0} fill={color} shadowBlur={0} />
      {/* Add Bolt hole */}
      <Circle x={-Knuckle_Length/2.0} y={-Knuckle_ThreadDiam/2.0} radius={Knuckle_ThreadDiam/2.0} fill="white" shadowBlur={0} />
      
    </Group>
  );
};

export default Knuckle;

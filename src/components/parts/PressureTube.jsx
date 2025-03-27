import React, { useEffect, useState } from "react";
import { Line, Group, Rect } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET, annotationsVerticalPositions } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";
import { handleToggleAnnotations } from "../../utils/helpers";

const PressureTube = () => {
  const { PT, RT, Positions } = usePartsContext();
  const { state: size } = useSize();

  const { PT_Length, PT_ID, PT_TH } = PT.state.geometry;
  const { RT_OD1, RT_TH } = RT.state.geometry;
  const { PT_Position } = Positions.state.geometry;
  const { color, opacity, display, annotationsVisible } = PT.state.properties;

  const [outerRadius, setOuterRadius] = useState(PT_ID / 2 + PT_TH);
  const [innerRadius, setInnerRadius] = useState(PT_ID / 2);
  const [PT_LengthWithPosition, setPT_LengthWithPosition] = useState(PT_Length + PT_Position);
  const [positionXOffset, setPositionXOffset] = useState(size.width - GLOBAL_OFFSET.x);
  const [positionYOffset, setPositionYOffset] = useState(size.height - GLOBAL_OFFSET.y);




 //**********  DIMENSION LINES *********/

  // Update or create annotation for Pressure Tube
  useEffect(() => {
    const isVisible = PT.state.properties.annotationsVisible;
    // Pressure tube LENGTH annotation
    PT.dispatch({
      type: "UPDATE_OR_CREATE_ANNOTATION",
      payload: {
        id: "PT_Length_Annotation",
        startX: PT_Position,
        startY: annotationsVerticalPositions.bottomFirstRow,
        direction: "horizontal",
        value: PT_Length,
        label: "PT Length",
        display: isVisible,
        important: true,
      },
    });

    // Pressure tube INNER DIAMETER annotation
    PT.dispatch({
      type: "UPDATE_OR_CREATE_ANNOTATION",
      payload: {
        id: "PT_ID_Annotation",
        startX: PT_Position + 10,
        startY: -innerRadius,
        direction: "vertical",
        scale: 0.5,
        value: PT_ID,
        label: "PT ID",
        display: isVisible,
        important: false,
      },
    });

    // Pressure tube POSITION annotation
    PT.dispatch({
      type: "UPDATE_OR_CREATE_ANNOTATION",
      payload: {
        id: "PT_Position_Annotation",
        startX: 0,
        startY: -RT_OD1 / 2 - 5,
        direction: "horizontal",
        scale: 0.4,
        value: PT_Position,
        label: "PT pos",
        display: isVisible,
        important: false,
        // color: PARTS_COLORS.PT,
      },
    });
  }, [PT_Length, PT_Position, annotationsVisible, outerRadius, RT_OD1, innerRadius, PT_ID]);


//**********  GEOMETRY *********/

useEffect(() => {
  setOuterRadius(PT_ID / 2 + PT_TH);
  setInnerRadius(PT_ID / 2);
  setPT_LengthWithPosition(PT_Length + PT_Position);
  setPositionXOffset(size.width - GLOBAL_OFFSET.x);
  setPositionYOffset(size.height - GLOBAL_OFFSET.y);
}, [PT_Length, PT_ID, PT_TH, PT_Position, size.width, size.height]);

  return (
    <Group x={positionXOffset} y={positionYOffset} onClick={() => handleToggleAnnotations(PT)}>
      {/* Pressure Tube Outer Shape */}
      <Rect x={-PT_Position - PT_Length} y = {-outerRadius} width={PT_Length} height={outerRadius * 2.0} fill ={color} opacity={display ? opacity : 0.1} shadowBlur={1}/>
      {/* Inner shape (cross-section) */}
      <Rect x={-PT_Position - PT_Length} y = {-innerRadius} width={PT_Length} height={innerRadius * 2.0} fill ={changeBrightness(color, 0.5)} shadowBlur={0}/>
    </Group>
  );
};

export default PressureTube;

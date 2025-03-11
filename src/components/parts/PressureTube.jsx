import React, { useEffect, useState } from "react";
import { Line, Rect, Group, Circle } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET, PARTS_COLORS } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";
import { handleToggleAnnotations } from "../../utils/helpers";

const PressureTube = () => {
  const { PT, RT, Positions } = useGlobalContext();
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

  useEffect(() => {
    setOuterRadius(PT_ID / 2 + PT_TH);
    setInnerRadius(PT_ID / 2);
    setPT_LengthWithPosition(PT_Length + PT_Position);
    setPositionXOffset(size.width - GLOBAL_OFFSET.x);
    setPositionYOffset(size.height - GLOBAL_OFFSET.y);
  }, [PT_Length, PT_ID, PT_TH, PT_Position, size.width, size.height]);

  // Update or create annotation for Pressure Tube
  useEffect(() => {
    // Pressure tube LENGTH annotation
    PT.dispatch({
      type: "UPDATE_OR_CREATE_ANNOTATION",
      payload: {
        id: "PT_Length_Annotation",
        startX: PT_Position,
        startY: outerRadius - 70,
        direction: "horizontal",
        value: PT_Length,
        label: "PT Length",
        display: annotationsVisible,
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
        display: annotationsVisible,
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
        display: annotationsVisible,
        // color: PARTS_COLORS.PT,
      },
    });
  }, [PT_Length, annotationsVisible, outerRadius, PT_Position, RT_OD1, innerRadius, PT_ID]);

  const generateOuterShapePoints = () => {
    return [
      [-PT_Position, outerRadius],
      [-PT_LengthWithPosition, outerRadius],
      [-PT_LengthWithPosition, -outerRadius],
      [-PT_Position, -outerRadius],
    ].flat();
  };

  const generateInnerShapePoints = () => {
    return [
      [-PT_Position, innerRadius],
      [-PT_LengthWithPosition, innerRadius],
      [-PT_LengthWithPosition, -innerRadius],
      [-PT_Position, -innerRadius],
    ].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset} onClick={() => handleToggleAnnotations(PT)}>
      {/* Outer shape */}
      <Line points={generateOuterShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={1} />
      {/* Inner shape (cross-section) */}
      <Line points={generateInnerShapePoints()} closed fill={changeBrightness(color, 0.5)} shadowBlur={0} />
    </Group>
  );
};

export default PressureTube;

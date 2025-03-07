import React, { useEffect, useRef, useState } from "react";
import { Group, Arrow, Line, Text } from "react-konva";
import { ANNOTATION_DEFAULTS, GLOBAL_OFFSET } from "../../utils/constants";
import { useSize } from "../../context/SizeContext";

function SingleDimensionLine({ startX, startY, direction, value, label, color, scale = 1.0, weight = "normal" }) {
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef(null);
  const { state: size, segmentRef } = useSize();

  // Scale values that only affect text size and label spacing
  const scaledFontSize = ANNOTATION_DEFAULTS.FONT_SIZE * scale;
  const scaledTextOffset = scaledFontSize * ANNOTATION_DEFAULTS.TEXT_VERTICAL_OFFSET;

  // Apply the global offset
  const x1 = size.width - GLOBAL_OFFSET.x - startX;
  const y1 = size.height - GLOBAL_OFFSET.y - startY;

  // Determine end point based on direction
  const x2 = direction === "horizontal" ? x1 - value : x1;
  const y2 = direction === "vertical" ? y1 - value : y1;

  // Midpoint for text positioning
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Calculate dimension length and determine arrow size
  const dimensionLength = Math.abs(value);
  const isSmallArrow = dimensionLength <= 20;

  const pointerLength = isSmallArrow ? ANNOTATION_DEFAULTS.SMALL_ARROW_SIZE : ANNOTATION_DEFAULTS.NORMAL_ARROW_SIZE;

  const pointerWidth = isSmallArrow ? ANNOTATION_DEFAULTS.SMALL_ARROW_WIDTH : ANNOTATION_DEFAULTS.ARROW_WIDTH;

  // Determine font weight style
  const fontStyle = weight === "bold" ? "bold" : "normal";

  // Update text width after rendering
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getTextWidth());
    }
  }, [value, scaledFontSize]);

  return (
    <Group>
      {/* Start vertical line */}
      <Line
        x={x1}
        y={y1}
        points={[0, ANNOTATION_DEFAULTS.LINE_LENGTH_START, 0, ANNOTATION_DEFAULTS.LINE_LENGTH_END]}
        stroke={color || ANNOTATION_DEFAULTS.DEFAULT_COLOR}
        strokeWidth={1}
      />

      {/* Dimension arrow */}
      <Arrow
        points={[x1, y1, x2, y2]}
        pointerLength={pointerLength}
        pointerWidth={pointerWidth}
        fill={color || ANNOTATION_DEFAULTS.DEFAULT_COLOR}
        stroke={color || ANNOTATION_DEFAULTS.DEFAULT_COLOR}
        strokeWidth={1}
        pointerAtBeginning
      />

      {/* Dimension text */}
      <Text
        ref={textRef}
        x={midX}
        y={midY - scaledTextOffset}
        text={label ? `${label}: ${value}` : value}
        fontSize={scaledFontSize}
        fontFamily="Poppins"
        fontStyle={fontStyle}
        fill={color || ANNOTATION_DEFAULTS.DEFAULT_COLOR}
        align="center"
        verticalAlign="middle"
        offsetX={textWidth / 2}
        shadowColor="white"
        shadowBlur={1}
      />

      {/* End vertical line */}
      <Line
        x={x2}
        y={y2}
        points={[0, ANNOTATION_DEFAULTS.LINE_LENGTH_START, 0, ANNOTATION_DEFAULTS.LINE_LENGTH_END]}
        stroke={color || ANNOTATION_DEFAULTS.DEFAULT_COLOR}
        strokeWidth={1}
      />
    </Group>
  );
}

export default SingleDimensionLine;

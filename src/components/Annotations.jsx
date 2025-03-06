import React, { useEffect, useRef, useState } from "react";
import { Group, Arrow, Line, Text } from "react-konva";
import { useRT } from "../reducers/RT";
import { useRod } from "../reducers/Rod";
import { useTT } from "../reducers/TT";
import { useSS } from "../reducers/SS";
import { useBearing } from "../reducers/Bearing";
import { useBP } from "../reducers/BP";
import { useRG } from "../reducers/RG";
import { useCVSAe } from "../reducers/CVSAe";
import { useKnuckle } from "../reducers/Knuckle";
import { usePositions } from "../reducers/Positions";
import { useFB } from "../reducers/FB";
import { usePT } from "../reducers/PT";
import { usePP } from "../reducers/PP";

// Helper function to merge annotations from all contexts
const gatherAnnotations = (...states) => states.flatMap(({ annotations }) => annotations);

export default function Annotations() {
  const states = [
    useRT().state,
    useRod().state,
    useTT().state,
    useSS().state,
    useBearing().state,
    useBP().state,
    useRG().state,
    useCVSAe().state,
    useKnuckle().state,
    usePositions().state,
    useFB().state,
    usePT().state,
    usePP().state,
  ];

  const annotations = gatherAnnotations(...states).filter((ann) => ann.display);

  return (
    <Group>
      {annotations.map(({ id, position, label, value, color, scale = 1.0 }) => (
        <SingleDimensionLine key={id} position={position} label={label} value={value} color={color} scale={scale} />
      ))}
    </Group>
  );
}

// Individual dimension line component
function SingleDimensionLine({ position, label, value, color, scale }) {
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef();

  const fontSize = 6.5 * scale;
  const normalArrowSize = 6 * scale;
  const smallArrowSize = 3 * scale;
  const arrowWidth = 4 * scale;

  const { x1, y1, x2, y2 } = position;

  const midX = ((x1 + x2) / 2) * scale;
  const midY = ((y1 + y2) / 2) * scale;

  // Calculate displayed value and label
  const displayedText = `${label ? `${label}: ` : ""}${value !== null ? value : ""}`;

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getTextWidth());
    }
  }, [displayedText, fontSize]);

  // Generate arrow points
  const arrowPoints = [x1 * scale, y1 * scale, x2 * scale, y2 * scale];

  const dimensionLength = Math.hypot(x2 - x1, y2 - y1);
  const pointerLength = dimensionLength > 20 ? normalArrowSize : smallArrowSize;

  return (
    <Group>
      {/* Start vertical line */}
      <Line x={x1 * scale} y={y1 * scale} points={[0, 15, 0, -10 * scale]} stroke={color || "black"} strokeWidth={1} />

      {/* Dimension Arrow */}
      <Arrow
        points={arrowPoints}
        pointerLength={pointerLength}
        pointerWidth={arrowWidth}
        fill={color || "black"}
        stroke={color || "black"}
        strokeWidth={1}
        pointerAtBeginning
      />

      {/* Dimension Text */}
      <Text
        ref={textRef}
        x={midX}
        y={midY - fontSize * 1.5}
        text={displayedText}
        fontSize={fontSize}
        fontFamily="Poppins"
        fill={color || "black"}
        align="center"
        verticalAlign="middle"
        offsetX={textWidth / 2}
        shadowColor="white"
        shadowBlur={5}
      />

      {/* End vertical line */}
      <Line x={x2 * scale} y={y2 * scale} points={[0, 15, 0, -10 * scale]} stroke={color || "black"} strokeWidth={1} />
    </Group>
  );
}

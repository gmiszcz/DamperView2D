import React, { useEffect, useState, useMemo } from "react";
import { Group } from "react-konva";
import { usePartsContext } from "../../context/PartsContext";
import SingleDimensionLine from "./SingleDimensionLine";

/**
 * Helper function to extract and filter visible annotations from global context.
 */
const gatherAnnotations = (partsContext) => {
  return Object.values(partsContext)
    .flatMap(({ state }) => state?.annotations || [])
    .filter((ann) => ann.display);
};

export default function Annotations() {
  const partsContext = usePartsContext();

  // Memoize annotations to avoid unnecessary renders
  const annotations = useMemo(() => gatherAnnotations(partsContext), [partsContext]);

  return (
    <Group>
      {annotations.map(({ id, startX, startY, direction, value, label, color, scale = 1.0, weight = "normal" }) => (
        <SingleDimensionLine
          key={id}
          startX={startX}
          startY={startY}
          direction={direction}
          value={value}
          label={label}
          color={color}
          scale={scale}
          weight={weight}
        />
      ))}
    </Group>
  );
}

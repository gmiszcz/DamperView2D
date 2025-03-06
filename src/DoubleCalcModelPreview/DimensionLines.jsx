import React, { useEffect, useRef, useState } from "react";
import { Arrow, Line, Text } from "react-konva";

export default function DimensionLines({ positionOffset, arrowBegin, arrowEnd, arrowYPosition, displayedValue, scaleFactor }) {
  // Dodać możliwość wyświetlania i chowania wymiarów
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef();
  const fontSize = 6.5;
  const normalArrowSize = 6;
  const smallArrowSize = 3;
  const arrowWidth = 4.0;

  const midPoint = (arrowEnd - arrowBegin) / 2.0 + arrowBegin;

  function generate_arrow_points() {
    const arrowPoints = [
      [positionOffset.x + (arrowBegin + 1) * scaleFactor, positionOffset.y + arrowYPosition * scaleFactor],
      [positionOffset.x + (arrowEnd - 1) * scaleFactor, positionOffset.y + arrowYPosition * scaleFactor],
    ];

    return arrowPoints;
  }

  useEffect(
    function () {
      if (textRef.current) {
        setTextWidth(textRef.current.getTextWidth());
      }
    },
    [textRef.current]
  );

  return (
    <>
      {/* *********** VERTICAL LINE AT THE ARROW'S BEGIN ************** */}

      <Line
        x={positionOffset.x + arrowBegin * scaleFactor}
        y={positionOffset.y + arrowYPosition * scaleFactor}
        points={[0.0, 15.0, 0.0, -10 * scaleFactor]}
        stroke="black"
        strokeWidth={1}
      />
      <Arrow
        points={generate_arrow_points().flatMap((p) => p)}
        pointerLength={Number(displayedValue) > 20 ? normalArrowSize * scaleFactor : smallArrowSize * scaleFactor}
        pointerWidth={arrowWidth * scaleFactor}
        fill="black"
        stroke="black"
        strokeWidth={1}
        tension={0.5}
        pointerAtBeginning={true}
      />
      <Text
        ref={textRef}
        x={positionOffset.x + midPoint * scaleFactor}
        y={positionOffset.y + (arrowYPosition - fontSize) * scaleFactor}
        text={displayedValue}
        fontSize={Number(displayedValue) / Math.floor(displayedValue) === 1.0 && displayedValue > 10 ? fontSize * scaleFactor : 5 * scaleFactor}
        fontFamily="Poppins"
        fill="black"
        align="center"
        verticalAlign="middle"
        offsetX={textWidth / 2}
        shadowColor="white"
        shadowBlur={10}
        shadowOffsetX={0}
        shadowOffsetY={0}
      />
      <Line
        x={positionOffset.x + arrowEnd * scaleFactor}
        y={positionOffset.y + arrowYPosition * scaleFactor}
        points={[0.0, 15.0, 0.0, -10 * scaleFactor]}
        stroke="black"
        strokeWidth={1}
      />
    </>
  );
}

import React from "react";
import { Line, Rect, Group, Circle } from "react-konva";
import { useGlobalContext } from "../../context/GlobalContext";
import { useSize } from "../../context/SizeContext";
import { GLOBAL_OFFSET, DEFAULT_SCALE, DEFAULT_POSITION } from "../../utils/constants";
import { changeBrightness } from "../../utils/utils";

const ReserveTube = ({ positionOffset, scaleFactor }) => {
  const { RT } = useGlobalContext();
  const { state: size, segmentRef } = useSize();

  const { RT_Length, RT_OD1, RT_TH, RT_NumberOfSwages, RT_Swage_List } = RT.state.geometry;
  const { color, opacity, display } = RT.state.properties;

  const outerRadius = RT_OD1 / 2;
  const innerRadius = outerRadius - RT_TH;

  const positionXOffset = size.width - GLOBAL_OFFSET.x;
  const positionYOffset = size.height - GLOBAL_OFFSET.y;

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
    <Group x={positionXOffset} y={positionYOffset}>
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
    </Group>
  );
};

export default ReserveTube;

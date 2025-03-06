import React from "react";
import { Line, Rect, Group } from "react-konva";
import { useRT } from "../../reducers/RT";

const ReserveTube = ({ positionOffset, scaleFactor }) => {
  const { state } = useRT();

  const { RT_Length, RT_OD1, RT_TH, RT_NumberOfSwages, RT_Swage_List } = state.geometry;

  const { color, opacity, display } = state.properties;

  const outerRadius = RT_OD1 / 2;
  const innerRadius = outerRadius - RT_TH;

  const positionXOffset = 150.0 + positionOffset.x;
  const positionYOffset = 120.0 + positionOffset.y;

  const generateSwagedShapePoints = () => {
    const points = [[0, outerRadius]];

    RT_Swage_List.forEach((swage) => {
      const { RT_Position, RT_OD, RT_Distance } = swage;
      points.push([RT_Position, outerRadius], [RT_Position, RT_OD / 2], [RT_Position + RT_Distance, RT_OD / 2]);
    });

    points.push([RT_Length, points[points.length - 1][1]]);

    const bottomPoints = points
      .slice()
      .reverse()
      .map(([x, y]) => [x, -y]);
    return [...points, ...bottomPoints].flat();
  };

  return (
    <Group x={positionXOffset} y={positionYOffset} scaleX={scaleFactor} scaleY={scaleFactor}>
      {RT_NumberOfSwages > 0 ? (
        <Line points={generateSwagedShapePoints()} closed fill={color} opacity={display ? opacity : 0.1} shadowBlur={3} />
      ) : (
        <>
          <Rect width={RT_Length} height={RT_OD1} y={-outerRadius} fill={color} opacity={display ? opacity : 0.1} shadowBlur={4} />
          <Rect width={RT_Length} height={RT_OD1 - 2 * RT_TH} y={-innerRadius} fill="#ffffff80" shadowBlur={2} />
        </>
      )}
    </Group>
  );
};

export default ReserveTube;

import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Circle, Line, Shape } from "react-konva";

import DimensionLines from "./DimensionLines";
import "./Damper2DVisualization.css";
import { Button } from "primereact/Button";

export default function Damper2DVisualization({
  calcType,
  userDefinedPosition,
  damperType,
  mountingMethod,
  enableMovement = true,
  defaultSize = 2.0,
  damperData,
  reserveTubeData = false,
  pressureTubeData = false,
  rodData = false,
  rodGuideData = false,
  bearingData = false,
  sealData = false,
  collarData = false,
  reboundSystemData = false,
  baseEndData = false,
  pistonData = false,
  pistonPostData = false,
  cylinderEndData = false,
  thirdTubeData = false,
  cesData = false,
  springSeatData = false,
  footBracketData = false,
  knuckleData = false,
  loopData = false,
  oilData = false,
  // BUTTON STATES
  areButtonsHovered,
  setAreButtonsHovered,
  compressedPositionButton,
  designPositionButton,
  extendedPositionButton,
  dimensionButton,
  openModal,
  setOpenModal,
  areDimensionLinesVisible,
}) {
  // MODAL ZOOM
  const modalZoom = 2.0;

  // console.log("Damper type", damperType);

  const segmentRef = useRef(null);
  const controlRef = useRef(null);
  const [size, setSize] = useState({ width: 1000, height: 350 }); // Default size

  const [scaleFactor, setScaleFactor] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [positionOffset, setPositionOffset] = useState({ x: 150.0, y: 120.0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  function handleWheel(e) {
    e.evt.preventDefault();
    const scaleBy = 1.03;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScaleFactor(newScale);

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  }

  function handleMouseDown(e) {
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    setStartPos({
      x: pointerPos.x - positionOffset.x,
      y: pointerPos.y - positionOffset.y,
    });
    setIsDragging(true);
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    const stage = e.target.getStage();
    const pointerPos = stage.getPointerPosition();
    setPositionOffset({
      x: pointerPos.x - startPos.x,
      y: pointerPos.y - startPos.y,
    });
  }

  function handleMouseUp(e) {
    setIsDragging(false);
  }
  // useEffect(() => {
  //   const resizeObserver = new ResizeObserver((entries) => {
  //     for (let entry of entries) {
  //       setSize({
  //         width: entry.contentRect.width,
  //         height: entry.contentRect.height,
  //       });
  //     }
  //   });

  //   if (segmentRef.current) {
  //     resizeObserver.observe(segmentRef.current);
  //   }

  //   return () => {
  //     if (segmentRef.current) {
  //       resizeObserver.unobserve(segmentRef.current);
  //     }
  //   };
  // }, []);

  useEffect(
    function () {
      if (openModal) {
        setScaleFactor((currentScaleFactor) => modalZoom * currentScaleFactor);
        setPositionOffset((currentPos) => ({
          x: currentPos.x * modalZoom,
          y: currentPos.y * modalZoom,
        }));
      } else {
        setScaleFactor(defaultSize);
        setPositionOffset((currentPos) => ({
          x: currentPos.x,
          y: currentPos.y,
        }));
      }
    },
    [openModal]
  );

  useEffect(() => {
    const updateDimensions = () => {
      if (segmentRef.current) {
        const { offsetWidth, offsetHeight } = segmentRef.current;
        setSize({
          width: offsetWidth,
          height: offsetHeight,
        });
      }
    };

    controlRef.current = {
      setDimension: (e) => setStartPos(e),
    };
    window.controlRef = controlRef;

    updateDimensions(); // Initial update
    window.addEventListener("resize", updateDimensions); // Update on window resize
    window.addEventListener("load", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.addEventListener("load", updateDimensions);
    };
  }, []);

  //  GENERAL POSITION
  let positionXOffset = positionOffset.x;
  let positionYOffset = positionOffset.y;

  // STRUT TYPE
  const strutType = damperData ? damperData.strutType : "active"; // or active

  // console.log("Strut Type", strutType);

  // COMPONENTS VISIBILITY
  const [componentsVisibility, setComponentsVisibility] = useState({
    reserveTube: true,
    pressureTube: true,
    rod: true,
    rodGuide: true,
    bearing: true,
    piston: true,
    pistonPost: true,
    collar: true,
    reboundSystem: true,
    cylinderEnd: true,
    baseEnd: true,
    ces: true,
    footBracket: true,
    knuckle: true,
  });

  //  RESERVE TUBE
  const isReserveTubeSelected = false;
  const reserveTubeOD = reserveTubeData ? reserveTubeData.reserveTubeOD : 52.0;
  const reserveTubeThickness = reserveTubeData ? reserveTubeData.reserveTubeThickness : 2.0;
  const reserveTubeID = reserveTubeOD - 2.0 * reserveTubeThickness;
  const reserveTubeLength = reserveTubeData ? reserveTubeData.reserveTubeLength : 380.0;

  const reserveTubeSwages = reserveTubeData?.reserveTube_swages
    ? reserveTubeData.reserveTube_swages
    : [
        [35.0, 53.0, 5.0],
        [150.0, 55, 4.0],
        [300.0, 52, 4.0],
      ];

  //  CES
  const cesValvePosition = cesData ? cesData.cesValvePosition : 130.0;
  const cesHousingThickness = cesData ? cesData.cesHousingThickness : 5.75;
  const cesHousingOuterDiameter = cesData ? cesData.cesHousingOuterDiameter : 40.0;
  const cesHousingHeight = cesData ? cesData.cesHousingHeight : 26.4;
  const cesHoleCutDistance = cesData ? cesData.cesHoleCutDistance : 25.8;
  const cesStepThickness = cesData ? cesData.cesStepThickness : 1.5;
  const cesStepHeight = cesData ? cesData.cesStepHeight : 2.0;

  // CES WELD
  const cesWeldSize = 1.1 * reserveTubeThickness; // Tomek's Weld Factor

  //  THIRD TUBE
  const isThirdTubeSelected = false;
  const thirdTubeLength = thirdTubeData ? thirdTubeData.thirdTubeLength : 200.0;
  const thirdTubeOuterDiameter = thirdTubeData ? thirdTubeData.thirdTubeOuterDiameter : 40.0;
  const thirdTubeThickness = thirdTubeData ? thirdTubeData.thirdTubeThickness : 1.5;
  const thirdTubeHolePosition = thirdTubeData ? thirdTubeData.thirdTubeHolePosition : 50.0;
  // FIXED VALUE
  const thirdTubeHoleDiameter = 10.0;
  const thirdTubeBeginLength = 5.0;
  const thirdTubeSwageLength = 2.0;

  //  PRESSURE TUBE
  const isPressureTubeSelected = false;
  const pressureTubeID = pressureTubeData ? pressureTubeData.pressureTubeID : 32.0;
  const pressureTubeThickness = pressureTubeData ? pressureTubeData.pressureTubeThickness : 1.13;
  const pressureTubeLength = pressureTubeData ? pressureTubeData.pressureTubeLength : 350.0;

  const pressureTubeOD = pressureTubeID + 2 * pressureTubeThickness;
  //  ROD
  const isRodSelected = false;
  const rodOD = rodData ? rodData.rodOD : 22.0;
  const rodLength = rodData ? rodData.rodLength : 330.0;
  const rodThickness = rodData ? rodData.rodThickness : 2.0;

  // ROD - HARDENING DEPTH
  const rodHardeningDepth = rodData ? rodData.hardeningDepth : 1.0;
  const rodHardeningLength = rodData ? rodData.hardeningLength : 330.0;
  const stemEndHeight = 20.0;
  const stemEndOD = 10.0;
  //  ROD GUIDE
  const isRodGuideSelected = false;
  const rodGuideTotalHeight = rodGuideData ? rodGuideData.rodGuideHeight : 23.0;
  const rodGuideStackHeight = rodGuideData ? rodGuideData.rodGuideHeight - 5.0 : 18.0;

  // BEARING
  const isBearingSelected = false;
  const bearingThickness = bearingData ? bearingData.bearingThickness : 1.5;

  // BASE END
  const baseEndThickness = baseEndData ? baseEndData.baseEndThickness : 3.55;
  const baseEndHeight = baseEndData ? baseEndData.baseEndHeight : 1.65;
  const baseEndOD = reserveTubeSwages ? reserveTubeSwages.slice(-1)[0][1] - 2 * reserveTubeThickness : reserveTubeID;

  //  PISTON
  const isPistonSelected = false;
  const pistonHeight = pistonData ? pistonData.pistonHeight : 10.0;
  const pistonPosition = pistonData ? pistonData.pistonPosition : 5.4;
  //  PISTON POST
  const isPistonPostSelected = pistonPostData ? pistonPostData.isPistonPostSelected : false;
  const pistonPostLength = pistonPostData ? pistonPostData.pistonPostLength : 28.0;
  const pistonPostShaftDiameter = pistonPostData ? pistonPostData.pistonPostShaftDiameter : 9.43;
  const pistonPostShaftLength = pistonPostData && calcType.includes("strut") ? pistonPostData.pistonPostShaftLength : 16.0;

  const pistonPostRadius = pistonPostData ? pistonPostData.pistonPostChamferRadius : 0.45;
  const pistonPostChamferDiameter = pistonPostData ? pistonPostData.pistonPostChamferDiameter : 14.5;
  const pistonPostChamferAngle = pistonPostData ? pistonPostData.pistonPostChamferAngle : 45.0;
  const pistonPostOuterDiameter = rodOD; // Rod OD

  //  COLLAR
  const isCollarSelected = false;
  const collarOD = collarData ? collarData.collarOD : 28.9;
  const collarHeight = collarData ? collarData.collarHeight : 14.4;
  const collarThickness = collarData ? collarData.collarThickness : 1.5;

  //  REBOUND SYSTEM
  const isReboundSystemSelected = reboundSystemData ? reboundSystemData.isReboundSystemSelected : false;
  const reboundSystemHeight = reboundSystemData ? reboundSystemData.reboundSystemHeight : 8.0;

  // BUMPER CAP
  const isBumperCapSelected = false;
  const bumperCapThickness = 5.2;
  const bumperCapHeight = 25.0;

  //  CYLINDER END
  const inCylinderEndSelected = true;
  const cylinderEndHeight = cylinderEndData ? cylinderEndData.cylinderEndHeight : 11.03;
  const cylinderEndOuterDiameter = pressureTubeID + 2 * pressureTubeThickness; //27.79;
  const cylinderEndClampThickness = cylinderEndData ? cylinderEndData.cylinderEndClampThickness : 4.5;
  const cylinderEndHole = cylinderEndClampThickness;
  const cylinderEndPTContactArea = cylinderEndData ? cylinderEndData.cylinderEndPTContactArea : 3.14;

  // SPRING SEAT
  const isSpringSeatSelected = false;
  const springSeatLoadApplicationZPos = 300.0;
  const springSeatLoadApplicationYPos = 14.0;
  const springSeatAngle = 7.0;

  //* Spring Seat constant parameters
  const springSeatThickness = 3.0;
  const springSeatTopHeight = 70.0;
  const springSeatBottomHeight = 100.0;
  const springSeatBushingLength = 35.0;

  //  FOOT BRACKET
  const isFootBrackedSelected = false;

  const footBracketHeight = 30.0;
  const footBracketLength = footBracketData ? footBracketData.footBracketLength : 100.0;
  const footBracketFrontHolePosition = footBracketData ? footBracketData.footBracketFrontHolePosition : 35.0;
  const footBracketFrontHoleAxisOffset = footBracketData ? footBracketData.footBracketFrontHoleAxisOffset : footBracketHeight / 2.0;
  const footBracketHoleSpan = footBracketData ? footBracketData.footBracketHoleSpan : 50.0;
  const footBracketRearHoleAxisOffset = footBracketData ? footBracketData.footBracketRearHoleAxisOffset : 0.0;
  const footBracketThreadPitchDiameter = footBracketData ? footBracketData.footBracketThreadPitchDiameter : 12.0;
  const footBracketThickness = footBracketData ? footBracketData.outerBracketThickness : 2.0;

  const offset = footBracketLength - footBracketFrontHolePosition;

  const footBracketPosition = footBracketData
    ? reserveTubeLength + footBracketData.footBracketLength - footBracketData.footBracketPosition
    : reserveTubeLength;

  //  KNUCKLE
  const isKnuckleSelected = false;
  const knuckleLength = knuckleData ? knuckleData.knuckleLength : 90.0;
  const knuckleBoltDiameter = knuckleData ? knuckleData.knuckleBoltDiameter : 14.0;
  const knuckleThickness = knuckleData ? knuckleData.knuckleThickness : 10.0;

  const knucklePosition = knuckleData ? knuckleData.knucklePosition : reserveTubeLength;

  // KNUCKLE FIXED VARIABLE
  const knuckleOffset = 7.0;

  //  LOWER MOUNT
  const [isLowerMountSelected, setIsLowerMountSelected] = useState(false);
  const lowerMountInnerDiameter = loopData ? loopData.lowerMountInnerDiameter : 20.0;
  const lowerMountThickness = loopData ? loopData.lowerMountThickness : 5.0;

  //  OIL
  let minOilVolumeHeight, maxOilVolumeHeight, recommendedOilVolumeHeight;
  if (oilData) {
    minOilVolumeHeight = oilData.minOilVolume / ((Math.PI * reserveTubeData.reserveTubeID * reserveTubeData.reserveTubeID) / 4.0);
    maxOilVolumeHeight = oilData.maxOilVolume / ((Math.PI * reserveTubeData.reserveTubeID * reserveTubeData.reserveTubeID) / 4.0);
    recommendedOilVolumeHeight = oilData.recommendedOilVolume / ((Math.PI * reserveTubeData.reserveTubeID * reserveTubeData.reserveTubeID) / 4.0);
  }

  function calculate_component_diameter_in_specified_position(position) {
    // This function calculates component's diameter in the specified point

    if (reserveTubeSwages.length !== 0) {
      if (reserveTubeSwages.length === 1) {
        if (position > reserveTubeSwages[0][0]) {
          return reserveTubeOD;
        } else {
          return reserveTubeSwages[0][1];
        }
      } else {
        if (position < reserveTubeSwages[0][0]) {
          return reserveTubeSwages[0][1];
        } else {
          for (let i = 1; i < reserveTubeSwages.length; i++) {
            if (position > reserveTubeSwages[i - 1][0] && position < reserveTubeSwages[i][0]) {
              return reserveTubeSwages[i - 1][1];
            }
          }
          return reserveTubeSwages[reserveTubeSwages.length - 1][1];
        }
      }
    } else {
      return reserveTubeOD;
    }
  }

  function generate_reserveTube_swages_outerPoints() {
    // USE SWAGES POINTS PROVIDED BY THE USER
    // Swages are stored in the following way [[swageBeginPosition1, swageDiameter1, swageDistance1], [swageBeginPosition2, swageDiameter2, swageDistance2], etc.]
    // Create variable which calculates the position of the current point
    let currentPosition = 0.0;
    let currentDiameter = reserveTubeOD; //reserveTubeSwages[0][1];
    let reserveTubeOuterPoints_Top = [
      [0.0, currentDiameter / 2], //0
    ]; //1

    //* Swages loop
    for (let i = 0; i < reserveTubeSwages.length; i++) {
      // Update currentPosition
      currentPosition = reserveTubeSwages[i][0];

      // Add swage begin to the points list
      reserveTubeOuterPoints_Top = [...reserveTubeOuterPoints_Top, [currentPosition, currentDiameter / 2.0]];
      // Update currentDiameter
      currentDiameter = reserveTubeSwages[i][1];

      // Add swage's end to the points list
      // Update currentPosition
      currentPosition += reserveTubeSwages[i][2];
      reserveTubeOuterPoints_Top = [...reserveTubeOuterPoints_Top, [currentPosition, currentDiameter / 2.0]];
    }

    // Add last point
    reserveTubeOuterPoints_Top = [...reserveTubeOuterPoints_Top, [reserveTubeLength, reserveTubeSwages.slice(-1)[0][1] / 2.0]];

    // ADD To the list Reserve Tube's Outer bottom points based on the top points, but with reversed Y component

    const reserveTubeOuterPoints_Bottom = reserveTubeOuterPoints_Top
      .slice()
      .reverse()
      .map((point) => [point[0], -point[1]]);

    // Create final list, based on the top and bottom points - just merge these lists
    return [...reserveTubeOuterPoints_Top, ...reserveTubeOuterPoints_Bottom];
  }

  function draw_swaged_reserveTube_outerProfile(position, scaleFactor) {
    // This function draws the Swaged Reserve Tube based on the input provided by the User

    const reserveTubeOuterPoints = generate_reserveTube_swages_outerPoints().flatMap((p) => p);

    return (
      <Line
        x={positionXOffset + position[0] * scaleFactor}
        y={positionYOffset + (position[1] + reserveTubeOD) * scaleFactor}
        points={reserveTubeOuterPoints.map((point) => point * scaleFactor)}
        closed
        fill="#2275FE"
        shadowBlur={3}
        opacity={componentsVisibility.reserveTube ? 1 : 0.1}
        // onMouseEnter={(e) => {
        //   setComponentsVisibility((currentState) => {
        //     const newState = { ...currentState, reserveTube: false };
        //     e.target.to({
        //       duration: 0.5,
        //       opacity: newState.reserveTube ? 1 : 0.1,
        //     });
        //     return newState;
        //   });
        // }}
        // onMouseLeave={(e) => {
        //   setComponentsVisibility((currentState) => {
        //     const newState = { ...currentState, reserveTube: true };
        //     e.target.to({
        //       duration: 0.5,
        //       opacity: newState.reserveTube ? 1 : 0.1,
        //     });
        //     return newState;
        //   });
        // }}
      />
    );
  }

  function draw_swaged_reserveTube_innerProfile(position, scaleFactor) {
    // This function draws the Swaged Reserve Tube based on the input provided by the User

    const reserveTubeInnerPoints_singleList = generate_reserveTube_swages_outerPoints().flatMap((p) => p);

    const reserveTubeInnerPoints = reserveTubeInnerPoints_singleList.map((p, index) => {
      if (index % 2 !== 0) {
        if (p >= 0) {
          return [p - reserveTubeThickness];
        } else {
          return [p + reserveTubeThickness];
        }
      } else {
        return [p];
      }
    });

    return (
      <Line
        x={positionXOffset + position[0] * scaleFactor}
        y={positionYOffset + (position[1] + reserveTubeOD) * scaleFactor}
        points={reserveTubeInnerPoints.map((point) => point * scaleFactor)}
        closed
        fill="#ffffff80"
        shadowBlur={3}
        opacity={componentsVisibility.reserveTube ? 1 : 0.1}
      />
    );
  }

  function draw_swaged_reserveTube(position, scaleFactor, componentName = null) {
    // This function draws reserve Tube outer and inner profiles

    return (
      <>
        {draw_swaged_reserveTube_outerProfile(position, scaleFactor, componentName)}
        {draw_swaged_reserveTube_innerProfile(position, scaleFactor, componentName)}
      </>
    );
  }
  //  ********* CVSAe COMPONENTS  *******************

  function generate_thirdTube_points() {
    // This function generates the Third Tube's profile points

    const thirdTubePointsOuterProfile_Top = [
      [0.0, pressureTubeOD / 2.0 + thirdTubeThickness], //0
      [thirdTubeBeginLength, pressureTubeOD / 2.0 + thirdTubeThickness], //1
      [thirdTubeBeginLength + thirdTubeSwageLength, thirdTubeOuterDiameter / 2.0], //2
      [thirdTubeLength - thirdTubeBeginLength - thirdTubeSwageLength, thirdTubeOuterDiameter / 2.0], //3
      [thirdTubeLength - thirdTubeBeginLength, pressureTubeOD / 2.0 + thirdTubeThickness], //4
      [thirdTubeLength, pressureTubeOD / 2.0 + thirdTubeThickness], //5
    ];

    // Add to the list Third Tube's Outer bottom points based on the top points, but with reversed Y component
    const thirdTubeOuterPoints_Bottom = thirdTubePointsOuterProfile_Top
      .slice()
      .reverse()
      .map((point) => [point[0], -point[1]]);

    return [...thirdTubePointsOuterProfile_Top, ...thirdTubeOuterPoints_Bottom];
  }

  function draw_thirdTube_outerProfile(position, scaleFactor) {
    // This function draws Third Tube's outer profile, based on the input provided by the User
    const thirdTubeOuterPoints_singleList = generate_thirdTube_points().flatMap((p) => p);

    return (
      <Line
        x={positionXOffset + position[0] * scaleFactor}
        y={positionYOffset + position[1] * scaleFactor}
        points={thirdTubeOuterPoints_singleList.map((point) => point * scaleFactor)}
        closed
        fill="#00FF40"
        shadowBlur={3}
      />
    );
  }

  function draw_thirdTube_innerProfile(position, scaleFactor) {
    // This function draws Third Tube's inner profile, based on the input provided by the User
    const thirdTubeOuterPoints_singleList = generate_thirdTube_points().flatMap((p) => p);

    const thirdTubeInnerPoints_singleList = thirdTubeOuterPoints_singleList.map((p, index) => {
      if (index % 2 !== 0) {
        if (p >= 0) {
          return [p - thirdTubeThickness];
        } else {
          return [p + thirdTubeThickness];
        }
      } else {
        return [p];
      }
    });

    return (
      <Line
        x={positionXOffset + position[0] * scaleFactor}
        y={positionYOffset + position[1] * scaleFactor}
        points={thirdTubeInnerPoints_singleList.map((point) => point * scaleFactor)}
        closed
        fill="#ffffff80"
        shadowBlur={3}
      />
    );
  }

  function draw_thirdTube_shape(position, scaleFactor, componentName = null) {
    // This function draws Third Tube outer and inner profiles

    return (
      <>
        {draw_thirdTube_outerProfile(position, scaleFactor)}
        {draw_thirdTube_innerProfile(position, scaleFactor)}
      </>
    );
  }

  function generate_CES_weldPoints() {
    // This method generates the CES Weld points
    const a = (2 * cesWeldSize) / Math.sqrt(2);
    const cesWeldPoints = [
      [0.0, 0.0], //0
      [a, 0.0], //1
      [0.0, -a], //2
    ];
    return cesWeldPoints;
  }

  function draw_left_CES_weld(position, scaleFactor) {
    // This function draws the left CES Weld
    const leftCESWeldPoints_singleList = generate_CES_weldPoints()
      .flatMap((p) => p)
      .map((p, index) => {
        if (index % 2 === 0) {
          return -p;
        } else return p;
      });

    return (
      <Line
        x={positionXOffset + (reserveTubeLength - cesValvePosition - position[0]) * scaleFactor}
        y={positionYOffset + position[1] * scaleFactor}
        points={leftCESWeldPoints_singleList.map((point) => point * scaleFactor)}
        closed
        fill="#ffc200ff"
        shadowBlur={3}
      />
    );
  }

  function draw_right_CES_weld(position, scaleFactor) {
    // This function draws the right CES Weld
    const rightCESWeldPoints_singleList = generate_CES_weldPoints().flatMap((p) => p);

    return (
      <Line
        x={positionXOffset + (reserveTubeLength - cesValvePosition + position[0]) * scaleFactor}
        y={positionYOffset + position[1] * scaleFactor}
        points={rightCESWeldPoints_singleList.map((point) => point * scaleFactor)}
        closed
        fill="#ffc200ff"
        shadowBlur={3}
      />
    );
  }

  function draw_CES_Weld(position, scaleFactor) {
    // This function draws left and right CES Weld triangle shapes

    return (
      <>
        {draw_left_CES_weld(position, scaleFactor)}
        {draw_right_CES_weld(position, scaleFactor)}
      </>
    );
  }

  //**********  END OF THE CVSAe COMPONENTS */

  //**********  ROD HARDENING ************* */
  function draw_rod_hardening(position, scaleFactor, componentName = null) {
    // This function draws the Rod's hardening

    return (
      <>
        {/* DRAW HARDENING TOP SHAPE */}
        <Rect
          x={positionXOffset + position[0] * scaleFactor}
          y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
          width={rodHardeningLength * scaleFactor}
          height={rodHardeningDepth * scaleFactor}
          fill="#640000ff"
          shadowBlur={4}
        />
        <Rect
          x={positionXOffset + position[0] * scaleFactor}
          y={positionYOffset + (-position[1] + reserveTubeOD / 2.0) * scaleFactor}
          width={rodHardeningLength * scaleFactor}
          height={rodHardeningDepth * scaleFactor}
          fill="#640000ff"
          shadowBlur={4}
        />
      </>
    );
  }

  function generate_rodGuide_points() {
    //  ROD GUIDE PARAMETERS
    const rodGuideBottomStepSize = (reserveTubeID / 2.0 - rodOD / 2.0 + bearingThickness) / 5;

    // calculate rod guide OUTER RADIUS and check if swages are included
    const calculatedRodGuideOR = reserveTubeSwages ? reserveTubeOD / 2.0 - reserveTubeThickness : reserveTubeID / 2.0;

    const rodGuidePoints = [
      //  ROD GUIDE - PRESSURE TUBE CONTACT AREA
      [0.0, rodOD / 2.0 + bearingThickness], // 0
      [0.0, pressureTubeID / 2.0], // 1
      [-(rodGuideTotalHeight - rodGuideStackHeight) / 2.0, pressureTubeID / 2.0], // 2
      [-(rodGuideTotalHeight - rodGuideStackHeight) / 2.0, pressureTubeID / 2.0 + pressureTubeThickness], // 3
      [-(rodGuideTotalHeight - rodGuideStackHeight), pressureTubeID / 2.0 + pressureTubeThickness], // 4
      [-(rodGuideTotalHeight - rodGuideStackHeight + rodGuideStackHeight / 2.0), calculatedRodGuideOR], // 5
      [-rodGuideTotalHeight, calculatedRodGuideOR], // 6
      [-rodGuideTotalHeight, calculatedRodGuideOR - rodGuideBottomStepSize], // 7
      [-(rodGuideTotalHeight - rodGuideBottomStepSize / 2.0), calculatedRodGuideOR - rodGuideBottomStepSize], // 8
      [-(rodGuideTotalHeight - rodGuideBottomStepSize / 2.0), calculatedRodGuideOR - 2.0 * rodGuideBottomStepSize], // 9
      [-(rodGuideTotalHeight - (2.0 * rodGuideBottomStepSize) / 2.0), calculatedRodGuideOR - 2.0 * rodGuideBottomStepSize], // 10
      [-(rodGuideTotalHeight - (2.0 * rodGuideBottomStepSize) / 2.0), calculatedRodGuideOR - 3.0 * rodGuideBottomStepSize], // 11
      [-(rodGuideTotalHeight - (3.0 * rodGuideBottomStepSize) / 2.0), calculatedRodGuideOR - 3.0 * rodGuideBottomStepSize], // 12
      [-(rodGuideTotalHeight - (3.0 * rodGuideBottomStepSize) / 2.0), rodOD / 2.0 + bearingThickness], // 13
    ];

    return rodGuidePoints;
  }

  function draw_rodGuide(position, topOrBottom, scaleFactor, componentName = null) {
    // This function draws Rod Guide
    const rodGuidePoints = generate_rodGuide_points().flatMap((p) => p);

    if (topOrBottom === "top") {
      return (
        <Line
          x={positionXOffset + position[0] * scaleFactor}
          y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
          points={rodGuidePoints.map((point, index) => {
            if (index % 2 === 0) {
              return point * scaleFactor;
            }
            return -point * scaleFactor;
          })}
          closed
          fill="#9b9b9bff"
          shadowBlur={3}
        />
      );
    }
    return (
      <Line
        x={positionXOffset + position[0] * scaleFactor}
        y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
        points={rodGuidePoints.map((point, index) => {
          return point * scaleFactor;
        })}
        closed
        fill="#9b9b9bff"
        shadowBlur={3}
      />
    );
  }

  function generate_pistonPost_points() {
    // Calculate piston post chamfer length
    const pistonPostChamferLength =
      (pistonPostOuterDiameter / 2 - pistonPostChamferDiameter / 2.0) / Math.tan((pistonPostChamferAngle * Math.PI) / 180.0);

    const pistonPostPoints_Top = [
      [0.0, pistonPostOuterDiameter / 2.0], //0
      [pistonPostLength - pistonPostShaftLength - pistonPostChamferLength, pistonPostOuterDiameter / 2.0], //1
      [pistonPostLength - pistonPostShaftLength, pistonPostOuterDiameter / 2.0 - pistonPostChamferLength], //2
      [pistonPostLength - pistonPostShaftLength, pistonPostShaftDiameter / 2.0 + pistonPostRadius], //3
      [pistonPostLength - pistonPostShaftLength + pistonPostRadius, pistonPostShaftDiameter / 2.0], //4
      [pistonPostLength - 1.0, pistonPostShaftDiameter / 2.0], //5
      [pistonPostLength, pistonPostShaftDiameter / 2.0 - 1], //6
    ];

    // Add to the list Piston Post bottom points, based on the previously created Top points, but with reversed Y direction
    const pistonPostPoints_Bottom = pistonPostPoints_Top
      .slice()
      .reverse()
      .map((point) => [point[0], -point[1]]);

    // Create final list, based on the top and bottom points by merging Top and Bottom list
    return [...pistonPostPoints_Top, ...pistonPostPoints_Bottom];
  }

  function draw_pistonPost(position, scaleFactor, componentName = null) {
    //  This function draws Piston Post
    const pistonPostPoints = generate_pistonPost_points().flatMap((p) => p);

    return (
      <Line
        x={positionXOffset + position[0] * scaleFactor}
        y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
        points={pistonPostPoints.map((point, index) => {
          return point * scaleFactor;
        })}
        closed
        fill="green"
      />
    );
  }

  function generate_baseEnd_points() {
    const baseEndPoints = [
      [0.0, 0.0], //0
      [-baseEndThickness, 0.0], //1
      [-(baseEndThickness - baseEndHeight), baseEndOD / 4.0], //2
      [-(baseEndThickness - baseEndHeight), (baseEndOD * 3.0) / 4.0], //3
      [-baseEndThickness, baseEndOD], //4
      [0.0, baseEndOD], //5
      [baseEndHeight, (baseEndOD * 3.0) / 4.0], // 6
      [baseEndHeight, baseEndOD / 4.0], // 7
    ];

    return baseEndPoints;
  }

  function draw_baseEnd(position, scaleFactor, componentName = null) {
    // This function draws the Base End
    const baseEndPoints = generate_baseEnd_points().flatMap((p) => p);

    return (
      <Line
        x={positionXOffset + position[0] * scaleFactor}
        y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
        points={baseEndPoints.map((point, index) => {
          return point * scaleFactor;
        })}
        closed
        fill="#9b9b9bff"
        shadowBlur={3}
      />
    );
  }

  function generate_collar_points() {
    const collarPoints = [
      [0.0, 0.0], // 0
      [-collarThickness, 0.0], //1
      [-collarThickness, collarOD / 2.0 - rodOD / 2.0], //2
      [-(-collarHeight + collarThickness), collarOD / 2.0 - rodOD / 2.0], //3
      [-(-collarHeight + collarThickness), collarOD / 2.0 - rodOD / 2.0 - collarThickness], // 4
      [collarThickness, collarOD / 2.0 - rodOD / 2.0 - collarThickness], // 5
    ];
    return collarPoints;
  }

  function draw_collar_shape(position, scaleFactor, topOrBottom, componentName = null) {
    const collarPoints = generate_collar_points();
    const flatPoints = collarPoints.flatMap((p) => p);

    if (topOrBottom === "top") {
      return (
        <>
          {/* Drawing of the Collar TOP Shape */}
          <Line
            x={positionXOffset + position[0] * scaleFactor}
            y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
            points={flatPoints.map((point, index) => {
              return point * scaleFactor;
            })}
            closed={true}
            // stroke="black"
            shadowBlur={3}
            fill="#f9f9f9"
          />
        </>
      );
    } else {
      return (
        <>
          {/* Drawing of the Collar's BOTTOM Shape */}
          <Line
            x={positionXOffset + position[0] * scaleFactor}
            y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
            points={flatPoints.map((point, index) => {
              if (index % 2 === 0) {
                return point * scaleFactor;
              }
              return -point * scaleFactor;
            })}
            closed={true}
            // stroke="black"
            shadowBlur={3}
            fill="#f9f9f9"
          />
        </>
      );
    }
  }

  function generate_cylinderEnd_main_shape_points() {
    const cylinderEndPoints = [
      [0.0, 0.0], // 0
      [0.0, cylinderEndClampThickness], //1
      [-(cylinderEndHeight - cylinderEndClampThickness), cylinderEndClampThickness], //2
      [-(cylinderEndHeight - cylinderEndClampThickness), cylinderEndOuterDiameter - cylinderEndClampThickness], //3
      [0.0, cylinderEndOuterDiameter - cylinderEndClampThickness], //4
      [0.0, cylinderEndOuterDiameter], //5
      [-(cylinderEndHeight - cylinderEndPTContactArea), cylinderEndOuterDiameter], //6
      [-(cylinderEndHeight - cylinderEndPTContactArea), cylinderEndOuterDiameter - pressureTubeThickness], //7
      [-cylinderEndHeight, cylinderEndOuterDiameter - pressureTubeThickness], //8
      [-cylinderEndHeight, pressureTubeThickness], //9
      [-(cylinderEndHeight - cylinderEndPTContactArea), pressureTubeThickness], //10
      [-(cylinderEndHeight - cylinderEndPTContactArea), 0.0], //11
    ];
    return cylinderEndPoints;
  }

  function draw_cylinderEnd_shape(position, scaleFactor, componentName = null) {
    //
    const cylinderEndPoints = generate_cylinderEnd_main_shape_points().flatMap((p) => p);

    return (
      <>
        {/* MIDDLE LEG */}
        <Rect
          x={positionXOffset + (position[0] - (cylinderEndHeight - cylinderEndClampThickness)) * scaleFactor}
          y={positionYOffset + (position[1] + cylinderEndOuterDiameter / 2.0 - cylinderEndClampThickness / 2.0 + reserveTubeOD / 2.0) * scaleFactor} //zmienić (diameter /4.0) na Reserve Tube OD / 2.0
          width={cylinderEndClampThickness * scaleFactor}
          height={cylinderEndClampThickness * scaleFactor}
          fill="#c8c8f4ff"
          shadowBlur={4}
        />
        {/* MAIN SHAPE */}
        <Line
          x={positionXOffset + position[0] * scaleFactor}
          y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
          points={cylinderEndPoints.map((point, index) => {
            return point * scaleFactor;
          })}
          closed
          fill="#c8c8f4ff"
          shadowBlur={3}
        />
        {/* MIDDLE HOLE */}
        <Rect
          x={positionXOffset + (position[0] - cylinderEndHeight) * scaleFactor}
          y={positionYOffset + (position[1] + cylinderEndOuterDiameter / 2.0 - cylinderEndClampThickness / 2.0 + reserveTubeOD / 2.0) * scaleFactor} //zmienić (diameter /4.0) na Reserve Tube OD / 2.0
          width={cylinderEndClampThickness * scaleFactor}
          height={cylinderEndClampThickness * scaleFactor}
          fill="#ffffffa7"
          shadowBlur={4}
        />
      </>
    );
  }

  function generate_bumperCap_points() {
    // Calculate the bumper cap inner diameter
    const bumperCapInnerDiameter = reserveTubeOD;
    const bumperCapPoints = [
      [0.0, 0.0], // 0
      [0.0, bumperCapThickness], // 1
      [-(bumperCapHeight - bumperCapThickness), bumperCapThickness], // 2
      [-(bumperCapHeight - bumperCapThickness), bumperCapThickness + bumperCapInnerDiameter], // 3
      [0.0, bumperCapThickness + bumperCapInnerDiameter], // 4
      [0.0, 2 * bumperCapThickness + bumperCapInnerDiameter], //5
      [-bumperCapHeight, 2 * bumperCapThickness + bumperCapInnerDiameter], // 6
      [-bumperCapHeight, 0.0], // 7
    ];

    return bumperCapPoints;
  }

  function draw_bumperCap_shape(position, scaleFactor, componentName = null) {
    const bumperCapPoints = generate_bumperCap_points().flatMap((p) => p);

    return (
      <Line
        x={positionXOffset + position[0] * scaleFactor}
        y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
        points={bumperCapPoints.map((point, index) => {
          return point * scaleFactor;
        })}
        closed
        fill="#d38d5fff"
        shadowBlur={3}
      />
    );
  }

  function generate_footBracket_shape_points() {
    const footBracketPoints = [
      [0.0, footBracketThickness], //0
      [0.0, -(reserveTubeOD + footBracketHeight)], //1
      [-(footBracketLength - footBracketLength / 4), -(reserveTubeOD + footBracketHeight)], //2
      [-footBracketLength, -(reserveTubeOD + footBracketHeight / 2)], //3
      [-footBracketLength, footBracketThickness], //4
    ];
    return footBracketPoints;
  }
  function draw_footBracket(position, scaleFactor, componentName = null) {
    const footBracketShapePoints = generate_footBracket_shape_points().flatMap((p) => p);

    return (
      <>
        {/* FOOT BRACKET SHAPE */}
        <Line
          x={positionXOffset + position[0] * scaleFactor}
          y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
          points={footBracketShapePoints.map((point, index) => {
            // if (index % 2 === 0) {
            //   return point * scaleFactor;
            // }
            return point * scaleFactor;
          })}
          closed
          fill="#825acfff"
          shadowBlur={3}
          lineCap="round"
          lineJoin="round"
        />
        {/* FRONT HOLE  */}
        <Circle
          x={positionXOffset + (position[0] - footBracketLength + footBracketFrontHolePosition) * scaleFactor}
          y={positionYOffset + (position[1] - reserveTubeOD / 2.0 - footBracketFrontHoleAxisOffset) * scaleFactor}
          radius={(footBracketThreadPitchDiameter * scaleFactor) / 2.0}
          fill="white"
          shadowBlur={3}
        />
        {/* REAR HOLE  */}
        <Circle
          x={positionXOffset + (position[0] - footBracketLength + footBracketFrontHolePosition + footBracketHoleSpan) * scaleFactor}
          y={positionYOffset + (position[1] - reserveTubeOD / 2.0 - footBracketFrontHoleAxisOffset - footBracketRearHoleAxisOffset) * scaleFactor}
          radius={(footBracketThreadPitchDiameter * scaleFactor) / 2.0}
          fill="white"
          shadowBlur={3}
        />
      </>
    );
  }

  function generate_knuckle_points() {
    const knucklePoints = [
      [0.0, 0.0], //0
      [-knuckleLength, 0.0], //1
      [-knuckleLength, reserveTubeOD + 2 * knuckleThickness], //2
      [-(knuckleLength - 5.0), reserveTubeOD + 2 * knuckleThickness], //3
      [-(knuckleLength - 5.0 - 20 / Math.sin((30.0 * Math.PI) / 180.0)), reserveTubeOD + 2 * knuckleThickness + 20], //4
      [-(-20 * Math.tan((30.0 * Math.PI) / 180.0) + 5), reserveTubeOD + 2 * knuckleThickness + 20], //!5
      [-5.0, reserveTubeOD + 2 * knuckleThickness], //6
      [0.0, reserveTubeOD + 2 * knuckleThickness], //7
    ];
    return knucklePoints;
  }

  function draw_knuckle(position, scaleFactor, componentName = null) {
    const knuckleShapePoints = generate_knuckle_points().flatMap((p) => p);

    return (
      <>
        {/* KNUCKLE SHAPE */}
        <Line
          x={positionXOffset + (position[0] + knucklePosition) * scaleFactor}
          y={positionYOffset + position[1] * scaleFactor}
          points={knuckleShapePoints.map((point, index) => {
            return point * scaleFactor;
          })}
          closed
          fill="#7f7f7fff"
          shadowBlur={3}
        />
        {/* BOLD FIXING */}
        <Circle
          x={positionXOffset + (position[0] + knucklePosition - knuckleLength / 2.0) * scaleFactor}
          y={positionYOffset + (position[1] - knuckleOffset) * scaleFactor}
          radius={((knuckleBoltDiameter + knuckleThickness) * scaleFactor) / 2.0}
          fill="#7f7f7fff"
          shadowBlur={0}
        />
        <Circle
          x={positionXOffset + (position[0] + knucklePosition - knuckleLength / 2.0) * scaleFactor}
          y={positionYOffset + (position[1] - knuckleOffset) * scaleFactor}
          radius={(knuckleBoltDiameter * scaleFactor) / 2.0}
          fill="white"
          shadowBlur={0}
        />
      </>
    );
  }

  function draw_lowerMount(position, scaleFactor, componentName = null) {
    return (
      <>
        <Circle
          x={positionXOffset + position[0] * scaleFactor}
          y={positionYOffset + position[1] * scaleFactor}
          radius={((lowerMountInnerDiameter + knuckleThickness) * scaleFactor) / 2.0}
          fill="#7f7f7fff"
          shadowBlur={0}
        />
        <Circle
          x={positionXOffset + position[0] * scaleFactor}
          y={positionYOffset + position[1] * scaleFactor}
          radius={(lowerMountInnerDiameter * scaleFactor) / 2.0}
          fill="white"
          shadowBlur={0}
        />
      </>
    );
  }

  function generate_springSeat_top_points() {
    const springSeatTopPoints = [
      [0.0, reserveTubeOD / 2.0], //0
      [0.0, reserveTubeOD / 2.0 - springSeatThickness], //1
      [],
    ];
  }

  function draw_cylindrical_component_shape(position, diameter, length, scaleFactor, componentName = null, thickness = null) {
    // This function draws cylindrical components like:
    //  - RESERVE TUBE
    //  - CES
    //  - THIRD TUBE
    //  - PRESSURE TUBE
    //  - ROD
    // - PISTON
    //  - BEARING

    return (
      <>
        {componentName.toLowerCase().includes("reserve") ? (
          <div className="reserve-tube">
            {/* RESERVE TUBE OUTER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + position[1] * scaleFactor}
              width={length * scaleFactor}
              height={diameter * scaleFactor}
              fill="#2275FE"
              shadowBlur={4}
            />
            {/* RESERVE TUBE INNER SHAPE */}
            <Rect
              x={positionXOffset + position[0]}
              y={positionYOffset + position[1] * scaleFactor + thickness * scaleFactor}
              width={length * scaleFactor}
              height={(diameter - 2.0 * thickness) * scaleFactor}
              fill="#ffffff80"
              shadowBlur={4}
            />
          </div>
        ) : componentName.toLowerCase().includes("ces") ? (
          <div className="ces">
            {/* CES OUTER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + position[1] * scaleFactor}
              width={diameter * scaleFactor}
              height={length * scaleFactor}
              fill="#2275FE"
              // shadowBlur={4}
            />
            {/* CES INNER SHAPE */}
            <Rect
              x={positionXOffset + (position[0] + cesHousingThickness) * scaleFactor}
              y={positionYOffset + position[1] * scaleFactor}
              width={(diameter - 2 * thickness) * scaleFactor}
              height={length * scaleFactor}
              fill="#ffffff80"
              // shadowBlur={4}
            />
          </div>
        ) : componentName.toLowerCase().includes("hole") ? (
          <div>
            {/* CES HOLE IN RESERVE TUBE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + position[1] * scaleFactor}
              width={diameter * scaleFactor}
              height={length * scaleFactor}
              fill="#ffffff80"

              // shadowBlur={4}
            />
          </div>
        ) : componentName.toLowerCase().includes("pressure") ? (
          <div className="pressure-tube">
            {/* PRESSURE TUBE OUTER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + position[1] * scaleFactor + (reserveTubeOD / 2.0) * scaleFactor} // zmienić (diameter /4.0) na Reserve Tube OD / 2.0
              width={length * scaleFactor}
              height={(diameter + 2.0 * thickness) * scaleFactor}
              fill="#FF6A36"
              shadowBlur={4}
            />
            {/* PRESSURE TUBE INNER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + position[1] * scaleFactor + (thickness + reserveTubeOD / 2.0) * scaleFactor} // zmienić (diameter /4.0) na Reserve Tube OD / 2.0
              width={length * scaleFactor}
              height={diameter * scaleFactor}
              fill="#ffffff72"
              shadowBlur={4}
            />
          </div>
        ) : componentName.toLowerCase().includes("rod") || componentName.toLowerCase().includes("stem") ? (
          <div className="rod">
            {/* ROD OUTER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor}
              width={length * scaleFactor}
              height={diameter * scaleFactor}
              fill="#FF3636"
              shadowBlur={4}
            />
            {/* ROD INNER SHAPE */}
            {thickness && (
              <Rect
                x={positionXOffset + position[0] * scaleFactor}
                y={positionYOffset + (position[1] + thickness + reserveTubeOD / 2.0) * scaleFactor} //zmienić (diameter /4.0) na Reserve Tube OD / 2.0
                width={length * scaleFactor}
                height={(diameter - 2.0 * thickness) * scaleFactor}
                fill="#ffffff80"
                shadowBlur={4}
              />
              // {rodHardeningDepth && ()}
            )}
          </div>
        ) : componentName.toLowerCase() === "piston" ? (
          <div className="piston">
            {/* PISTON OUTER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor} // zmienić (diameter /4.0) na Reserve Tube OD / 2.0
              width={length * scaleFactor}
              height={diameter * scaleFactor}
              fill="grey"
              shadowBlur={4}
            />
          </div>
        ) : componentName.toLowerCase().includes("bearing") ? (
          <div className="bearing">
            {/* BEARING OUTER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor} // zmienić (diameter /4.0) na Reserve Tube OD / 2.0
              width={length * scaleFactor}
              height={diameter * scaleFactor}
              fill="#8FAF8F"
              shadowBlur={4}
            />
          </div>
        ) : componentName.toLowerCase().includes("rebound") ? (
          <div className="rebound">
            {/* REBOUND SYSTEM/BUMPER OUTER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + (position[1] + reserveTubeOD / 2.0) * scaleFactor} // zmienić (diameter /4.0) na Reserve Tube OD / 2.0
              width={length * scaleFactor}
              height={diameter * scaleFactor}
              fill="#ffef7aff"
              shadowBlur={4}
            />
          </div>
        ) : componentName.toLowerCase().includes("third") ? (
          <div className="third-tube">
            {/* THIRD TUBE OUTER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + position[1] * scaleFactor + (reserveTubeOD / 2.0) * scaleFactor} // zmienić (diameter /4.0) na Reserve Tube OD / 2.0
              width={length * scaleFactor}
              height={(diameter + 2.0 * thickness) * scaleFactor}
              fill="#00FF40"
              shadowBlur={4}
            />
            {/* THIRD TUBE INNER SHAPE */}
            <Rect
              x={positionXOffset + position[0] * scaleFactor}
              y={positionYOffset + position[1] * scaleFactor + (thickness + reserveTubeOD / 2.0) * scaleFactor} // zmienić (diameter /4.0) na Reserve Tube OD / 2.0
              width={length * scaleFactor}
              height={diameter * scaleFactor}
              fill="#ffffff72"
              shadowBlur={4}
            />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }

  function render_dimension_lines() {
    // Dimension lines above reserve tube positions
    const firsTopRowYPosition = -65.0;
    const secondTopRowYPosition = -55.0;
    // Dimension lines below reserve tube positions
    const firstBottomRowYPosition = 10.0;
    const secondBottomRowYPosition = 20.0;
    const thirdBottomRowYPosition = 30.0;
    const forthBottomRowYPosition = 40.0;

    return (
      <>
        {/* ***********   RESERVE TUBE    ************** */}

        <DimensionLines
          positionOffset={positionOffset}
          arrowBegin={0}
          arrowEnd={reserveTubeLength}
          arrowYPosition={reserveTubeOD + secondBottomRowYPosition}
          displayedValue={reserveTubeLength}
          scaleFactor={scaleFactor}
        />

        {/* ***********   CES POSITION  ************** */}
        {damperType.toLowerCase() === "strut" && strutType.toLowerCase() === "active" && (
          <DimensionLines
            positionOffset={positionOffset}
            arrowBegin={reserveTubeLength - cesValvePosition}
            arrowEnd={reserveTubeLength}
            arrowYPosition={damperType === "strut" ? reserveTubeOD - footBracketHeight + firsTopRowYPosition : reserveTubeOD + firsTopRowYPosition}
            displayedValue={cesValvePosition}
            scaleFactor={scaleFactor}
          />
        )}
        {/* ***********   OFFSET/LOWER MOUNT   ************** */}
        {damperType.toLowerCase() === "strut" && mountingMethod.toLowerCase().includes("foot") && (
          <>
            <DimensionLines
              positionOffset={positionOffset}
              arrowBegin={reserveTubeLength - footBracketLength + footBracketFrontHolePosition}
              arrowEnd={reserveTubeLength}
              arrowYPosition={reserveTubeOD + thirdBottomRowYPosition}
              displayedValue={offset}
              scaleFactor={scaleFactor}
            />
            {/* ***********   FOOT BRACKET LENGTH   ************** */}
            <DimensionLines
              positionOffset={positionOffset}
              arrowBegin={footBracketPosition - footBracketLength}
              arrowEnd={footBracketPosition}
              arrowYPosition={reserveTubeOD - footBracketHeight + secondTopRowYPosition}
              displayedValue={footBracketLength}
              scaleFactor={scaleFactor}
            />
          </>
        )}
        {damperType.toLowerCase() === "shock" && (
          <DimensionLines
            positionOffset={positionOffset}
            arrowBegin={reserveTubeLength}
            arrowEnd={reserveTubeLength + lowerMountInnerDiameter / 2.0 + lowerMountThickness}
            arrowYPosition={reserveTubeOD + thirdBottomRowYPosition}
            displayedValue={lowerMountInnerDiameter / 2.0 + lowerMountThickness}
            scaleFactor={scaleFactor}
          />
        )}
        {/* ***********   ROD SHOULDER   ************** */}
        {Math.abs(Number(userDefinedPosition)) > 1.0 && (
          <DimensionLines
            positionOffset={positionOffset}
            arrowBegin={Number(userDefinedPosition)}
            arrowEnd={0}
            arrowYPosition={reserveTubeOD + secondBottomRowYPosition}
            displayedValue={Math.abs(Number(userDefinedPosition))}
            scaleFactor={scaleFactor}
          />
        )}
        {/* ***********   POSITION   ************** */}

        <DimensionLines
          positionOffset={positionOffset}
          arrowBegin={Number(userDefinedPosition)}
          arrowEnd={
            damperType.toLowerCase() === "strut" && mountingMethod.toLowerCase().includes("foot")
              ? footBracketPosition - footBracketLength + footBracketFrontHolePosition
              : reserveTubeLength
          }
          arrowYPosition={
            damperType.toLowerCase() === "strut" && mountingMethod.toLowerCase().includes("foot")
              ? reserveTubeOD + forthBottomRowYPosition
              : reserveTubeOD + thirdBottomRowYPosition
          }
          displayedValue={Math.abs(Number(userDefinedPosition)) + reserveTubeLength}
          scaleFactor={scaleFactor}
        />
        {/* ***********   RELATIVE POSITION   ************** */}
        {damperType.toLowerCase() === "strut" && mountingMethod.toLowerCase().includes("foot") && (
          <DimensionLines
            positionOffset={positionOffset}
            arrowBegin={Number(userDefinedPosition)}
            arrowEnd={footBracketPosition - footBracketLength + footBracketFrontHolePosition}
            arrowYPosition={reserveTubeOD + thirdBottomRowYPosition}
            displayedValue={Math.abs(Number(userDefinedPosition)) + reserveTubeLength - offset}
            scaleFactor={scaleFactor}
          />
        )}
        {/* ***********   LBODY   ************** */}
        {damperType.toLowerCase() === "strut" && mountingMethod.toLowerCase().includes("foot") ? (
          <>
            <DimensionLines
              positionOffset={positionOffset}
              arrowBegin={0}
              arrowEnd={footBracketPosition - footBracketLength + footBracketFrontHolePosition}
              arrowYPosition={reserveTubeOD + firstBottomRowYPosition}
              displayedValue={reserveTubeLength - footBracketLength + footBracketHoleSpan}
              scaleFactor={scaleFactor}
            />
            <DimensionLines
              positionOffset={positionOffset}
              arrowBegin={footBracketPosition - footBracketLength + footBracketFrontHolePosition + footBracketHoleSpan}
              arrowEnd={footBracketPosition}
              arrowYPosition={reserveTubeOD + firstBottomRowYPosition}
              displayedValue={footBracketLength - footBracketFrontHolePosition - footBracketHoleSpan}
              scaleFactor={scaleFactor}
            />
          </>
        ) : damperType.toLowerCase() === "strut" && mountingMethod.toLowerCase().includes("knuckle") ? (
          <DimensionLines
            positionOffset={positionOffset}
            arrowBegin={0}
            arrowEnd={reserveTubeLength - (reserveTubeLength - knucklePosition)}
            arrowYPosition={reserveTubeOD + firstBottomRowYPosition}
            displayedValue={reserveTubeLength - (reserveTubeLength - knucklePosition)}
            scaleFactor={scaleFactor}
          />
        ) : (
          <></>
        )}
        {damperType.toLowerCase() === "shock" && (
          <DimensionLines
            positionOffset={positionOffset}
            arrowBegin={0}
            arrowEnd={reserveTubeLength + lowerMountInnerDiameter / 2.0 + lowerMountThickness}
            arrowYPosition={reserveTubeOD + firstBottomRowYPosition}
            displayedValue={reserveTubeLength + lowerMountInnerDiameter / 2.0 + lowerMountThickness}
            scaleFactor={scaleFactor}
          />
        )}
        {/* ***********   ROD LENGTH   ************** */}
        <DimensionLines
          positionOffset={positionOffset}
          arrowBegin={Number(userDefinedPosition)}
          arrowEnd={rodLength + Number(userDefinedPosition)}
          arrowYPosition={reserveTubeOD / 2.0}
          displayedValue={rodLength}
          scaleFactor={scaleFactor}
        />
        {/* ***********   PISTON POST LENGTH   ************** */}
        <DimensionLines
          positionOffset={positionOffset}
          arrowBegin={rodLength + Number(userDefinedPosition)}
          arrowEnd={rodLength + Number(userDefinedPosition) + pistonPostLength}
          arrowYPosition={reserveTubeOD / 2.0}
          displayedValue={pistonPostLength}
          scaleFactor={scaleFactor}
        />
      </>
    );
  }

  function render_enhanced_view_button() {
    // console.log("Wyswietlam guzik do powiększenia");
    return (
      <Button
        onClick={() => setOpenModal(true)}
        style={{
          display: "flex",
          justifyContent: "centered",
          textAlign: "center",
        }}
      >
        <i
          style={{
            fontSize: "18px",
            marginLeft: "5px",
          }}
          name="expand arrows alternate"
          size="100%"
        />
      </Button>
    );
  }

  function render_close_enhanced_view() {
    return (
      <Button
        onClick={() => setOpenModal(false)}
        style={{
          display: "flex",
          justifyContent: "centered",
          textAlign: "center",
        }}
      >
        <Icon
          style={{
            fontSize: "18px",
            marginLeft: "5px",
          }}
          name="times"
          color="red"
          size="100%"
        />
      </Button>
    );
  }

  return (
    <div
      ref={segmentRef}
      className="damper-2d-vis-container"
      onMouseEnter={() => setAreButtonsHovered(true)}
      onMouseLeave={() => setAreButtonsHovered(false)}
    >
      {areButtonsHovered && (
        <>
          <div className="top-left-buttons">
            {compressedPositionButton}
            {designPositionButton}
            {extendedPositionButton}
            {dimensionButton}
          </div>
          <div className="top-right-button">{openModal ? render_close_enhanced_view() : render_enhanced_view_button()}</div>
        </>
      )}
      <Stage
        width={size.width}
        height={size.height}
        onWheel={enableMovement ? handleWheel : null}
        onMouseDown={enableMovement ? handleMouseDown : null}
        onMouseMove={enableMovement ? handleMouseMove : null}
        onMouseUp={enableMovement ? handleMouseUp : null}
      >
        <Layer>
          {damperType.toLowerCase() === "strut"
            ? mountingMethod.toLowerCase().includes("foot")
              ? draw_footBracket([footBracketPosition, footBracketHeight], scaleFactor, "footBracket")
              : draw_knuckle([1, -reserveTubeOD / 2 + 2.0 * knuckleThickness - knuckleOffset], scaleFactor, "knuckle")
            : draw_lowerMount(
                [reserveTubeLength + lowerMountInnerDiameter / 2.0 + lowerMountThickness, reserveTubeOD / 2.0],
                scaleFactor,
                "lowerMount"
              )}
          {damperType.toLowerCase() === "strut" && strutType.toLowerCase() === "active" ? (
            <>
              {draw_cylindrical_component_shape(
                [
                  reserveTubeLength - (cesValvePosition + cesHousingOuterDiameter / 2.0),
                  -calculate_component_diameter_in_specified_position(reserveTubeLength - cesValvePosition) / 2.0 +
                    reserveTubeOD / 2.0 -
                    cesHousingHeight +
                    2.0,
                ],
                cesHousingOuterDiameter,
                cesHousingHeight + 2.0,
                scaleFactor,
                "ces",
                cesHousingThickness
              )}
            </>
          ) : (
            ""
          )}
          {reserveTubeSwages
            ? draw_swaged_reserveTube([0, -reserveTubeOD / 2.0], scaleFactor, "reserveTube")
            : draw_cylindrical_component_shape([0, 0], reserveTubeOD, reserveTubeLength, scaleFactor, "reserveTube", reserveTubeThickness)}
          {damperType.toLowerCase() === "strut" && strutType.toLowerCase() === "active" ? (
            <>
              {draw_cylindrical_component_shape(
                [
                  reserveTubeLength - (cesValvePosition + cesHousingOuterDiameter / 2.0 - cesHoleCutDistance / 2 + cesHousingThickness),
                  -calculate_component_diameter_in_specified_position(reserveTubeLength - cesValvePosition) / 2.0 + reserveTubeOD / 2.0,
                ],
                cesHoleCutDistance,
                reserveTubeThickness,
                scaleFactor,
                "hole"
              )}
              {draw_CES_Weld(
                [
                  cesHousingOuterDiameter / 2.0,
                  -calculate_component_diameter_in_specified_position(reserveTubeLength - cesValvePosition) / 2.0 + reserveTubeOD / 2.0,
                ],
                scaleFactor
              )}
            </>
          ) : (
            ""
          )}
          {damperType.toLowerCase() === "strut" && strutType.toLowerCase() === "active" ? (
            <>
              {draw_thirdTube_shape(
                [reserveTubeLength - cesValvePosition + thirdTubeHolePosition - thirdTubeLength, reserveTubeOD / 2.0],
                scaleFactor,
                "thirdTube"
              )}

              {draw_cylindrical_component_shape(
                [reserveTubeLength - cesValvePosition - thirdTubeHoleDiameter / 2.0, -thirdTubeOuterDiameter / 2.0 + reserveTubeOD / 2.0],
                thirdTubeHoleDiameter,
                thirdTubeThickness,
                scaleFactor,
                "hole"
              )}
            </>
          ) : (
            ""
          )}
          {draw_cylindrical_component_shape(
            [rodGuideTotalHeight - (rodGuideTotalHeight - rodGuideStackHeight) / 2.0, -pressureTubeID / 2.0 - pressureTubeThickness],
            pressureTubeID,
            pressureTubeLength,
            scaleFactor,
            "pressureTube",
            pressureTubeThickness
          )}
          {draw_cylindrical_component_shape(
            [9.15 + 0.75, -rodOD / 2.0 - bearingThickness],
            rodOD + 2.0 * bearingThickness,
            12.0,
            scaleFactor,
            "bearing"
          )}
          {calcType.toLowerCase().includes("double") &&
            draw_cylindrical_component_shape(
              [rodLength - 50 - 2 * collarThickness - reboundSystemHeight + Number(userDefinedPosition), -28.9 / 2.0],
              28.9,
              reboundSystemHeight,
              scaleFactor,
              "reboundSystem"
            )}
          {calcType.toLowerCase().includes("double") &&
            draw_bumperCap_shape([bumperCapHeight - bumperCapThickness, -reserveTubeOD / 2.0 - bumperCapThickness], scaleFactor, "bumperCap")}
          {/* ****  DRAW STEM END****** */}
          {draw_cylindrical_component_shape(
            [Number(userDefinedPosition) - stemEndHeight, -stemEndOD / 2],
            stemEndOD,
            stemEndHeight,
            scaleFactor,
            "stemEnd"
          )}

          {draw_cylindrical_component_shape([Number(userDefinedPosition), -rodOD / 2.0], rodOD, rodLength, scaleFactor, "rod", rodThickness)}
          {/* *** DRAW ROD'S HARDENING** */}
          {draw_rod_hardening([Number(userDefinedPosition), -rodOD / 2.0], scaleFactor, "hardening")}
          {draw_rodGuide([23, 0], "top", scaleFactor, "Rod Guide")}
          {draw_rodGuide([23, 0], "bottom", scaleFactor, "Rod Guide")}
          {draw_pistonPost(
            [rodLength + Number(userDefinedPosition), -pressureTubeID / 2.0 + pistonPostShaftDiameter / 2 + rodOD / 2], // 9  zmienić na Shaft Diameter, a 20 na rodOD
            scaleFactor,
            scaleFactor,
            "pistonPost"
          )}
          {draw_cylindrical_component_shape(
            [rodLength + pistonPostLength - pistonPostShaftLength / 2 - pistonHeight / 2 + Number(userDefinedPosition), -32.0 / 2.0],
            pressureTubeID,
            pistonHeight,
            scaleFactor,
            "piston"
          )}
          {draw_cylinderEnd_shape([reserveTubeLength - 1, -pressureTubeID / 2.0 - pressureTubeThickness], scaleFactor, "cylinderEnd")}
          {draw_baseEnd(
            [
              reserveTubeLength - 1,
              reserveTubeSwages ? -reserveTubeSwages.slice(-1)[0][1] / 2.0 + reserveTubeThickness : -reserveTubeOD / 2.0 + reserveTubeThickness,
            ],
            scaleFactor,
            "baseEnd"
          )}
          {calcType.toLowerCase().includes("double") &&
            draw_collar_shape(
              [
                rodLength - 50 - collarThickness + Number(userDefinedPosition),
                -collarOD / 2.0,
                // -collarOD / 2.0 + collarThickness - pressureTubeThickness / 2,
              ],
              scaleFactor,
              "top",
              "collar"
            )}
          {calcType.toLowerCase().includes("double") &&
            draw_collar_shape([rodLength - 50 - collarThickness + Number(userDefinedPosition), collarOD / 2.0], scaleFactor, "bottom", "collar")}
          {areDimensionLinesVisible && render_dimension_lines()}
        </Layer>
      </Stage>
    </div>
  );
}

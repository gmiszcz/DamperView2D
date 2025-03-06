import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Damper2DVisualization from "./DamperModelBuilder";
import PositionButton from "./PositionButton";
import DimensionButton from "./DimensionsButton";
import { useRT } from "../reducers/RT";

export default function DamperModelPreviewWindow({
  calcType,
  damperData = false,
  reserveTubeData = false,
  pressureTubeData = false,
  rodData = false,
  rodGuideData = false,
  sealData = false,
  collarData = false,
  reboundSystemData = false,
  baseEndData = false,
  pistonData = false,
  pistonPostData = false,
  cylinderEndData = false,
  footBracketData = false,
  knuckleData = false,
  cesData = false,
  thirdTubeData = false,
  lowerMountData,
}) {
  const { state: rtState, dispatch: rtDispatch } = useRT();

  useEffect(() => {
    console.log("Damper data", rtState);
  }, [rtState]);

  useEffect(() => {
    if (window.controlRef?.current) {
      window.controlRef.current.setProperty = (payload) => {
        rtDispatch({ type: "SET_PROPERTY", payload });
      };
      window.controlRef.current.setGeometry = (payload) => {
        rtDispatch({ type: "SET_GEOMETRY", payload });
      };
      window.controlRef.current.addAnnotation = (payload) => {
        rtDispatch({ type: "ADD_ANNOTATION", payload });
      };
      window.controlRef.current.deleteAnnotation = (id) => {
        rtDispatch({ type: "DELETE_ANNOTATION", id });
      };
      window.controlRef.current.updateAnnotation = (id, payload) => {
        rtDispatch({ type: "UPDATE_ANNOTATION_BY_ID", id, payload });
      };
      // show state
      window.controlRef.current.showState = () => {
        console.log("Damper data", rtState);
      };
    }
  }, [rtState]);

  // console.log("Damper data", damperData);
  const designPosition = damperData ? damperData?.designPosition : 500.0;
  const compressedPosition = damperData ? damperData?.compressedPosition : 400.0;
  const extendedPosition = damperData ? damperData?.extendedPosition : 525.0;
  const reserveTubeLength = reserveTubeData ? reserveTubeData?.reserveTubeLength : 380.0;

  const damperType = calcType.includes("strut") ? "Strut" : damperData.damperType?.damperType ? damperData.damperType : "Strut";
  const mountingMethod = damperData?.mountingMethod ? damperData.mountingMethod : "foot";

  const rodPosition = {
    design: designPosition - reserveTubeLength,
    compressed: compressedPosition - reserveTubeLength,
    extended: extendedPosition - reserveTubeLength,
  };

  const [position, setPosition] = useState(-rodPosition.compressed); // Domyślna wartość początkowa
  // const [damperType, setDamperType] = useState("shock");
  // const [mountingMethod, setMountingMethod] = useState("foot");

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight === 0 ? 350 : window.innerHeight,
  });

  // Buttons states
  const [areButtonsHovered, setAreButtonsHovered] = useState(false);

  // Dimension lines state
  const [areDimensionLinesVisible, setAreDimensionLinesVisible] = useState(true);

  const damperTypeOptions = [
    { key: "Shock", text: "Shock", value: "shock" },
    { key: "Strut", text: "Strut", value: "strut" },
  ];

  const mountingMethodOptions = [
    { key: uuidv4(), text: "Knuckle", value: "knuckle" },
    { key: uuidv4(), text: "Foot Bracket", value: "foot" },
  ];

  // Add event listeners to the

  useEffect(
    function () {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    [damperData]
  );

  // function handleOnChangeDamperType(event, target) {
  //   const selectedDamperType = String(target.value);
  //   setDamperType(selectedDamperType);
  // }

  // function handleOnChangeMountingMethod(event, target) {
  //   const selectedMountingMethod = String(target.value);
  //   setMountingMethod(selectedMountingMethod);
  // }
  // useEffect(function () {}, [damperType, mountingMethod]);

  // const modalStyle = {
  //   position: "fixed",
  //   top: `${windowDimensions.height / 2}px`,
  //   left: `${windowDimensions.width / 2}px`,
  //   transform: "translate(-75%, -50%)",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   textAlign: "center",
  // };

  const modalStyle = {
    width: "80%",
    height: "80vh",
    padding: "20px",
    left: "10%",
    top: "10vh",
    textAlign: "center",
    verticalAlign: "middle",
  };

  function render_enhanced_window() {
    return <></>;
    // return (
    //   <Modal onClose={() => setOpenModal(false)} onOpen={() => setOpenModal(true)} open={openModal} style={modalStyle}>
    //     <Damper2DVisualization
    //       calcType={"doubleCalc"}
    //       userDefinedPosition={position}
    //       damperType={damperType}
    //       reserveTubeData={reserveTubeData}
    //       pressureTubeData={pressureTubeData}
    //       rodData={rodData}
    //       rodGuideData={rodGuideData}
    //       sealData={sealData}
    //       collarData={collarData}
    //       reboundSystemData={reboundSystemData}
    //       baseEndData={baseEndData}
    //       pistonData={pistonData}
    //       pistonPostData={pistonPostData}
    //       cylinderEndData={cylinderEndData}
    //       footBracketData={footBracketData}
    //       knuckleData={knuckleData}
    //       cesData={cesData}
    //       thirdTubeData={thirdTubeData}
    //       lowerMountData={lowerMountData}
    //       mountingMethod={mountingMethod}
    //       areButtonsHovered={areButtonsHovered}
    //       setAreButtonsHovered={setAreButtonsHovered}
    //       compressedPositionButton={
    //         <PositionButton setPosition={setPosition} positionValue={-(compressedPosition - reserveTubeLength)} positionDescription={"Compressed"} />
    //       }
    //       designPositionButton={
    //         <PositionButton setPosition={setPosition} positionValue={-(designPosition - reserveTubeLength)} positionDescription={"Design"} />
    //       }
    //       extendedPositionButton={
    //         <PositionButton setPosition={setPosition} positionValue={-(extendedPosition - reserveTubeLength)} positionDescription={"Extended"} />
    //       }
    //       dimensionButton={
    //         <DimensionButton areDimensionLinesVisible={areDimensionLinesVisible} setAreDimensionLinesVisible={setAreDimensionLinesVisible} />
    //       }
    //       openModal={openModal}
    //       setOpenModal={setOpenModal}
    //       areDimensionLinesVisible={areDimensionLinesVisible}
    //     />
    //   </Modal>
    // );
  }

  return (
    <>
      {/* <button onClick={handleRT}>Bardzo długi baton!</button> */}
      {openModal && render_enhanced_window()}
      {openModal === false && (
        <Damper2DVisualization
          calcType={"doubleCalc"}
          userDefinedPosition={position}
          damperType={damperType}
          reserveTubeData={reserveTubeData}
          pressureTubeData={pressureTubeData}
          rodData={rodData}
          rodGuideData={rodGuideData}
          sealData={sealData}
          collarData={collarData}
          reboundSystemData={reboundSystemData}
          baseEndData={baseEndData}
          pistonData={pistonData}
          pistonPostData={pistonPostData}
          cylinderEndData={cylinderEndData}
          footBracketData={footBracketData}
          knuckleData={knuckleData}
          cesData={cesData}
          thirdTubeData={thirdTubeData}
          lowerMountData={lowerMountData}
          mountingMethod={mountingMethod}
          areButtonsHovered={areButtonsHovered}
          setAreButtonsHovered={setAreButtonsHovered}
          compressedPositionButton={
            <PositionButton setPosition={setPosition} positionValue={-(compressedPosition - reserveTubeLength)} positionDescription={"Compressed"} />
          }
          designPositionButton={
            <PositionButton setPosition={setPosition} positionValue={-(designPosition - reserveTubeLength)} positionDescription={"Design"} />
          }
          extendedPositionButton={
            <PositionButton setPosition={setPosition} positionValue={-(extendedPosition - reserveTubeLength)} positionDescription={"Extended"} />
          }
          dimensionButton={
            <DimensionButton areDimensionLinesVisible={areDimensionLinesVisible} setAreDimensionLinesVisible={setAreDimensionLinesVisible} />
          }
          openModal={openModal}
          setOpenModal={setOpenModal}
          areDimensionLinesVisible={areDimensionLinesVisible}
        />
      )}
    </>
  );
}

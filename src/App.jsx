import "./App.css";
import DamperModelPreviewWindow from "./DoubleCalcModelPreview/DamperModelPreviewWindow";
import React, { useEffect, useState } from "react";
import { ProviderRT } from "./reducers/RT";

function App() {
  const [parameters, setParameters] = useState({
    reserveTubeData: {
      reserveTubeOD: 52.0,
      reserveTubeThickness: 2.0,
      reserveTubeLength: 390.0,
      reserveTubeSwages: [],
    },
    pressureTubeData: {
      pressureTubeID: 32.0,
      pressureTubeThickness: 1.13,
      pressureTubeLength: 350.0,
    },
    rodData: {
      rodOD: 22.0,
      rodLength: 330,
      rodThickness: 2.0,
      hardeningDepth: 1.0,
      hardeningLength: 330.0,
    },
    rodGuideData: { rodGuideHeight: 23.0 },
    bearingData: { bearingThickness: 1.5 },
    baseEndData: { baseEndThickness: 3.55, baseEndHeight: 1.65 },
    pistonData: { pistonHeight: 10.0, pistonPosition: 5.4 },
    pistonPostData: {
      pistonPostLength: 28.0,
      pistonPostShaftDiameter: 9.43,
      pistonPostChamferRadius: 0.45,
      pistonPostChamferDiameter: 14.5,
      pistonPostChamferAngle: 45.0,
    },
    footBracketData: {
      footBracketLength: 120.0,
      footBracketFrontHolePosition: 35.0,
      footBracketFrontHoleAxisOffset: 15.0,
      footBracketHoleSpan: 50.0,
      footBracketRearHoleAxisOffset: 0.0,
      footBracketThreadPitchDiameter: 12.0,
      outerBracketThickness: 2.0,
      footBracketPosition: 100.0,
    },
    knuckleData: {
      knuckleLength: 90.0,
      knuckleBoltDiameter: 14.0,
      knuckleThickness: 10.0,
      knucklePosition: 90.0,
    },
    cesData: {
      cesValvePosition: 150.0,
      cesHousingThickness: 5.75,
      cesHousingOuterDiameter: 40.0,
      cesHousingHeight: 26.4,
      cesHoleCutDistance: 25.8,
      cesStepThickness: 1.5,
      cesStepHeight: 2.0,
    },
    thirdTubeData: {
      thirdTubeLength: 200.0,
      thirdTubeOuterDiameter: 40.0,
      thirdTubeThickness: 1.5,
      thirdTubeHolePosition: 50.0,
    },
  });

  useEffect(() => {
    window.DamperPreview.updateParameters = (newParams) => {
      setParameters((prevParams) => ({ ...prevParams, ...newParams }));
    };
  }, []);

  return (
    <ProviderRT>
      <DamperModelPreviewWindow
        calcType={"strut"}
        reserveTubeData={parameters.reserveTubeData}
        pressureTubeData={parameters.pressureTubeData}
        rodData={parameters.rodData}
        rodGuideData={parameters.rodGuideData}
        bearingData={parameters.bearingData}
        baseEndData={parameters.baseEndData}
        pistonData={parameters.pistonData}
        pistonPostData={parameters.pistonPostData}
        footBracketData={parameters.footBracketData}
        knuckleData={{
          knuckleLength: 90.0,
          knuckleBoltDiameter: 14.0,
          knuckleThickness: 10.0,
          knucklePosition: 90.0,
        }}
        cesData={{
          cesValvePosition: 150.0,
          cesHousingThickness: 5.75,
          cesHousingOuterDiameter: 40.0,
          cesHousingHeight: 26.4,
          cesHoleCutDistance: 25.8,
          cesStepThickness: 1.5,
          cesStepHeight: 2.0,
        }}
        thirdTubeData={{
          thirdTubeLength: 200.0,
          thirdTubeOuterDiameter: 40.0,
          thirdTubeThickness: 1.5,
          thirdTubeHolePosition: 50.0,
        }}
      />
    </ProviderRT>
  );
}

export default App;

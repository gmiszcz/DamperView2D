import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
// import ReserveTube from "./parts/ReserveTube";
// import PistonPost from "./parts/PistonPost";
// import BasePlate from "./parts/BasePlate";
// import PressureTube from "./parts/PressureTube";
// import FootBracket from "./parts/FootBracket";
// import ThirdTube from "./parts/ThirdTube";
// import SpringSeat from "./parts/SpringSeat";
// import RodGuide from "./parts/RodGuide";
// import Knuckle from "./parts/Knuckle";
// import Bearing from "./parts/Bearing";
// import CVSAe from "./parts/CVSAe";
// import Positions from "./parts/Positions";
import Annotations from "./Annotations";
import { useGlobalContext } from "../context/GlobalContext";
import "./DamperVisualizationWindow.css";

export default function DamperModelBuilder() {
  const segmentRef = useRef(null);
  const globalContext = useGlobalContext();
  const [size, setSize] = useState({ width: 1000, height: 350 });

  // Handle dynamic resizing
  useEffect(() => {
    const updateSize = () => {
      if (segmentRef.current) {
        setSize({
          width: segmentRef.current.offsetWidth || 1000,
          height: segmentRef.current.offsetHeight || 350,
        });
      }
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    console.log("🔄 GlobalContext updated in DamperModelBuilder:", globalContext);
  }, [globalContext]);

  return (
    <div ref={segmentRef} className="damper-2d-vis-container">
      <Stage width={size.width} height={size.height}>
        <Layer>
          {/* <ReserveTube /> */}
          {/* <PistonPost /> */}
          {/* <BasePlate /> */}
          {/* <PressureTube /> */}
          {/* <FootBracket /> */}
          {/* <ThirdTube /> */}
          {/* <SpringSeat /> */}
          {/* <RodGuide /> */}
          {/* <Knuckle /> */}
          {/* <Bearing /> */}
          {/* <CVSAe /> */}
          {/* <Positions /> */}
          {/* <Annotations /> */}
        </Layer>
      </Stage>
    </div>
  );
}

import { useMemo } from "react";

import { useRT } from "./parts/RTContext";
import { usePT } from "./parts/PTContext";
import { useRod } from "./parts/RodContext";
import { useRG } from "./parts/RGContext";
import { usePP } from "./parts/PPContext";
import { useBP } from "./parts/BPContext";
import { useSS } from "./parts/SSContext";
import { useFB } from "./parts/FBContext";
import { useKnuckle } from "./parts/KnuckleContext";
import { useBearing } from "./parts/BearingContext";
import { useCVSAe } from "./parts/CVSAeContext";
import { useTT } from "./parts/TTContext";
import { usePositions } from "./parts/PositionsContext";

export const useGlobalContext = () => {
  const RT = useRT();
  const PT = usePT();
  const Rod = useRod();
  const RG = useRG();
  const PP = usePP();
  const BP = useBP();
  const SS = useSS();
  const FB = useFB();
  const Knuckle = useKnuckle();
  const Bearing = useBearing();
  const CVSAe = useCVSAe();
  const TT = useTT();
  const Positions = usePositions();

  return useMemo(
    () => ({ RT, PT, Rod, RG, PP, BP, SS, FB, Knuckle, Bearing, CVSAe, TT, Positions }),
    [
      RT.state,
      PT.state,
      Rod.state,
      RG.state,
      PP.state,
      BP.state,
      SS.state,
      FB.state,
      Knuckle.state,
      Bearing.state,
      CVSAe.state,
      TT.state,
      Positions.state,
    ]
  );
};

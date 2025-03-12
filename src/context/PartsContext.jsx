import { useMemo } from "react";

import { useRT } from "./parts/RTContext";
import { usePT } from "./parts/PTContext";
import { useRod } from "./parts/RodContext";
import { useRG } from "./parts/RGContext";
import { usePP } from "./parts/PPContext";
import { useBP } from "./parts/BPContext";
import { useSS } from "./parts/SSContext";
import { useFB } from "./parts/FBContext";
import { useKNC } from "./parts/KNCContext";
import { useBRG } from "./parts/BRGContext";
import { useCVSAe } from "./parts/CVSAeContext";
import { useTT } from "./parts/TTContext";
import { usePOS } from "./parts/POSContext";

export const usePartsContext = () => {
  const RT = useRT();
  const PT = usePT();
  const Rod = useRod();
  const RG = useRG();
  const PP = usePP();
  const BP = useBP();
  const SS = useSS();
  const FB = useFB();
  const KNC = useKNC();
  const BRG = useBRG();
  const CVSAe = useCVSAe();
  const TT = useTT();
  const Positions = usePOS();

  return useMemo(
    () => ({ RT, PT, Rod, RG, PP, BP, SS, FB, KNC, BRG, CVSAe, TT, Positions }),
    [RT.state, PT.state, Rod.state, RG.state, PP.state, BP.state, SS.state, FB.state, KNC.state, BRG.state, CVSAe.state, TT.state, Positions.state]
  );
};

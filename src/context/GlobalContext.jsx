import { useRT } from "./RTContext";
import { usePT } from "./PTContext";
import { useRod } from "./RodContext";
import { useRG } from "./RGContext";
import { usePP } from "./PPContext";
import { useBP } from "./BPContext";
import { useSS } from "./SSContext";
import { useFB } from "./FBContext";
import { useKnuckle } from "./KnuckleContext";
import { useBearing } from "./BearingContext";
import { useCVSAe } from "./CVSAeContext";
import { useTT } from "./TTContext";
import { usePositions } from "./PositionsContext";

export const useGlobalContext = () => {
  return {
    RT: useRT(),
    PT: usePT(),
    Rod: useRod(),
    RG: useRG(),
    PP: usePP(),
    BP: useBP(),
    SS: useSS(),
    FB: useFB(),
    Knuckle: useKnuckle(),
    Bearing: useBearing(),
    CVSAe: useCVSAe(),
    TT: useTT(),
    Positions: usePositions(),
  };
};

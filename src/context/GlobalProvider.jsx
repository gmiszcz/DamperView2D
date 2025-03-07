import React from "react";
import { ProviderBearing } from "./parts/BearingContext";
import { ProviderBP } from "./parts/BPContext";
import { ProviderCVSAe } from "./parts/CVSAeContext";
import { ProviderFB } from "./parts/FBContext";
import { ProviderKnuckle } from "./parts/KnuckleContext";
import { ProviderPositions } from "./parts/PositionsContext";
import { ProviderPP } from "./parts/PPContext";
import { ProviderPT } from "./parts/PTContext";
import { ProviderRG } from "./parts/RGContext";
import { ProviderRod } from "./parts/RodContext";
import { ProviderRT } from "./parts/RTContext";
import { ProviderSS } from "./parts/SSContext";
import { ProviderTT } from "./parts/TTContext";

const GlobalProvider = ({ children }) => {
  return (
    <ProviderRT>
      <ProviderPT>
        <ProviderRod>
          <ProviderRG>
            <ProviderPP>
              <ProviderBP>
                <ProviderSS>
                  <ProviderFB>
                    <ProviderKnuckle>
                      <ProviderBearing>
                        <ProviderCVSAe>
                          <ProviderTT>
                            <ProviderPositions>{children}</ProviderPositions>
                          </ProviderTT>
                        </ProviderCVSAe>
                      </ProviderBearing>
                    </ProviderKnuckle>
                  </ProviderFB>
                </ProviderSS>
              </ProviderBP>
            </ProviderPP>
          </ProviderRG>
        </ProviderRod>
      </ProviderPT>
    </ProviderRT>
  );
};

export default GlobalProvider;

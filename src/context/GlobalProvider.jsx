import React from "react";
import { ProviderBearing } from "./BearingContext";
import { ProviderBP } from "./BPContext";
import { ProviderCVSAe } from "./CVSAeContext";
import { ProviderFB } from "./FBContext";
import { ProviderKnuckle } from "./KnuckleContext";
import { ProviderPositions } from "./PositionsContext";
import { ProviderPP } from "./PPContext";
import { ProviderPT } from "./PTContext";
import { ProviderRG } from "./RGContext";
import { ProviderRod } from "./RodContext";
import { ProviderRT } from "./RTContext";
import { ProviderSS } from "./SSContext";
import { ProviderTT } from "./TTContext";

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

import React, { FC, ReactElement } from "react";
import styled from "styled-components";

import BitSegment from "./BitSegment";
import { stringifyBits } from "./flop";

const Wrapper = styled.div`
  min-width: 36rem; // TODO: Handle this more elegantly
  padding: 1rem 0;

  display: flex;
  overflow-x: auto;
`;

const Superscript = styled.sup`
  line-height: 0;
  vertical-align: super;
`;

interface BitPanelProps {
  name: string;
  sign: boolean[];
  exponent: boolean[];
  exponentValue: string;
  significand: boolean[];
  significandValue: string;
  updateValue: (
    sign: boolean[],
    exponent: boolean[],
    significand: boolean[]
  ) => void;
}

const BitPanel: FC<BitPanelProps> = (props: BitPanelProps): ReactElement => {
  const formattedExponentValue = (
    <>
      2<Superscript>{props.exponentValue}</Superscript>
    </>
  );

  return (
    <Wrapper>
      <BitSegment
        name="Sign"
        value={props.sign[0] ? "-" : "+"}
        decimal={parseInt(stringifyBits(props.sign), 2).toFixed()}
        bits={props.sign}
        updateBits={(bits: boolean[]) =>
          props.updateValue(bits, props.exponent, props.significand)
        }
      />
      <BitSegment
        name="Exponent"
        value={formattedExponentValue}
        decimal={parseInt(stringifyBits(props.exponent), 2).toFixed()}
        bits={props.exponent}
        updateBits={(bits: boolean[]) =>
          props.updateValue(props.sign, bits, props.significand)
        }
      />
      <BitSegment
        name="Mantissa/Significand"
        value={props.significandValue}
        decimal={parseInt(stringifyBits(props.significand), 2).toFixed()}
        bits={props.significand}
        updateBits={(bits: boolean[]) =>
          props.updateValue(props.sign, props.exponent, bits)
        }
      />
    </Wrapper>
  );
};

export default BitPanel;

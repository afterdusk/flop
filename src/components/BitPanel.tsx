import React, { FC, ReactElement } from "react";
import BitSegment from "./BitSegment";
import styled from "styled-components";
import * as Flop from "../Flop";

const Wrapper = styled.div`
  padding: 1rem 0;

  display: flex;
  overflow-x: auto;
`;

type BitPanelProps = {
  name: string;
  sign: boolean[];
  exponent: boolean[];
  exponentValue: string;
  significand: boolean[];
  significandValue: string;
  updateValue: (
    signBits: boolean[],
    exponentBits: boolean[],
    significandBits: boolean[]
  ) => void;
};

const BitPanel: FC<BitPanelProps> = (props: BitPanelProps): ReactElement => {
  return (
    <Wrapper>
      <BitSegment
        name="Sign"
        value={props.sign[0] ? "-" : "+"}
        decimal={parseInt(Flop.stringifyBits(props.sign), 2).toFixed()}
        bits={props.sign}
        updateBits={(bits: boolean[]) =>
          props.updateValue(bits, props.exponent, props.significand)
        }
      />
      <BitSegment
        name="Exponent"
        value={"2^" + props.exponentValue}
        decimal={parseInt(Flop.stringifyBits(props.exponent), 2).toFixed()}
        bits={props.exponent}
        updateBits={(bits: boolean[]) =>
          props.updateValue(props.sign, bits, props.significand)
        }
      />
      <BitSegment
        name="Mantissa/Significand"
        value={props.significandValue}
        decimal={parseInt(Flop.stringifyBits(props.significand), 2).toFixed()}
        bits={props.significand}
        updateBits={(bits: boolean[]) =>
          props.updateValue(props.sign, props.exponent, bits)
        }
      />
    </Wrapper>
  );
};

export default BitPanel;

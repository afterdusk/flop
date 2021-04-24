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
  significand: boolean[];
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
        value={"x"}
        decimal={parseInt(Flop.stringifyBits(props.sign), 2).toFixed()}
        bits={props.sign}
        updateBits={(bits: boolean[]) =>
          props.updateValue(bits, props.exponent, props.significand)
        }
      />
      <BitSegment
        name="Exponent"
        value={"x"}
        decimal={parseInt(Flop.stringifyBits(props.exponent), 2).toFixed()}
        bits={props.exponent}
        updateBits={(bits: boolean[]) =>
          props.updateValue(props.sign, bits, props.significand)
        }
      />
      <BitSegment
        name="Mantissa/Significand"
        value={"x"}
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

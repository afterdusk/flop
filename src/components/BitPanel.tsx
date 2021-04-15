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
  exponentWidth: number;
  significandWidth: number;
  value: Flop.Flop754;
  updateValue: (value: Flop.Flop754) => void;
};

const BitPanel: FC<BitPanelProps> = (props: BitPanelProps): ReactElement => {
  const { sign, exponent, significand } = Flop.deconstructFlop754(
    props.value,
    props.exponentWidth,
    props.significandWidth
  );

  return (
    <Wrapper>
      <BitSegment
        name="Sign"
        value={"x"}
        decimal={parseInt(Flop.stringifyBits(sign), 2)}
        bits={sign}
        updateBits={(bits: boolean[]) =>
          props.updateValue(Flop.generateFlop754(bits, exponent, significand))
        }
      />
      <BitSegment
        name="Exponent"
        value={"x"}
        decimal={parseInt(Flop.stringifyBits(exponent), 2)}
        bits={exponent}
        updateBits={(bits: boolean[]) =>
          props.updateValue(Flop.generateFlop754(sign, bits, significand))
        }
      />
      <BitSegment
        name="Mantissa/Significand"
        value={"x"}
        decimal={parseInt(Flop.stringifyBits(significand), 2)}
        bits={significand}
        updateBits={(bits: boolean[]) =>
          props.updateValue(Flop.generateFlop754(sign, exponent, bits))
        }
      />
    </Wrapper>
  );
};

export default BitPanel;

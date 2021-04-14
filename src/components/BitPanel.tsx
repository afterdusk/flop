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
  onValueUpdate: (value: Flop.Flop754) => void;
};

const BitPanel: FC<BitPanelProps> = (props: BitPanelProps): ReactElement => {
  const { sign, exponent, significand } = Flop.deconstructFlop754(
    props.value,
    props.exponentWidth,
    props.significandWidth
  );
  const signArray = Array.of(sign);

  return (
    <Wrapper>
      <BitSegment
        name="Sign"
        value={"x"}
        decimal={parseInt(Flop.stringifyBits(signArray), 2)}
        bits={signArray}
        onUpdate={(index: number) =>
          props.onValueUpdate(
            Flop.generateFlop754(!signArray[index], exponent, significand)
          )
        }
      />
      <BitSegment
        name="Exponent"
        value={"x"}
        decimal={parseInt(Flop.stringifyBits(exponent), 2)}
        bits={exponent}
        onUpdate={(index: number) =>
          props.onValueUpdate(
            Flop.generateFlop754(
              sign,
              [
                ...exponent.slice(0, index),
                !exponent[index],
                ...exponent.slice(index + 1),
              ],
              significand
            )
          )
        }
      />
      <BitSegment
        name="Mantissa/Significand"
        value={"x"}
        decimal={parseInt(Flop.stringifyBits(significand), 2)}
        bits={significand}
        onUpdate={(index: number) =>
          props.onValueUpdate(
            Flop.generateFlop754(sign, exponent, [
              ...significand.slice(0, index),
              !significand[index],
              ...significand.slice(index + 1),
            ])
          )
        }
      />
    </Wrapper>
  );
};

export default BitPanel;

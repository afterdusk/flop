import React, { FC, ReactElement, useEffect, useState } from "react";
import BitSegment from "./BitSegment";
import styled from "styled-components";
import { Flop754, generateFlop754, stringifyBits } from "../Flop";

const Wrapper = styled.div`
  padding: 1rem 0;

  display: flex;
  overflow-x: auto;
`;

type BitPanelProps = {
  name: string;
  exponentWidth: number;
  significandWidth: number;
  onValueUpdate: (value: Flop754) => void;
};

const BitPanel: FC<BitPanelProps> = (props: BitPanelProps): ReactElement => {
  const defaultSign = Array.of(false);
  const defaultExponent = new Array(props.exponentWidth).fill(false);
  const defaultSignificand = new Array(props.significandWidth).fill(false);

  const [sign, setSign] = useState(defaultSign);
  const [exponent, setExponent] = useState(defaultExponent);
  const [significand, setSignificand] = useState(defaultSignificand);

  const setSegmentBits = (
    index: number,
    func: React.Dispatch<React.SetStateAction<boolean[]>>
  ) =>
    func((prev) => [
      ...prev.slice(0, index),
      !prev[index],
      ...prev.slice(index + 1),
    ]);

  useEffect(() => {
    props.onValueUpdate(generateFlop754(sign[0], exponent, significand));
  }, [sign, exponent, significand]);

  return (
    <Wrapper>
      <BitSegment
        name="Sign"
        value={"x"}
        decimal={parseInt(stringifyBits(sign), 2)}
        bits={sign}
        onUpdate={(index: number) => setSegmentBits(index, setSign)}
      />
      <BitSegment
        name="Exponent"
        value={"x"}
        decimal={parseInt(stringifyBits(exponent), 2)}
        bits={exponent}
        onUpdate={(index: number) => setSegmentBits(index, setExponent)}
      />
      <BitSegment
        name="Mantissa/Significand"
        value={"x"}
        decimal={parseInt(stringifyBits(significand), 2)}
        bits={significand}
        onUpdate={(index: number) => setSegmentBits(index, setSignificand)}
      />
    </Wrapper>
  );
};

export default BitPanel;

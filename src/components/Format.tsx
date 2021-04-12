import React, { FC, ReactElement, useEffect, useState } from "react";
import Segment from "./Segment";
import Panel from "./Panel";
import styled from "styled-components";
import {
  stringifyFlop,
  convertFlop754ToFlop,
  generateFlop754,
  stringifyBits,
} from "../Flop";

const Wrapper = styled.div`
  max-width: 100%;
  padding: 2rem;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.8rem;
`;

const Segments = styled.div`
  display: flex;
  overflow-x: auto;
`;

type FormatProps = {
  name: string;
  exponentWidth: number;
  significandWidth: number;
};

const Format: FC<FormatProps> = (props: FormatProps): ReactElement => {
  const defaultSign = Array.of(false);
  const defaultExponent = new Array(props.exponentWidth).fill(false);
  const defaultSignificand = new Array(props.significandWidth).fill(false);

  const [sign, setSign] = useState(defaultSign);
  const [exponent, setExponent] = useState(defaultExponent);
  const [significand, setSignificand] = useState(defaultSignificand);
  const [flop754, setFlop754] = useState(
    generateFlop754(defaultSign[0], defaultExponent, defaultSignificand)
  );

  // Callback function for segment UI to update bits
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
    setFlop754(generateFlop754(sign[0], exponent, significand));
  }, [sign, exponent, significand]);

  return (
    <Wrapper>
      <Title>{props.name}</Title>
      <Segments>
        <Segment
          name="Sign"
          value={"x"}
          decimal={parseInt(stringifyBits(sign), 2)}
          bits={sign}
          onUpdate={(index: number) => setSegmentBits(index, setSign)}
        />
        <Segment
          name="Exponent"
          value={"x"}
          decimal={parseInt(stringifyBits(exponent), 2)}
          bits={exponent}
          onUpdate={(index: number) => setSegmentBits(index, setExponent)}
        />
        <Segment
          name="Mantissa/Significand"
          value={"x"}
          decimal={parseInt(stringifyBits(significand), 2)}
          bits={significand}
          onUpdate={(index: number) => setSegmentBits(index, setSignificand)}
        />
      </Segments>
      <Panel stored={stringifyFlop(convertFlop754ToFlop(flop754))} />
    </Wrapper>
  );
};

export default Format;

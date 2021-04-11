import React, { FC, ReactElement, useState } from "react";
import Segment from "./Segment";
import Panel from "./Panel";
import styled from "styled-components";
import { stringifyBits } from "../Flop";

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
  const [sign, setSign] = useState(Array.of(false));
  const [exponent, setExponent] = useState(
    new Array(props.exponentWidth).fill(false)
  );
  const [significand, setSignificand] = useState(
    new Array(props.significandWidth).fill(false)
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
      <Panel />
    </Wrapper>
  );
};

export default Format;

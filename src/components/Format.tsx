import React, { FC, ReactElement } from "react";
import Segment from "./Segment";
import Panel from "./Panel";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 100%;
  padding: 2em;

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

const Format: FC = (): ReactElement => {
  return (
    <Wrapper>
      <Title>FP32</Title>
      <Segments>
        <Segment name="Sign" value={"x"} decimal={"x"} width={1} />
        <Segment name="Exponent" value={"x"} decimal={"x"} width={8} />
        <Segment
          name="Mantissa/Significand"
          value={"x"}
          decimal={"x"}
          width={23}
        />
      </Segments>
      <Panel />
    </Wrapper>
  );
};

export default Format;

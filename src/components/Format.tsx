import React, { FC, ReactElement, useState } from "react";
import Panel from "./Panel";
import BitPanel from "./BitPanel";
import styled from "styled-components";
import {
  Flop754,
  stringifyFlop,
  convertFlop754ToFlop,
  defaultFlop754,
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

type FormatProps = {
  name: string;
  exponentWidth: number;
  significandWidth: number;
};

const Format: FC<FormatProps> = (props: FormatProps): ReactElement => {
  const [flop754, setFlop754] = useState(defaultFlop754());

  // Callback for BitPanel to update value
  const onFlop754Update = (value: Flop754) => {
    setFlop754(value);
  };

  return (
    <Wrapper>
      <Title>{props.name}</Title>
      <Panel stored={stringifyFlop(convertFlop754ToFlop(flop754))} />
      <BitPanel {...props} onValueUpdate={onFlop754Update} />
    </Wrapper>
  );
};

export default Format;

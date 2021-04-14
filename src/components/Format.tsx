import React, { FC, ReactElement, useState } from "react";
import Panel from "./Panel";
import BitPanel from "./BitPanel";
import styled from "styled-components";
import * as Flop from "../Flop";

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
  const [flop754, setFlop754] = useState(Flop.defaultFlop754());
  const [flop, setFlop] = useState(Flop.defaultFlop());

  const onFlop754Update = (value: Flop.Flop754) => {
    setFlop754(value);
    setFlop(Flop.convertFlop754ToFlop(value));
  };

  const onFlopUpdate = (value: Flop.Flop) => {
    setFlop(value);
    // TODO: Update Flop754 value
  };

  return (
    <Wrapper>
      <Title>{props.name}</Title>
      <Panel stored={Flop.stringifyFlop(flop)} onValueUpdate={onFlopUpdate} />
      <BitPanel {...props} value={flop754} onValueUpdate={onFlop754Update} />
    </Wrapper>
  );
};

export default Format;

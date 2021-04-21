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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flop, setFlop] = useState(Flop.defaultFlop()); // TODO: this should be an optional
  const [storedFlop, setStoredFlop] = useState(Flop.defaultFlop());
  const [inputCleared, setInputCleared] = useState(false);

  const onFlop754Update = (value: Flop.Flop754) => {
    setFlop754(value);
    setStoredFlop(Flop.convertFlop754ToFlop(value));
    setInputCleared((prev) => !prev);
  };

  const onFlopUpdate = (value: Flop.Flop) => {
    setFlop(value);
    const updated754Value = Flop.convertFlopToFlop754(
      value,
      props.exponentWidth,
      props.significandWidth
    );
    setFlop754(updated754Value);
    setStoredFlop(Flop.convertFlop754ToFlop(updated754Value));
  };

  return (
    <Wrapper>
      <Title>{props.name}</Title>
      <Panel
        inputCleared={inputCleared}
        stored={Flop.stringifyFlop(storedFlop)}
        updateValue={onFlopUpdate}
      />
      <BitPanel {...props} value={flop754} updateValue={onFlop754Update} />
    </Wrapper>
  );
};

export default Format;

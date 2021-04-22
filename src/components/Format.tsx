import React, { FC, ReactElement, useEffect, useState } from "react";
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
  const [flop, setFlop] = useState<null | Flop.Flop>(null);
  const [storedFlop, setStoredFlop] = useState(Flop.defaultFlop());
  const [error, setError] = useState<null | Flop.Flop>(null);
  const [clearInput, setClearInput] = useState(false);

  const onFlop754Update = (value: Flop.Flop754) => {
    setFlop754(value);
    setFlop(null);
    setStoredFlop(Flop.convertFlop754ToFlop(value));
    setClearInput(true);
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

  useEffect(() => {
    setError(flop ? Flop.calculateError(flop, storedFlop) : null);
  }, [flop, storedFlop]);

  return (
    <Wrapper>
      <Title>{props.name}</Title>
      <Panel
        clearInput={clearInput}
        stored={Flop.stringifyFlop(storedFlop)}
        error={error ? Flop.stringifyFlop(error) : ""}
        updateValue={onFlopUpdate}
        inputCleared={() => setClearInput(false)}
      />
      <BitPanel {...props} value={flop754} updateValue={onFlop754Update} />
    </Wrapper>
  );
};

export default Format;

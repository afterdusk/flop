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
  const [flop, setFlop] = useState<null | Flop.Flop>(null);
  const [flop754, setFlop754] = useState(
    Flop.defaultFlop754(props.exponentWidth)
  );
  const [storedFlop, setStoredFlop] = useState(Flop.defaultFlop());
  const [error, setError] = useState<null | Flop.Flop>(null);

  const onFlop754Update = (value: Flop.Flop754) => {
    setFlop(null);
    setFlop754(value);
    setStoredFlop(Flop.convertFlop754ToFlop(value));
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

  const { sign, exponent, significand } = Flop.deconstructFlop754(
    flop754,
    props.exponentWidth,
    props.significandWidth
  );

  return (
    <Wrapper>
      <Title>{props.name}</Title>
      <Panel
        clearInput={flop === null}
        stored={Flop.stringifyFlop(storedFlop)}
        error={error ? Flop.stringifyFlop(error) : ""}
        bits={[sign, exponent, significand].flat(1)}
        updateInputValue={(inputValue: string) =>
          onFlopUpdate(Flop.generateFlop(inputValue))
        }
        updateValue={(bits: boolean[]) =>
          onFlop754Update(
            Flop.generateFlop754(
              bits.slice(0, 1),
              bits.slice(1, 1 + props.exponentWidth),
              bits.slice(
                1 + props.exponentWidth,
                1 + props.exponentWidth + props.significandWidth
              )
            )
          )
        }
      />
      <BitPanel
        {...props}
        sign={sign}
        exponent={exponent}
        exponentValue={Flop.getExponent(flop754)}
        significand={significand}
        significandValue={Flop.getSignificand(flop754)}
        updateValue={(
          sign: boolean[],
          exponent: boolean[],
          significand: boolean[]
        ) => onFlop754Update(Flop.generateFlop754(sign, exponent, significand))}
      />
    </Wrapper>
  );
};

export default Format;

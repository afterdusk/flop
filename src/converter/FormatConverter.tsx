import React, { FC, ReactElement, useEffect, useState } from "react";
import Panel from "./Panel";
import BitPanel from "./BitPanel";
import styled from "styled-components";
import {
  defaultFlop,
  defaultFlop754,
  convertFlop754ToFlop,
  Flop,
  Flop754,
  convertFlopToFlop754,
  calculateError,
  deconstructFlop754,
  getExponent,
  isSubnormal,
  getSignificand,
  generateFlop754,
  stringifyFlop,
  generateFlop,
} from "./flop";

const Wrapper = styled.div`
  max-width: 100%;
  padding: 2rem;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.8rem;
`;

interface FormatConverterProps {
  name: string;
  exponentWidth: number;
  significandWidth: number;
}

const FormatConverter: FC<FormatConverterProps> = (
  props: FormatConverterProps
): ReactElement => {
  const [flop, setFlop] = useState<null | Flop>(null);
  const [flop754, setFlop754] = useState(defaultFlop754(props.exponentWidth));
  const [storedFlop, setStoredFlop] = useState(defaultFlop());
  const [error, setError] = useState<null | Flop>(null);

  const onFlop754Update = (value: Flop754) => {
    setFlop(null);
    setFlop754(value);
    setStoredFlop(convertFlop754ToFlop(value));
  };

  const onFlopUpdate = (value: Flop) => {
    setFlop(value);
    const updated754Value = convertFlopToFlop754(
      value,
      props.exponentWidth,
      props.significandWidth
    );
    setFlop754(updated754Value);
    setStoredFlop(convertFlop754ToFlop(updated754Value));
  };

  useEffect(() => {
    setError(flop ? calculateError(flop, storedFlop) : null);
  }, [flop, storedFlop]);

  const { sign, exponent, significand } = deconstructFlop754(
    flop754,
    props.exponentWidth,
    props.significandWidth
  );

  return (
    <Wrapper>
      <Title>{props.name}</Title>
      <BitPanel
        {...props}
        sign={sign}
        exponent={exponent}
        exponentValue={getExponent(flop754)}
        significand={significand}
        significandValue={
          (isSubnormal(flop754) ? "(subnormal) " : "") + getSignificand(flop754)
        }
        updateValue={(
          sign: boolean[],
          exponent: boolean[],
          significand: boolean[]
        ) => onFlop754Update(generateFlop754(sign, exponent, significand))}
      />
      <Panel
        clearInput={flop === null}
        stored={stringifyFlop(storedFlop)}
        error={error ? stringifyFlop(error) : ""}
        bits={[sign, exponent, significand].flat(1)}
        updateInputValue={(inputValue: string) =>
          onFlopUpdate(generateFlop(inputValue))
        }
        updateValue={(bits: boolean[]) =>
          onFlop754Update(
            generateFlop754(
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
    </Wrapper>
  );
};

export default FormatConverter;

import React, { FC, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

import {
  FLOP_STORAGE_KEY,
  FLOP754_STORAGE_KEY,
  NOTATION_STORAGE_KEY,
  ROUNDING_MODE,
  ROUNDING_STORAGE_KEY,
} from "../constants";
import useLocalStorage from "../hooks/useLocalStorage";
import BitPanel from "./BitPanel";
import ConfigPanel from "./ConfigPanel";
import {
  calculateError,
  convertFlop754ToFlop,
  convertFlopToFlop754,
  deconstructFlop754,
  defaultFlop,
  defaultFlop754,
  deserializeFlop,
  deserializeFlop754,
  Flop,
  Flop754,
  generateFlop,
  generateFlop754,
  getExponent,
  getSignificand,
  isSubnormal,
  stringifyFlop,
} from "./flop";
import Panel from "./Panel";

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
  const [flop, setFlop] = useLocalStorage<null | Flop>(
    `${props.name}${FLOP_STORAGE_KEY}`,
    null,
    deserializeFlop
  );
  const [flop754, setFlop754] = useLocalStorage(
    `${props.name}${FLOP754_STORAGE_KEY}`,
    defaultFlop754(props.exponentWidth),
    deserializeFlop754
  );
  const [roundingMode, setRoundingMode] = useLocalStorage(
    `${props.name}${ROUNDING_STORAGE_KEY}`,
    ROUNDING_MODE.halfToEven
  );
  const [scientificNotation, setScientificNotation] = useLocalStorage(
    `${props.name}${NOTATION_STORAGE_KEY}`,
    false
  );
  const [storedFlop, setStoredFlop] = useState(defaultFlop());
  const [error, setError] = useState<null | Flop>(null);

  const onFlop754Update = (value: Flop754) => {
    setFlop(null);
    setFlop754(value);
  };

  const onFlopUpdate = (value: Flop | null) => {
    setFlop(value);
  };

  const onRoundingModeUpdate = (roundingMode: ROUNDING_MODE) => {
    setRoundingMode(roundingMode);
  };

  const onNotationUpdate = (isScientific: boolean) => {
    setScientificNotation(isScientific);
  };

  useEffect(() => {
    setStoredFlop(convertFlop754ToFlop(flop754));
  }, [flop754]);

  useEffect(() => {
    if (flop !== null) {
      const updated754Value = convertFlopToFlop754(
        flop,
        props.exponentWidth,
        props.significandWidth,
        roundingMode
      );
      setFlop754(updated754Value);
    }
  }, [
    flop,
    roundingMode,
    setFlop754,
    props.exponentWidth,
    props.significandWidth,
  ]);

  useEffect(() => {
    setError(flop ? calculateError(flop, storedFlop) : null);
  }, [flop, storedFlop]);

  // clear states with values if component widths change
  useEffect(() => {
    setFlop(null);
    setFlop754(defaultFlop754(props.exponentWidth));
  }, [setFlop, setFlop754, props.exponentWidth, props.significandWidth]);

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
        formatName={props.name}
        clearInput={flop === null}
        stored={stringifyFlop(storedFlop, scientificNotation)}
        error={error ? stringifyFlop(error, scientificNotation) : ""}
        bits={[sign, exponent, significand].flat(1)}
        updateInputValue={(inputValue: string) =>
          onFlopUpdate(
            inputValue.length === 0 ? null : generateFlop(inputValue)
          )
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
      <ConfigPanel
        roundingMode={roundingMode}
        scientificNotation={scientificNotation}
        updateRoundingMode={onRoundingModeUpdate}
        updateNotation={onNotationUpdate}
      />
    </Wrapper>
  );
};

export default FormatConverter;

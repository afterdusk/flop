import React, { FC, ReactElement } from "react";
import styled from "styled-components";

import {
  NOTATION_FIELD_NAME,
  ROUNDING_MODE,
  ROUNDING_MODE_FIELD_NAME,
} from "../constants";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem 0;
`;

const Row = styled.div`
  padding: 0.4rem 0;

  display: flex;
`;

const Col = styled.div`
  flex: ${(props: { size: number }) => props.size};
  display: flex;
  align-items: center;
`;

const FieldName = styled.div`
  white-space: nowrap;
`;

const RadioLabel = styled.label`
  width: 100%;
`;

const RadioButton = styled.input.attrs({ type: "radio" })`
  width: 100%;
  margin: 0;
`;

const LineBreak = styled.br``;

interface ConfigPanelProps {
  roundingMode: ROUNDING_MODE;
  scientificNotation: boolean;
  updateRoundingMode: (mode: ROUNDING_MODE) => void;
  updateNotation: (isScientific: boolean) => void;
}

const ConfigPanel: FC<ConfigPanelProps> = (
  props: ConfigPanelProps
): ReactElement => {
  return (
    <Wrapper>
      {/* Rounding Mode */}
      <Row>
        <Col size={2}>
          <FieldName>{ROUNDING_MODE_FIELD_NAME}</FieldName>
        </Col>
        <Col size={5}>
          <RadioLabel>
            <RadioButton
              checked={props.roundingMode === ROUNDING_MODE.halfToEven}
              onChange={() =>
                props.updateRoundingMode(ROUNDING_MODE.halfToEven)
              }
            />
            Nearest, Ties to Even
            <LineBreak />
            (IEEE 754 default)
          </RadioLabel>
          <RadioLabel>
            <RadioButton
              checked={props.roundingMode === ROUNDING_MODE.towardZero}
              onChange={() =>
                props.updateRoundingMode(ROUNDING_MODE.towardZero)
              }
            />
            Toward 0
            <LineBreak />
            (truncation)
          </RadioLabel>
        </Col>
      </Row>
      {/* Result Notation */}
      <Row>
        <Col size={2}>
          <FieldName>{NOTATION_FIELD_NAME}</FieldName>
        </Col>
        <Col size={5}>
          <RadioLabel>
            <RadioButton
              checked={!props.scientificNotation}
              onChange={() => props.updateNotation(false)}
            />
            Regular
          </RadioLabel>
          <RadioLabel>
            <RadioButton
              checked={props.scientificNotation}
              onChange={() => props.updateNotation(true)}
            />
            Scientific
          </RadioLabel>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ConfigPanel;

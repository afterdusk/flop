import React, { FC, useState, ReactElement, useEffect } from "react";
import styled from "styled-components";
import * as Flop from "../Flop";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem 0;
`;

const Row = styled.div`
  min-width: 100%;
  min-height: 1.4rem;
  padding: 0.2rem;

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

const InputField = styled.input`
  width: 100%;
`;

type PanelProps = {
  inputCleared: boolean;
  stored: string;
  updateValue: (value: Flop.Flop) => void;
};

const Panel: FC<PanelProps> = (props: PanelProps): ReactElement => {
  const [decimal, setDecimal] = useState((0).toString());

  useEffect(() => {
    props.updateValue(Flop.generateFlop(decimal));
  }, [decimal]);

  return (
    <Wrapper>
      {/* Decimal Input */}
      <Row>
        <Col size={2}>
          <FieldName>Decimal Input</FieldName>
        </Col>
        <Col size={5}>
          {/* Workaround for parent to clear input field.
              TODO: Find a better way to do this. */}
          {props.inputCleared && (
            <InputField
              type="text"
              onChange={(e) => setDecimal(e.target.value)}
            />
          )}
          {!props.inputCleared && (
            <InputField
              type="text"
              onChange={(e) => setDecimal(e.target.value)}
            />
          )}
        </Col>
      </Row>
      {/* Value Stored */}
      <Row>
        <Col size={2}>
          <FieldName>Value Stored</FieldName>
        </Col>
        <Col size={5}>
          <InputField disabled readOnly value={props.stored} />
        </Col>
      </Row>
      {/* Error */}
      <Row>
        <Col size={2}>
          <FieldName>Error</FieldName>
        </Col>
        <Col size={5}>
          <InputField disabled readOnly />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Panel;

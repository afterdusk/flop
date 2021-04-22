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
  clearInput: boolean;
  stored: string;
  error: string;
  updateValue: (value: Flop.Flop) => void;
  inputCleared: () => void;
};

const Panel: FC<PanelProps> = (props: PanelProps): ReactElement => {
  const [decimal, setDecimal] = useState("");

  useEffect(() => {
    if (props.clearInput) {
      setDecimal("");
      props.inputCleared();
    }
  }, [props.clearInput]);

  const onDecimalInput = (input: string) => {
    setDecimal(input);
    props.updateValue(Flop.generateFlop(input));
  };

  return (
    <Wrapper>
      {/* Decimal Input */}
      <Row>
        <Col size={2}>
          <FieldName>Decimal Input</FieldName>
        </Col>
        <Col size={5}>
          <InputField
            type="text"
            value={decimal}
            onChange={(e) => onDecimalInput(e.target.value)}
          />
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
          <InputField disabled readOnly value={props.error} />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Panel;

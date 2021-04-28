import React, { FC, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

import { DECIMAL_INPUT_STORAGE_KEY, HEX_PREFIX_STRING } from "../constants";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  bitsFromHexString,
  bitsFromString,
  stringifyBits,
  stringifyBitsToHex,
} from "./flop";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem 0;
`;

const Row = styled.div`
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

  &:invalid {
    background-color: pink;
  }
`;

interface PanelProps {
  formatName: string;
  clearInput: boolean;
  stored: string;
  error: string;
  bits: boolean[];
  updateInputValue: (inputValue: string) => void;
  updateValue: (bits: boolean[]) => void;
}

const Panel: FC<PanelProps> = (props: PanelProps): ReactElement => {
  const [decimalInput, setDecimalInput] = useLocalStorage(
    `${props.formatName}${DECIMAL_INPUT_STORAGE_KEY}`,
    ""
  );
  const [binaryRep, setBinaryRep] = useState(stringifyBits(props.bits));
  const [hexRep, setHexRep] = useState(stringifyBitsToHex(props.bits));

  useEffect(() => {
    if (props.clearInput) {
      setDecimalInput("");
    }
  }, [props.clearInput, setDecimalInput]);

  useEffect(() => {
    setBinaryRep(stringifyBits(props.bits));
    setHexRep(stringifyBitsToHex(props.bits));
  }, [props.bits]);

  const onDecimalInput = (input: string, valid: boolean) => {
    setDecimalInput(input);
    if (valid) {
      props.updateInputValue(input);
    }
  };

  const onBinaryInput = (input: string, valid: boolean) => {
    setBinaryRep(input);
    if (valid) {
      props.updateValue(bitsFromString(input));
    }
  };

  const onHexInput = (input: string, valid: boolean) => {
    setHexRep(input);
    if (valid) {
      props.updateValue(bitsFromHexString(input));
    }
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
            pattern={`^[+-]?\\d*(?:\\.?\\d*(?:[eE][+-]?\\d+)?)?$`}
            value={decimalInput}
            onChange={(e) =>
              onDecimalInput(e.target.value, e.target.validity.valid)
            }
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
      {/* Binary Representation */}
      <Row>
        <Col size={2}>
          <FieldName>Binary Representation</FieldName>
        </Col>
        <Col size={5}>
          <InputField
            pattern={`^[01]{${props.bits.length}}$`}
            value={binaryRep}
            onChange={(e) =>
              onBinaryInput(e.target.value, e.target.validity.valid)
            }
          />
        </Col>
      </Row>
      {/* Hexadecimal Representation */}
      <Row>
        <Col size={2}>
          <FieldName>Hex Representation</FieldName>
        </Col>
        <Col size={5}>
          {HEX_PREFIX_STRING}
          <InputField
            pattern={`^[a-fA-F0-9]{${Math.floor(props.bits.length / 4)}}$`}
            value={hexRep}
            onChange={(e) =>
              onHexInput(e.target.value, e.target.validity.valid)
            }
          />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Panel;

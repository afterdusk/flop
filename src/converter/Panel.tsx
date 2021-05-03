import React, { FC, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { useClipboard } from "use-clipboard-copy";

import {
  ACCENT_COLOR,
  BACKGROUND_COLOR,
  BIT_REPRESENTATION_FIELD_NAME,
  CLIPBOARD_BUTTON_STRING,
  CLIPBOARD_TOOLTIP_STRING,
  DECIMAL_INPUT_FIELD_NAME,
  DECIMAL_INPUT_STORAGE_KEY,
  ERROR_FIELD_NAME,
  HEX_PREFIX_STRING,
  HEX_REPRESENTATION_FIELD,
  VALUE_STORED_FIELD_NAME,
} from "../constants";
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

const ClipboardButton = styled.button`
  max-width: 100%;
  max-height: 100%;
  padding: 0 0.4rem;
  margin: 0.2rem;

  background-color: transparent;
  color: white;
  border-style: solid;
  border-radius: 0.2rem;
  border-color: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;

  &:hover {
    background-color: white;
    color: ${BACKGROUND_COLOR};
  }

  &:active {
    background-color: ${ACCENT_COLOR};
    border-color: ${ACCENT_COLOR};
    transform: scale(0.96);
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

  // for copying to clipboard
  const clipboard = useClipboard();

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
      props.updateValue(bitsFromHexString(input, props.bits.length));
    }
  };

  const onCopyButton = (text: string) => {
    clipboard.copy(text);
  };

  return (
    <Wrapper>
      {/* Decimal Input */}
      <Row>
        <Col size={2}>
          <FieldName>{DECIMAL_INPUT_FIELD_NAME}</FieldName>
        </Col>
        <Col size={5}>
          <InputField
            title={DECIMAL_INPUT_FIELD_NAME}
            autoFocus
            pattern={`^[+-]?\\d*(?:\\.?\\d*(?:[eE][+-]?\\d+)?)?$`}
            value={decimalInput}
            onChange={(e) =>
              onDecimalInput(e.target.value, e.target.validity.valid)
            }
          />
          <ClipboardButton
            title={CLIPBOARD_TOOLTIP_STRING}
            onClick={() => onCopyButton(decimalInput)}
          >
            {CLIPBOARD_BUTTON_STRING}
          </ClipboardButton>
        </Col>
      </Row>
      {/* Value Stored */}
      <Row>
        <Col size={2}>
          <FieldName>{VALUE_STORED_FIELD_NAME}</FieldName>
        </Col>
        <Col size={5}>
          <InputField
            title={VALUE_STORED_FIELD_NAME}
            disabled
            readOnly
            value={props.stored}
          />
          <ClipboardButton
            title={CLIPBOARD_TOOLTIP_STRING}
            onClick={() => onCopyButton(props.stored)}
          >
            {CLIPBOARD_BUTTON_STRING}
          </ClipboardButton>
        </Col>
      </Row>
      {/* Error */}
      <Row>
        <Col size={2}>
          <FieldName>{ERROR_FIELD_NAME}</FieldName>
        </Col>
        <Col size={5}>
          <InputField
            title={ERROR_FIELD_NAME}
            disabled
            readOnly
            value={props.error}
          />
          <ClipboardButton
            title={CLIPBOARD_TOOLTIP_STRING}
            onClick={() => onCopyButton(props.error)}
          >
            {CLIPBOARD_BUTTON_STRING}
          </ClipboardButton>
        </Col>
      </Row>
      {/* Binary Representation */}
      <Row>
        <Col size={2}>
          <FieldName>{BIT_REPRESENTATION_FIELD_NAME}</FieldName>
        </Col>
        <Col size={5}>
          <InputField
            title={BIT_REPRESENTATION_FIELD_NAME}
            required
            pattern={`^[01]{${props.bits.length}}$`}
            value={binaryRep}
            onChange={(e) =>
              onBinaryInput(e.target.value, e.target.validity.valid)
            }
          />
          <ClipboardButton
            title={CLIPBOARD_TOOLTIP_STRING}
            onClick={() => onCopyButton(binaryRep)}
          >
            {CLIPBOARD_BUTTON_STRING}
          </ClipboardButton>
        </Col>
      </Row>
      {/* Hexadecimal Representation */}
      <Row>
        <Col size={2}>
          <FieldName>{HEX_REPRESENTATION_FIELD}</FieldName>
        </Col>
        <Col size={5}>
          {HEX_PREFIX_STRING}
          <InputField
            title={HEX_REPRESENTATION_FIELD}
            required
            pattern={`^[a-fA-F0-9]{${Math.ceil(props.bits.length / 4)}}$`}
            value={hexRep}
            ref={clipboard.target}
            onChange={(e) =>
              onHexInput(e.target.value, e.target.validity.valid)
            }
          />
          <ClipboardButton
            title={CLIPBOARD_TOOLTIP_STRING}
            onClick={() => onCopyButton(hexRep)}
          >
            {CLIPBOARD_BUTTON_STRING}
          </ClipboardButton>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Panel;

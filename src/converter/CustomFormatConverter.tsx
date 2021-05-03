import React, { FC, ReactElement } from "react";
import styled from "styled-components";

import {
  CUSTOM_EXPONENT_FIELD_NAME,
  CUSTOM_EXPONENT_KEY,
  CUSTOM_SIGNIFICAND_FIELD_NAME,
  CUSTOM_SIGNIFICAND_KEY,
  FIXED_SIGN_FIELD_NAME,
  TOTAL_WIDTH_FIELD_NAME,
} from "../constants";
import useLocalStorage from "../hooks/useLocalStorage";
import FormatConverter from "./FormatConverter";

const Wrapper = React.Fragment;

const WidthPanel = styled.div`
  max-width: 60%;
  box-sizing: border-box;
  padding: 2rem 0 0 0;
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

const NumberInputField = styled.input.attrs({
  type: "number",
})`
  width: 100%;
`;

interface CustomFormatPanelProps {
  name: string;
  minExponentWidth: number;
  maxExponentWidth: number;
  minSignificandWidth: number;
  maxSignificandWidth: number;
}

// TODO: Refactor the CSS in this component
const CustomFormatConverter: FC<CustomFormatPanelProps> = (
  props: CustomFormatPanelProps
): ReactElement => {
  const [exponentWidth, setExponentWidth] = useLocalStorage(
    `${props.name}${CUSTOM_EXPONENT_KEY}`,
    props.minExponentWidth
  );
  const [significandWidth, setSignificandWidth] = useLocalStorage(
    `${props.name}${CUSTOM_SIGNIFICAND_KEY}`,
    props.minSignificandWidth
  );

  const onExponentUpdate = (value: number, valid: boolean) => {
    if (valid && !isNaN(value)) {
      console.log(value, valid);
      setExponentWidth(value);
    }
  };

  const onSignificandUpdate = (value: number, valid: boolean) => {
    if (valid && !isNaN(value)) {
      setSignificandWidth(value);
    }
  };

  return (
    <Wrapper>
      <WidthPanel>
        {/* Sign Width */}
        <Row>
          <Col size={2}>
            <FieldName>{FIXED_SIGN_FIELD_NAME}</FieldName>
          </Col>
          <Col size={1}>
            <NumberInputField
              title={FIXED_SIGN_FIELD_NAME}
              disabled
              readOnly
              value={1}
            />
          </Col>
        </Row>
        {/* Exponent Width */}
        <Row>
          <Col size={2}>
            <FieldName>{CUSTOM_EXPONENT_FIELD_NAME}</FieldName>
          </Col>
          <Col size={1}>
            <NumberInputField
              title={CUSTOM_EXPONENT_FIELD_NAME}
              min={props.minExponentWidth}
              max={props.maxExponentWidth}
              value={exponentWidth}
              onChange={(e) =>
                onExponentUpdate(
                  parseInt(e.target.value),
                  e.target.validity.valid
                )
              }
            />
          </Col>
        </Row>
        {/* Significand Width */}
        <Row>
          <Col size={2}>
            <FieldName>{CUSTOM_SIGNIFICAND_FIELD_NAME}</FieldName>
          </Col>
          <Col size={1}>
            <NumberInputField
              title={CUSTOM_SIGNIFICAND_FIELD_NAME}
              min={props.minSignificandWidth}
              max={props.maxSignificandWidth}
              value={significandWidth}
              onChange={(e) =>
                onSignificandUpdate(
                  parseInt(e.target.value),
                  e.target.validity.valid
                )
              }
            />
          </Col>
        </Row>
        {/* Total Width */}
        <Row>
          <Col size={2}>
            <FieldName>{TOTAL_WIDTH_FIELD_NAME}</FieldName>
          </Col>
          <Col size={1}>
            <NumberInputField
              title={TOTAL_WIDTH_FIELD_NAME}
              disabled
              readOnly
              value={1 + significandWidth + exponentWidth}
            />
          </Col>
        </Row>
      </WidthPanel>
      <FormatConverter
        name={props.name}
        exponentWidth={exponentWidth}
        significandWidth={significandWidth}
      />
    </Wrapper>
  );
};

export default CustomFormatConverter;

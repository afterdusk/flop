import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem;
`;

const Row = styled.div`
  min-width: 100%;
  min-height: 1.4rem;
  padding: 0.4rem;

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
  stored: string;
};

const Panel: FC<PanelProps> = (props: PanelProps): ReactElement => (
  <Wrapper>
    {/* Decimal Input */}
    <Row>
      <Col size={2}>
        <FieldName>Decimal</FieldName>
      </Col>
      <Col size={5}>
        <InputField type="text" />
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

export default Panel;

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

const FieldName = styled.div``;

const InputField = styled.input`
  width: 100%;
`;

const Field = styled.p`
  width: 100%;
  margin: 0;
`;

const Panel: FC = (): ReactElement => (
  <Wrapper>
    {/* Decimal Input */}
    <Row>
      <Col size={1}>
        <FieldName>Decimal</FieldName>
      </Col>
      <Col size={3}>
        {" "}
        <InputField type="text" />
      </Col>
    </Row>
    {/* Value Stored */}
    <Row>
      <Col size={1}>
        <FieldName>Value Stored</FieldName>
      </Col>
      <Col size={3}>
        <Field />
      </Col>
    </Row>
    {/* Error */}
    <Row>
      <Col size={1}>
        <FieldName>Error</FieldName>
      </Col>
      <Col size={3}>
        <Field />
      </Col>
    </Row>
  </Wrapper>
);

export default Panel;

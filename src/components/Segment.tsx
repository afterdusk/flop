import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
  font-size: 1.4rem;
  margin: 0;
`;

const Field = styled.p`
  min-width: 100%;
  box-sizing: border-box;
  padding: 0.4em;
  margin: 0;
`;

const BitField = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  padding: 0.4em;
  margin: 0;

  display: flex;
  justify-content: center;
  flex-direction: row;
`;

type SegmentProps = {
  name: string;
  value: string;
  decimal: string;
  width: number;
};

const Segment: FC<SegmentProps> = (props: SegmentProps): ReactElement => (
  <Wrapper>
    <Title>{props.name}</Title>
    <Field>{props.value}</Field>
    <Field>{props.decimal}</Field>
    <BitField>
      {[...Array(props.width)].map((e, i) => (
        <input key={i} type="checkbox" />
      ))}
    </BitField>
  </Wrapper>
);

export default Segment;

import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 0.2rem;

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
  padding: 0.4rem;
  margin: 0;
`;

const BitField = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  padding: 0.4rem;
  margin: 0;

  display: flex;
  justify-content: center;
  flex-direction: row;
`;

type SegmentProps = {
  name: string;
  value: string;
  decimal: number;
  bits: boolean[];
  onUpdate: (index: number) => void;
};

const Segment: FC<SegmentProps> = (props: SegmentProps): ReactElement => (
  <Wrapper>
    <Title>{props.name}</Title>
    <Field>{props.value}</Field>
    <Field>{props.decimal.toString()}</Field>
    <BitField>
      {[...props.bits].map((e, i) => (
        <input
          key={i}
          type="checkbox"
          checked={e}
          onChange={() => props.onUpdate(i)}
        />
      ))}
    </BitField>
  </Wrapper>
);

export default Segment;

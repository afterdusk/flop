import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 0.2rem;
  margin: 0 auto;

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

const BitCheckbox = styled.input``;

type SegmentProps = {
  name: string;
  value: string;
  decimal: string;
  bits: boolean[];
  updateBits: (bits: boolean[]) => void;
};

const BitSegment: FC<SegmentProps> = (props: SegmentProps): ReactElement => (
  <Wrapper>
    <Title>{props.name}</Title>
    <Field>{props.value}</Field>
    <Field>{props.decimal}</Field>
    <BitField>
      {[...props.bits].map((e, i) => (
        <BitCheckbox
          key={i}
          type="checkbox"
          checked={e}
          onChange={() =>
            props.updateBits([
              ...props.bits.slice(0, i),
              !props.bits[i],
              ...props.bits.slice(i + 1),
            ])
          }
        />
      ))}
    </BitField>
  </Wrapper>
);

export default BitSegment;

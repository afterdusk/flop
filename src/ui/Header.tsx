import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { APP_TITLE } from "../constants";

const Wrapper = styled.header`
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
`;

const Footer: FC = (): ReactElement => (
  <Wrapper>
    <Title>{APP_TITLE}</Title>
  </Wrapper>
);

export default Footer;

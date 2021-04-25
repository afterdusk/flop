import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import Format from "./components/Format";
import BigNumber from "bignumber.js";
import * as Constants from "./Constants";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding: 6rem; // top-bottom left-right

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow: auto;

  background-color: ${Constants.BACKGROUND_COLOR};
  text-align: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Header = styled.header``;

const Title = styled.h1`
  font-size: 2.4rem;
`;

const Divider = styled.hr`
  width: 100%;
`;

const Footer = styled.footer`
  padding: 1rem;
  font-size: 1rem;
`;

const VersionNumber = styled.div`
  font-size: 1.4rem;
`;

const Text = styled.p``;

const Link = styled.a`
  color: ${Constants.ACCENT_COLOR};
  text-decoration: none;
`;

type TextWithLinkProps = {
  pre: string;
  link: string;
  post: string;
  url: string;
};

const TextWithLink: FC<TextWithLinkProps> = (
  props: TextWithLinkProps
): ReactElement => (
  <Text>
    {props.pre}
    <Link href={props.url}>{props.link}</Link>
    {props.post}
  </Text>
);

const App: FC = (): ReactElement => {
  // configure bignumber.js library
  BigNumber.set({ DECIMAL_PLACES: Constants.BIGNUMBER_DECIMAL_PLACES });

  return (
    <Wrapper>
      <Header>
        <Title>{Constants.APP_TITLE}</Title>
      </Header>
      <Format {...Constants.FP32} />
      <Format {...Constants.FP64} />
      <Format {...Constants.FP16} />
      <Format {...Constants.BF16} />
      <Format {...Constants.TF32} />
      <Divider />
      <Footer>
        <VersionNumber>
          <TextWithLink
            {...Constants.BUILD_SOURCE_TEXT}
            url={Constants.BUILD_SOURCE_URL}
          />
        </VersionNumber>
        <TextWithLink
          {...Constants.UI_ACKNOWLEDGEMENT_TEXT}
          url={Constants.UI_ACKNOWLEDGEMENT_URL}
        />
        <TextWithLink
          {...Constants.BIGNUM_ACKNOWLEDGEMENT_TEXT}
          url={Constants.BIGNUM_ACKNOWLEDGEMENT_URL}
        />
        <TextWithLink
          {...Constants.ISSUES_CONTRIBUTION_TEXT}
          url={Constants.ISSUES_CONTRIBUTION_URL}
        />
      </Footer>
    </Wrapper>
  );
};

export default App;

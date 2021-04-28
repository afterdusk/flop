import React, { FC, ReactElement } from "react";
import styled from "styled-components";

import {
  ACCENT_COLOR,
  BIGNUM_ACKNOWLEDGEMENT_TEXT,
  BIGNUM_ACKNOWLEDGEMENT_URL,
  BUILD_SOURCE_TEXT,
  BUILD_SOURCE_URL,
  ISSUES_CONTRIBUTION_TEXT,
  ISSUES_CONTRIBUTION_URL,
  UI_ACKNOWLEDGEMENT_TEXT,
  UI_ACKNOWLEDGEMENT_URL,
} from "../constants";

const Wrapper = styled.footer`
  padding: 1rem;
`;

const Divider = styled.hr`
  width: 100%;
`;

const VersionNumber = styled.div`
  font-size: 1.4rem;
`;

const Acknowledgements = styled.div`
  font-size: 1rem;
`;

const Text = styled.p``;

const Link = styled.a`
  color: ${ACCENT_COLOR};
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

const Footer: FC = (): ReactElement => (
  <Wrapper>
    <Divider />
    <VersionNumber>
      <TextWithLink {...BUILD_SOURCE_TEXT} url={BUILD_SOURCE_URL} />
    </VersionNumber>
    <Acknowledgements>
      <TextWithLink {...UI_ACKNOWLEDGEMENT_TEXT} url={UI_ACKNOWLEDGEMENT_URL} />
      <TextWithLink
        {...BIGNUM_ACKNOWLEDGEMENT_TEXT}
        url={BIGNUM_ACKNOWLEDGEMENT_URL}
      />
      <TextWithLink
        {...ISSUES_CONTRIBUTION_TEXT}
        url={ISSUES_CONTRIBUTION_URL}
      />
    </Acknowledgements>
  </Wrapper>
);

export default Footer;

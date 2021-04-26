import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import * as Constants from "../Constants";
import TextWithLink from "./TestWithLink";

const Wrapper = styled.footer`
  padding: 1rem;
`;

const VersionNumber = styled.div`
  font-size: 1.4rem;
`;

const Acknowledgements = styled.div`
  font-size: 1rem;
`;

const Footer: FC = (): ReactElement => (
  <Wrapper>
    <VersionNumber>
      <TextWithLink
        {...Constants.BUILD_SOURCE_TEXT}
        url={Constants.BUILD_SOURCE_URL}
      />
    </VersionNumber>
    <Acknowledgements>
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
    </Acknowledgements>
  </Wrapper>
);

export default Footer;

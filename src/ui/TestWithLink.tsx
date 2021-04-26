import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { ACCENT_COLOR } from "../constants";

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

export default TextWithLink;

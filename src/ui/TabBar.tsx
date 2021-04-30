import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { BACKGROUND_COLOR } from "../constants";

const Wrapper = styled.div`
  width: 100%;
  min-width: 50rem; // TODO: Handle this more elegantly
  padding: 1rem;
`;

const TabButton = styled.button`
  padding: 0.4rem 0.8rem;
  margin: 0.6rem;

  font-size: 1.4rem;
  font-weight: bold;
  background-color: transparent;
  color: white;
  border-style: solid;
  border-radius: 0.4rem;
  border-color: white;
  cursor: pointer;

  &:hover,
  &.active {
    background-color: white;
    color: ${BACKGROUND_COLOR};
  }
`;

interface TabBarProps {
  tabs: {
    name: string;
    urlPath: string;
  }[];
  activeTab: number;
  clickTab: (index: number) => void;
}

const TabBar: FC<TabBarProps> = (props: TabBarProps): ReactElement => (
  <Wrapper>
    {props.tabs.map((e, i) => (
      <Link key={i} to={e.urlPath}>
        <TabButton
          key={i}
          title={e.name}
          className={i === props.activeTab ? "active" : ""}
          onClick={() => props.clickTab(i)}
        >
          {e.name}
        </TabButton>
      </Link>
    ))}
  </Wrapper>
);

export default TabBar;

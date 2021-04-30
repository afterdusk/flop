import React, { Children, FC, ReactElement, useState } from "react";
import styled from "styled-components";

import { BACKGROUND_COLOR } from "../constants";

const Wrapper = styled.header`
  width: 100%;
  min-width: 50rem; // TODO: Handle this more elegantly
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabBar = styled.div``;

const TabButton = styled.button`
  padding: 0.4rem 0.8rem;
  margin: 0.6rem;

  font-size: 1.8rem;
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

// child component must have name attribute for tab button
interface TabProps {
  name: string;
}

interface TabsProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
}

const Tabs: FC<TabsProps> = (props: TabsProps): ReactElement => {
  const [active, setActive] = useState(0);

  // TODO: Consider implementing lazy-loading
  const onClick = (index: number) => {
    setActive(index);
  };

  return (
    <Wrapper>
      <TabBar>
        {Children.map(props.children, (c, i) => (
          <TabButton
            key={i}
            className={i === active ? "active" : ""}
            onClick={() => onClick(i)}
          >
            {c.props.name}
          </TabButton>
        ))}
      </TabBar>
      {Children.toArray(props.children)[active]}
    </Wrapper>
  );
};

export default Tabs;

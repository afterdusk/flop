import React from "react";
import styled from "styled-components";
import * as Constants from "./constants";

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding: 8rem 6rem; // top-bottom left-right

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

const Header = styled.header`
  font-size: 1.8rem;
`;

const Title = styled.h1``;

const App: React.FC = () => (
  <Wrapper>
    <Header>
      <Title>{Constants.APP_TITLE}</Title>
    </Header>
  </Wrapper>
);

export default App;

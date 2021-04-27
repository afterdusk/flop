import BigNumber from "bignumber.js";
import React, { FC, ReactElement } from "react";
import styled from "styled-components";

import {
  BACKGROUND_COLOR,
  BF16,
  BIGNUMBER_DECIMAL_PLACES,
  FP16,
  FP32,
  FP64,
  TF32,
} from "./constants";
import FormatConverter from "./converter/FormatConverter";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 50rem; // TODO: Handle this more elegantly
  min-height: 100%;
  box-sizing: border-box;
  padding: 6rem; // top-bottom left-right

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow: auto;

  background-color: ${BACKGROUND_COLOR};
  text-align: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Divider = styled.hr`
  width: 100%;
`;

const App: FC = (): ReactElement => {
  // configure bignumber.js library
  BigNumber.set({ DECIMAL_PLACES: BIGNUMBER_DECIMAL_PLACES });

  return (
    <Wrapper>
      <Header />
      <FormatConverter {...FP32} />
      <FormatConverter {...FP64} />
      <FormatConverter {...FP16} />
      <FormatConverter {...BF16} />
      <FormatConverter {...TF32} />
      <Divider />
      <Footer />
    </Wrapper>
  );
};

export default App;

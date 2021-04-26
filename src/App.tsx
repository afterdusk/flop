import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import FormatConverter from "./converter/FormatConverter";
import BigNumber from "bignumber.js";
import * as Constants from "./Constants";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

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

  background-color: ${Constants.BACKGROUND_COLOR};
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
  BigNumber.set({ DECIMAL_PLACES: Constants.BIGNUMBER_DECIMAL_PLACES });

  return (
    <Wrapper>
      <Header />
      <FormatConverter {...Constants.FP32} />
      <FormatConverter {...Constants.FP64} />
      <FormatConverter {...Constants.FP16} />
      <FormatConverter {...Constants.BF16} />
      <FormatConverter {...Constants.TF32} />
      <Divider />
      <Footer />
    </Wrapper>
  );
};

export default App;

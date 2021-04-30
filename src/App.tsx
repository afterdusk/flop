import BigNumber from "bignumber.js";
import React, { FC, ReactElement, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
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
import TabBar from "./ui/TabBar";

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

const App: FC = (): ReactElement => {
  // supported formats
  const formats = [FP32, FP64, FP16, BF16, TF32];
  const defaultFormatIndex = 0;

  // current tab
  const [active, setActive] = useState(defaultFormatIndex);

  // configure bignumber.js library
  BigNumber.set({ DECIMAL_PLACES: BIGNUMBER_DECIMAL_PLACES });

  const onTabChange = (target: number) => {
    setActive(target);
  };

  return (
    <Wrapper>
      <Header />
      <Router>
        <TabBar tabs={formats} activeTab={active} clickTab={onTabChange} />
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => <Redirect to={formats[defaultFormatIndex].urlPath} />}
          />
          {formats.map((e, i) => (
            <Route
              key={i}
              path={e.urlPath}
              render={() => {
                onTabChange(i);
                return <FormatConverter key={i} {...e} />;
              }}
            />
          ))}
        </Switch>
      </Router>
      <Footer />
    </Wrapper>
  );
};

export default App;

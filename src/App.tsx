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
  CUSTOM,
  FP16,
  FP32,
  FP64,
  MAIN_FONT_FAMILY,
  TF32,
} from "./constants";
import CustomFormatConverter from "./converter/CustomFormatConverter";
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
  color: white;
  text-align: center;
  font-family: ${MAIN_FONT_FAMILY};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const App: FC = (): ReactElement => {
  // supported formats
  const formats = [FP32, FP64, FP16, BF16, TF32];
  const defaultFormatIndex = 0;

  // custom format
  const custom = CUSTOM;

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
        <TabBar
          tabs={[...formats, custom]}
          activeTab={active}
          clickTab={onTabChange}
        />
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
          <Route
            path={custom.urlPath}
            render={() => {
              onTabChange(formats.length);
              return <CustomFormatConverter {...custom} />;
            }}
          />
        </Switch>
      </Router>
      <Footer />
    </Wrapper>
  );
};

export default App;

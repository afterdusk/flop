import BigNumber from "bignumber.js";
import React, { FC, ReactElement, useEffect, useMemo, useState } from "react";
import ReactGA from "react-ga";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";

import {
  BACKGROUND_COLOR,
  BIGNUMBER_DECIMAL_PLACES,
  CUSTOM,
  DEFAULT_FORMAT_INDEX,
  FORMATS,
  GA_UA_ID,
  IS_TEST_ENV,
  MAIN_FONT_FAMILY,
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
  const [active, setActive] = useState(DEFAULT_FORMAT_INDEX);
  const location = useLocation();
  const history = useHistory();
  const tabs = useMemo(() => [...FORMATS, CUSTOM], []);

  // configure bignumber.js library
  BigNumber.set({ DECIMAL_PLACES: BIGNUMBER_DECIMAL_PLACES });

  // set up google analytics
  ReactGA.initialize(GA_UA_ID, { testMode: IS_TEST_ENV });
  history.listen((location, action) => {
    ReactGA.pageview(location.pathname);
    ReactGA.set({ page: location.pathname, action: action });
  });

  const onTabChange = (urlPath: string) => {
    history.push(urlPath);
  };

  useEffect(() => {
    const index = tabs.findIndex((e) => e.urlPath === location.pathname);
    if (index !== -1) {
      setActive(index);
      document.title = tabs[index].pageTitle;
    }
  }, [location, tabs]);

  return (
    <Wrapper>
      <Header />
      <TabBar tabs={tabs} activeTab={active} clickTab={onTabChange} />
      <Switch>
        {FORMATS.map((e, i) => (
          <Route key={i} path={e.urlPath}>
            <FormatConverter key={i} {...e} />
          </Route>
        ))}
        <Route path={CUSTOM.urlPath}>
          <CustomFormatConverter {...CUSTOM} />
        </Route>
        <Route path={"/"}>
          <Redirect to={FORMATS[DEFAULT_FORMAT_INDEX].urlPath} />
        </Route>
      </Switch>
      <Footer />
    </Wrapper>
  );
};

export default App;

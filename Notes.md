CSS Style Guide
https://gist.github.com/basham/2175a16ab7c60ce8e001

Page Sizing
https://medium.com/developer-rants/what-if-height-100vh-is-bigger-than-your-screen-7f39c62ac170

```css
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
```

```javascript
// from: https://fonts.google.com/icons?selected=Material+Icons:content_copy
const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);

// naming convention follows https://github.com/airbnb/javascript/#naming--uppercase

// import { useState } from "react";

// /\*_
// _ from https://usehooks.com/useLocalStorage/
// _ @param key
// _ @param initialValue
// _ @returns
// _/
// const useLocalStorage = <T>(
// key: string,
// initialValue: T,
// reviver = JSON.parse
// ): readonly [T, (value: T | ((val: T) => T)) => void] => {
// // state to store our value
// // pass initial state function to useState so logic is only executed once
// const [storedValue, setStoredValue] = useState<T>(() => {
// try {
// // get from local storage by key
// const item = window.localStorage.getItem(key);
// return item ? reviver(item) : initialValue;
// } catch (error) {
// // if error also return initialValue
// console.log(error);
// return initialValue;
// }
// });
// // return a wrapped version of useState's setter function that
// // persists the new value to localStorage
// const setValue = (value: T | ((val: T) => T)) => {
// try {
// // allow value to be a function so we have same API as useState
// const valueToStore =
// value instanceof Function ? value(storedValue) : value;
// // save state
// setStoredValue(valueToStore);
// window.localStorage.setItem(key, JSON.stringify(valueToStore));
// } catch (error) {
// console.log(error);
// }
// };
// return [storedValue, setValue] as const;
// };

// import React, { Children, FC, ReactElement, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Link,
//   Redirect,
//   Route,
//   Switch,
// } from "react-router-dom";
// import styled from "styled-components";

// import { BACKGROUND_COLOR } from "../constants";

// const Wrapper = styled.header`
//   width: 100%;
//   min-width: 50rem; // TODO: Handle this more elegantly
//   padding: 1rem;

//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const TabBar = styled.div``;

// const TabButton = styled.button`
//   padding: 0.4rem 0.8rem;
//   margin: 0.6rem;

//   font-size: 1.8rem;
//   font-weight: bold;
//   background-color: transparent;
//   color: white;
//   border-style: solid;
//   border-radius: 0.4rem;
//   border-color: white;
//   cursor: pointer;

//   &:hover,
//   &.active {
//     background-color: white;
//     color: ${BACKGROUND_COLOR};
//   }
// `;

// // child component must have name attribute for tab button
// interface TabProps {
//   name: string;
//   urlPath: string;
// }

// interface TabsProps {
//   children: ReactElement<TabProps> | ReactElement<TabProps>[];
// }

// const Tabs: FC<TabsProps> = (props: TabsProps): ReactElement => {
//   const [active, setActive] = useState(0);

//   const onClick = (index: number) => {
//     setActive(index);
//   };

//   return (
//     <Wrapper>
//       <Router>
//         <TabBar>
//           {Children.map(props.children, (c, i) => (
//             <Link to={c.props.urlPath}>
//               <TabButton
//                 key={i}
//                 title={c.props.name}
//                 className={i === active ? "active" : ""}
//                 // onClick={() => onClick(i)}
//               >
//                 {c.props.name}
//               </TabButton>
//             </Link>
//           ))}
//         </TabBar>
//         {/* {Children.toArray(props.children)[active]} */}
//         <Switch>
//           <Route
//             exact
//             path={"/"}
//             render={() => <Redirect to={Children.toArray(props.children)[0].props.urlPath} />}
//           />
//           {Children.map(props.children, (c, i) => (
//             <Route
//               path={c.props.urlPath}
//               render={() => {
//                 onClick(i);
//                 return c;
//               }}
//             />
//             // >{c}</Route>
//           ))}
//         </Switch>
//       </Router>
//     </Wrapper>
//   );
// };

// export default Tabs;
```

import React from 'react';
import { Provider } from "react-redux";
import store from "./store.js";

// For testing redux
export default (props) => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

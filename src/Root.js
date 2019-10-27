import React from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from './reducers';
import { promiseMiddleware } from './middleware';

const logger = (store) => (next) => (action) => {
  console.log("action fired",action);
  next(action);
}

export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(logger, promiseMiddleware)
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

import { createStore, applyMiddleware } from "redux";
import reducers from './reducers';
// import { promiseMiddleware } from './middleware';

const logger = (store) => (next) => (action) => {
  console.log("action fired",action);
  next(action);
}

const store = createStore(
  reducers,
  applyMiddleware(logger)
);

export default store;

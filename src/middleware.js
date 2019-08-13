import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
} from './constants/actionTypes';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    console.log(action);
    store.dispatch({ type: ASYNC_START, subtype: action.type });
    action.payload.then(
      res => {
        switch (action.type) {
          case REGISTER:
            break;
          default:
            store.dispatch({ type:ASYNC_END });
            break;
        }
        setTimeout(10);
      },
      error => {
        store.dispatch({ type: ASYNC_END });
      }
    );
    return
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}



export { promiseMiddleware }

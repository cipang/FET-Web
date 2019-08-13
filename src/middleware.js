import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
  ASYNC_UPDATE_FIELD
} from './constants/actionTypes';


function showModal(store ,msg) {
  store.dispatch({
    type: ASYNC_UPDATE_FIELD,
    payload: {key: "showModal", value: true}
  });
  store.dispatch({
    type: ASYNC_UPDATE_FIELD,
    payload: {key: "modalMsg", value: msg}
  });
}

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    action.payload.then(
      res => {
        switch (action.type) {
          case REGISTER:
            showModal(store, "success!");
            break;
          default:
            break;
        }
        setTimeout(10);
      },
      error => {
        console.log(error);
        showModal(store, error.message);
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

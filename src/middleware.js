import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
  ASYNC_UPDATE_FIELD,
  ISLOGGEDIN
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
  let payload = null;
  if (isPromise(action.payload)) {
    action.payload.then(
      res => {
        console.log(res);
        switch (action.type) {
          case REGISTER:
            showModal(store, "success!");
            action.payload = null;
            break;
          case LOGIN:
            showModal(store, "success!");
            action.payload = res.user;
            localStorage.setItem('ws-token', res.user.refreshToken);
            break;
          case LOGOUT:
            showModal(store, "success!");
            action.payload = null;
            localStorage.setItem('ws-token', null);
            break;
          default:
            break;
        }
        store.dispatch(action);
        store.dispatch({ type: ASYNC_END });
        setTimeout(10);
      },
      error => {
        console.log(error);
        store.dispatch({ type: ASYNC_END });
        showModal(store, error.message);
      }
    );
    return;
  } else if (action.type === ISLOGGEDIN) {
    store.dispatch({ type: ASYNC_START});
    action.payload.onAuthStateChanged((user) => {
      if(user) {
        store.dispatch({ type: LOGIN, payload: user });

        console.log(user);
      } else {
        console.log("no user");
      }
      store.dispatch({ type: ASYNC_END });
    })
    return;
  }
  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}



export { promiseMiddleware }

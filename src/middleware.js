import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
  SAVE_TIMETABLE,
  LIST_TIMETABLES,
  ASYNC_UPDATE_FIELD,
  ISLOGGEDIN
} from './constants/actionTypes';

import { objects2Array } from './helper';


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
    store.dispatch({ type: ASYNC_START });
    action.payload.then(
      res => {
        // console.log(res);
        switch (action.type) {
          case REGISTER:
            showModal(store, "success!");
            action.payload = null;
            break;
          case LOGIN:
            showModal(store, "success!");
            action.payload = res.user;
            localStorage.setItem('ws-token', res.user.refreshToken);
            onListTimetables();
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
    store.dispatch({ type: ASYNC_START });
    action.payload.auth.onAuthStateChanged((user) => {
      if(user) {
        store.dispatch({ type: LOGIN, payload: user });
        // GET DATA: TODO: need a better way
        action.payload.database.ref('/users/' + user.uid + '/timetables').once('value').then(
          res => {
            store.dispatch({ type: LIST_TIMETABLES, payload: objects2Array(res.val()) });
            store.dispatch({ type: ASYNC_END });
          },
          error => {
            showModal(store, error.message);
            store.dispatch({ type: ASYNC_END });
          }
        )
        // store.dispatch(
        //   {
        //     type: LIST_TIMETABLES,
        //     payload: action.payload.database.ref('/users/' + user.uid + '/timetables').once('value').then()
        //   }
        // );
      } else {
        console.log("no user");
      }
    })
    return;
  } else if (action.type === SAVE_TIMETABLE) {
    store.dispatch({ type: ASYNC_START});
    console.log(action.updates);
    action.auth.onAuthStateChanged((user) => {
      if(user) {
        action.database.ref().update(action.updates).then( res => {
          // console.log("done");
          showModal(store, "success!");
        }, error => {
          showModal(store, error.message);
        });
        store.dispatch({ type: ASYNC_END });
      } else {
        showModal(store, "You need to sign in first!");
        store.dispatch({ type: ASYNC_END });
      }
    })
    return;
  }
  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}



export { promiseMiddleware }

import authReducer from "../auth";
import {
  LOGIN,
  REGISTER,
  AUTH_UPDATE_FIELD,
} from '../../constants/actionTypes';


it('handles actions of type LOGIN', () => {
  const fakeAction = {
    type: LOGIN,
    payload: { name:"user1" }
  }
  const newState = authReducer([], fakeAction);
  expect(newState.loggedIn).toEqual(true);
  expect(newState.user).toEqual({ name:"user1" });
});

it('handles actions of type REGISTER', () => {
  const fakeAction = {
    type: REGISTER,
    payload: { name:"user2" }
  }
  const newState = authReducer([], fakeAction);
  expect(newState.loggedIn).toEqual(true);
  expect(newState.user).toEqual({ name:"user2" });
});

it('handles actions of type AUTH_UPDATE_FIELD', () => {
  const fakeAction = {
    type: AUTH_UPDATE_FIELD,
    payload: {
      key: "error",
      value: "somthing went wrong"
    }
  }
  const newState = authReducer([], fakeAction);
  expect(newState.error).toEqual("somthing went wrong");
});

it('handles action with unknown type', () => {
  const newState = authReducer([], { type: 'unknown type' });
  expect(newState).toEqual([]);
});

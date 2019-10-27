import asyncReducer from "../async";
import {
  ASYNC_START,
  ASYNC_END,
  ASYNC_UPDATE_FIELD
} from '../../constants/actionTypes';


it('handles actions of type ASYNC_START', () => {
  const fakeAction = {
    type: ASYNC_START
  }
  const newState = asyncReducer([], fakeAction);
  expect(newState.loading).toEqual(true);
});

it('handles actions of type ASYNC_END', () => {
  const fakeAction = {
    type: ASYNC_END
  }
  const newState = asyncReducer([], fakeAction);
  expect(newState.loading).toEqual(false);
});

it('handles actions of type ASYNC_UPDATE_FIELD', () => {
  const fakeAction = {
    type: ASYNC_UPDATE_FIELD,
    payload: {key:"error", value:"something went wrong"}
  }
  const newState = asyncReducer([], fakeAction);
  expect(newState.error).toEqual("something went wrong");
});

it('handles action with unknown type', () => {
  const newState = asyncReducer([], { type: 'unknown type' });
  expect(newState).toEqual([]);
});

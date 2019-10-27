import listTimetablesReducer from "../listTimetables";
import {
  LIST_TIMETABLES,
  NEW_TIMETABLE,
  DELETE_TIMETABLE,
  TIMETABLE_UPDATE_FIELD,
} from '../../constants/actionTypes';
import { timetableTemplate } from '../../helper';


it('handles actions of type LIST_TIMETABLES', () => {
  const fakeAction = {
    type: LIST_TIMETABLES,
    payload: [ {name:"timetable1"}, {name:"timetable2"} ]
  }
  const newState = listTimetablesReducer([], fakeAction);
  expect(newState.timetables).toEqual([ {name:"timetable1"}, {name:"timetable2"} ]);
});

it('handles actions of type DELETE_TIMETABLE', () => {
  const fakeAction = {
    type: DELETE_TIMETABLE,
    key: "key1"
  }
  const newState = listTimetablesReducer(
    {
      timetables:[ { key:"key1" }, { key:"key2" } ]
    },
    fakeAction);
  expect(newState.timetables).toEqual([ { key:"key2" } ]);
});

it('handles actions of type NEW_TIMETABLE', () => {
  const fakeAction = {
    type: NEW_TIMETABLE,
    payload: "key1"
  }
  const newState = listTimetablesReducer(
    { newTimetable: timetableTemplate },
    fakeAction);
  expect(newState.newTimetable).toEqual({ ...timetableTemplate, key: "key1" });
});

it('handles actions of type TIMETABLE_UPDATE_FIELDE', () => {
  const fakeAction = {
    type: TIMETABLE_UPDATE_FIELD,
    payload: {
      key: "name",
      value: "this is a new timetable"
    }
  }
  const newState = listTimetablesReducer(
    { newTimetable: timetableTemplate },
    fakeAction);
  expect(newState.newTimetable.name).toEqual("this is a new timetable");
});

it('handles action with unknown type', () => {
  const newState = listTimetablesReducer([], { type: 'unknown type' });
  expect(newState).toEqual([]);
});

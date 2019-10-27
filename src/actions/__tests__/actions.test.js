import { updateFieldAuth, updateFieldTimetable } from '../index';
import {
  AUTH_UPDATE_FIELD,
  TIMETABLE_UPDATE_FIELD,
} from '../../constants/actionTypes';

describe('updateFieldAuth', () => {
  let action;
  beforeEach(() => {
    action = updateFieldAuth("email", "test@test.com");
  });

  it('has the correct type', () => {
    expect(action.type).toEqual( AUTH_UPDATE_FIELD);
  });

  it('has the correct payload', () => {
    expect(action.payload).toEqual({ key:"email", value:"test@test.com" });
  });
});

describe('updateFieldTimetable', () => {
  let action;
  beforeEach(() => {
    action = updateFieldTimetable("name", "test");
  });

  it('has the correct type', () => {
    expect(action.type).toEqual(TIMETABLE_UPDATE_FIELD);
  });

  it('has the correct payload', () => {
    expect(action.payload).toEqual({ key:"name", value:"test" });
  });
});

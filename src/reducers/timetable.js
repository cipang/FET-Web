import {
  TIMETABLE_UPDATE_FIELD,
} from '../constants/actionTypes';

const initialstate = {
  step:0,
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case TIMETABLE_UPDATE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value}
    default:
      return state;
  }

  return state;
};

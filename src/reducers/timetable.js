import {
  TIMETABLE_UPDATE_FIELD,
  DAYS_UPDATE_FIELD
} from '../constants/actionTypes';

const initialstate = {
  step:0,
  name:'',
  days:{
    monday:"default",
    tuesday:"default",
    wednesday:"default",
    thursday:"default",
    friday:"default",
    saturday:"default",
    sunday:"default"
  },
  numberOfHoursPerDay:8,
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case TIMETABLE_UPDATE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value}
    case DAYS_UPDATE_FIELD:
      return { ...state, days:{...state.days, [action.payload.key]: action.payload.value}}
    default:
      return state;
  }

  return state;
};

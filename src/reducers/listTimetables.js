import {
  LIST_TIMETABLES
} from '../constants/actionTypes';

const initialstate = {
  timetables:[{
    loading: true
  }]
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case LIST_TIMETABLES:
      return { ...state, timetables:action.payload };
    default:
      return state;
  }

  return state;
};

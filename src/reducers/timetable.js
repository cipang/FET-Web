import {
  TIMETABLE_UPDATE_FIELD,
  DAYS_UPDATE_FIELD,
  PERIODS_UPDATE_FIELD,
  SUBJECTS_UPDATE_FIELD,
  TEACHERS_UPDATE_FIELD
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
  numberOfPeriodsPerDay:8,
  periods:{},
  numberOfSubjects:1,
  subjects:{
    subject_1:""
  },
  teachers:{
    teacher_1:{
      name:"",
      targetNumberOfHours:"",
      qualifiedSubjects:[]
    }
  }
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case TIMETABLE_UPDATE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value}
    case DAYS_UPDATE_FIELD:
      return { ...state, days:{...state.days, [action.payload.key]: action.payload.value}}
    case PERIODS_UPDATE_FIELD:
      return { ...state, periods:{...state.periods, [action.payload.key]: action.payload.value}}
    case SUBJECTS_UPDATE_FIELD:
      return { ...state, subjects:{...state.subjects, [action.payload.key]: action.payload.value}}
    case TEACHERS_UPDATE_FIELD:
      return { ...state, teachers:{...state.teachers, [action.payload.key]: action.payload.value}}
    default:
      return state;
  }

  return state;
};

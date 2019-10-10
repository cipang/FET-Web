import {
  LIST_TIMETABLES,
  NEW_TIMETABLE,
  DELETE_TIMETABLE,
  LIST_TIMETABLE_UPDATE_FIELD,
  TIMETABLE_UPDATE_FIELD,
  PERIODS_UPDATE_FIELD,
  SUBJECTS_UPDATE_FIELD,
  TEACHERS_UPDATE_FIELD,
  TAGS_UPDATE_FIELD,
  STUDENTS_UPDATE_FIELD,
  ACTIVITIES_UPDATE_FIELD,
  BUILDINGS_UPDATE_FIELD,
  ROOMS_UPDATE_FIELD,
  FINAL_TIMETABLE_ORDER_UPDATE_FIELD
} from '../constants/actionTypes';
import { timetableTemplate } from '../helper';

const initialstate = {
  showTimetable:false,
  timetables:[{
    loading: true
  }],
  newTimetable: timetableTemplate
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case LIST_TIMETABLES:
      return { ...state, timetables:action.payload };
    case DELETE_TIMETABLE:
      return { ...state, timetables:state.timetables.filter(val => val.key != action.key)};
    case LIST_TIMETABLE_UPDATE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value };
    case NEW_TIMETABLE:
      return {
               ...state,
               newTimetable:{
                 ...initialstate.newTimetable,
                 key:action.payload
               }
             };
    // Todo: handle null payload
    case TIMETABLE_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 [action.payload.key]: action.payload.value
               }
             }
    case PERIODS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 periods:{
                           ...state.newTimetable.periods,
                           [action.payload.key]: action.payload.value
                          }
             }}
    case SUBJECTS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 subjects:{...state.newTimetable.subjects, [action.payload.key]: action.payload.value}
             }}
    case TEACHERS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 teachers:{...state.newTimetable.teachers, [action.payload.key]: action.payload.value}
               }
             }
    case STUDENTS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 students:{...state.newTimetable.students, [action.payload.key]: action.payload.value}
               }
             }
    case TAGS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 tags:{...state.newTimetable.tags, [action.payload.key]: action.payload.value}
               }
             }
    case ACTIVITIES_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 activities:{...state.newTimetable.activities, [action.payload.key]: action.payload.value}
               }
             }
    case BUILDINGS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 buildings:{...state.newTimetable.buildings, [action.payload.key]: action.payload.value}
               }
             }
    case ROOMS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 rooms:{...state.newTimetable.rooms, [action.payload.key]: action.payload.value}
               }
             }
    case FINAL_TIMETABLE_ORDER_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 finalTimetablesOrders:{...state.newTimetable.finalTimetablesOrders, [action.payload.key]: action.payload.value}
               }
             }
    default:
       return state;
  }

  return state;
};

import {
  LIST_TIMETABLES,
  NEW_TIMETABLE,
  LIST_TIMETABLE_UPDATE_FIELD,
  TIMETABLE_UPDATE_FIELD,
  DAYS_UPDATE_FIELD,
  PERIODS_UPDATE_FIELD,
  SUBJECTS_UPDATE_FIELD,
  TEACHERS_UPDATE_FIELD,
  TAGS_UPDATE_FIELD,
  YEARS_UPDATE_FIELD,
  ACTIVITIES_UPDATE_FIELD,
  BUILDINGS_UPDATE_FIELD,
  ROOMS_UPDATE_FIELD
} from '../constants/actionTypes';


const basicDataStructure = {
  keyList:[],
  data:[]
};

const initialstate = {
  showTimetable:false,
  timetables:[{
    loading: true
  }],
  newTimetable: {
    key:null,
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
    subjects:basicDataStructure,
    teachers:basicDataStructure,
    years:basicDataStructure,
    tags:basicDataStructure,
    activities:{
      newActivity:{
        error:null,
        split:1,
        selectedSubject:"",
        selectedTeachers:[],
        selectedTags:[],
        selectedYears:[],
        durations:{}
      },
      showModal:false,
      data:[],
      keyList:[]
    },
    buildings:basicDataStructure,
    rooms:basicDataStructure,
  },
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case LIST_TIMETABLES:
      return { ...state, timetables:action.payload };
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
    case TIMETABLE_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 [action.payload.key]: action.payload.value
               }
             }
    case DAYS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 days:{...state.days, [action.payload.key]: action.payload.value}
             }}
    case PERIODS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 periods:{...state.periods, [action.payload.key]: action.payload.value}
             }}
    case SUBJECTS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 subjects:{...state.subjects, [action.payload.key]: action.payload.value}
             }}
    case TEACHERS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 teachers:{...state.teachers, [action.payload.key]: action.payload.value}
               }
             }
    case YEARS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 years:{...state.years, [action.payload.key]: action.payload.value}
               }
             }
    case TAGS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 tags:{...state.tags, [action.payload.key]: action.payload.value}
               }
             }
    case ACTIVITIES_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 activities:{...state.activities, [action.payload.key]: action.payload.value}
               }
             }
    case BUILDINGS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 buildings:{...state.buildings, [action.payload.key]: action.payload.value}
               }
             }
    case ROOMS_UPDATE_FIELD:
      return {
               ...state,
               newTimetable:{
                 ...state.newTimetable,
                 rooms:{...state.rooms, [action.payload.key]: action.payload.value}
               }
             }
    default:
       return state;
  }

  return state;
};

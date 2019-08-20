import {
  TIMETABLE_UPDATE_FIELD,
  DAYS_UPDATE_FIELD,
  PERIODS_UPDATE_FIELD,
  SUBJECTS_UPDATE_FIELD,
  TEACHERS_UPDATE_FIELD,
  YEARS_UPDATE_FIELD,
  ACTIVITIES_UPDATE_FIELD
} from '../constants/actionTypes';

const initialstate = {
  step:3,
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
    subject_1:"maths",
    subject_2:"physics",
    subject_3:"chemistry",
  },
  teachers:{
    teacher_1:{
      name:"teach1",
      targetNumberOfHours:"",
      qualifiedSubjects:[]
    },
    teacher_1:{
      name:"teach2",
      targetNumberOfHours:"",
      qualifiedSubjects:[]
    }
  },
  years:{
    keyList: [1,2,11,12],
    data:[
      {
        key: 1,
        year: '2019',
        number: 60,
        children: [
          {
            key: 11,
            year: '2019 A',
            number: 42,
          },
          {
            key: 12,
            year: '2019 B',
            number: 18,
          }
        ]
      },
      {
        key: 2,
        year: '2020',
        number: 32,
      },
    ]
  },
  activities:{
    showModal:false,
    data:[]
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
    case YEARS_UPDATE_FIELD:
      return { ...state, years:{...state.years, [action.payload.key]: action.payload.value}}
    case ACTIVITIES_UPDATE_FIELD:
      return { ...state, activities:{...state.activities, [action.payload.key]: action.payload.value}}
    default:
      return state;
  }

  return state;
};

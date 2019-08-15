import {
  TIMETABLE_UPDATE_FIELD,
  DAYS_UPDATE_FIELD,
  PERIODS_UPDATE_FIELD,
  SUBJECTS_UPDATE_FIELD,
  TEACHERS_UPDATE_FIELD,
  YEARS_UPDATE_FIELD
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
  },
  years:{
    data:[
      {
        key: 1,
        year: 'John Brown sr.',
        number: 60,
        children: [
          {
            key: 11,
            year: 'John Brown',
            number: 42,
          },
          {
            key: 12,
            year: 'John Brown jr.',
            number: 30,
            children: [
              {
                key: 121,
                year: 'Jimmy Brown',
                number: 16,
              },
            ],
          },
          {
            key: 13,
            year: 'Jim Green sr.',
            number: 72,
            children: [
              {
                key: 131,
                year: 'Jim Green',
                number: 42,
                children: [
                  {
                    key: 1311,
                    year: 'Jim Green jr.',
                    number: 25,
                  },
                  {
                    key: 1312,
                    year: 'Jimmy Green sr.',
                    number: 18,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 2,
        year: 'Joe Black',
        number: 32,
      },
    ]
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
    default:
      return state;
  }

  return state;
};

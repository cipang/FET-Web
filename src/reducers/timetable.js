import {
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

const initialstate = {
  step:7,
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
    keyList: [1,2],
    data:[
      {
        key: 1,
        subject: 'maths'
      },
      {
        key: 2,
        subject: 'physics'
      }
    ]
  },
  teachers:{
    keyList: [1,2],
    data:[
      {
        key: 1,
        teacher: 'teach1',
        targetNumberOfHours:0,
        qualifiedSubjects:[]
      },
      {
        key: 2,
        teacher: 'teach2',
        targetNumberOfHours:0,
        qualifiedSubjects:[]
      }
    ],
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
  tags:{
    keyList: [1,2],
    data:[
      {
        key: 1,
        tag: 'tag1'
      },
      {
        key: 2,
        tag: 'tag2'
      }
    ]
  },
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
    keyList: []
  },
  buildings:{
    data:[
      {
        key: 1,
        building: 'A',
        capacity: 130
      },
      {
        key: 2,
        building: 'B',
        capacity: 190
      }
    ],
    keyList: [1,2]
  },
  rooms:{
    data:[
      {
        key: 1,
        room:'A101',
        building: 'A',
        capacity: 130
      }
    ],
    keyList: [1]
  },
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
    case TAGS_UPDATE_FIELD:
      return { ...state, tags:{...state.tags, [action.payload.key]: action.payload.value}}
    case ACTIVITIES_UPDATE_FIELD:
      return { ...state, activities:{...state.activities, [action.payload.key]: action.payload.value}}
    case BUILDINGS_UPDATE_FIELD:
      return { ...state, buildings:{...state.buildings, [action.payload.key]: action.payload.value}}
    case ROOMS_UPDATE_FIELD:
      return { ...state, rooms:{...state.rooms, [action.payload.key]: action.payload.value}}
    default:
      return state;
  }

  return state;
};

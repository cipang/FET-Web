import {
  LOGIN,
  LOGOUT,
  REGISTER,
  AUTH_UPDATE_FIELD,
  ASYNC_UPDATE_FIELD,
  TIMETABLE_UPDATE_FIELD,
  DAYS_UPDATE_FIELD,
  PERIODS_UPDATE_FIELD,
  SUBJECTS_UPDATE_FIELD,
  TEACHERS_UPDATE_FIELD,
  YEARS_UPDATE_FIELD,
  TAGS_UPDATE_FIELD,
  ACTIVITIES_UPDATE_FIELD,
  ASYNC_START,
  ASYNC_END,
  ISLOGGEDIN,
  SAVE_TIMETABLE,
} from '../constants/actionTypes';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDcWtQqtqJeQ0QvxGEXtIRyiyoc42lWmmc",
  authDomain: "fet-web.firebaseapp.com",
  databaseURL: "https://fet-web.firebaseio.com",
  projectId: "fet-web",
  storageBucket: "fet-web.appspot.com",
  messagingSenderId: "594488385508",
  appId: "1:594488385508:web:0681f5d828166939"
};

firebase.initializeApp(firebaseConfig);

export function isLoggedIn() {
  return {
    type: ISLOGGEDIN,
    payload: firebase.auth()
  };
}

export function onLogin(user) {
  return {
    type: LOGIN,
    payload:firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  };
}

export function onRegister(user) {
  return {
    type: REGISTER,
    payload:firebase.auth().createUserWithEmailAndPassword(user.email, user.password),
    user
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload:firebase.auth().signOut()
  };
}

export function onSaveTimetable(timetable, key) {
  let uid = firebase.auth().currentUser.uid;
  var newPostKey = firebase.database().ref().child('timetables').push().key;
  var updates = {};
  timetable['lastModifiedTime'] = new Date().toLocaleString();
  if(key == null) {
    updates['/timetables/' + newPostKey] = timetable;
    updates['users/' + uid + '/timetables/' + newPostKey] = timetable;
  } else {
    updates['/timetables/' + key] = timetable;
    updates['users/' + uid + '/timetables/' + key] = timetable;
  }
  return {
    type: SAVE_TIMETABLE,
    auth: firebase.auth(),
    database: firebase.database(),
    updates
  };
}


export function updateFieldAuth(key, value) {
  return {
    type: AUTH_UPDATE_FIELD,
    payload: {key, value}
  };
}

export function updateFieldAsync(key, value) {
  return {
    type: ASYNC_UPDATE_FIELD,
    payload: {key, value}
  };
}

export function updateFieldTimetable(key, value) {
  return {
    type: TIMETABLE_UPDATE_FIELD,
    payload: {key, value}
  };
}

export function updateFieldDays(key, value) {
  return {
    type: DAYS_UPDATE_FIELD,
    payload: {key, value}
  };
}

export function updateFieldPeriods(key, value) {
  return {
    type: PERIODS_UPDATE_FIELD,
    payload: {key, value}
  };
}

export function updateFieldSubjects(key, value) {
  return {
    type: SUBJECTS_UPDATE_FIELD,
    payload: {key, value}
  };
}

export function updateFieldTeachers(key, value) {
  return {
    type: TEACHERS_UPDATE_FIELD,
    payload: {key, value}
  };
}

export function updateFieldYears(key, value) {
  return {
    type: YEARS_UPDATE_FIELD,
    payload: {key, value}
  };
}

export function updateFieldTags(key, value) {
  return {
    type: TAGS_UPDATE_FIELD,
    payload: {key, value}
  };
}

export function updateFieldActivities(key, value) {
  return {
    type: ACTIVITIES_UPDATE_FIELD,
    payload: {key, value}
  };
}



export function startAsync() { return { type: ASYNC_START };}
export function endAsync() { return { type: ASYNC_END };}

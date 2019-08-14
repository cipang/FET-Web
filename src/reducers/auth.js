import {
  LOGIN,
  LOGOUT,
  REGISTER,
  AUTH_UPDATE_FIELD,
  ISLOGGEDIN
} from '../constants/actionTypes';

const initialstate = {
  confirmDirty: false,
  loading:false,
  loggedIn:false,
  error:null,
  user:null,
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN:
      console.log(action);
      return { ...state, loggedIn:true, user:action.payload };
    case AUTH_UPDATE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value}
    case ISLOGGEDIN:
      return { ...state, user: action.payload }

    default:
      return state;
  }

  return state;
};
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  AUTH_UPDATE_FIELD
} from '../constants/actionTypes';

const initialstate = {
  confirmDirty: false,
  loading:false,
  loggedIn:false,
  error:null,
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state,loggedIn:true,user:action.payload,email:action.payload.email};
    case AUTH_UPDATE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value}

    default:
      return state;
  }

  return state;
};

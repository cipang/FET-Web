import {
  LOGIN,
  LOGOUT,
  REGISTER
} from '../constants/actionTypes';

const initialstate = {
  loading:false,
  loggedIn:false,
  error:null,
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN:
      return{ ...state,loggedIn:true,user:action.payload,email:action.payload.email};
    default:
      return state;
  }

  return state;
};

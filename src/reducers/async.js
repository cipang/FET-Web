import {
  ASYNC_START,
  ASYNC_END
} from '../constants/actionTypes';

const initialstate = {
  loading:false,
  error:null,
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case ASYNC_START:
      return{ ...state, loading: true };
    case ASYNC_END:
      return{ ...state, loading: false };
    default:
      return state;
  }

  return state;
};

import {
  ASYNC_START,
  ASYNC_END,
  ASYNC_UPDATE_FIELD
} from '../constants/actionTypes';

const initialstate = {
  loading:false,
  error:'',
  showModal:false,
  modalMsg:''
};


export default (state = initialstate, action) => {
  switch (action.type) {
    case ASYNC_START:
      console.log({ ...state, loading: true });
      return { ...state, loading: true };
    case ASYNC_END:
      return { ...state, loading: false };
    case ASYNC_UPDATE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value}
    default:
      return state;
  }

  return state;
};

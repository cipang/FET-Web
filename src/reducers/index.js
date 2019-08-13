import { combineReducers } from "redux";
import auth from "./auth";
import async from "./async";

export default combineReducers({
  auth,
  async
});

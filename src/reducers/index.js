import { combineReducers } from "redux";
import auth from "./auth";
import async from "./async";
import listTimetables from "./listTimetables";

export default combineReducers({
  auth,
  async,
  listTimetables
});

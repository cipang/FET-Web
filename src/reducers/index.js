import { combineReducers } from "redux";
import auth from "./auth";
import async from "./async";
import timetable from "./timetable";

export default combineReducers({
  auth,
  async,
  timetable
});

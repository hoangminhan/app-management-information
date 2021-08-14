import { combineReducers } from "redux";
import login from "./loginReducer";
import clients from "./clientReducer";

const rootReducer = combineReducers({
  login,
  clients,
});
export default rootReducer;

import { combineReducers } from "redux";
import login from "./loginReducer";
import clients from "./clientReducer";
import { products } from "./producReducer";
import staffs from "./staffReducer";

const rootReducer = combineReducers({
  login,
  clients,
  products,
  staffs,
});
export default rootReducer;

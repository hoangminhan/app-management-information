import { combineReducers } from "redux";
import login from "./loginReducer";
import clients from "./clientReducer";
import { products } from "./producReducer";

const rootReducer = combineReducers({
  login,
  clients,
  products,
});
export default rootReducer;

import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  order: orderReducer,
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
});

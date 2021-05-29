import { combineReducers } from "redux";
import userReducer from "./User/userReducer";
import productReducer from "./Products/productReducer";

export default combineReducers({
  user: userReducer,
  product: productReducer,
});

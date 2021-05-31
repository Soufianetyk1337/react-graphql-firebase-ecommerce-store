import { combineReducers } from "redux";
import userReducer from "./User/userReducer";
import productReducer from "./Products/productReducer";
import cartReducer from "./Cart/cartReducer";

export default combineReducers({
  user: userReducer,
  product: productReducer,
  cartItems: cartReducer,
});

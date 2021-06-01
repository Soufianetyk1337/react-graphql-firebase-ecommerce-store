import { combineReducers } from "redux";
import userReducer from "./User/userReducer";
import productReducer from "./Products/productReducer";
import cartReducer from "./Cart/cartReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cartItems: cartReducer,
});
const storageProps = {
  key: "root",
  storage,
  whitelist: ["cartItems"],
};

export default persistReducer(storageProps, rootReducer);

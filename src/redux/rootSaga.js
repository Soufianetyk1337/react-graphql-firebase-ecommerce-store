// eslint-disable-next-line no-unused-vars
import { call, all } from "redux-saga/effects";
import userSagas from "./User/userSagas";
import productSagas from "./Products/productSagas";
import { orderSagas } from "./Orders/orderSagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(productSagas), call(orderSagas)]);
}

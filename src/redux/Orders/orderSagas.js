/* eslint-disable no-unused-vars */
import { takeLatest, call, all, put } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import { clearCart } from "../Cart/cartActions";
import { setOrderDetails, setUserOrderHistory } from "./orderActions";
import {
  handleGetOrderDetails,
  handleGetUserOrderHisrory,
  handleSaveOrder,
} from "./orderHelpers";
import { orderTypes } from "./orderTypes";

export function* onGetUserOrderHistory() {
  yield takeLatest(orderTypes.GET_USER_HISTORY, getUserOrderHistory);
}
export function* onSaveOrderHistory() {
  yield takeLatest(orderTypes.SAVE_ORDER_HISTORY, saveOrder);
}
export function* onGetOrderDetails() {
  yield takeLatest(orderTypes.GET_ORDER_DETAILS, getUserOrderDetails);
}
export function* getUserOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrderDetails(payload);
    yield put(setOrderDetails(order));
  } catch (error) {
    console.error(error);
  }
}
export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHisrory(payload);
    yield put(setUserOrderHistory(history));
  } catch (error) {
    console.error(error);
  }
}
export function* saveOrder({ payload }) {
  try {
    const timestamp = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserId: auth.currentUser.uid,
      order_created_at: timestamp,
    });
    yield put(clearCart());
  } catch (error) {
    console.error(error);
  }
}

export function* orderSagas() {
  yield all([
    call(onSaveOrderHistory),
    call(onGetUserOrderHistory),
    call(onGetOrderDetails),
  ]);
}
